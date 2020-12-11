
var between0and100 = function (input)
{
    try
    {
        parseInt(input);
    }
    catch(NumberFormatException)
    {
        return false;
    }
    if(100 >= parseInt(input) && parseInt(input) >= 0 ) {
      return true;
    } else {
      return false;
    }
}

function renderText(thisItem) {

  $("#entity").html(thisItem)
 
}

function resultsRow(stim) {

  return {
          "individual_judgment" : stim.individual_judgment,
          "population_judgment" : stim.population_judgment,
          "item" : stim.item,
          "time": (new Date()) - stim.trial_start,
          // "slide_number_in_experiment" : exp.phase,
        }

}

function make_slides(f) {
  var   slides = {};

  slides.bot = slide({
    name : "bot",
    start: function() {
      $('.err1').hide();
      $('.err2').hide();
      $('.disq').hide();
      exp.speaker = _.shuffle(["James", "John", "Robert", "Michael", "William", "David", "Richard", "Joseph", "Thomas", "Charles"])[0];
      exp.listener = _.shuffle(["Mary", "Patricia", "Jennifer", "Linda", "Elizabeth", "Barbara", "Susan", "Jessica", "Sarah", "Margaret"])[0];
      exp.lives = 0;
      var story = exp.speaker + ' says to ' + exp.listener + ': "It\'s a beautiful day, isn\'t it?"'
      var question = 'Who does ' + exp.speaker + ' talk to?';
      document.getElementById("s").innerHTML = story;
      document.getElementById("q").innerHTML = question;
    },
    button : function() {
      exp.text_input = document.getElementById("text_box").value;
      var lower = exp.listener.toLowerCase();
      var upper = exp.listener.toUpperCase();

      if ((exp.lives < 3) && ((exp.text_input == exp.listener)|(exp.text_input == lower) | (exp.text_input== upper))){
        exp.data_trials.push({
          "slide_number": exp.phase,
          "slide_type" : "bot_check",
          "image" : exp.listener,
          "audio" : "",
          "response" : [0,exp.text_input]
        });
        exp.go();
      }
      else {
        exp.data_trials.push({
          "slide_number": exp.phase,
          "slide_type" : "bot_check",
          "image" : exp.listener,
          "audio" : "",
          "response" : [0,exp.text_input]
        });
        if (exp.lives == 0){
          $('.err1').show();
        }if (exp.lives == 1){
          $('.err1').hide();
          $('.err2').show();
        }if (exp.lives == 2){
          $('.err2').hide();
          $('.disq').show();
          $('.button').hide();
        }
        exp.lives++;
      } 
    },
  });

  slides.i0 = slide({
     name : "i0",
     start: function() {
      exp.startT = Date.now();
     }
  });

  slides.instructions = slide({
    name : "instructions",
    button : function() {
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.trial = slide({
    name : "trial",
    present: exp.all_stims,
 
    // PRESENT THE SLIDE
    present_handle: function(stim) {
      this.trial_start = new Date();
      exp.vignette = stim.item;
      this.stim = stim;
      this.item = stim.item;

      renderText(stim.pretty_print);

      $("#done_q1").show();
      $("#error_percept").hide();
      $("#error_num").hide();

    }, 

    button : function() {

    $("#error_num").hide();
    $("#error_percept").hide();

    this.individual_judgment = $('input[name="individual_judgment"]:checked').val()
    this.population_judgment = $('input[name="population_judgment"]').val()

    slidersnotfilledout = this.individual_judgment === undefined || this.population_judgment === undefined || this.population_judgment === ""
    question2notnumber = !(between0and100(this.population_judgment))
    
    if(question2notnumber){
      $("#error_num").show();
    } 

    if(slidersnotfilledout) {
      $("#error_percept").show();
    }

    if(!(question2notnumber || slidersnotfilledout)) {
      this.log_responses();
      _stream.apply(this);
      }
    },

    log_responses : function() {

      exp.data_trials.push(resultsRow(this));

    }

  });

slides.comp_check = slide({
    name : "comp_check",

    // start : function() {

    // },

    button_percept : function() {
    this.attention = $('input[name="attention"]:checked').val()
    if (this.attention === undefined) {
      $("#error_attn").show();
    } else {
      $("#error_attn").hide();
      this.log_responses();
      exp.go();
      }
    },

    log_responses : function() {

      exp.attention = this.attention;

    }

  });

slides.subj_info =  slide({
    name : "subj_info",
    button_submit : function(e){
      exp.subj_data = {
        attention: exp.attention,
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        comments : $("#comments").val(),
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val()
      };
      exp.go();
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "system" : exp.system,
          "hit_information" : exp.hit_data,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000,
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}


/// init ///
function init() {
  // var condition = _.sample(["List1","List2"]);
  // var condition = _.sample(["List1"]);

  exp.data_trials = [];

   //can randomize between subject conditions here
  // var stimlist = _.filter(stimuli, function(stim) {
  //   return stim.list == condition
  // })

  exp.all_stims = [_.sample(stimuli)];

  console.log(exp.all_stims);
 
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:

  responseopts = _.sample(["yesno", "yesno_extended"])

  // change back 

  exp.structure=["bot", "i0", "instructions", "trial", "comp_check", "subj_info", "thanks"];

  //make corresponding slides:
  exp.slides = make_slides(exp);

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined

  $('.slide').hide(); //hide everything

  //make sure turkers have accepted HIT (or you're not in mturk)
  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  $("#audio_player").bind("ended", function () {
        $("#audio_player").data("num-plays", $("#audio_player").data("num-plays") + 1);

      });

  $("#start_button").click(function() {
    if (turk.previewMode) {
      $("#mustaccept").show();
    } else {
      $("#start_button").click(function() {$("#mustaccept").show();});
      exp.go();
    }
  });

  exp.go(); //show first slide
}

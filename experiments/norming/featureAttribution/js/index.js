//https://www.ncbi.nlm.nih.gov/pmc/articles/doi/10.3389/fpsyg.2014.00399/full// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!

var instructionSlides = {

  "plausibility": {
    "detail" : "You'll be asked about the physical possibility of people interacting with objects in certain locations.",
    'giveItATry' : "Give it a try! Use the slider below to indicate your judgment. Use the endpoints of the slider to indicate maximal certainty of your answer. \
    Use intermediate points to indicate uncertainty.",
    'leftend' : 'No',
    'rightend' : 'Yes',
    "exampleQ1" : "Is it physically possible for someone to take this object into a library?",
    "exampleImage1" : "book.jpg",
    "example1Error" : "Are you sure? In fact, one can often find books inside libraries.",
    "exampleQ2" : "Is it physically possible for someone to take this object into a bus?",
    "exampleImage2" : "bonfire.jpg",
    "example2Error" : "Are you sure? It seems as though it would be rather difficult (if not impossible) to carry a bonfire into a bus."

  }

}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function make_slides(f) {
  var slides = {};

function startsWith(str, substrings) {
    for (var i = 0; i != substrings.length; i++) {
       var substring = substrings[i];
       if (str.indexOf(substring) == 0) {
         return 1;
       }
    }
    return -1; 
}

function getArticleItem(item_id) {
  var article = "";
  if (startsWith(item_id, ["a","e","i","o","u"]) == 1) {
    article = "an ";
  } else {
    article = "a ";
  }
  return article;
}

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
          "slide_number_in_experiment" : exp.phase,
          "utterance": "bot_check",
          "object": exp.listener,
          "rt" : 0,
          "response" : exp.text_input
        });
        exp.go();
      }
      else {
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "utterance": "bot_check",
          "object": exp.listener,
          "rt" : 0,
          "response" : exp.text_input
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

  slides.getready = slide({
     name : "getready",
     button : function() {
      exp.go(); 
    }
  });

  slides.instructions = slide({
    name : "instructions",
    start : function() {
      $("#detail").html(instructionSlides[exp.condition]["detail"]);
      $("#exampleQ1").html(instructionSlides[exp.condition]["exampleQ1"]);
      $("#exampleImage1").html("<img width = '225px' src = 'shared/images/" + instructionSlides[exp.condition]["exampleImage1"] + "'><br>")
    },
    button : function() {
      exp.go(); 
    }
  });

  // SAMPLE TRIALS

  slides.sampletrial = slide({
    name : "objecttrial",
    present : ['example1','example2'],
    start : function() {
       $(".err").hide();
    },
    
    present_handle : function(stim) {

    console.log("new trial started");
    this.trial_start = Date.now();
    $(".err").hide();

    this.init_sliders();
    exp.sliderPost = null;
  
    this.stim = stim;
    console.log(this.stim);

    let contextsentence;
    let objimagehtml;
    let header;
    var giveItATry = instructionSlides[exp.condition]["giveItATry"]
    var leftend = instructionSlides[exp.condition]["leftend"]
    var rightend = instructionSlides[exp.condition]["rightend"]

    if(stim == 'example1') {
      contextsentence = instructionSlides[exp.condition]["exampleQ1"];
      objimagehtml = "<img width = '225px' src = 'shared/images/" + instructionSlides[exp.condition]["exampleImage1"] + "'>";
      header = "Example 1";
    } else if(stim == 'example2') {
      contextsentence = instructionSlides[exp.condition]["exampleQ2"];
      objimagehtml = "<img width = '225px' src = 'shared/images/" + instructionSlides[exp.condition]["exampleImage2"] + "'>";
      header = "Example 2";
    }

    $("#header").html(header)
    $("#giveItATry").html(giveItATry);
    $("#contextsentence").html(contextsentence);
    $("#objectimage").html(objimagehtml);
    $("#leftend").html(leftend);
    $("#rightend").html(rightend);
  },

  button : function() {
    console.log("button was pressed");
    exp.errors = [];
    if (exp.sliderPost == null) {
      console.log("sliders not moved");
      $("#err").html("Please answer before clicking 'Continue.'");
     } else if (this.stim == 'example1' & exp.sliderPost <= 0.5) {
      $("#err").html(instructionSlides[exp.condition]["example1Error"]);
      exp.errors.push('example1')
     } else if (this.stim == 'example2' & exp.sliderPost >= 0.5) {
      $("#err").html(instructionSlides[exp.condition]["example2Error"]);
      exp.errors.push('example2')
     } else if (exp.sliderPost != null) {   
      console.log("slider1: " + exp.sliderPost);
      $("#err").html("");
      this.log_responses();
      _stream.apply(this); //use exp.go() if and only if there is no "present" data.        
    }
    console.log("slider1: " + exp.sliderPost);
    },

    init_sliders : function() {
      utils.make_slider("#single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });

    },

    log_responses : function() {
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "utterance": this.stim.item,
          "object": this.stim.label,
          "rt" : Date.now() - _s.trial_start,
          "response" : [exp.sliderPost],
          "errors" : exp.errors
        });
    }
  });

  // MAIN TRIALS

  slides.objecttrial = slide({
    name : "objecttrial",
    present : exp.all_stims,
    start : function() {
	     $(".err").hide();
    },
    
    present_handle : function(stim) {

    console.log("new trial started");
    this.trial_start = Date.now();
    $(".err").hide();

    this.init_sliders();
    exp.sliderPost = null;
  
	  this.stim = stim;
	  console.log(this.stim);
    var contextsentence = stim.prompt.text;
    var objimagehtml = '<img src="../../shared/scenes/' + stim.scene + '/images/' + stim.object + '.jpg" style="height:330px;">';

    $("#header").html("")
    $("#giveItATry").html("")
    $("#contextsentence").html(contextsentence);
    $("#objectimage").html(objimagehtml);
    $("#leftend").html(instructionSlides[exp.condition].leftend);
    $("#rightend").html(instructionSlides[exp.condition].rightend);
	},

	button : function() {
    console.log("button was pressed");

    if (exp.sliderPost == null) {
      console.log("one of the sliders is not moved")
      console.log("slider1: " + exp.sliderPost)
      $("#err").html("Please answer before clicking 'Continue.'");
     } else if (exp.sliderPost != null) {   
      console.log("sliders moved");
      console.log("slider1: " + exp.sliderPost);
      $("#err").html("");
      this.log_responses();
      _stream.apply(this); //use exp.go() if and only if there is no "present" data.        
    }

    },

    init_sliders : function() {
      utils.make_slider("#single_slider", function(event, ui) {
        exp.sliderPost = ui.value;
      });

    },

    log_responses : function() {
        exp.data_trials.push({
          "slide_number_in_experiment" : exp.phase,
          "utterance": this.stim.item,
          "object": this.stim.label,
          "rt" : Date.now() - _s.trial_start,
          "response" : [exp.sliderPost]
        });
    }
  });

  slides.subj_info =  slide({
    name : "subj_info",
    submit : function(e){
      //if (e.preventDefault) e.preventDefault(); // I don't know what this means.
      exp.subj_data = {
        language : $("#language").val(),
        enjoyment : $("#enjoyment").val(),
        asses : $('input[name="assess"]:checked').val(),
        age : $("#age").val(),
        gender : $("#gender").val(),
        education : $("#education").val(),
        comments : $("#comments").val(),
      };
      exp.go(); //use exp.go() if and only if there is no "present" data.
    }
  });

  slides.thanks = slide({
    name : "thanks",
    start : function() {
      exp.data= {
          "trials" : exp.data_trials,
          "catch_trials" : exp.catch_trials,
          "system" : exp.system,
          "condition" : exp.condition,
          "subject_information" : exp.subj_data,
          "time_in_minutes" : (Date.now() - exp.startT)/60000
      };
      setTimeout(function() {turk.submit(exp.data);}, 1000);
    }
  });

  return slides;
}

/// init ///
function init() {

  exp.condition = location.search.split('type=')[1]
  //console.log(exp.condition)
  //console.log(instructionSlides[exp.condition]['detail'])

  function generateStims(scene,condition) {

    var sceneObjectsAndPrompts = sceneAttributes.filter(e => scene === e.name)[0]
    var objects = sceneObjectsAndPrompts.objects
    var prompts = sceneObjectsAndPrompts.normingPrompts.filter(e => condition === e.id)

    var objects = _.shuffle(objects)
    var sceneStims = [];
    objects.map(o => sceneStims.push({scene : scene, object : o, prompt : _.sample(prompts)}))

    return(sceneStims)

  }

  // console.log(generateStims("vehicles"))

  var stims = [];
  var scenes = ["vehicles"]
  scenes.map(scene => stims.push(generateStims(scene,exp.condition)))

  exp.all_stims = _.shuffle(stims.flat());
  console.log(exp.all_stims)

  exp.trials = [];
  exp.catch_trials = [];
  // exp.condition = {}; //can randomize between subject conditions here
  exp.system = {
      Browser : BrowserDetect.browser,
      OS : BrowserDetect.OS,
      screenH: screen.height,
      screenUH: exp.height,
      screenW: screen.width,
      screenUW: exp.width
    };
  //blocks of the experiment:
  exp.structure=["bot","i0","instructions","sampletrial","getready","objecttrial", 'subj_info', 'thanks'];
  // 
  exp.data_trials = [];
  //make corresponding slides:
  exp.slides = make_slides(exp);

  // MANUALLY CHANGE THE PROGRESS BAR

  exp.nQs = utils.get_exp_length(); //this does not work if there are stacks of stims (but does work for an experiment with this structure)
                    //relies on structure and slides being defined
  $(".nQs").html(exp.nQs);

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

  exp.go(); //show first slide
}

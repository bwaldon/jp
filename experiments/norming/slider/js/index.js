//https://www.ncbi.nlm.nih.gov/pmc/articles/doi/10.3389/fpsyg.2014.00399/full// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!

var promptData = {

  "typicality": {
    "detail" : "In this experiment, you'll see images of objects and determine whether or not particular words can be used to name the object.",
    'giveItATry' : "Give it a try! Use the slider below to indicate your judgment. Use the endpoints of the slider to indicate maximal certainty of your answer. \
    Use intermediate points to indicate uncertainty.",
    'leftend' : 'Definitely not.',
    'rightend' : 'Definitely yes.',
    "exampleQ1" : "Is this object a book?",
    "exampleImage1" : "book.jpg",
    "example1Error" : "Are you sure? This seems like a pretty uncontroversial example of a book.",
    "exampleQ2" : "Is this object a water bottle?",
    "exampleImage2" : "bonfire.jpg",
    "example2Error" : "Are you sure? This doesn't look like any water bottle we've seen before.",
    "estimatedLength" : 10
  },

  "featureAttribution": {
    "detail" : "In this experiment, you'll see images of objects and determine whether or not the objects exhibit particular qualities.",
    'giveItATry' : "Give it a try! Use the slider below to indicate your judgment. Use the endpoints of the slider to indicate maximal certainty of your answer. \
    Use intermediate points to indicate uncertainty.",
    'leftend' : 'Definitely not.',
    'rightend' : 'Definitely yes.',
    "exampleQ1" : "Does this object exhibit the following quality? <br> <b>Able to be read.</b>",
    "exampleImage1" : "book.jpg",
    "example1Error" : "Are you sure? This seems like a pretty uncontroversial example of something that one can read.",
    "exampleQ2" : "Does this object exhibit the following quality? <br> <b>Consumable as food.</b>",
    "exampleImage2" : "bonfire.jpg",
    "example2Error" : "Are you sure? We've never heard of anyone eating a bonfire before.",
    "estimatedLength" : 10
  },

  "rulePlausibility": {
    "detail" : "In this experiment, you'll read hypothetical rules and determine whether or not the rules are plausible.",
    'giveItATry' : "Give it a try! Use the slider below to indicate your judgment. Use the endpoints of the slider to indicate maximal certainty of your answer. \
    Use intermediate points to indicate uncertainty.",
    'leftend' : 'Highly implausible.',
    'rightend' : 'Highly plausible.',
    "exampleQ1" : "<i>How plausible do you think it is that the following rule would apply <u> in a library</u>?</i> <br> <b>No smoking in the library.</b>",
    "exampleImage1" : "",
    "example1Error" : "Are you sure? This seems like a pretty common rule that one might encounter in a library.",
    "exampleQ2" : "<i>How plausible do you think it is that the following rule would apply <u> on a commercial airplane</u>?</i> <br> <b>Passengers must bring a newspaper in order to board the plane.</b>",
    "exampleImage2" : "",
    "example2Error" : "Are you sure? We find it pretty unlikely that an airline would impose this kind of requirement on passengers.",
    "briefDetail" : "In this study, you'll read short passages of text and provide your judgments about them. The study should take roughly 3 minutes to complete. Please pay attention, and thanks for participating!"
  }, 

  "goalPlausibility": {
    "detail" : "In this experiment, you'll read about the goals of hypothetical people and determine whether or not issuing particular rules are plausible means to achieve those goals.",
    'giveItATry' : "Give it a try! Use the slider below to indicate your judgment. Use the endpoints of the slider to indicate maximal certainty of your answer. \
    Use intermediate points to indicate uncertainty.",
    'leftend' : 'Highly implausible.',
    'rightend' : 'Highly plausible.',
    "exampleQ1" : "<i>How plausible do you think it is that the following rule would apply <u> in a library</u>?</i> <br> <b>No smoking in the library.</b>",
    "exampleImage1" : "",
    "example1Error" : "Are you sure? This seems like a pretty common rule that one might encounter in a library.",
    "exampleQ2" : "<i>How plausible do you think it is that the following rule would apply <u> on a commercial airplane?</u></i> <br> <b>Passengers must bring a newspaper in order to board the plane.</b>",
    "exampleImage2" : "",
    "example2Error" : "Are you sure? We find it pretty unlikely that an airline would impose this kind of requirement on passengers.",
    "estimatedLength" : 2
  }, 

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

  slides.consent = slide({
     name : "consent",
     start: function() {
      $("#briefDetail").html(promptData[exp.condition]["briefDetail"]);
      exp.startT = Date.now();
     },
     button : function() {
      exp.go(); 
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
      $("#detail").html(promptData[exp.condition]["detail"]);
      $("#exampleQ1").html(promptData[exp.condition]["exampleQ1"]);
      if(["featureAttribution", "typicality"].includes(exp.condition)) {
        $("#exampleImage1").html("<img width = '225px' src = 'shared/images/" + promptData[exp.condition]["exampleImage1"] + "'><br>")
      } else {
        $("#exampleImage1").html("<br>")
      }
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
    $(".progress").hide();

    this.init_sliders();
    exp.sliderPost = null;
  
    this.stim = stim;
    console.log(this.stim);

    let contextsentence;
    let objimagehtml;
    let header;
    var giveItATry = promptData[exp.condition]["giveItATry"]
    var leftend = promptData[exp.condition]["leftend"]
    var rightend = promptData[exp.condition]["rightend"]

    if(stim == 'example1') {
      contextsentence = promptData[exp.condition]["exampleQ1"];
      header = "Example 1 of 2"; {
        if(["featureAttribution", "typicality"].includes(exp.condition)) {
          objimagehtml = "<img width = '225px' src = 'shared/images/" + promptData[exp.condition]["exampleImage1"] + "'>";
        }
      }
    } else if(stim == 'example2') {
      contextsentence = promptData[exp.condition]["exampleQ2"];
      header = "Example 2 of 2";
      if(["featureAttribution", "typicality"].includes(exp.condition)) {
          objimagehtml = "<img width = '225px' src = 'shared/images/" + promptData[exp.condition]["exampleImage2"] + "'>";
        }
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
      $("#err").html(promptData[exp.condition]["example1Error"]);
      exp.errors.push('example1')
     } else if (this.stim == 'example2' & exp.sliderPost >= 0.5) {
      $("#err").html(promptData[exp.condition]["example2Error"]);
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
    $(".progress").show();

    this.init_sliders();
    exp.sliderPost = null;
  
    this.stim = stim;
    console.log(this.stim);

    let contextsentence;
    let objimagehtml;

    if(exp.condition == "typicality") {

      contextsentence =  "Is this object " + stim.np_typicalityQuestion + "?"
      objimagehtml = '<img src="../../shared/scenes/' + stim.scene + '/images/' + stim.object + '.jpg" style="height:330px;">';

    } else if(exp.condition == "featureAttribution") {

      which_characteristic = Math.floor(Math.random() * 3) + 1
      if(which_characteristic == 1) {
        characteristic = stim.characteristic1
        characteristic_id = stim.goal1_id
        goal = "goal1"
      } else if(which_characteristic == 2) {
        characteristic = stim.characteristic2
        characteristic_id = stim.goal2_id
        goal = "goal2"
      } else if(which_characteristic == 3) {
        characteristic = stim.characteristic3
        characteristic_id = stim.goal3_id
        goal = "goal3"
      }
      console.log(goal)
      contextsentence = "Does this object exhibit the following quality? <br><br> <b>" + characteristic + "</b>"
      objimagehtml = '<img src="../../shared/scenes/' + stim.scene + '/images/' + stim.object + '.jpg" style="height:330px;">';

    } else if(exp.condition == "rulePlausibility") {
      contextsentence = "<br><i> How plausible do you think it is that the following rule would apply <u>" + stim.pp + "</u>?</i> <br><br> <b>" + stim.ruleRendered + "</b>"

    }


    $("#header").html("")
    $("#giveItATry").html("")
    $("#contextsentence").html(contextsentence);
    $("#objectimage").html(objimagehtml);
    $("#leftend").html(promptData[exp.condition].leftend);
    $("#rightend").html(promptData[exp.condition].rightend);
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
          "scene" : this.stim.scene,
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
        problems: $("#problems").val(),
        fairprice: $("#fairprice").val()
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

  var trialArray = [];

  console.log(exp.condition)

  if(["featureAttribution", "typicality"].includes(exp.condition)) {
    for(s of scenes) {
      console.log(s.objects)
      s.objects.map(function(object) { 
        let trialAttributes = Object.assign({}, attributes.filter(a => a.scene == s.scene)[0]);
        trialAttributes['object'] = object;
        trialArray.push(trialAttributes);
      })
    }
  } else if(["rulePlausibility","goalPlausibility"].includes(exp.condition)) {
    for(s of scenes) {
      let cond = _.sample(["main","distractor"])
      let trialAttributes = Object.assign({}, attributes.filter(a => a.scene == s.scene)[0]);
      if(cond == "main") {
        trialAttributes['ruleRendered'] = trialAttributes['rule'].replace('[NP]', trialAttributes['np'])
      } else if (cond == "distractor") { 
        trialAttributes['ruleRendered'] = trialAttributes['rule'].replace('[NP]', trialAttributes['np_distractor'])
      }
      trialArray.push(trialAttributes);
    }
  }

if(["featureAttribution", "typicality"].includes(exp.condition)) {
  exp.all_stims = _.shuffle(trialArray.slice(1,91));
 } else {
  exp.all_stims = _.shuffle(trialArray)
 }
 
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
  exp.structure=["bot","consent","instructions","sampletrial","getready","objecttrial", 'subj_info', 'thanks'];
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

//https://www.ncbi.nlm.nih.gov/pmc/articles/doi/10.3389/fpsyg.2014.00399/full// Returns a random integer between min (included) and max (excluded)
// Using Math.round() will give you a non-uniform distribution!

var promptData = {

  "typicality": {
    "detail" : "In this experiment, you'll see images of objects and determine whether or not particular words can be used to name the object.",
    'giveItATry' : "Give it a try! Use the slider below to indicate your judgment. Use the endpoints of the slider to indicate maximal certainty of your answer. \
    Use intermediate points to indicate uncertainty.",
    'leftend' : 'Definitely not.',
    'rightend' : 'Definitely yes.',
    "exampleQ1" : "<br><center> Is this object a book? </center>",
    "exampleImage1" : "book.jpg",
    "example1Error" : "Are you sure? This seems like a pretty uncontroversial example of a book.",
    "exampleQ2" : "<center> Is this object a water bottle? </center>",
    "exampleImage2" : "bonfire.jpg",
    "example2Error" : "Are you sure? This doesn't look like any water bottle we've seen before.",
    "briefDetail" : "In this study, you'll see images on the screen and provide judgments about those images. The study should take roughly 7 minutes to complete. Please pay attention, and thanks for participating!"
  },

  "featureAttribution": {
    "detail" : "In this experiment, you'll see images of objects and determine whether or not the objects exhibit particular qualities.",
    'giveItATry' : "Give it a try! Use the slider below to indicate your judgment. Use the endpoints of the slider to indicate maximal certainty of your answer. \
    Use intermediate points to indicate uncertainty.",
    'leftend' : 'Definitely not.',
    'rightend' : 'Definitely yes.',
    "exampleQ1" : "<center>Does this object exhibit the following quality? <br> <b>Able to be read.</b></center>",
    "exampleImage1" : "book.jpg",
    "example1Error" : "Are you sure? This seems like a pretty uncontroversial example of something that one can read.",
    "exampleQ2" : "<center>Does this object exhibit the following quality? <br> <b>Consumable as food.</b></center>",
    "exampleImage2" : "bonfire.jpg",
    "example2Error" : "Are you sure? We've never heard of anyone eating a bonfire before.",
    "briefDetail" : "In this study, you'll see images on the screen and provide judgments about those images. The study should take roughly 8 minutes to complete. Please pay attention, and thanks for participating!"
  },

  "rulePlausibility": {
    "detail" : "In this experiment, you'll read hypothetical rules and determine whether or not the rules are plausible.",
    'giveItATry' : "Give it a try! Use the slider below to indicate your judgment. Use the endpoints of the slider to indicate maximal certainty of your answer. \
    Use intermediate points to indicate uncertainty.",
    'leftend' : 'Highly implausible.',
    'rightend' : 'Highly plausible.',
    "exampleQ1" : "<i>How plausible do you think it is that the following rule would apply <u> in a library</u>?</i> <br><br> <b>No smoking in the library.</b>",
    "exampleImage1" : "",
    "example1Error" : "Are you sure? This seems like a pretty common rule that one might encounter in a library.",
    "exampleQ2" : "<i>How plausible do you think it is that the following rule would apply <u> on a commercial airplane</u>?</i> <br><br> <b>Passengers must bring a newspaper in order to board the plane.</b>",
    "exampleImage2" : "",
    "example2Error" : "Are you sure? We find it pretty unlikely that an airline would impose this kind of requirement on passengers.",
    "briefDetail" : "In this study, you'll read short passages of text and provide your judgments about them. The study should take roughly 3 minutes to complete. Please pay attention, and thanks for participating!"
  }, 

  "goalPlausibility": {
    "detail" : "In this experiment, you'll read hypothetical scenarios in which rules are issued in light of particular motivations. You'll judge whether or not it made sense to issue <u>the rule</u> (shown underlined) given <b>the motivation</b> (shown in bold).",
    'giveItATry' : "Give it a try! Use the slider below to indicate your judgment. Use the endpoints of the slider to indicate maximal certainty of your answer. \
    Use intermediate points to indicate uncertainty.",
    'leftend' : 'Highly implausible.',
    'rightend' : 'Highly plausible.',
    "exampleQ1" : "<b>The librarians in a public library are concerned about patrons breathing in secondhand smoke.</b> <br> <br> How plausible is it that <b>the motivation</b> above could have given rise to <u>the rule</u> below? <br> <br> <u>No smoking in the library.</u> <br>",
    "exampleImage1" : "",
    "example1Error" : "Are you sure? Secondhand smoke seems like a pretty common reason to ban smoking from public places.",
    "exampleQ2" : "<b>The executives of a large airline are worried about passengers getting injured during periods of extreme turbulence on flights. </b> <br> <br> How plausible is it that <b>the motivation</b> above could have given rise to <u>the rule</u> below? <br> <br> <u>No newspapers are allowed on any flights.</u> <br>",
    "exampleImage2" : "",
    "example2Error" : "Are you sure? This seems like a fairly odd rule to have issued, if passenger safety indeed were the executives' concern.",
    // EDITED TIME FOR THE SECOND ROUND OF NORMING
    "briefDetail" : "In this study, you'll read short passages of text and provide your judgments about them. The study should take roughly 2 minutes to complete. Please pay attention, and thanks for participating!"
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
        $("#exampleImage1").html("<center><img src = 'shared/images/" + promptData[exp.condition]["exampleImage1"] + "' style='height:225px;border:1px solid black'><br></center><br>")
      } else {
        $("#exampleImage1").html("")
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
          objimagehtml = "<center><img src = 'shared/images/" + promptData[exp.condition]["exampleImage1"] + "' style='height:225px;border:1px solid black'></center>";
          contextsentence = "<center><br>"+contextsentence+"</center>";
        }
      }
    } else if(stim == 'example2') {
      contextsentence = promptData[exp.condition]["exampleQ2"];
      header = "Example 2 of 2";
      if(["featureAttribution", "typicality"].includes(exp.condition)) {
          objimagehtml = "<center><img src = 'shared/images/" + promptData[exp.condition]["exampleImage2"] + "' style='height:225px;border:1px solid black'></center>";
          contextsentence = "<center><br>"+contextsentence+"</center>";
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
          "isExample" : "true",
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

      contextsentence =  "<br> <br> <center> Is this object " + stim.np_typicalityQuestion + "? </center>"
      objimagehtml = '<center><img src="../../shared/scenes/' + stim.scene + '/images/' + stim.object + '.jpg" style="height:250px;border:1px solid black"></center>';

    } else if(exp.condition == "featureAttribution" || exp.condition == "goalPlausibility") {
      which_characteristic = Math.floor(Math.random() * 3) + 1
      if(which_characteristic == 1) {
        this.stim.characteristic = stim.characteristic1
        this.stim.characteristic_id = stim.goal1_id
        this.stim.goal_id = "goal1"
        this.stim.goal = stim.goal1
      } else if(which_characteristic == 2) {
        this.stim.characteristic = stim.characteristic2
        this.stim.characteristic_id = stim.goal2_id
        this.stim.goal_id = "goal2"
        this.stim.goal = stim.goal2
      } else if(which_characteristic == 3) {
        this.stim.characteristic = stim.characteristic3
        this.stim.characteristic_id = stim.goal3_id
        this.stim.goal_id = "goal3"
        this.stim.goal = stim.goal3
      }
      if(exp.condition == "goalPlausibility") {
        contextsentence = "<b>" + this.stim.goal + "</b> <br> <br> How plausible is it that <b>the motivation</b> above could have given rise to <u>the rule</u> below? <br> <br> <u>" + this.stim.ruleRendered + "</u> <br>"
      } else {
        contextsentence = "<br><center>Does this object exhibit the following quality? <br> <b>" + stim.characteristic + "</b></center>"
        objimagehtml = '<center><img src="../../shared/scenes/' + stim.scene + '/images/' + stim.object + '.jpg" style="height:330px;"></center>';
      }

    } else if(exp.condition == "rulePlausibility") {
      contextsentence = "<i> How plausible do you think it is that the following rule would apply <u>" + stim.pp + "</u>?</i> <br><br> <b>" + stim.ruleRendered + "</b>"
    
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
          "isExample" : "false",
          "slide_number_in_experiment" : exp.phase,
          // these could have been named more intuitively
          "goal" : this.stim.goal,
          "goal_number" : this.stim.goal_id,
          "goal_id" : this.stim.characteristic_id,
          "ruleType" : this.stim.ruleType,
          "ruleRendered" : this.stim.ruleRendered,
          "utterance": this.stim.item,
          "object": this.stim.object,
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
        fairprice: $("#fairprice").val(),
        "errors" : exp.errors,
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
      // setTimeout(function() {turk.submit(exp.data);}, 1000);
      proliferate.submit(exp.data);
    }
  });

  return slides;
}

/// init ///
function init() {

  $.when(

    $.getJSON('https://sheets.googleapis.com/v4/spreadsheets/1OzEjOglpjCT4dDG9_Uk81m_GM-TRIPTrMN1DJ-JCoY8/values/Sheet1?key=AIzaSyBs7D7BF5KR0ei108MlHg92S7N22cxB9O8')
    //$.getJSON('https://sheets.googleapis.com/v4/spreadsheets/1poLYv5YxvXTJO9GgrPNYzetf7BfUA2KXdfIYcqzxdrI/values/Sheet1?key=AIzaSyBs7D7BF5KR0ei108MlHg92S7N22cxB9O8')

  ).done( function(json) {
    function convertToObjects(headers, rows)
    {
      return rows.reduce((ctx, row) => {
        ctx.objects.push(ctx.headers.reduce((item, header, index) => {
          item[header] = row[index];
          return item;
        }, {}));
        return ctx;
      }, { objects: [], headers}).objects;
    }

    // TURN OFF BELOW LINE FOR FULL-LIST NORMING:
    // scenes = scenes.filter(a => ["outsidebags","pets"].includes(a.scene))

    var attributes = convertToObjects(json.values[0],json.values.slice(1))

    exp.errors = [];
    exp.condition = location.search.slice(1).split("?")[0].split("=")[1]

    var trialArray = [];

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
      // EDITED FOR ROUND 2 NORMING
      var condArray = _.shuffle(["main","main","main","main","main","main","distractor","distractor","distractor","distractor","distractor","distractor"])
      // var condArray = _.shuffle(["main","distractor"])
      for(s of scenes) {
        let cond = condArray.pop();
        let trialAttributes = Object.assign({}, attributes.filter(a => a.scene == s.scene)[0]);
        if(cond == "main") {
          trialAttributes['ruleRendered'] = trialAttributes['rule'].replace('[NP]', trialAttributes['np'])
        } else if (cond == "distractor" && exp.condition == "rulePlausibility") { 
          trialAttributes['ruleRendered'] = trialAttributes['rule'].replace('[NP]', trialAttributes['np_distractor'])
        } else if (cond == "distractor" && exp.condition == "goalPlausibility") { 
          trialAttributes['ruleRendered'] = trialAttributes['np_distractor2']
        } 
        trialAttributes['ruleType'] = cond;
        trialArray.push(trialAttributes);
      }
    }

    if(["featureAttribution", "typicality"].includes(exp.condition)) {
      exp.all_stims = _.shuffle(trialArray).slice(0,72);
    } else {
      exp.all_stims = _.shuffle(trialArray).slice(0,72)
    }

    // console.log(exp.all_stims)

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

    exp.data_trials = [];

    exp.slides = make_slides(exp);

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
  //show first slide
    exp.go();

  });
     
}

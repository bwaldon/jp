import Empirica from "meteor/empirica:core";
// import "./bots.js";
import "./callbacks.js";
import * as sceneAttributes from "./scene-attributes.json"
const fs = require('fs');

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.

// console.log(process.cwd())

Empirica.gameInit(game => {
  game.players.forEach((player, i) => {
    player.set("avatar", `/avatars/jdenticon/${player._id}`);
    player.set("score", 0);
  });

  const scenes = _.shuffle(["vehicles","pets"])
  const gameLength = scenes.length

  scenes.map(i => {
    
    let scene = i;
    const attributes = sceneAttributes[scene];
    
    // for this manipulation, observers and selectors have same image order:
    const imageOrder = _.shuffle(attributes.objects)

    const round = game.addRound({
      data: {
        name: scene,
        objects: attributes.objects,
        rule : attributes.rule,
        observerObjects: imageOrder,
        selectorObjects: imageOrder,
        goal: _.sample(attributes.goals),
        selections: new Array(),
        attncheckimages: attributes.attncheckimages
      }
    });
    round.addStage({
      name: "instructions",
      displayName: "Instructions",
      durationInSeconds: 120,
    });
    round.addStage({
      name: "response",
      displayName: "Task",
      durationInSeconds: 600,
    });
    // round.addStage({
    //   name: "feedback",
    //   displayName: "Summary",
    //   durationInSeconds: 8,
    // });
    round.addStage({
      name: "attncheck",
      displayName: "Attention Check",
      durationInSeconds: 30,
    });
  });

  game.set('length', gameLength)

});

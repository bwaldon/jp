import React from "react";
import PlayerProfile from "./PlayerProfile.jsx";
import SocialExposure from "./SocialExposure.jsx";
import Task from "./Task.jsx";
import Feedback from "./Feedback.jsx";
import RoundInstructions from "./RoundInstructions.jsx"
import AttnCheck from "./AttnCheck.jsx"

export default class Round extends React.Component {

  componentDidMount() {
    const { round, player } = this.props;
    player.get('role') === "observer" ? player.set('name', "Observer") : player.set('name', "Selector") 


  }

  render() {
    const { round, stage, player, game } = this.props;
    const view = stage.name === "response" ? <Task game={game} round={round} stage={stage} player={player} /> : stage.name === "attncheck" ? <AttnCheck game={game} round={round} stage={stage} player={player} /> : <RoundInstructions game={game} round={round} stage={stage} player={player} />
    //stage.name === "feedback" ? <Feedback game={game} round={round} stage={stage} player={player} /> :
    return (
      <div className="round">
    
        <div className="content" style = {{alignItems: 'center'}} >

          <PlayerProfile player={player} stage={stage} game={game} round = {round} />

          <div className = "view" style = {{display: 'inline-block'}}> {view} </div>

        </div>
      </div>
    );
  }
}


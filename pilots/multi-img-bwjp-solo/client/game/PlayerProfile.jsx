import React from "react";
import { Chat } from "@empirica/chat";
import Timer from "./Timer.jsx";

export default class PlayerProfile extends React.Component {

  constructor(props) {
    super(props);
    const { round } = this.props;
    this.updateChat = this.updateChat.bind(this)
  }
  

  updateChat(msg) {

    const { stage, round, player } = this.props;
    let chatLog = round.get('chatLog') || new Array();
    chatLog.push(msg)
    console.log(chatLog)
    round.set('chatLog', chatLog)
    if(msg.player._id !== player.get('id')){
      msg.player.name = "Your partner"
    }
    return(msg)

  }

  render() {
    const { stage, round, player } = this.props;

    let chatHeader;

    // if(player.get('role') === "observer") {
    //   chatHeader = <p> <font color = "red"> Your partner </font> controls the selections this round. </p>
    // } else {
    //   chatHeader = <p> <font color = "red"> You </font> control the selections this round. </p>
    // }

    let chatWindow;

    // if(stage.name === "response") {
    //   chatWindow = <div style = {{overflow: "scroll", height: '300px', border: '1px solid #333333'}}> <Chat player={player} scope={round} customKey="gameChat" onNewMessage={this.updateChat} /> </div>;
    // } 

    // if(stage.name !== "response") {
    //   chatHeader = null;
    // }

    let timer; 

    if(stage.name === "attncheck") {
      timer = <Timer stage={stage} />
    } 

    return (
      <aside className="player-profile">
        <div style = {{align: 'center', "text-align" : 'center'}}> <h4> {chatHeader} </h4></div>
        
        {chatWindow}

        {timer}

      </aside>
    );
  }
}



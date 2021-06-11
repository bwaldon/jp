import React from "react";

import { Centered } from "meteor/empirica:core";

export default class InstructionStepTwo extends React.Component {
  render() {
    const { hasPrev, hasNext, onNext, onPrev } = this.props;
    return (
      <Centered>
        <div className="instructions">
          <h1> Game instructions (part 2 of 2) </h1>
          <p>
            <b>Nice work!</b>
          </p>

          {/*<p>
            In the actual game, you'll be paired with a live partner with whom you'll have to communicate before making selections. You'll be able to talk to your partner using a chat window. For example:
          </p>*/}

          {/*<center>
          <img src = "examplechat.png" width = "200px" />
          </center>*/}


         {/* <p> 
          You and your partner will take turns controlling the object selections. When it's your turn to control selections, you'll indicate your choices by clicking on the objects as you did on the previous screen. When your partner is in control, you'll be able to see their selections in real time as you talk about which objects to choose on that round.
          </p>*/}


          You will play two rounds of the actual game. Every round is preceded by a brief introduction to the rule and is followed by an <font color = "red"> attention check</font>, in which you’ll be asked to identify an object that appeared in the round.


          <p>
            <button type="button" onClick={onPrev} disabled={!hasPrev}>
              Previous
            </button>
            <button type="button" onClick={onNext}>{/* disabled={!hasNext}>*/}
              Start game
            </button>
          </p>
        </div>
      </Centered>
    );
  }
}

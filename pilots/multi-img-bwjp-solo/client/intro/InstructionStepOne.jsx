import React from "react";
import Image from "../game/Image.jsx";

import { Centered } from "meteor/empirica:core";

export default class InstructionStepOne extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selected: [], error: "" };
    this.handleChange = this.handleChange.bind(this);
    this.onNextVerify = this.onNextVerify.bind(this);
  }

  handleChange(e) {
    let selectionSet = this.state.selected
    if (selectionSet.includes(e.target.id)) {
      selectionSet = selectionSet.filter(x => x !== e.target.id)
    } else {
      selectionSet.push(e.target.id)
    }
    this.setState({ selected: selectionSet });
    // console.log(selectionSet)
  };

  onNextVerify(e) {
    // console.log(this.state.selected.sort())
    const { onNext } = this.props;
    if(this.state.selected.length < 1) {
      this.setState({ error: "Please make at least one selection before proceeding!" });
      return
    }
    // have to JSON strintify because of how array equality works in js
    else if(JSON.stringify(this.state.selected.sort()) != JSON.stringify(["bottle1", "bottle2"])) {
      this.setState({ error: "Are you sure? Make sure you've selected all (and only) the bottles!" });
      return
    } else {
      onNext()
    }
  };

  render() {
    const { hasPrev, hasNext, onPrev, onNext, game } = this.props;

    const onNextVerify = this.onNextVerify;

    const objects = ["bottle1", "distractor1", "distractor2", "bottle2"];

    const error = this.state.error;

    const images = objects.map((object,) => { 
      let path = "/scenes/practice/images/" + object + ".jpg";
      const selections = this.state.selected
      const highlighted = selections.includes(object) ? true : false
      return(<td><Image image={object} path= {path} onClick = {this.handleChange} borderColor = 'green' highlighted = {highlighted} /></td>)})

    return (
      <Centered>
        <div className="instructions">
          <h1> Game instructions (part 1 of 2) </h1>

          <p>
            <b> Please read these instructions carefully! {/*You will have to pass a quiz on how the game works before you can play!*/}</b>
          </p>

          <p>
            In this task, you will read rules of the kind you might see posted in a library, gym, or other public place. For example, the rule could be <i> No bottles on the beach. </i>
          </p>

          <p>
          For each rule, you will be shown a series of objects and will be asked to identify the objects that would violate the rule.
          </p>

          <p>
            Give it a try! Select <u>all</u> (and only) the objects that would violate the rule <i> No bottles on the beach. </i> Indicate your choices by clicking on the objects. (You should see a green border appear around the object when you've selected it). 
          </p>

          <p>
          Then, click "Next" to proceed.
          </p>

          <center>
          <div className="task-stimulus">   
            <table>
              <tr> {images} </tr>
            </table>
          </div>

          <p>
            <button type="button" onClick={onPrev} disabled={!hasPrev}>
              Previous
            </button>
            <button type="button" onClick={this.onNextVerify} disabled={!hasNext}>
              Next
            </button>
          </p>

          <h4>{error}</h4>
          </center>
        </div>
      </Centered>
    );
  }
}

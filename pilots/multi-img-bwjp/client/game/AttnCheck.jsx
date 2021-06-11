import React from "react";
import Image from "../game/Image.jsx";

import { Centered } from "meteor/empirica:core";

export default class AttnCheck extends React.Component {

  constructor(props) {
    super(props);
    this.state = { selected: "NONE", message: "" };
    const { round } = this.props;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.scene = round.get('name')
  }

  handleChange(e) {
    let selection = this.state.selected
    if (selection === e.target.id) {
      selection = "NONE"
    } else {
      selection = e.target.id
    }
    this.setState({ selected: selection });
  };

  handleSubmit(e) {
    const { player } = this.props;
    if(this.state.selected === "NONE") {
      AlertToaster.show({
          message:
            "Please make a selection before proceeding!",
          });
      return
    }
    else {
      player.round.set('attnCheckSelections', this.state.selected);
      this.props.player.stage.submit();
      this.setState({ message: "Waiting for your partner to proceed..." });
    }
  };

  render() {
    const { game, round } = this.props;

    const objects = round.get('attncheckimages');

    const message = this.state.message;

    const images = objects.map((object,) => { 
      let path = "/scenes/" + this.scene + "/attncheckimages/" + object + ".jpg";
      const selection = this.state.selected
      const highlighted = selection === object ? true : false
      return(<td><Image image={object} path= {path} onClick = {this.handleChange} borderColor = 'green' highlighted = {highlighted} /></td>)})

    return (
        <div className="instructions">

          <center>
          <h4><font color = "red"> Attention Check: </font></h4>
          <h4>Only one of these four objects appeared in the last round. Select that object:</h4>
          <div className="task-stimulus">   
            <table>
              <tr> {images} </tr>
            </table>
          </div>

          <p>
            <button type="button" onClick={this.handleSubmit}>
              Continue
            </button>
          </p>

          <h4>{message}</h4>
          </center>
        </div>
    );
  }
}

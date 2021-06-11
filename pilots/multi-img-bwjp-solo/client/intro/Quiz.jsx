import React from "react";

import { Centered, AlertToaster } from "meteor/empirica:core";

import { Radio, RadioGroup } from "@blueprintjs/core";

import { Checkbox } from "@blueprintjs/core";

export default class GroupQuiz extends React.Component {
  state = {
    nParticipants: "",
    selectionControl: "",
    // aftertask: "",
    chat: ""
  };

  componentDidMount() {
    const { game } = this.props;
    document.querySelector("main").scrollTo(0,0)
    this.state.num_players = game.treatment.playerCount;
  }

  handleChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: el.value.trim().toLowerCase() });
  };

  handleRadioChange = (event) => {
    const el = event.currentTarget;
    console.log("el", el);
    console.log("ev", event);
    this.setState({ [el.name]: el.value });
  };

  handleEnabledChange = (event) => {
    const el = event.currentTarget;
    this.setState({ [el.name]: !this.state[el.name] });
  };

  handleSubmit = (event) => {
    event.preventDefault();

    //it should be this.state.nParticipants !== "3" but we don't have "treatment" in QUIZ
    if (
      this.state.nParticipants !== "2" ||
      this.state.selectionControl !== "turns" ||
      // this.state.aftertask !== "attncheck" ||
      this.state.chat !== "during") {
      AlertToaster.show({
        message:
          "Sorry, you have one or more mistakes. Please ensure that you answer the questions correctly, or go back to the instructions.",
      });
    } else {
      this.props.onNext();
    }
  };

  render() {
    const { hasPrev, onPrev, game, treatment } = this.props;
    return (
      <Centered>
        <div className="quiz">
          <h1 className={"bp3-heading"}> Quiz </h1>
          <form onSubmit={this.handleSubmit}>
      

            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  label="You will be playing this game:"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.nParticipants}
                  name="nParticipants"
                  required
                >
                  <Radio
                    label="Alone."
                    value= "1"
                  />
                  <Radio
                    label="With a partner."
                    value= "2"
                  />
                </RadioGroup>
              </div>
            </div>

            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  label="Select the true statement about selecting objects on the screen:"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.selectionControl}
                  name="selectionControl"
                  required
                >
                  <Radio
                    label="You and a partner will take turns controlling object selection."
                    value="turns"
                  />
                  <Radio
                    label="You have been chosen to control object selection every time."
                    value="noturns"
                  />
                </RadioGroup>
              </div>
            </div>

{/*{            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  label="In each round, what happens after selecting objects?"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.aftertask}
                  name="aftertask"
                  required
                >
                  <Radio
                    label="You'll be asked to recall the rule featured on that round."
                    value="attncheck"
                  />
                  <Radio
                    label="You'll go on immediately to the next round."
                    value="noattn"
                  />
                </RadioGroup>
              </div>
            </div>
}*/}
            <div className="bp3-form-group">
              <div className="bp3-form-content">
                <RadioGroup
                  label="Why have we included a chat window?"
                  onChange={this.handleRadioChange}
                  selectedValue={this.state.chat}
                  name="chat"
                  required
                >
                  <Radio
                    label="To communicate with an automated bot during the game."
                    value="before"
                  />
                  <Radio
                    label="To communicate with a live partner during the game."
                    value="during"
                  />
                </RadioGroup>
              </div>
            </div>
          
            <button
              type="button"
              className="bp3-button bp3-intent-nope bp3-icon-double-chevron-left"
              onClick={onPrev}
              disabled={!hasPrev}
            >
              Back to instructions
            </button>
            <button type="submit" className="bp3-button bp3-intent-primary">
              Submit
              <span className="bp3-icon-standard bp3-icon-key-enter bp3-align-right" />
            </button>
          </form>
        </div>
      </Centered>
    );
  }
}
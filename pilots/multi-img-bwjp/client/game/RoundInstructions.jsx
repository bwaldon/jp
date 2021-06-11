import React from "react";

export default class RoundInstructions extends React.Component {

	constructor(props) {
		super(props);
		this.state = { waitmessage: "" };
	}

	handleSubmit = event => {
    this.props.player.stage.submit();
    this.setState({waitmessage: "Waiting for your partner to proceed..."})
  	};

	render() {
		const { round, player } = this.props;
		const playerInstructions = player.get('role') === "selector" ? <div> In this round, <font color = "red"> you </font> will select the objects that violate the rule. </div> : <div> In this round, <font color = "red"> your partner </font> will select the objects that violate the rule. </div>

		return (
			<div className="task">
			<center>
			<h3> <font color = "#ff8c00"> {round.get('goal').text} </font> </h3>
			<h3> {round.get('goal').continuation} </h3>
			<h2> {round.get('rule')} </h2>
			<h3> {playerInstructions} </h3>
			<center><h4> Work together with your partner to identify the violations! </h4> </center>
			<button onClick={this.handleSubmit} >Go to the task</button>
			<h4> {this.state.waitmessage} </h4>
			</center>
			</div>
			);
	}

}


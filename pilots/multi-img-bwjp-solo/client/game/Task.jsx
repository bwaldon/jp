import React from "react";
import Image from "./Image.jsx";
import { AlertToaster } from "meteor/empirica:core";

export default class Task extends React.Component {

	render() {
		const { round, stage, player } = this.props;
		const TaskView = player.get('role') === "selector" ? <SelectionTask {...this.props} /> : <ObservationTask {...this.props} />
		return (
			<div className="task">
			<center><h4> <font color = "#ff8c00"> {round.get('goal').text} </font></h4></center>
			<center><h4> {round.get('goal').continuation} </h4></center>
			<center><h2> {round.get('rule')} </h2></center>
			{<center><h4> Identify the violations! </h4> </center>}
			{TaskView}
			</div>
			);
	}

}

class SelectionTask extends React.Component {

	constructor(props) {
		super(props);
		const { round } = this.props;
		this.sceneName = round.get('name');
		this.state = { selected: round.get('selections') };
		this.handleChange = this.handleChange.bind(this);
		this.handleSubmit = this.handleSubmit.bind(this);
		this.objects = round.get("selectorObjects")	
	}

	handleSubmit(e) {
		e.preventDefault();
		const { round } = this.props;
		// const chatLog = round.get('chatLog') || new Array();
		// const selectorFilteredLog = chatLog.filter((msg) => msg.player.name === "Selector");
		// const observerFilteredLog = chatLog.filter((msg) => msg.player.name === "Observer");

		if(this.state.selected.length === 0) {
			AlertToaster.show({
        	message:
          	"Please select at least one image before proceeding!",
      		});
			return
		 } 
		// else if (selectorFilteredLog.length === 0 || observerFilteredLog.length === 0) {
		// 	AlertToaster.show({
  //       	message:
  //         	"Use the chat to make sure you and your partner agree before you submit!",
  //     		});
		// 	return
		// } 
		else {
			round.set('selections', this.state.selected )
			this.props.player.stage.submit();
		}

	};

	handleChange(e) {
		const { round } = this.props;
		let selectionSet = this.state.selected
		if (selectionSet.includes(e.target.id)) {
			selectionSet = selectionSet.filter(x => x !== e.target.id)
		} else {
			selectionSet.push(e.target.id)
		}
		this.setState({ selected: selectionSet });
		round.set('selections', selectionSet )	
	};

	render() {

		const { round, stage, player } = this.props;
		const images = this.objects.map((object,) => { 
			let path = "/scenes/" + this.sceneName + "/images/" + object + ".jpg";
			const highlighted = this.state.selected.includes(object) ? true : false
			return(<td><Image image={object} path= {path} onClick = {this.handleChange} borderColor = 'green' highlighted = {highlighted} /> </td>)})
		
		return (
			<div className="task-stimulus">
				<table>
				<tr> {images.slice(0,4)} </tr>
				<tr> {images.slice(4,8)} </tr>
				<tr> {images.slice(8,12)} </tr>
				<tr><th colspan="4" style = {{textAlign: "center"}}><button onClick={this.handleSubmit}>Submit</button></th></tr>
				{/*<tr><th colspan="4" style = {{textAlign: "center"}}><h4> {round.get('error')} </h4></th></tr>*/}
				</table>	
			</div>
			);
	}
}

class ObservationTask extends React.Component {

	// We 'submit' for the speaker upon loading the component, as there's no response to wait for.
	componentDidMount() {
		this.props.player.stage.submit()
	}

	constructor(props) {
		super(props);
		const { round } = this.props;
		this.sceneName = round.get('name');
		this.objects = round.get("observerObjects")
	}

	render() {

		const { round, stage, player } = this.props;
		const images = this.objects.map((object,) => { 
			let path = "/scenes/" + this.sceneName + "/images/" + object + ".jpg";
			const selections = round.get('selections') === undefined ? new Array() : round.get('selections')
			const highlighted = selections.includes(object) ? true : false
			return(<td><Image image={object} path= {path} onClick = {this.handleChange} borderColor = 'green' highlighted = {highlighted} /></td>)})

		return (
			<div className="task-stimulus">		
				<table>
				<tr> {images.slice(0,4)} </tr>
				<tr> {images.slice(4,8)} </tr>
				<tr> {images.slice(8,12)} </tr>
				</table>
			</div>
			);

	}

}
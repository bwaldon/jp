import React from "react";
import Image from "./Image.jsx";

export default class Feedback extends React.Component {

	constructor(props) {
		super(props);
		const { round, player } = this.props;
		this.objects = player.get('role') === 'observer' ? round.get("observerObjects") : round.get("selectorObjects");
		this.sceneName = round.get('name');
	}

	render() {

		const { round, stage, player } = this.props;
		const selections = round.get("selections")
		const role = player.get('role')
		// subject of the feedback message
		const subject = player.get('role') === 'observer' ? 'Your partner' : 'You'

		let feedbackMessage;

		if (selections.length == 0) {
			feedbackMessage = subject + " didn't select any objects!"
		} else {
			feedbackMessage = subject + " selected the highlighted objects."
		}

		const images = this.objects.map((object,) => { 
			let path = "/scenes/" + this.sceneName + "/images/" + object + ".jpg";
			const highlighted = selections.includes(object) ? true : false
			const borderColor = 'green'
			return(<td><Image image={object} path= {path} borderColor = {borderColor} highlighted = {highlighted} /></td>)})
		
		return (
			<div className = "task">
			<div className="task-stimulus">
				<table>
				<tr> {images.slice(0,4)} </tr>
				<tr> {images.slice(4,8)} </tr>
				<tr> {images.slice(8,12)} </tr>
				<tr>
				<th colspan = "4" align ="center">
				<h4> { feedbackMessage } </h4>
				</th>
				</tr>
				</table>
			</div>
			</div>
			);
		
	}
}


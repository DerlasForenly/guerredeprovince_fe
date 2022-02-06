import { connect } from "react-redux";

import typeImg from "../assets/SolarPanel1.png"

function ShortStorage(props) {
  return <div className="short-storage-container col">
		<Resource></Resource>
		<Resource></Resource>
		<Resource></Resource>
		<Resource></Resource>
		<Resource></Resource>
		<Resource></Resource>
		<Resource></Resource>
		<Resource></Resource>
	</div>
}

export default connect(null, null)(ShortStorage)

function Resource(props) {
	return <div className="resource row">
		<img src={typeImg} alt="res"></img>
		<div className="resource-details col">
			<div className="row resource-details-text">
				<label>Electro</label>
				<label className="right">153 543 463 E</label>
			</div>
			<ProgressBar></ProgressBar>
		</div>
	</div>
}

function ProgressBar(props) {
	return <div className="progress-bar-container">
	</div>
}
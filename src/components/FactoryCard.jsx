import { connect } from "react-redux";

import factoryImg from "../assets/default_avatar.jpg"
import typeImg from "../assets/SolarPanel1.png"
import GetSalaryForm from "./GetSalaryForm";
import StartWorkForm from "./StartWorkForm";

function FactoryCard(props) {
  return <div className="factory-card-container col">
		<img src={factoryImg} alt="avatar" className="factory-avatar-in-card"></img>
		<label className="factory-name">Some fucking corporation</label>
		<div className="row">
			<label className="factory-lvl">LVL: 898</label>
			<div><img src={typeImg} alt="type" className="type-icon-in-factory-card"></img></div>
		</div>
		<div className="row">
			<label className="factory-salary-type">100%</label>
			<label className="factory-salary-amount">152 623 e/m</label>
			<div className="resource-type-marker"></div>
		</div>
		{props.busy ? <GetSalaryForm></GetSalaryForm> : <StartWorkForm></StartWorkForm>}
	</div>
}

const mapStateToProps = (state) => {
	return {
		busy: state.auth.user.busy,
	}
}

export default connect(mapStateToProps, null)(FactoryCard)
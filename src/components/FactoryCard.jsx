import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";

import factoryImg from "../assets/default_avatar.jpg"
import typeImg from "../assets/SolarPanel1.png"
import GetSalaryForm from "./GetSalaryForm";
import StartWorkForm from "./StartWorkForm";

function FactoryCard(props) {
	const [job, setJob] = useState({
		id: 1,
		name: "Some fucking corporation",
		lvl: 532,
		salary: "153 462",
		salaryType: "100%",
		avatar: null,
		typeImg: null,
	})

	useEffect(() => {
		setJob(prev => ({...prev}))
	}, [props])

  return <div className="factory-card-container col">
		<img src={factoryImg} alt="avatar" className="factory-avatar-in-card"></img>
		<label className="factory-name">{job.name}</label>
		<div className="row">
			<label className="factory-lvl">LVL: {job.lvl}</label>
			<div><img src={typeImg} alt="type" className="type-icon-in-factory-card"></img></div>
		</div>
		<div className="row">
			<label className="factory-salary-type">{job.salaryType}</label>
			<label className="factory-salary-amount">{job.salary} e/m</label>
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
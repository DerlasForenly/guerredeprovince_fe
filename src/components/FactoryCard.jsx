import { useState } from "react";
import { useEffect } from "react";
import { connect } from "react-redux";
import axios from "axios";

import factoryImg from "../assets/default_avatar.jpg"
import typeImg from "../assets/SolarPanel1.png"
import GetSalaryForm from "./GetSalaryForm";
import StartWorkForm from "./StartWorkForm";

function FactoryCard(props) {
	const [job, setJob] = useState(false)

	useEffect(() => {
		axios({
			method: 'GET',
			url: `${process.env.REACT_APP_API}/api/businesses/${props.job_id}`,
		}).then((response) => {
			console.log(response.data)
			setJob(parseBusinessResponceData(response.data))
		}).catch((error) => {
			console.log(error.message)
		})
	}, [props])

  return job ? <div className="factory-card-container col">
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
	</div> : <div className="factory-card-container col"></div>
}

const mapStateToProps = (state) => {
	return {
		busy: state.auth.user.busy,
		job_id: state.auth.user.job.id
	}
}

export default connect(mapStateToProps, null)(FactoryCard)

function parseBusinessResponceData(data) {
	return {
		name: data.name,
		lvl: 567,
		user_id: data.user_id,
		salaryType: "100%",
		salary: "135 341",
	}
}
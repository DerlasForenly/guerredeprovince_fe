import { useState, useEffect } from "react"
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

import ErrorMessage from "./ErrorMessage";
import { hideErrorMessage, hideLoader, showErrorMessage, showLoader, meAsync } from "../redux/actions";
import { Button, Form, Label, Col } from "../components/Styles";

function GetSalaryForm(props) {
	const [state, setState] = useState({
		minutesLeft: 0,
		loading: true,
	})

	useEffect(() => {
		if (props.action) {
			const start = new Date(props.action.created_at)
			const now = new Date()
			let diff = Math.floor((now.getTime() - start.getTime()) / 1000 / 60)
			diff -= props.action.time

			console.log(diff)

			setState(prev => ({
				...prev,
				loading: false,
				minutesLeft: diff < 0 ? -diff : 0
			}))
		}
	}, [props])

	const submitFullTimeHandler = e => {
		e.preventDefault()

		props.hideErrorMessage()
		props.showLoader()

		axios({
			method: 'POST',
			url: "http://localhost:8000/api/actions/salary",
			headers: {
				Authorization: `Bearer` + Cookies.get('access_token')
			}
		}).then((response) => {
			console.log(response)
			props.meAsync()
		}).catch((error) => {
			if (error.response)
				props.showErrorMessage(error.response.data.message)
		})
	}

	const submitPartTimeHandler = e => {
		e.preventDefaul()

	}

	return state.loading ? <div></div> :
		state.minutesLeft === 0 ? 
		<Form onSubmit={submitFullTimeHandler}>
			<Col>
				<Label>You worked for {props.action.time} minutes</Label>
				{ props.errorMessage ? <ErrorMessage message={props.errorMessage}></ErrorMessage> : <div></div> }
				<Button type="submit">Get salary</Button>
			</Col>
		</Form> :
		<Form onSubmit={submitPartTimeHandler}>
			<Col>
				<Label>{state.minutesLeft} minutes left until the end of the work</Label>
				{ props.errorMessage ? <ErrorMessage message={props.errorMessage}></ErrorMessage> : <div></div> }
				<Button type="submit" disabled>Pick up early</Button>
			</Col>
		</Form>
}

const mapStateToProps = (state) => {
	return {
		action: state.auth.user.action,
		errorMessage: state.auth.errorMessage,
	}
}

const mapDispatchToProps = {
	hideErrorMessage,
	showErrorMessage,
	hideLoader,
	showLoader,
	meAsync,
}

export default connect(mapStateToProps, mapDispatchToProps)(GetSalaryForm)
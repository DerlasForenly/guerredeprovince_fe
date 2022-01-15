import { useState } from "react"
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";

import ErrorMessage from "./ErrorMessage";
import { hideErrorMessage, hideLoader, showErrorMessage, showLoader, meAsync } from "../redux/actions";
import { Button, Form, Input, Row } from "../components/Styles";

function StartWorkForm(props) {
	const [state, setState] = useState({
		minutes: 0,
		hours: 0,
	})

	const changeInputHandler = e => {
		setState(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const submitHandler = e => {
		e.preventDefault()

		axios({
			method: 'POST',
			url: `${process.env.REACT_APP_API}/api/actions/work`,
			data: {
				time: state.minutes
			},
			headers: {
				Authorization: `Bearer` + Cookies.get('access_token')
			}
		}).then((response) => {
			console.log(response.data)
			props.meAsync()
		}).catch((error) => {
			if (error.response)
				props.showErrorMessage(error.response.data.message)
		})
	}

  return <Form onSubmit={submitHandler}>
		<Row>
			<Input
				required
				type="number"
				min="10"
				max="300"
				placeholder="minutes"
				name="minutes"
				onChange={changeInputHandler}
			></Input>
			<Button type="sumbit">Work</Button>
		</Row>
		{ props.errorMessage ? <ErrorMessage message={props.errorMessage}></ErrorMessage> : <div></div> }
	</Form>
}

const mapDispatchToProps = {
	hideErrorMessage,
	showErrorMessage,
	hideLoader,
	showLoader,
	meAsync,
}

const mapStateToProps = (state) => {
	return {
		errorMessage: state.auth.errorMessage,
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(StartWorkForm)

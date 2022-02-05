import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import { signInSync, hideErrorMessage, hideLoader, showErrorMessage, showLoader } from "../redux/actions";
import ErrorMessage from "./ErrorMessage";

const SignIn = (props) => {
  const [state, setState] = useState({
		password: '',
		email: '',
	})

	const navigate = useNavigate()

	const changeInputHandler = e => {
		setState(prev => ({
			...prev,
			[e.target.name]: e.target.value
		}))
	}

	const submitHandler = (e) => {
		e.preventDefault()

		props.hideErrorMessage()
		props.showLoader()

		axios({
			method: 'POST',
			url: `${process.env.REACT_APP_API}/api/auth/login`,
			data: {
				email: state.email,
				password: state.password,
			}
		}).then((response) => {
			console.log(response.data)
			Cookies.set('access_token', response.data.access_token)
			props.signInSync(response.data)
			props.hideLoader()

			navigate('/home')
		}).catch((error) => {
			props.showErrorMessage(error.message)
		})
	}

	return <form onSubmit={submitHandler}>
		<input
			required
			type="email"
			placeholder="email"
			name="email"
			onChange={changeInputHandler}
		></input>
		<input
			required
			type="password"
			placeholder="password"
			name="password"
			onChange={changeInputHandler}
		></input>
		{ props.errorMessage ? <ErrorMessage message={props.errorMessage}></ErrorMessage> : <div></div> }
		<button type="submit">Sign In</button>
	</form>
}

const mapDispatchToProps = {
	signInSync,
	hideErrorMessage,
	showErrorMessage,
	hideLoader,
	showLoader,
}

const mapStateToProps = state => ({
	errorMessage: state.auth.errorMessage,
})

export default connect(mapStateToProps, mapDispatchToProps)(SignIn)

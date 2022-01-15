import { useState } from "react";
import { useNavigate } from "react-router-dom"
import { connect } from "react-redux";
import axios from "axios";
import Cookies from "js-cookie";
import styled from 'styled-components';
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

	return <Form onSubmit={submitHandler}>
		<Input
			type="email"
			placeholder="email"
			name="email"
			onChange={changeInputHandler}
		></Input>
		<Input
			type="password"
			placeholder="password"
			name="password"
			onChange={changeInputHandler}
		></Input>
		{ props.errorMessage ? <ErrorMessage message={props.errorMessage}></ErrorMessage> : <div></div> }
		<Button type="submit">Sign In</Button>
	</Form>
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

const Form = styled.form`
  display: flex;
	flex-direction: column;
	width: 350px;
	background: #282828;
	box-shadow: 0px 4px 13px #000000;
	padding: 20px 70px;
	margin: 50px auto;
	border-radius: 4px;
`;

const Button = styled.button`
	width: 180px;
	background: #25ADE8;
	box-shadow: 0px 4px 11px rgba(23, 213, 255, 0.26);
	border-radius: 4px;
	height: 50px;
	font-size: 18px;
	color: whitesmoke;
	margin: auto;
	margin-top: 15px;
	border: none;
	outline: none;
`;

const Input = styled.input`
	margin: 5px;
	padding: 13px;
	background: none;
	color: whitesmoke;
	border: none;
	border-bottom: 1px solid gray;
	outline: none;
	&:-webkit-autofill,
	&:-webkit-autofill:hover, 
	&:-webkit-autofill:focus {
		-webkit-text-fill-color: whitesmoke;  // Цвет текста
		box-shadow: 0 0 0px 1000px #282828 inset;  // Тенью во внутрь делаем BG и вместо #000 выбираем цвет BG
		transition: background-color 6000s ease-in-out 0s; // Так-как напрямую с BGC взаимодействовать нельзя, делаем его замену очень медленной, и как-бы отменяем его замену. (хотя через 1.5 часа он таки поменяет цвет)
	}
	&:hover {
		border-bottom: 1px solid #25ADE8;
		box-shadow: 5px 7px 11px #25ADE8(23, 213, 255, 0.26);
	}
`;

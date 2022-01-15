import styled from "styled-components"
import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

import { me, hideLoader, showLoader } from "../redux/actions";

import UserPanel from "../components/UserPanel"
import LeftNavigationPanel from "../components/LeftNavigationPanel"
import UpperNavigationPanel from "../components/UpperNavigationPanel"
import { connect } from "react-redux";

function DefaultPage(props) {
	const navigate = useNavigate()

	useEffect(() => {
		props.showLoader()
		axios({
			method: 'get',
			url: "http://localhost:8000/api/auth/me",
			headers: {
				Authorization: `Bearer` + Cookies.get('access_token')
			}
		}).then((response) => {
			console.log(response.data)
			
			props.me(response.data)
			props.hideLoader()
		}).catch((error) => {
			props.hideLoader()
			navigate('/sign-in')
		})
	}, [props, navigate])

  return <Col>
		<UpperRow>
			<UserPanel></UserPanel>
			<UpperNavigationPanel></UpperNavigationPanel>
		</UpperRow>
		<BottomRow>
			<LeftNavigationPanel></LeftNavigationPanel>
			<Element>{props.element}</Element>
		</BottomRow>
	</Col>
}

const mapDispatchToProps = {
	hideLoader,
	showLoader,
	me,
}

export default connect(null, mapDispatchToProps)(DefaultPage)

const Col = styled.div`
	display: flex;
	flex-direction: column;
	height: fit-content;
`

const BottomRow = styled.div`
	display: flex;
	flex-direction: row;
	height: 500px;
`

const UpperRow = styled.div`
	display: flex;
	flex-direction: row;
	height: 80px;
`

const Element = styled.div`
	width: 100%;
	height: 100%;
`
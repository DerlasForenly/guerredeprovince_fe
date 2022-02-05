import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { useNavigate } from "react-router";

import { me, hideLoader, showLoader } from "../redux/actions";

import { connect } from "react-redux";

function GuardedPage({showLoader, hideLoader, me, loading, element}) {
	const navigate = useNavigate()

	useEffect(() => {
		showLoader()
		axios({
			method: 'get',
			url: `${process.env.REACT_APP_API}/api/auth/me`,
			headers: {
				Authorization: `Bearer` + Cookies.get('access_token')
			}
		}).then((response) => {
			console.log(response.data)
			
			me(response.data)
			hideLoader()
		}).catch((error) => {
			hideLoader()
			navigate('/sign-in')
		})
	}, [me, hideLoader, showLoader, navigate])

  return loading ? <div></div> : 
	<div className="page">{element}</div>
}

const mapDispatchToProps = {
	hideLoader,
	showLoader,
	me,
}

const mapStateToProps = state => {
	return {
		loading: state.app.loading,
		stability: state.app.stability
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(GuardedPage)

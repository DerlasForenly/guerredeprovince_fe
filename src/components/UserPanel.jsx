import { connect } from "react-redux";
import { Link } from "react-router-dom";
import styled from "styled-components";

const UserPanel = (props) => {
	return <MainContainer>
		<Link to="/profile"><label>{props.user.nickname}</label></Link>
		<label>EXP: {props.user.exp}</label>
		<label>Busy: {props.user.busy ? 1 : 0}</label>
  </MainContainer>
}

const mapDispatchToProps = {

}

const mapStateToProps = state => ({
	user: state.auth.user
})

export default connect(mapStateToProps, mapDispatchToProps)(UserPanel)

const MainContainer = styled.div`
	color: whitesmoke;
	padding: 10px;
	max-width: 280px;
	min-width: 280px;
	display: flex;
	flex-direction: column;
	background: #222222;
	color: whitesmoke;
`;
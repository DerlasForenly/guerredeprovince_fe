import { connect } from "react-redux";
import { MainContainer } from "../components/PageMainContainerCss";
import StartWorkForm from "../components/StartWorkForm";
import GetSalaryForm from "../components/GetSalaryForm";

const JobPage = (props) => {
	return <MainContainer>
	{
		props.busy ? 
		<GetSalaryForm></GetSalaryForm> :
		<StartWorkForm></StartWorkForm>
	}
	</MainContainer>
}

const mapStateToProps = (state) => {
	return {
		busy: state.auth.user.busy,
	}
}

export default connect(mapStateToProps, null)(JobPage)


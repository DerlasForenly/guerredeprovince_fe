import { connect } from "react-redux";
import FactoryCard from "../components/FactoryCard";

const JobPage = (props) => {
	return <div>
		{ props.user.job ? <FactoryCard></FactoryCard> : <div></div> }
	</div>
}

const mapStateToProps = (state) => {
	return {
		user: state.auth.user,
	}
}

export default connect(mapStateToProps, null)(JobPage)


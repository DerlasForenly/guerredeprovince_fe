import { connect } from "react-redux";
import FactoryCard from "../components/FactoryCard";

const JobPage = (props) => {
	return <div>
		<FactoryCard></FactoryCard>
	</div>
}

const mapStateToProps = (state) => {
	return {
		busy: state.auth.user.busy,
	}
}

export default connect(mapStateToProps, null)(JobPage)


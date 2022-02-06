import { connect } from "react-redux";
import OverviewShortRegion from "../components/OverviewShortRegion";

const HomePage = (props) => {
	return <div>
		<OverviewShortRegion/>
	</div>
}

export default connect(null, null)(HomePage)
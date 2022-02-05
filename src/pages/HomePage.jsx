import { connect } from "react-redux";
import RegionShort from "../components/RegionShort";

const HomePage = (props) => {
	return <div>
		<RegionShort/>
	</div>
}

export default connect(null, null)(HomePage)
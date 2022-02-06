import { connect } from "react-redux";
import OverviewShortRegion from "../components/OverviewShortRegion";
import Chat from "../components/Chat";

const HomePage = (props) => {
	return <div className="row">
		<div className="col">
			<OverviewShortRegion/>
			<Chat></Chat>
		</div>
	</div>
}

export default connect(null, null)(HomePage)
import { connect } from "react-redux";
import { MainContainer } from "../components/PageMainContainerCss";
import RegionShort from "../components/RegionShort";

const HomePage = (props) => {
	return <MainContainer>
		<RegionShort/>
	</MainContainer>
}

export default connect(null, null)(HomePage)
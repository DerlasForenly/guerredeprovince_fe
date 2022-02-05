import { connect } from "react-redux"
import { Link } from "react-router-dom"

import HomePageIcon from "../assets/HomePageIcon.png"
import NewsPageIcon from "../assets/NewsPageIcon.png"
import WorldMapPageIcon from "../assets/WorldMapPageIcon.png"
import WarsPageIcon from "../assets/WarsPageIcon.png"
import RegionPageIcon from "../assets/RegionPageIcon.png"
import JobPageIcon from "../assets/JobPageIcon.png"

const LeftNavigationPanel = (props) => {
  return <div>
		<Link to="/home"><img src={HomePageIcon} alt="home page"></img></Link>
		<Link to="/news"><img src={NewsPageIcon} alt="news page"></img></Link>
		<Link to="/world"><img src={WorldMapPageIcon} alt="world map page"></img></Link>
		<Link to="/region"><img src={RegionPageIcon} alt="region page"></img></Link>
		<Link to="/news"><img src={NewsPageIcon} alt="news page"></img></Link>
		<Link to="/world"><img src={WorldMapPageIcon} alt="world map page"></img></Link>
		<Link to="/wars"><img src={WarsPageIcon} alt="world map page"></img></Link>
		<Link to="/job"><img src={JobPageIcon} alt="job page"></img></Link>
	</div>
}

export default connect(null, null)(LeftNavigationPanel)

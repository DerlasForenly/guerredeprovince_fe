import { connect } from "react-redux"
import { Link } from "react-router-dom"
import styled from "styled-components"

import HomePageIcon from "../assets/HomePageIcon.png"
import NewsPageIcon from "../assets/NewsPageIcon.png"
import WorldMapPageIcon from "../assets/WorldMapPageIcon.png"
import WarsPageIcon from "../assets/WarsPageIcon.png"
import RegionPageIcon from "../assets/RegionPageIcon.png"
import JobPageIcon from "../assets/JobPageIcon.png"

const LeftNavigationPanel = (props) => {
  return <MainContainer>
		<Link to="/home"><Img src={HomePageIcon} alt="home page"></Img></Link>
		<Link to="/news"><Img src={NewsPageIcon} alt="news page"></Img></Link>
		<Link to="/world"><Img src={WorldMapPageIcon} alt="world map page"></Img></Link>
		<Link to="/region"><Img src={RegionPageIcon} alt="region page"></Img></Link>
		<Link to="/news"><Img src={NewsPageIcon} alt="news page"></Img></Link>
		<Link to="/world"><Img src={WorldMapPageIcon} alt="world map page"></Img></Link>
		<Link to="/wars"><Img src={WarsPageIcon} alt="world map page"></Img></Link>
		<Link to="/job"><Img src={JobPageIcon} alt="job page"></Img></Link>
	</MainContainer>
}

export default connect(null, null)(LeftNavigationPanel)

const MainContainer = styled.div`
	color: whitesmoke;
	background: #282828;
	height: fit-content;
	width: fit-content;
	padding: 5px 10px;
	display: flex;
	flex-direction: column;
	transition: transform .4s ease-out;
`;

const Img = styled.img`
	height: 50px;
	width: 50px;
	margin: 5px 0px;
	transition: transform .3s ease-out;
	&:hover {
		transform: scale(1.05)
	}
`;

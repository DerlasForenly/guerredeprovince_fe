import { connect } from "react-redux";

import regionImg from "../assets/default_region_avatar.png"

function OverviewShortRegion(props) {
	const pages = [
		'Region',
		'Country',
		'World',
	]


  return <div className="overview-short-region-container">
		<div className="row">
			<img src={regionImg} alt="region"></img>
			<div className="title-panel col">
				<label className="region-name">Черкасська область</label>
				<label className="region-country">Holy Ukrainian Reich</label>
			</div>
		</div>
		<div className="navigation-container row">
			<label>{pages[2]}</label>
			<div className="navigation-indicators-container row">
				<div className="point"></div>
				<div className="point"></div>
				<div className="point"></div>
			</div>
			<label>{pages[1]}</label>
		</div>
	</div>
}

const mapStateToProps = (state) => {
	return {
		regionId: state.auth.user.current_region_id
	}
}

export default connect(mapStateToProps, null)(OverviewShortRegion)
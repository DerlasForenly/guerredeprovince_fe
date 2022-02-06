import { connect } from "react-redux";

function OverviewShortRegion(props) {
  return <div className="overview-short-region-container">
		<div>Region ID: {props.regionId}</div>
	</div>
}

const mapStateToProps = (state) => {
	return {
		regionId: state.auth.user.current_region_id
	}
}

export default connect(mapStateToProps, null)(OverviewShortRegion)
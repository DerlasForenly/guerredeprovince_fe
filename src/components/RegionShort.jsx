import { connect } from "react-redux";

const RegionShort = (props) => {
  return <div>
		<div>Region ID: {props.regionId}</div>
	</div>
}

const mapStateToProps = (state) => {
	return {
		regionId: state.auth.user.current_region_id
	}
}

export default connect(mapStateToProps, null)(RegionShort);

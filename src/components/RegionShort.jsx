import { connect } from "react-redux";
import styled from "styled-components"

const RegionShort = (props) => {
  return <MainContainer>
		<div>Region ID: {props.regionId}</div>
	</MainContainer>
}

const mapStateToProps = (state) => {
	return {
		regionId: state.auth.user.current_region_id
	}
}

export default connect(mapStateToProps, null)(RegionShort);

const MainContainer = styled.div`
	height: fit-content;
	width: 400px;
	color: white;
	background: #282828;
	padding: 10px;
`
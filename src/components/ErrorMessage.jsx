import { connect } from "react-redux";
import styled from "styled-components";

const ErrorMessage = (props) => {
	return <Label>{props.message}</Label>
}

export default connect(null, null)(ErrorMessage)

const Label = styled.label`
	margin: auto;
	padding: 5px;
	margin: 5px;
	color: #c50000;
`;

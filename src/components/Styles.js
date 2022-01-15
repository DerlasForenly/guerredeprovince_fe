import styled from "styled-components";

export const Col = styled.div`
    display: flex;
    flex-direction: column;
`

export const Row = styled.div`
    display: flex;
    flex-direction: row;
`

export const Button = styled.button`
    background: #198cbd;
    box-shadow: 0px 4px 11px rgba(23, 213, 255, 0.26);
    border-radius: 4px;
    color: whitesmoke;
    border: none;
    outline: none;
    padding: 10px 20px;
    width: fit-content;
    transition: 0.3s;
    &:hover {
        background: #25ADE8;
    }
	&:disabled {
		background: gray;
		box-shadow: none;
	}
`;

export const Input = styled.input`
	width: 80px;
	padding: 5px;
	background: none;
	color: whitesmoke;
	border: none;
	border-bottom: 1px solid gray;
	outline: none;
	margin-right: 15px;
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
		-webkit-appearance: none;
		margin: 0;
	}
`;

export const Form = styled.form`
	align-items: center;
	width: fit-content;
	background: #282828;
	box-shadow: 0px 4px 13px #000000;
	padding: 30px 40px;
	border-radius: 4px;
`;

export const Label = styled.label`
	color: whitesmoke;
	margin: 10px 0px;
`


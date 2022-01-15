import { SIGN_IN, SIGN_UP, SIGN_OUT, SHOW_ERROR_MESSAGE, HIDE_ERROR_MESSAGE, ME } from "./types"

const initialState = {
	user: false,
	tokenType: false,
	expiresIn: false,
	errorMessage: null,
}

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case SIGN_IN:
			return {
				...state,
				user: action.payload.user,
				tokenType: action.payload.token_type,
				expiresIn: action.payload.expires_in,
			}
		case SIGN_UP:
			return {
				...state,
			}
		case SIGN_OUT:
			return {
				...state,
			}
		case ME: {
			return {
				...state,
				user: action.payload
			}
		}
		case SHOW_ERROR_MESSAGE:
			return {
				...state,
				errorMessage: action.payload
			}
		case HIDE_ERROR_MESSAGE:
			return {
				...state,
				errorMessage: null
			}
		default: return state
	}
}
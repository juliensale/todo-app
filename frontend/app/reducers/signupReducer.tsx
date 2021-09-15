import { Color } from "@material-ui/lab"
import { Translation } from "../translations/User/Signup"

export type SignupFormState = {
	data: {
		email: string,
		username: string,
		password1: string,
		password2: string
	},
	showPasswords: {
		password1: boolean,
		password2: boolean
	},
	snack: {
		severity: Color,
		message: string,
		open: boolean
	},
	passwordMatch: boolean,
	error: {
		email: boolean,
		username: boolean
	},
	loading: boolean
}
export const getSignupFormReducer = (initialState: SignupFormState, translation: Translation) => {
	return (state: SignupFormState, action: any) => {
		const newState = { ...state }
		switch (action.type) {
			case "patch":
				newState.data = { ...newState.data, ...action.data }
				newState.passwordMatch = newState.data.password1 === newState.data.password2
				return newState;
			case "passwordVisibility":
				if (action.password === 'password1' || action.password === 'password2') {
					newState.showPasswords[action.password as ('password1' | 'password2')] = action.value
				}
				return newState
			case "loadingStart":
				return {
					...state,
					loading: true
				}

			case "login":
				localStorage.setItem('authToken', action.token)
				return {
					...initialState,
					snack: {
						severity: "success" as Color,
						message: translation.feedbacks.success,
						open: true
					}
				}

			case "error":
				var message = translation.feedbacks.error.base
				var error = {
					email: false,
					username: false
				}
				if (action.error) {
					if (action.error.response) {
						switch (action.error.response.status) {
							case 400:
								message = translation.feedbacks.error[400];
								if (action.error.response.data.email) {
									error.email = true
								}
								if (action.error.response.data.username) {
									error.username = true
								}
								break;
							case 404:
								message = translation.feedbacks.error[404];
								break;
							case 500:
								message = translation.feedbacks.error[500];
								break;
							default: break;
						}
					} else if (action.error.type && action.error.type === 'password') {
						message = translation.feedbacks.error.password
					}
				}
				return {
					...state,
					snack: {
						severity: "error" as Color,
						message: message,
						open: true
					},
					error: error,
					loading: false
				}
			case "noCookie":
				return {
					...state,
					snack: {
						severity: "warning" as Color,
						message: translation.feedbacks.noCookie,
						open: true
					},
					error: {
						email: false,
						username: false
					},
					loading: false
				}

			case "closeSnack":
				return {
					...state,
					snack: {
						...state.snack,
						open: false
					}
				}

			default: return state
		}
	}
}
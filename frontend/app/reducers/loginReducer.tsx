import { Color } from "@material-ui/lab"
import { Translation } from "../translations/User/Login"

export type LoginFormState = {
	data: {
		email: string,
		password: string
	},
	snack: {
		severity: Color,
		message: string,
		open: boolean
	},
	showPassword: boolean,
	error: boolean,
	loading: boolean
}
export const getLoginFormReducer = (initialState: LoginFormState, translation: Translation) => {
	return (state: LoginFormState, action: any) => {
		const newState = { ...state }
		switch (action.type) {
			case "patch":
				newState.data = { ...newState.data, ...action.data }
				return newState;

			case "passwordVisibility":
				newState.showPassword = action.value
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
						message: translation.feedbacks.login,
						open: true
					}
				}

			case "error":
				var message = translation.feedbacks.error.base

				if (action.error) {
					if (action.error.response) {
						switch (action.error.response.status) {
							case 400:
								message = translation.feedbacks.error[400]
								break;
							case 404:
								message = translation.feedbacks.error[404]
								break;

							case 500:
								message = translation.feedbacks.error[500]
								break;
							default: break;
						}
					}
				}
				return {
					...state,
					snack: {
						severity: "error" as Color,
						message: message,
						open: true
					},
					error: true,
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
					error: false,
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
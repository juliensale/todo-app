import { Color } from "@material-ui/lab"

export type SignupFormState = {
	data: {
		email: string,
		username: string,
		password1: string,
		password2: string
	},
	snack: {
		severity: Color,
		message: string,
		open: boolean
	},
	error: boolean,
	loading: boolean
}
export const getSignupFormReducer = (initialState: SignupFormState) => {
	return (state: SignupFormState, action: any) => {
		switch (action.type) {
			case "patch":
				const newState = { ...state }
				newState.data = { ...newState.data, ...action.data }
				return newState;

			case "loadingStart":
				return {
					...state,
					loading: true
				}

			case "signup":
				localStorage.setItem('authToken', action.token)
				return {
					...initialState,
					snack: {
						severity: "success" as Color,
						message: "Successful!",
						open: true
					}
				}

			case "error":
				return {
					...state,
					snack: {
						severity: "error" as Color,
						message: "Error.",
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
						message: "You must allow cookies.",
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
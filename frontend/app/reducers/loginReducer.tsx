import { Color } from "@material-ui/lab"

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
	error: boolean,
	loading: boolean
}
export const getLoginFormReducer = (initialState: LoginFormState) => {
	return (state: LoginFormState, action: any) => {
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

			case "login":
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
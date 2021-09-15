import { Color } from "@material-ui/lab"

export type SettingsFormState = {
	data: {
		email: string,
		username: string,
		name: string,
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
	error: boolean,
	loading: {
		general: boolean,
		password: boolean
	}
}
export const getSettingsFormReducer = (initialState: SettingsFormState) => {
	const reducer: (state: SettingsFormState, action: any) => SettingsFormState = (state, action) => {
		const newState = { ...state }
		switch (action.type) {
			case "patch":
				newState.data = { ...newState.data, ...action.data }
				newState.passwordMatch = newState.data.password1 === newState.data.password2
				return newState;

			case "passwordVisibility":
				if (action.password === 'password1' || action.password === 'password2') {
					newState.showPasswords[action.password as ('password1' | 'password2')] = action.value
					console.log(newState.showPasswords.password1)
				}
				return newState

			case "loadingStart":
				return {
					...state,
					loading: {
						...state.loading,
						[action.form]: true
					}
				}

			case "success":
				return {
					...initialState,
					data: { ...state.data },
					snack: {
						severity: "success" as Color,
						message: "Success!",
						open: true
					},
					loading: {
						...state.loading,
						[action.form]: false
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
					loading: {
						...state.loading,
						[action.form]: false
					}
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
					loading: {
						general: false,
						password: false
					}
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

	return reducer
}
export type LoginFormState = {
	data: {
		email: string,
		password: string
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
				return initialState

			case "error":
				return {
					...state,
					error: true,
					loading: false
				}
			case "noCookie":
				return {
					...state,
					error: false,
					loading: false
				}

			default: return state
		}
	}
}
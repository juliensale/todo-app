export type LoginFormState = {
	data: {
		email: string,
		password: string
	},
	error: {
		email: string | null,
		password: string | null
	},
	loading: boolean
}
export const getLoginFormReducer = (initialState: LoginFormState) => {
	return (state: LoginFormState, action: any) => {
		switch (action.type) {
			case "reset": return initialState;

			case "patch":
				const newState = { ...state }
				newState.data = { ...newState.data, ...action.data }
				return newState;

			default: return state
		}
	}
}
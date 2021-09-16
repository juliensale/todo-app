import { Color } from "@material-ui/lab"
import { Translation } from '../../translations/List'

export type ListCreateFormState = {
	data: {
		title: string,
		color: string
	},
	snack: {
		severity: Color,
		message: string,
		open: boolean
	}
}
export const getListCreateFormReducer = (initialState: ListCreateFormState, translation: Translation) => {
	return (state: ListCreateFormState, action: any) => {
		const newState = { ...state }
		switch (action.type) {
			case "patch":
				newState.data = { ...newState.data, ...action.data }
				return newState;


			case "create":
				return {
					...initialState
				}

			case "success":
				return {
					...state,
					snack: {
						severity: "success" as Color,
						message: translation.feedbacks.create.success,
						open: true
					}
				}

			case "error":
				var message = translation.feedbacks.baseError

				if (action.error) {
					if (action.error.response) {
						switch (action.error.response.status) {
							case 400:
								message = translation.feedbacks.create.error[400]
								break;
							case 404:
								message = translation.feedbacks.create.error[404]
								break;

							case 500:
								message = translation.feedbacks.create.error[500]
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
					}
				}
			case "noCookie":
				return {
					...state,
					snack: {
						severity: "warning" as Color,
						message: translation.feedbacks.noCookie,
						open: true
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
}
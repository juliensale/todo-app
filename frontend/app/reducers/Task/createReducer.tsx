import { Color } from "@material-ui/lab"
import React from "react"
import { Translation } from '../../translations/Task'
import { SnackAction } from "../snackReducer"

export type TaskCreateFormState = {
	data: {
		title: string
	}
}
export const getTaskCreateFormReducer = (initialState: TaskCreateFormState, translation: Translation, dispatchSnack: React.Dispatch<SnackAction>) => {
	return (state: TaskCreateFormState, action: any) => {
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
				dispatchSnack({
					type: "success",
					message: translation.feedbacks.create.success
				})
				return state
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
				dispatchSnack({
					type: "error",
					message: message
				})

				return state
			case "noCookie":
				dispatchSnack({ type: "noCookie", message: "" })
				return state

			case "closeSnack":
				dispatchSnack({ type: "closeSnack", message: "" })
				return state

			default: return state
		}
	}
}
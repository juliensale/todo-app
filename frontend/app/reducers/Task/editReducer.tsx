import { Color } from "@material-ui/lab"
import React from "react"
import { Translation } from '../../translations/Task'
import { SnackAction } from "../snackReducer"

export type TaskEditFormState = {
	data: {
		title: string
	}
}
export const getTaskEditFormReducer = (initialState: TaskEditFormState, translation: Translation, dispatchSnack: React.Dispatch<SnackAction>) => {
	return (state: TaskEditFormState, action: any) => {
		const newState = { ...state }
		switch (action.type) {
			case "patch":
				newState.data = { ...newState.data, ...action.data }
				return newState;

			case "success":
				dispatchSnack({
					type: "success",
					message: translation.feedbacks.edit.success
				})
				return state
			case "error":
				var message = translation.feedbacks.baseError

				if (action.error) {
					if (action.error.response) {
						switch (action.error.response.status) {
							case 400:
								message = translation.feedbacks.edit.error[400]
								break;
							case 404:
								message = translation.feedbacks.edit.error[404]
								break;

							case 500:
								message = translation.feedbacks.edit.error[500]
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
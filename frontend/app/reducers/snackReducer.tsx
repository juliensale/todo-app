import { Color } from "@material-ui/lab";
import { Translation as ListTranslation } from "../translations/List";
import { Translation as SublistTranslation } from "../translations/Sublist";
import { Translation as TaskTranslation } from "../translations/Task";

export type SnackType = {
	severity: Color,
	message: string,
	open: boolean
}
export type SnackAction = {
	type: "success" | "error" | "noCookie" | "closeSnack",
	message: string
}

export const getSnackReducer = (initialSnack: SnackType, translation: ListTranslation | SublistTranslation | TaskTranslation) => {
	return (snack: SnackType, action: SnackAction) => {
		switch (action.type) {
			case "success":
				return {
					severity: "success" as Color,
					message: action.message,
					open: true
				}
			case "error":
				return {
					severity: "error" as Color,
					message: action.message,
					open: true
				}
			case "noCookie":
				return {
					severity: "error" as Color,
					message: translation.feedbacks.noCookie,
					open: true
				}

			case "closeSnack":
				return {
					...snack,
					open: false
				}
			default:
				return snack
		}
	}
}
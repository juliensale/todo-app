import { Subtask } from "../../types/dbObjects";

export const shouldTaskBeComplete: (subtasks: Subtask[]) => boolean = (subtasks) => {
	return subtasks.reduce((previousValue: boolean, currentSubtask: Subtask) => (previousValue && currentSubtask.completed), true)
}
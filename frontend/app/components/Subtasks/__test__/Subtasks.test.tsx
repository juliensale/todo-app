import { Subtask } from "../../../types/dbObjects";
import { shouldTaskBeComplete } from "../Subtasks";

describe("Subtasks functions", () => {
	it('should complete the mother task', () => {
		const subtasks: Subtask[] = [
			{
				id: 1,
				task: 0,
				title: 'Test',
				completed: true
			},
			{
				id: 2,
				task: 0,
				title: 'Test',
				completed: true
			},
			{
				id: 2,
				task: 0,
				title: 'Test',
				completed: true
			}
		]
		const bool = shouldTaskBeComplete(subtasks)
		expect(bool).toBe(true)
	})

	it('should not complete the mother task', () => {
		const subtasks: Subtask[] = [
			{
				id: 1,
				task: 0,
				title: 'Test',
				completed: true
			},
			{
				id: 2,
				task: 0,
				title: 'Test',
				completed: false
			},
			{
				id: 2,
				task: 0,
				title: 'Test',
				completed: true
			}
		]
		const bool = shouldTaskBeComplete(subtasks)
		expect(bool).toBe(false)
	})
})
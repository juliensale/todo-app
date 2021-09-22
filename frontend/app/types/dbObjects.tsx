export type List = {
	id: number,
	title: string,
	color: string
}

export type Sublist = {
	id: number,
	list: number,
	title: string
}


export type Task = {
	id: number,
	sublist: number,
	title: string,
	completed: boolean
}

export type Subtask = {
	id: number,
	task: number,
	title: string,
	completed: boolean
}
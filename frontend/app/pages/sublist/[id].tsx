import { Box, Button, Fab, Snackbar, TextField, Theme, Typography, useMediaQuery } from '@material-ui/core';
import { ClassNameMap, createStyles, makeStyles, useTheme } from '@material-ui/styles';
import React, { FC, useCallback, useContext, useEffect, useMemo, useReducer, useRef, useState } from 'react';
import LoginRequired from '../../components/Layout/LoginRequired';
import { getNavWidth } from '../../components/Layout/Navigation';
import AddIcon from '@material-ui/icons/Add'
import { useRouter } from 'next/dist/client/router';
import { en, fr, Translation } from '../../translations/Task'
import { en as subtaskEn, fr as subtaskFr, Translation as SubtaskTranslation } from '../../translations/Subtask'
import { getTaskCreateFormReducer, TaskCreateFormState } from '../../reducers/Task/createReducer';
import { getTaskEditFormReducer, TaskEditFormState } from '../../reducers/Task/editReducer';
import useSWR, { mutate, trigger } from 'swr';
import axios from 'axios';
import { UserContext } from '../_app';
import Alert from '../../components/Forms/Alert';
import authFetcher from '../../components/authFetcher';
import { List as ListType, Sublist as SublistType, Task, Subtask } from '../../types/dbObjects';
import CompleteItem from '../../components/ItemLists/CompleteItem';
import ItemButton from '../../components/ItemLists/ItemButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CustomModal from '../../components/CustomModal';
import { getSnackReducer, SnackType, SnackAction } from '../../reducers/snackReducer';
import DBLoading from '../../components/DBLoading';
import ErrorButton from '../../components/ErrorButton';
import ArrowButtonLink from '../../components/ArrowButtonLink';
import Head from '../../components/ItemLists/Head';
import RadioButtonUncheckedIcon from '@material-ui/icons/RadioButtonUnchecked';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { getSubtaskCreateFormReducer, SubtaskCreateFormState } from '../../reducers/Subtask/createReducer';
import { getSubtaskEditFormReducer, SubtaskEditFormState } from '../../reducers/Subtask/editReducer';
import { motion, MotionConfig, useAnimation } from 'framer-motion'
import { shouldTaskBeComplete } from '../../components/Subtasks/Subtasks';



const useStyles = makeStyles((theme: Theme) => createStyles({
	noTaskContainer: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: '100%',
		height: '100%',
		padding: theme.spacing(3),
		gap: theme.spacing(2),
		'& > *': {
			textAlign: 'center'
		}
	},
	createFormPaper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'fixed',
		bottom: 0,
		right: 0,
		boxShadow: theme.shadows[4],
		height: theme.spacing(11.5),
		padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`,
		zIndex: 2,
		background: theme.palette.background.paper
	},
	createForm: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: theme.spacing(1),
		width: '100%',
		height: '100%'
	},
	input: {
		width: 'min(75%, 50em)'
	},
	snackBar: {
		bottom: theme.spacing(12.5)
	},
	itemContainer: {
		width: '100%',
		marginBottom: theme.spacing(23)
	},
	subtaskContainer: {
		width: '90%',
		boxShadow: theme.shadows[1],
		marginLeft: 'auto',
		marginRight: 0,
		overflow: 'hidden',
		transition: '.2s'
	},
	subtaskCreateFormContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: `${theme.spacing(1)}px ${theme.spacing(2)}px`,
		fontSize: '.9em',

	},
	'subtaskInput': {
		width: 'auto',
		flex: 'auto'
	},
	plusButton: {
		flex: 'none'
	},
	taskTitle: {
		marginLeft: theme.spacing(2),
		minHeight: theme.spacing(8),
		padding: `${theme.spacing(2)}px 0`,
		display: 'grid',
		placeItems: 'center'
	},
	titleContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center',
	},
	checked: { display: 'grid', placeItems: 'center', margin: `0 ${theme.spacing(2)}px` },
	icon: { display: 'grid', placeItems: 'center' },
	optionsContainer: {
		display: 'flex',
		flexDirection: 'column',
		padding: theme.spacing(4)
	},
	optionsTitle: {
		width: '100%',
		textAlign: 'start',
		marginBottom: theme.spacing(1),
		marginLeft: -theme.spacing(2)
	},
	deleteButton: {
		color: theme.palette.error.main,
		marginLeft: 'auto',
		marginRight: 0,
		marginTop: theme.spacing(4),
		width: theme.spacing(13)
	},
	editForm: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'flex-start',
		justifyContent: 'center'
	},
	editButton: {
		marginLeft: 'auto',
		marginRight: 0,
		marginTop: theme.spacing(1),
		width: theme.spacing(13)
	},
	editInput: {
		width: '100%',
		marginBottom: theme.spacing(3),
		display: 'flex'
	},
	editColor: {
		width: '100%',
		marginLeft: theme.spacing(1)
	},
	completedItem: {
		background: theme.palette.action.disabledBackground,
		color: theme.palette.action.disabled
	}
}))


type ContextType = {
	classes: ClassNameMap,
	translation: Translation,
	subtaskTranslation: SubtaskTranslation,
	apiUrl: string,
	authToken: string,
	tasks: Task[] | undefined,
	dispatchSnack: React.Dispatch<SnackAction>,
	sublistId: number | null | undefined,
	motherSublist: SublistType | undefined,
	motherList: ListType | undefined,
	subtasks: Subtask[] | undefined
}
const SublistContext = React.createContext({} as ContextType)
const { Provider } = SublistContext

type SublistProps = {

}
const Sublist: FC<SublistProps> = ({ children }) => {
	const classes = useStyles()
	const { apiUrl } = useSWR('/api/get-api-url').data || { apiUrl: '' }
	const { authToken, snackBarActive } = useContext(UserContext)
	const router = useRouter()
	const { locale } = router
	const translation = locale === 'fr' ? fr : en
	const subtaskTranslation = locale === 'fr' ? subtaskFr : subtaskEn

	const sublistId = useMemo(() => {
		const id = router.query.id
		if (typeof (id) === 'undefined') {
			return undefined
		}
		if (typeof (id) === 'string') {
			const parsed = parseInt(id)
			if (isNaN(parsed)) {
				return null
			}
			return parsed
		}
		return null
	}, [router])

	const motherSublist: SublistType | undefined = useSWR([`${apiUrl}/todo/sublists/`, authToken], authFetcher).data?.find((item: SublistType) => item.id === sublistId)
	const motherList: ListType | undefined = useSWR([`${apiUrl}/todo/lists/`, authToken], authFetcher).data?.find((item: ListType) => item.id === (motherSublist ? motherSublist.list : -1))
	const tasks: Task[] | undefined = useSWR([`${apiUrl}/todo/tasks/`, authToken], authFetcher).data
	const subtasks: Subtask[] | undefined = useSWR([`${apiUrl}/todo/subtasks/`, authToken], authFetcher).data

	const initialSnack: SnackType = {
		severity: "info",
		message: "",
		open: false
	}

	const snackReducer = getSnackReducer(initialSnack, translation)
	const [snack, dispatchSnack] = useReducer(snackReducer, initialSnack)
	const closeSnackBar = (e?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatchSnack({ type: "closeSnack", message: "" })
	}

	const value = useMemo(() => ({
		classes,
		translation,
		subtaskTranslation,
		apiUrl,
		authToken,
		tasks,
		dispatchSnack,
		sublistId,
		motherSublist,
		motherList,
		subtasks
	}), [classes, translation, subtaskTranslation, apiUrl, authToken, tasks, dispatchSnack, sublistId, motherSublist, motherList, subtasks])

	return (
		<Provider value={value}>
			<LoginRequired>
				{children}
			</LoginRequired>
			{snackBarActive && snack ?
				<Snackbar
					className={classes.snackBar}
					open={snack.open}
					onClose={closeSnackBar}
					autoHideDuration={5000}
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				>
					<Alert severity={snack.severity}>{snack.message}</Alert>
				</Snackbar>
				: null
			}
		</Provider>
	)
}

const SubtaskList: FC<{ task: Task, open: boolean }> = ({ task, open }) => {
	const { subtasks, classes } = useContext(SublistContext)
	const subtaskList = subtasks?.filter(item => item.task === task.id).map(item => <SubtaskItem subtask={item} key={`subtask-${item.id}`} />)

	const controls = useAnimation()
	const ref = useRef(null)
	useEffect(() => {
		if (open && ref.current) {
			controls.start({ height: (ref.current as HTMLDivElement).clientHeight })
		} else {
			controls.start({ height: 0 })
		}
	}, [open, ref.current, controls, subtasks])

	return (
		<MotionConfig transition={{ duration: .1, ease: "easeOut" }}>
			<motion.div
				initial={{ height: 0 }}
				exit={{ height: 0 }}
				animate={controls}
				className={classes.subtaskContainer}
			>
				<div ref={ref}>
					{subtaskList}
					<SubtaskCreateForm task={task} />
				</div>
			</motion.div>
		</MotionConfig>
	)
}

const SubtaskCreateForm: FC<{ task: Task }> = ({ task }) => {
	const { subtasks, apiUrl, authToken, classes, subtaskTranslation, dispatchSnack } = useContext(SublistContext)

	const initialState: SubtaskCreateFormState = {
		data: {
			title: ''
		}
	}
	const reducer = getSubtaskCreateFormReducer(initialState, subtaskTranslation, dispatchSnack)
	const [state, dispatch] = useReducer(reducer, initialState)

	const handleSubmit: React.FormEventHandler = (e) => {
		e.preventDefault()
		dispatch({ type: 'create' })
		mutate(
			[`${apiUrl}/todo/subtasks/`, authToken],
			[
				...(subtasks || []),
				{
					id: Math.random(),
					task: task.id,
					title: state.data.title,
					completed: false
				}
			],
			false
		)
		axios.post(`${apiUrl}/todo/subtasks/`, {
			title: state.data.title,
			task: task.id
		}, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				dispatch({ type: "success" })
				trigger([`${apiUrl}/todo/subtasks/`, authToken])
				trigger([`${apiUrl}/todo/tasks/`, authToken])
			})
			.catch(err => {
				dispatch({ type: "error", error: err })
				trigger([`${apiUrl}/todo/subtasks/`, authToken])
				trigger([`${apiUrl}/todo/tasks/`, authToken])
			})
	}
	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		dispatch({
			type: 'patch',
			data: {
				[e.target.name]: e.target.value
			}
		})
	}
	return (
		<Box className={classes.subtaskCreateFormContainer}>
			<form onSubmit={handleSubmit} className={classes.createForm}>
				<TextField required className={classes.subtaskInput} name="title" variant="outlined" label={subtaskTranslation.create} value={state.data.title} onChange={handleChange} />
				<Fab className={classes.plusButton} size='small' color="primary" type="submit"><AddIcon /></Fab>
			</form>
		</Box>
	)
}

const SubtaskItem: FC<{ subtask: Subtask }> = ({ subtask }) => {
	const { tasks, subtasks, apiUrl, authToken, classes, subtaskTranslation } = useContext(SublistContext)

	const handleComplete = useCallback(() => {
		const mockedSubtasks = (subtasks || []).map(item => {
			var newSubtask = { ...item }
			if (item.id === subtask.id) {
				newSubtask.completed = !item.completed
			}
			return newSubtask
		})
		mutate(
			[`${apiUrl}/todo/subtasks/`, authToken],
			mockedSubtasks,
			false
		)

		const shouldMotherTaskComplete = shouldTaskBeComplete(mockedSubtasks!.filter(item => item.task === subtask.task))
		console.log(shouldMotherTaskComplete)
		mutate(
			[`${apiUrl}/todo/tasks/`, authToken],
			(tasks || []).map(item => {
				var newTask = { ...item }
				if (item.id === subtask.task) {
					newTask.completed = shouldMotherTaskComplete
				}
				return newTask
			}),
			false
		)

		axios.put(`${apiUrl}/todo/subtasks/${subtask.id}/${subtask.completed ? 'uncomplete' : 'complete'}/`, {}, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				trigger([`${apiUrl}/todo/subtasks/`, authToken])
				trigger([`${apiUrl}/todo/tasks/`, authToken])
			})
			.catch(() => {
				trigger([`${apiUrl}/todo/subtasks/`, authToken])
				trigger([`${apiUrl}/todo/tasks/`, authToken])
			})
	}, [subtask, subtasks, apiUrl, authToken])

	const [modalOpen, setModalOpen] = useState(false)
	const closeModal = () => { setModalOpen(false) }

	return (
		<>
			<CompleteItem className={subtask.completed ? classes.completedItem : ''}>
				<div className={classes.titleContainer}>
					<ItemButton stopPropagation onClick={handleComplete}>
						{subtask.completed
							? <CheckCircleIcon color="primary" className={classes.checked} />
							: <RadioButtonUncheckedIcon color="action" className={classes.checked} />
						}
					</ItemButton>
					<Typography className={classes.taskTitle} style={{ textDecorationLine: subtask.completed ? 'line-through' : 'none' }} > {subtask.title}</Typography>
				</div>
				<div className={classes.buttonContainer}>
					<ItemButton stopPropagation title={subtaskTranslation.options} onClick={() => setModalOpen(true)}><MoreHorizIcon className={classes.icon} /></ItemButton>
				</div>
			</CompleteItem>
			<SubtaskModal subtask={subtask} modalOpen={modalOpen} closeModal={closeModal} />
		</>
	)
}

const SubtaskModal: FC<{ subtask: Subtask, modalOpen: boolean, closeModal: () => void }> = ({ subtask, modalOpen, closeModal }) => {

	const { classes, subtaskTranslation } = useContext(SublistContext)

	const [deleteOpen, setDeleteOpen] = useState(false)

	return (
		<CustomModal open={modalOpen} handleClose={closeModal}>
			<div className={classes.optionsContainer}>
				<Typography className={classes.optionsTitle} variant="h1" color="primary">{subtaskTranslation.edit}</Typography>
				<SubtaskEditForm subtask={subtask} />
				<Button variant="outlined" color="inherit" onClick={() => setDeleteOpen(true)} className={classes.deleteButton}>{subtaskTranslation.delete}</Button>
			</div>
			<SubtaskDeleteVerification open={deleteOpen} onClose={() => { setDeleteOpen(false) }} subtask={subtask} />
		</CustomModal>
	)
}

const SubtaskDeleteVerification: FC<{ subtask: Subtask, open: boolean, onClose: () => void }> = ({ subtask, open, onClose }) => {
	const { classes, subtaskTranslation, dispatchSnack, apiUrl, authToken, subtasks } = useContext(SublistContext)
	const handleDelete = () => {
		mutate(
			[`${apiUrl}/todo/subtasks/`, authToken],
			(subtasks || []).filter(item => item.id !== subtask.id),
			false
		)
		axios.delete(`${apiUrl}/todo/subtasks/${subtask.id}/`, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				dispatchSnack({ type: 'success', message: subtaskTranslation.feedbacks.delete.success })
				trigger([`${apiUrl}/todo/subtasks/`, authToken])
				trigger([`${apiUrl}/todo/tasks/`, authToken])
			})
			.catch(() => {
				dispatchSnack({ type: 'error', message: subtaskTranslation.feedbacks.delete.error })
				trigger([`${apiUrl}/todo/subtasks/`, authToken])
				trigger([`${apiUrl}/todo/tasks/`, authToken])
			})
	}
	return (
		<CustomModal open={open} handleClose={onClose}>
			<div className={classes.optionsContainer}>
				<Typography className={classes.optionsTitle} variant="h1" color="error">{subtaskTranslation.warning}</Typography>
				<Typography variant="body1">{subtaskTranslation.warningMessage[0]} &nbsp; {subtask.title}</Typography>
				<Typography variant="body1">{subtaskTranslation.warningMessage[1]}</Typography>
				<Typography variant="body1">{subtaskTranslation.warningMessage[2]}</Typography>
				<ErrorButton onClick={handleDelete} variant="outlined" className={classes.deleteButton}>{subtaskTranslation.delete}</ErrorButton>
			</div>
		</CustomModal>
	)
}

const SubtaskEditForm: FC<{ subtask: Subtask }> = ({ subtask }) => {
	const { apiUrl, authToken, classes, subtaskTranslation, dispatchSnack, subtasks } = useContext(SublistContext)

	const initialState: SubtaskEditFormState = {
		data: {
			title: subtask.title
		}
	}
	const editReducer = getSubtaskEditFormReducer(initialState, subtaskTranslation, dispatchSnack)
	const [state, dispatch] = useReducer(editReducer, initialState)

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		dispatch({
			type: "patch",
			data: {
				[e.target.name]: e.target.value
			}
		})
	}

	const handleSubmit: React.FormEventHandler = (e) => {
		e.preventDefault()
		mutate(
			[`${apiUrl}/todo/subtasks/`, authToken],
			[...subtasks!].map(item => {
				let newSubtask = { ...item }
				if (item.id === subtask.id) {
					newSubtask.title = state.data.title;
				}
				return newSubtask
			}),
			false
		)
		axios.patch(`${apiUrl}/todo/subtasks/${subtask.id}/`, {
			title: state.data.title
		}, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				dispatch({ type: "success" })
				trigger([`${apiUrl}/todo/subtasks/`, authToken],)
			})
			.catch(err => {
				dispatch({ type: "error", error: err })
				trigger([`${apiUrl}/todo/subtasks/`, authToken],)
			})
	}
	return (
		<form onSubmit={handleSubmit} className={classes.editForm}>
			<TextField required className={classes.editInput} label={subtaskTranslation.title} name="title" value={state.data.title} onChange={handleChange} />
			<Button type="submit" color="primary" variant="contained" className={classes.editButton}>{subtaskTranslation.submit}</Button>
		</form>
	)
}

const TaskList: FC = () => {
	const { translation, classes, tasks, sublistId, motherSublist, motherList } = useContext(SublistContext)
	const taskSublist = useMemo(() => {
		if (sublistId === undefined) {
			return undefined
		}
		if (sublistId === null) {
			return null
		}
		return tasks?.filter(item => item.sublist === sublistId).map(task => <TaskItem key={`task-${task.id}`} task={task} />)
	}, [tasks, sublistId])


	return (
		<div className={classes.itemContainer}>
			<Head objectLinks={[
				{
					title: "Home",
					href: "/",
					active: false
				},
				{
					title: motherList ? motherList.title : '',
					href: `/list/${motherList ? motherList.id : -1}`,
					active: false
				},
				{
					title: motherSublist ? motherSublist.title : '',
					href: `/sublist/${sublistId}`,
					active: true
				}
			]
			} />

			{
				(taskSublist === null)
					? (
						<div className={classes.noTaskContainer}>
							<Typography variant="h4" color="textSecondary">{translation.idError}</Typography>
							<ArrowButtonLink href="/">{translation.returnHome}</ArrowButtonLink>
						</div>
					) : (taskSublist)
						? (taskSublist[0])
							? taskSublist
							: (
								<div className={classes.noTaskContainer}>
									<Typography color="primary" variant="h4">{translation.noTask[0]}</Typography>
									<Typography variant="body1">{translation.noTask[1]}</Typography>
								</div>
							)
						: (
							<DBLoading />
						)
			}
		</div>
	)
}

const TaskItem: FC<{ task: Task }> = ({ task }) => {
	const { classes, translation, authToken, apiUrl, tasks } = useContext(SublistContext)

	const [open, setOpen] = useState(false)
	const switchOpen = useCallback(() => { setOpen(!open) }, [open, setOpen])

	const [modalOpen, setModalOpen] = useState(false)
	const closeModal = () => { setModalOpen(false) }
	const handleComplete = useCallback(() => {
		mutate(
			[`${apiUrl}/todo/tasks/`, authToken],
			(tasks || []).map(item => {
				var newTask = { ...item }
				if (item.id === task.id) {
					newTask.completed = !item.completed
				}
				return newTask
			}),
			false
		)
		const url = `${apiUrl}/todo/tasks/${task.id}/${task.completed ? 'uncomplete' : 'complete'}/`
		axios.put(url, {}, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => { trigger([`${apiUrl}/todo/tasks/`, authToken]) })
			.catch(() => { trigger([`${apiUrl}/todo/tasks/`, authToken]) })
	}, [task, tasks, apiUrl, authToken])
	return (
		<>
			<CompleteItem className={task.completed ? classes.completedItem : ''} onClick={switchOpen}>
				<div className={classes.titleContainer}>
					<ItemButton stopPropagation onClick={handleComplete}>
						{task.completed
							? <CheckCircleIcon color="primary" className={classes.checked} />
							: <RadioButtonUncheckedIcon color="action" className={classes.checked} />
						}
					</ItemButton>
					<Typography className={classes.taskTitle} style={{ textDecorationLine: task.completed ? 'line-through' : 'none' }} > {task.title}</Typography>
				</div>
				<div className={classes.buttonContainer}>
					<ItemButton stopPropagation title={translation.options} onClick={() => setModalOpen(true)}><MoreHorizIcon className={classes.icon} /></ItemButton>
					<ItemButton noHoverEffect title={translation.seeTask}><ChevronRightIcon className={classes.icon} style={{ transition: '.2s', transform: open ? 'rotate(90deg)' : 'none' }} /></ItemButton>
				</div>
			</CompleteItem>
			<SubtaskList task={task} open={open} />
			<TaskModal task={task} modalOpen={modalOpen} closeModal={closeModal} />
		</>
	)
}

const TaskModal: FC<{ task: Task, modalOpen: boolean, closeModal: () => void }> = ({ task, modalOpen, closeModal }) => {

	const { classes, translation } = useContext(SublistContext)

	const [deleteOpen, setDeleteOpen] = useState(false)

	return (
		<CustomModal open={modalOpen} handleClose={closeModal}>
			<div className={classes.optionsContainer}>
				<Typography className={classes.optionsTitle} variant="h1" color="primary">{translation.edit}</Typography>
				<TaskEditForm task={task} />
				<Button variant="outlined" color="inherit" onClick={() => setDeleteOpen(true)} className={classes.deleteButton}>{translation.delete}</Button>
			</div>
			<TaskDeleteVerification open={deleteOpen} onClose={() => { setDeleteOpen(false) }} task={task} />
		</CustomModal>
	)
}

const TaskDeleteVerification: FC<{ task: Task, open: boolean, onClose: () => void }> = ({ task, open, onClose }) => {
	const { classes, translation, dispatchSnack, apiUrl, authToken, tasks } = useContext(SublistContext)
	const handleDelete = () => {
		mutate(
			[`${apiUrl}/todo/tasks/`, authToken],
			(tasks || []).filter(item => item.id !== task.id),
			false
		)
		axios.delete(`${apiUrl}/todo/tasks/${task.id}/`, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				dispatchSnack({ type: 'success', message: translation.feedbacks.delete.success })
				trigger([`${apiUrl}/todo/tasks/`, authToken])
			})
			.catch(() => {
				dispatchSnack({ type: 'error', message: translation.feedbacks.delete.error })
				trigger([`${apiUrl}/todo/tasks/`, authToken])
			})
	}
	return (
		<CustomModal open={open} handleClose={onClose}>
			<div className={classes.optionsContainer}>
				<Typography className={classes.optionsTitle} variant="h1" color="error">{translation.warning}</Typography>
				<Typography variant="body1">{translation.warningMessage[0]} &nbsp; {task.title}</Typography>
				<Typography variant="body1">{translation.warningMessage[1]}</Typography>
				<Typography variant="body1">{translation.warningMessage[2]}</Typography>
				<ErrorButton onClick={handleDelete} variant="outlined" className={classes.deleteButton}>{translation.delete}</ErrorButton>
			</div>
		</CustomModal>
	)
}

const TaskEditForm: FC<{ task: Task }> = ({ task }) => {
	const { apiUrl, authToken, classes, translation, dispatchSnack, tasks } = useContext(SublistContext)

	const initialState: TaskEditFormState = {
		data: {
			title: task.title
		}
	}
	const editReducer = getTaskEditFormReducer(initialState, translation, dispatchSnack)
	const [state, dispatch] = useReducer(editReducer, initialState)

	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		dispatch({
			type: "patch",
			data: {
				[e.target.name]: e.target.value
			}
		})
	}

	const handleSubmit: React.FormEventHandler = (e) => {
		e.preventDefault()
		mutate(
			[`${apiUrl}/todo/tasks/`, authToken],
			[...tasks!].map(item => {
				let newTask = { ...item }
				if (item.id === task.id) {
					newTask.title = state.data.title;
				}
				return newTask
			}),
			false
		)
		axios.patch(`${apiUrl}/todo/tasks/${task.id}/`, {
			title: state.data.title
		}, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				dispatch({ type: "success" })
				trigger([`${apiUrl}/todo/tasks/`, authToken],)
			})
			.catch(err => {
				dispatch({ type: "error", error: err })
				trigger([`${apiUrl}/todo/tasks/`, authToken],)
			})
	}
	return (
		<form onSubmit={handleSubmit} className={classes.editForm}>
			<TextField required className={classes.editInput} label={translation.title} name="title" value={state.data.title} onChange={handleChange} />
			<Button type="submit" color="primary" variant="contained" className={classes.editButton}>{translation.submit}</Button>
		</form>
	)
}

const CreateTaskForm: FC = () => {
	const { classes, translation, dispatchSnack, apiUrl, authToken, tasks, sublistId } = useContext(SublistContext)

	const { isMediaPhone } = useContext(UserContext)
	const theme: Theme = useTheme()
	const navWidth = getNavWidth(isMediaPhone, theme)

	const initialState: TaskCreateFormState = {
		data: {
			title: ''
		}
	}
	const reducer = getTaskCreateFormReducer(initialState, translation, dispatchSnack)
	const [state, dispatch] = useReducer(reducer, initialState)


	const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
		dispatch({
			type: 'patch',
			data: {
				[e.target.name]: e.target.value
			}
		})
	}

	const handleSubmit: React.FormEventHandler = (e) => {
		e.preventDefault()
		dispatch({ type: "create" })
		mutate(
			[`${apiUrl}/todo/tasks/`, authToken],
			[
				...(tasks || []),
				{
					id: Math.random(),
					sublist: sublistId,
					title: state.data.title,
					completed: false

				}
			],
			false
		)
		axios.post(`${apiUrl}/todo/tasks/`, {
			title: state.data.title,
			sublist: sublistId,
		}, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				dispatch({ type: "success" })
				trigger([`${apiUrl}/todo/tasks/`, authToken],)
			})
			.catch(err => {
				dispatch({ type: "error", error: err })
				trigger([`${apiUrl}/todo/tasks/`, authToken],)
			})

	}

	return (
		<>
			<Box className={classes.createFormPaper} style={{ left: navWidth }}>
				<form className={classes.createForm} onSubmit={handleSubmit}>
					<TextField required className={classes.input} variant="outlined" name="title" label={translation.create} value={state.data.title} onChange={handleChange} />

					<Fab className={classes.plusButton} color="primary" type="submit"><AddIcon /></Fab>
				</form>
			</Box>
		</>
	)
}


type UsageProps = {

}
const Usage: FC<UsageProps> = (props) => {
	return (
		<Sublist {...props}>
			<TaskList />
			<CreateTaskForm />
		</Sublist>
	)
}



export default (Usage)
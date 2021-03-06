import { Box, Button, Fab, Snackbar, TextField, Theme, Typography, useMediaQuery } from '@material-ui/core';
import { ClassNameMap, createStyles, makeStyles, useTheme } from '@material-ui/styles';
import React, { FC, useContext, useMemo, useReducer, useState } from 'react';
import LoginRequired from '../components/Layout/LoginRequired';
import { getNavWidth } from '../components/Layout/Navigation';
import AddIcon from '@material-ui/icons/Add'
import { useRouter } from 'next/dist/client/router';
import { en, fr, Translation } from '../translations/List'
import { getListCreateFormReducer, ListCreateFormState } from '../reducers/List/createReducer';
import { getListEditFormReducer, ListEditFormState } from '../reducers/List/editReducer';
import useSWR, { mutate, trigger } from 'swr';
import axios from 'axios';
import { UserContext } from './_app';
import Alert from '../components/Forms/Alert';
import authFetcher from '../components/authFetcher';
import { List } from '../types/dbObjects';
import Item from '../components/ItemLists/Item';
import ItemButton from '../components/ItemLists/ItemButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CustomModal from '../components/CustomModal';
import { getSnackReducer, SnackType, SnackAction } from '../reducers/snackReducer';
import DBLoading from '../components/DBLoading';
import ErrorButton from '../components/ErrorButton';
import Head from '../components/ItemLists/Head'


const useStyles = makeStyles((theme: Theme) => createStyles({
	noListContainer: {
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
	colorPickerContainer: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'space-around',
		height: '100%',
		margin: `0 ${theme.spacing(2)}px`
	},
	colorPicker: {
		width: '120%'
	},
	snackBar: {
		bottom: theme.spacing(12.5)
	},
	itemContainer: {
		width: '100%',
		marginBottom: theme.spacing(23)
	},
	listTitle: {
		marginLeft: theme.spacing(2),
		minHeight: theme.spacing(8),
		padding: `${theme.spacing(2)}px 0`,
		display: 'grid',
		placeItems: 'center'
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		justifyContent: 'center'
	},
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
	}
}))


type ContextType = {
	classes: ClassNameMap,
	translation: Translation,
	apiUrl: string,
	authToken: string,
	lists: List[] | undefined,
	dispatchSnack: React.Dispatch<SnackAction>

}
const HomeContext = React.createContext({} as ContextType)
const { Provider } = HomeContext

type HomeProps = {

}
const Home: FC<HomeProps> = ({ children }) => {
	const classes = useStyles()
	const { apiUrl } = useSWR('/api/get-api-url').data || { apiUrl: '' }
	const { authToken, snackBarActive } = useContext(UserContext)
	const router = useRouter()
	const { locale } = router
	const translation = locale === 'fr' ? fr : en

	const lists: List[] | undefined = useSWR([`${apiUrl}/todo/lists/`, authToken], authFetcher).data

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
		apiUrl,
		authToken,
		lists,
		dispatchSnack
	}), [classes, translation, apiUrl, authToken, lists, dispatchSnack])

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


const ListList: FC = () => {
	const { translation, classes, lists } = useContext(HomeContext)
	const listList = useMemo(() => lists?.map(list => <ListItem key={`list-${list.id}`} list={list} />), [lists])
	return (
		<div className={classes.itemContainer}>
			<Head objectLinks={[{ title: 'Home', href: '/', active: true }]} />
			{(lists)
				? (lists[0])
					? listList
					: (
						<div className={classes.noListContainer}>
							<Typography color="primary" variant="h4">{translation.noList[0]}</Typography>
							<Typography variant="body1">{translation.noList[1]}</Typography>
						</div>
					)
				: (
					<DBLoading />
				)
			}
		</div>
	)
}

const ListItem: FC<{ list: List }> = ({ list }) => {
	const { classes, translation } = useContext(HomeContext)
	const [modalOpen, setModalOpen] = useState(false)
	const closeModal = () => { setModalOpen(false) }
	return (
		<>
			<Item style={{ color: list.color }} href={`/list/${list.id}`}>
				<Typography color="inherit" className={classes.listTitle} > {list.title}</Typography>
				<div className={classes.buttonContainer}>
					<ItemButton stopPropagation title={translation.options} onClick={() => setModalOpen(true)}><MoreHorizIcon className={classes.icon} /></ItemButton>
					<ItemButton noHoverEffect title={translation.seeList}><ChevronRightIcon className={classes.icon} /></ItemButton>
				</div>
			</Item>
			<ListModal list={list} modalOpen={modalOpen} closeModal={closeModal} />
		</>
	)
}

const ListModal: FC<{ list: List, modalOpen: boolean, closeModal: () => void }> = ({ list, modalOpen, closeModal }) => {

	const { classes, translation, dispatchSnack, apiUrl, authToken, lists } = useContext(HomeContext)

	const [deleteOpen, setDeleteOpen] = useState(false)

	return (
		<CustomModal open={modalOpen} handleClose={closeModal}>
			<div className={classes.optionsContainer}>
				<Typography className={classes.optionsTitle} variant="h1" color="primary">{translation.edit}</Typography>
				<ListEditForm list={list} />
				<Button variant="outlined" color="inherit" onClick={() => setDeleteOpen(true)} className={classes.deleteButton}>{translation.delete}</Button>
			</div>
			<ListDeleteVerification open={deleteOpen} onClose={() => { setDeleteOpen(false) }} list={list} />
		</CustomModal>
	)
}

const ListDeleteVerification: FC<{ list: List, open: boolean, onClose: () => void }> = ({ list, open, onClose }) => {
	const { classes, translation, dispatchSnack, apiUrl, authToken, lists } = useContext(HomeContext)
	const handleDelete = () => {
		mutate(
			[`${apiUrl}/todo/lists/`, authToken],
			(lists || []).filter(item => item.id !== list.id),
			false
		)
		axios.delete(`${apiUrl}/todo/lists/${list.id}/`, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				dispatchSnack({ type: 'success', message: translation.feedbacks.delete.success })
				trigger([`${apiUrl}/todo/lists/`, authToken])
			})
			.catch(() => {
				dispatchSnack({ type: 'error', message: translation.feedbacks.delete.error })
				trigger([`${apiUrl}/todo/lists/`, authToken])
			})
	}
	return (
		<CustomModal open={open} handleClose={onClose}>
			<div className={classes.optionsContainer}>
				<Typography className={classes.optionsTitle} variant="h1" color="error">{translation.warning}</Typography>
				<Typography variant="body1">{translation.warningMessage[0]} &nbsp; {list.title}</Typography>
				<Typography variant="body1">{translation.warningMessage[1]}</Typography>
				<Typography variant="body1">{translation.warningMessage[2]}</Typography>
				<ErrorButton onClick={handleDelete} variant="outlined" className={classes.deleteButton}>{translation.delete}</ErrorButton>
			</div>
		</CustomModal>
	)
}

const ListEditForm: FC<{ list: List }> = ({ list }) => {
	const { apiUrl, authToken, classes, translation, dispatchSnack, lists } = useContext(HomeContext)

	const initialState: ListEditFormState = {
		data: {
			title: list.title,
			color: list.color
		}
	}
	const editReducer = getListEditFormReducer(initialState, translation, dispatchSnack)
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
			[`${apiUrl}/todo/lists/`, authToken],
			[...lists!].map(item => {
				let newList = { ...item }
				if (item.id === list.id) {
					newList.title = state.data.title;
					newList.color = state.data.color
				}
				return newList
			}),
			false
		)
		axios.patch(`${apiUrl}/todo/lists/${list.id}/`, {
			title: state.data.title,
			color: state.data.color
		}, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				dispatch({ type: "success" })
				trigger([`${apiUrl}/todo/lists/`, authToken],)
			})
			.catch(err => {
				dispatch({ type: "error", error: err })
				trigger([`${apiUrl}/todo/lists/`, authToken],)
			})
	}
	return (
		<form onSubmit={handleSubmit} className={classes.editForm}>
			<TextField required className={classes.editInput} label={translation.title} name="title" value={state.data.title} onChange={handleChange} />
			<div className={classes.editInput}>
				<label>{translation.color}:</label>
				<input className={classes.editColor} type="color" name="color" value={state.data.color} onChange={handleChange} />
			</div>
			<Button type="submit" color="primary" variant="contained" className={classes.editButton}>{translation.submit}</Button>
		</form>
	)
}

const CreateListForm: FC = () => {
	const { classes, translation, dispatchSnack, apiUrl, authToken, lists } = useContext(HomeContext)

	const { isMediaPhone } = useContext(UserContext)
	const theme: Theme = useTheme()
	const navWidth = getNavWidth(isMediaPhone, theme)

	const initialState: ListCreateFormState = {
		data: {
			title: '',
			color: '#000000'
		}
	}
	const reducer = getListCreateFormReducer(initialState, translation, dispatchSnack)
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
			[`${apiUrl}/todo/lists/`, authToken],
			[
				...(lists || []),
				{
					id: Math.random(),
					title: state.data.title,
					color: state.data.color

				}
			],
			false
		)
		axios.post(`${apiUrl}/todo/lists/`, {
			title: state.data.title,
			color: state.data.color
		}, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				dispatch({ type: "success" })
				trigger([`${apiUrl}/todo/lists/`, authToken],)
			})
			.catch(err => {
				dispatch({ type: "error", error: err })
				trigger([`${apiUrl}/todo/lists/`, authToken],)
			})

	}

	return (
		<>
			<Box className={classes.createFormPaper} style={{ left: navWidth }}>
				<form className={classes.createForm} onSubmit={handleSubmit}>
					<TextField required className={classes.input} variant="outlined" name="title" label={translation.create} value={state.data.title} onChange={handleChange} />
					{isMediaPhone ? null :
						<div className={classes.colorPickerContainer}>
							<label><Typography variant="caption" color="textSecondary">{translation.color}</Typography></label>
							<input className={classes.colorPicker} type="color" name="color" value={state.data.color} onChange={handleChange} />
						</div>
					}

					<Fab className={classes.plusbutton} color="primary" type="submit"><AddIcon /></Fab>
				</form>
			</Box>
		</>
	)
}


type UsageProps = {

}
const Usage: FC<UsageProps> = (props) => {
	return (
		<Home {...props}>
			<ListList />
			<CreateListForm />
		</Home>
	)
}



export default (Usage)
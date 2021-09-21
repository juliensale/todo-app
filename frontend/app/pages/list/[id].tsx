import { Box, Button, Fab, Snackbar, TextField, Theme, Typography, useMediaQuery } from '@material-ui/core';
import { ClassNameMap, createStyles, makeStyles, useTheme } from '@material-ui/styles';
import React, { FC, useContext, useEffect, useMemo, useReducer, useState } from 'react';
import LoginRequired from '../../components/Layout/LoginRequired';
import { getNavWidth } from '../../components/Layout/Navigation';
import AddIcon from '@material-ui/icons/Add'
import { useRouter } from 'next/dist/client/router';
import { en, fr, Translation } from '../../translations/Sublist'
import { getSublistCreateFormReducer, SublistCreateFormState } from '../../reducers/Sublist/createReducer';
import { getSublistEditFormReducer, SublistEditFormState } from '../../reducers/Sublist/editReducer';
import useSWR, { mutate, trigger } from 'swr';
import axios from 'axios';
import { UserContext } from '../_app';
import Alert from '../../components/Forms/Alert';
import authFetcher from '../../components/authFetcher';
import { List as ListType, Sublist } from '../../types/dbObjects';
import Item from '../../components/ItemLists/Item';
import ItemButton from '../../components/ItemLists/ItemButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import CustomModal from '../../components/CustomModal';
import { getSnackReducer, SnackType, SnackAction } from '../../reducers/snackReducer';
import DBLoading from '../../components/DBLoading';
import ErrorButton from '../../components/ErrorButton';
import ArrowButtonLink from '../../components/ArrowButtonLink';
import Head from '../../components/ItemLists/Head';


const useStyles = makeStyles((theme: Theme) => createStyles({
	noSublistContainer: {
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
	sublistTitle: {
		marginLeft: theme.spacing(4)
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
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
	sublists: Sublist[] | undefined,
	dispatchSnack: React.Dispatch<SnackAction>,
	listId: number | null | undefined,
	motherList: ListType | undefined
}
const ListContext = React.createContext({} as ContextType)
const { Provider } = ListContext

type ListProps = {

}
const List: FC<ListProps> = ({ children }) => {
	const classes = useStyles()
	const { apiUrl } = useSWR('/api/get-api-url').data || { apiUrl: '' }
	const { authToken } = useContext(UserContext)
	const router = useRouter()
	const { locale } = router
	const translation = locale === 'fr' ? fr : en

	const listId = useMemo(() => {
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

	const motherList: ListType | undefined = useSWR([`${apiUrl}/todo/lists/`, authToken], authFetcher).data?.find((item: ListType) => item.id === listId)
	const sublists: Sublist[] | undefined = useSWR([`${apiUrl}/todo/sublists/`, authToken], authFetcher).data

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
		sublists,
		dispatchSnack,
		listId,
		motherList
	}), [classes, translation, apiUrl, authToken, sublists, dispatchSnack, listId, motherList])

	return (
		<Provider value={value}>
			<LoginRequired>
				{children}
			</LoginRequired>
			{snack ?
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


const SublistList: FC = () => {
	const { translation, classes, sublists, listId, motherList } = useContext(ListContext)
	const sublistList = useMemo(() => {
		if (listId === undefined) {
			return undefined
		}
		if (listId === null) {
			return null
		}
		return sublists?.filter(item => item.list === listId).map(sublist => <SublistItem key={`sublist-${sublist.id}`} sublist={sublist} />)
	}, [sublists])


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
					href: `/list/${listId}`,
					active: true
				}
			]
			} />

			{
				(sublistList === null)
					? (
						<div className={classes.noSublistContainer}>
							<Typography variant="h4" color="textSecondary">{translation.idError}</Typography>
							<ArrowButtonLink href="/">{translation.returnHome}</ArrowButtonLink>
						</div>
					) : (sublistList)
						? (sublistList[0])
							? sublistList
							: (
								<div className={classes.noSublistContainer}>
									<Typography color="primary" variant="h4">{translation.noSublist[0]}</Typography>
									<Typography variant="body1">{translation.noSublist[1]}</Typography>
								</div>
							)
						: (
							<DBLoading />
						)
			}
		</div>
	)
}

const SublistItem: FC<{ sublist: Sublist }> = ({ sublist }) => {
	const { classes, translation } = useContext(ListContext)
	const [modalOpen, setModalOpen] = useState(false)
	const closeModal = () => { setModalOpen(false) }
	return (
		<>
			<Item href={`/sublist/${sublist.id}`}>
				<Typography className={classes.sublistTitle} > {sublist.title}</Typography>
				<div className={classes.buttonContainer}>
					<ItemButton stopPropagation title={translation.options} onClick={() => setModalOpen(true)}><MoreHorizIcon className={classes.icon} /></ItemButton>
					<ItemButton noHoverEffect title={translation.seeSublist}><ChevronRightIcon className={classes.icon} /></ItemButton>
				</div>
			</Item>
			<SublistModal sublist={sublist} modalOpen={modalOpen} closeModal={closeModal} />
		</>
	)
}

const SublistModal: FC<{ sublist: Sublist, modalOpen: boolean, closeModal: () => void }> = ({ sublist, modalOpen, closeModal }) => {

	const { classes, translation, dispatchSnack, apiUrl, authToken, sublists } = useContext(ListContext)

	const [deleteOpen, setDeleteOpen] = useState(false)

	return (
		<CustomModal open={modalOpen} handleClose={closeModal}>
			<div className={classes.optionsContainer}>
				<Typography className={classes.optionsTitle} variant="h1" color="primary">{translation.edit}</Typography>
				<SublistEditForm sublist={sublist} />
				<Button variant="outlined" color="inherit" onClick={() => setDeleteOpen(true)} className={classes.deleteButton}>{translation.delete}</Button>
			</div>
			<SublistDeleteVerification open={deleteOpen} onClose={() => { setDeleteOpen(false) }} sublist={sublist} />
		</CustomModal>
	)
}

const SublistDeleteVerification: FC<{ sublist: Sublist, open: boolean, onClose: () => void }> = ({ sublist, open, onClose }) => {
	const { classes, translation, dispatchSnack, apiUrl, authToken, sublists } = useContext(ListContext)
	const handleDelete = () => {
		mutate(
			[`${apiUrl}/todo/sublists/`, authToken],
			(sublists || []).filter(item => item.id !== sublist.id),
			false
		)
		axios.delete(`${apiUrl}/todo/sublists/${sublist.id}/`, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				dispatchSnack({ type: 'success', message: translation.feedbacks.delete.success })
				trigger([`${apiUrl}/todo/sublists/`, authToken])
			})
			.catch(() => {
				dispatchSnack({ type: 'error', message: translation.feedbacks.delete.error })
				trigger([`${apiUrl}/todo/sublists/`, authToken])
			})
	}
	return (
		<CustomModal open={open} handleClose={onClose}>
			<div className={classes.optionsContainer}>
				<Typography className={classes.optionsTitle} variant="h1" color="error">{translation.warning}</Typography>
				<Typography variant="body1">{translation.warningMessage[0]} &nbsp; {sublist.title}</Typography>
				<Typography variant="body1">{translation.warningMessage[1]}</Typography>
				<Typography variant="body1">{translation.warningMessage[2]}</Typography>
				<ErrorButton onClick={handleDelete} variant="outlined" className={classes.deleteButton}>{translation.delete}</ErrorButton>
			</div>
		</CustomModal>
	)
}

const SublistEditForm: FC<{ sublist: Sublist }> = ({ sublist }) => {
	const { apiUrl, authToken, classes, translation, dispatchSnack, sublists } = useContext(ListContext)

	const initialState: SublistEditFormState = {
		data: {
			title: sublist.title
		}
	}
	const editReducer = getSublistEditFormReducer(initialState, translation, dispatchSnack)
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
			[`${apiUrl}/todo/sublists/`, authToken],
			[...sublists!].map(item => {
				let newSublist = { ...item }
				if (item.id === sublist.id) {
					newSublist.title = state.data.title;
				}
				return newSublist
			}),
			false
		)
		axios.patch(`${apiUrl}/todo/sublists/${sublist.id}/`, {
			title: state.data.title
		}, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				dispatch({ type: "success" })
				trigger([`${apiUrl}/todo/sublists/`, authToken],)
			})
			.catch(err => {
				dispatch({ type: "error", error: err })
				trigger([`${apiUrl}/todo/sublists/`, authToken],)
			})
	}
	return (
		<form onSubmit={handleSubmit} className={classes.editForm}>
			<TextField required className={classes.editInput} label={translation.title} name="title" value={state.data.title} onChange={handleChange} />
			<Button type="submit" color="primary" variant="contained" className={classes.editButton}>{translation.submit}</Button>
		</form>
	)
}

const CreateSublistForm: FC = () => {
	const { classes, translation, dispatchSnack, apiUrl, authToken, sublists, listId } = useContext(ListContext)

	const isMediaPhone = useMediaQuery('(max-width: 700px)')
	const theme: Theme = useTheme()
	const navWidth = getNavWidth(isMediaPhone, theme)

	const initialState: SublistCreateFormState = {
		data: {
			title: ''
		}
	}
	const reducer = getSublistCreateFormReducer(initialState, translation, dispatchSnack)
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
			[`${apiUrl}/todo/sublists/`, authToken],
			[
				...(sublists || []),
				{
					id: Math.random(),
					list: listId,
					title: state.data.title

				}
			],
			false
		)
		axios.post(`${apiUrl}/todo/sublists/`, {
			title: state.data.title,
			list: listId
		}, {
			headers: {
				"Authorization": `Token ${authToken}`
			}
		})
			.then(() => {
				dispatch({ type: "success" })
				trigger([`${apiUrl}/todo/sublists/`, authToken],)
			})
			.catch(err => {
				dispatch({ type: "error", error: err })
				trigger([`${apiUrl}/todo/sublists/`, authToken],)
			})

	}

	return (
		<>
			<Box className={classes.createFormPaper} style={{ left: navWidth }}>
				<form className={classes.createForm} onSubmit={handleSubmit}>
					<TextField required className={classes.input} variant="outlined" name="title" label={translation.create} value={state.data.title} onChange={handleChange} />

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
		<List {...props}>
			<SublistList />
			<CreateSublistForm />
		</List>
	)
}



export default (Usage)
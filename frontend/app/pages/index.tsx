import { Box, Button, Fab, FormControl, Input, InputLabel, Paper, Snackbar, TextField, Theme, Typography, useMediaQuery } from '@material-ui/core';
import { ClassNameMap, createStyles, makeStyles, useTheme } from '@material-ui/styles';
import React, { FC, useContext, useEffect, useMemo, useReducer } from 'react';
import LoginRequired from '../components/Layout/LoginRequired';
import { getNavWidth } from '../components/Layout/Navigation';
import AddIcon from '@material-ui/icons/Add'
import { useRouter } from 'next/dist/client/router';
import { en, fr, Translation } from '../translations/List'
import { getListCreateFormReducer, ListCreateFormState } from '../reducers/List/createReducer';
import useSWR from 'swr';
import axios from 'axios';
import { UserContext } from './_app';
import Alert from '../components/Forms/Alert';
import authFetcher from '../components/authFetcher';
import { List } from '../types/dbObjects';
import Item from '../components/ItemLists/Item';
import ItemButton from '../components/ItemLists/ItemButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz'
import ChevronRightIcon from '@material-ui/icons/ChevronRight';


const useStyles = makeStyles((theme: Theme) => createStyles({
	createFormPaper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'fixed',
		bottom: 0,
		right: 0,
		boxShadow: theme.shadows[4],
		height: theme.spacing(11.5),
		padding: `${theme.spacing(2)}px ${theme.spacing(2)}px`
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
	listTitle: {
		marginLeft: theme.spacing(4)
	},
	buttonContainer: {
		display: 'flex',
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'center',
		height: '100%'
	},
	icon: { display: 'grid', placeItems: 'center' }
}))


type ContextType = {
	classes: ClassNameMap,
	translation: Translation,
	apiUrl: string,
	authToken: string,
	lists: List[] | undefined
}
const HomeContext = React.createContext({} as ContextType)
const { Provider } = HomeContext

type HomeProps = {

}
const Home: FC<HomeProps> = ({ children }) => {
	const classes = useStyles()
	const { apiUrl } = useSWR('/api/get-api-url').data || { apiUrl: '' }
	const { authToken } = useContext(UserContext)
	const router = useRouter()
	const { locale } = router
	const translation = locale === 'fr' ? fr : en

	const lists: List[] | undefined = useSWR([`${apiUrl}/todo/lists/`, authToken], authFetcher).data


	const value = useMemo(() => ({
		classes,
		translation,
		apiUrl,
		authToken,
		lists
	}), [classes, translation, apiUrl, authToken, lists])

	return (
		<Provider value={value}>
			<LoginRequired>
				{children}
			</LoginRequired>
		</Provider>
	)
}


const ListList: FC = () => {
	const { translation, classes, lists } = useContext(HomeContext)
	const listList = useMemo(() => lists?.map(list => <ListItem key={`list-${list.id}`} list={list} />), [lists])
	return (
		<div style={{ width: '100%' }}>
			{listList}
		</div>
	)
}

const ListItem: FC<{ list: List }> = ({ list }) => {
	const { classes, translation } = useContext(HomeContext)
	return (
		<Item style={{ color: list.color }} href={`/list/${list.id}`}>
			<Typography color="inherit" className={classes.listTitle} > {list.title}</Typography>
			<div className={classes.buttonContainer}>
				<ItemButton stopPropagation title="Edit"><MoreHorizIcon className={classes.icon} /></ItemButton>
				<ItemButton noHoverEffect title="See list"><ChevronRightIcon className={classes.icon} /></ItemButton>
			</div>
		</Item>
	)
}


const CreateListForm: FC = () => {
	const { classes, translation, apiUrl, authToken } = useContext(HomeContext)

	const isMediaPhone = useMediaQuery('(max-width: 700px)')
	const theme: Theme = useTheme()
	const navWidth = getNavWidth(isMediaPhone, theme)

	const initialState: ListCreateFormState = {
		data: {
			title: '',
			color: '#000000'
		},
		snack: {
			severity: 'info',
			message: '',
			open: false
		}
	}
	const reducer = getListCreateFormReducer(initialState, translation)
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
			})
			.catch(err => dispatch({ type: "error", error: err }))

	}

	const closeSnackBar = (e?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch({ type: "closeSnack" })
	}
	return (
		<>
			<Box className={classes.createFormPaper} style={{ left: navWidth }}>
				<form className={classes.createForm} onSubmit={handleSubmit}>
					<TextField className={classes.input} variant="outlined" name="title" label={translation.create} value={state.data.title} onChange={handleChange} />
					{isMediaPhone ? null :
						<div className={classes.colorPickerContainer}>
							<label><Typography variant="caption" color="textSecondary">{translation.color}</Typography></label>
							<input className={classes.colorPicker} type="color" name="color" value={state.data.color} onChange={handleChange} />
						</div>
					}

					<Fab className={classes.plusbutton} color="primary" type="submit"><AddIcon /></Fab>
				</form>
				{state.snack ?
					<Snackbar
						className={classes.snackBar}
						open={state.snack.open}
						onClose={closeSnackBar}
						autoHideDuration={5000}
						anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
					>
						<Alert severity={state.snack.severity}>{state.snack.message}</Alert>
					</Snackbar>
					: null
				}
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
import { Button, CircularProgress, Container, createStyles, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core'
import axios from 'axios'
import { FC, useReducer } from 'react'
import useSWR from 'swr'
import PageForm from '../components/Forms/PageForm'
import { getSignupFormReducer, SignupFormState } from '../reducers/signupReducer'

const useStyles = makeStyles((theme: Theme) => createStyles({
	title: {
		width: '100%',
		textAlign: 'start',
		marginBottom: theme.spacing(4),
		marginLeft: -theme.spacing(2)
	},
	input: {
		marginBottom: theme.spacing(2)
	},
	button: {
		marginTop: theme.spacing(3),
		marginRight: 0,
		marginLeft: 'auto'
	}
}))

type Props = {

}
const Signup: FC<Props> = () => {
	const classes = useStyles()
	const { apiUrl } = useSWR('/api/get-api-url/').data || { apiUrl: '' }

	const initialState: SignupFormState = {
		data: {
			email: '',
			username: '',
			password1: '',
			password2: ''
		},
		snack: {
			severity: 'success',
			message: '',
			open: false
		},
		passwordMatch: true,
		error: false,
		loading: false
	}
	const reducer = getSignupFormReducer(initialState)
	const [state, dispatch] = useReducer(reducer, initialState)

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: "patch",
			data: {
				[e.target.name]: e.target.value
			}
		})
	}

	const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		dispatch({ type: "loadingStart" })
		try {
			localStorage.setItem('authToken', '')
			if (state.data.password1 === state.data.password2) {
				axios.post(`${apiUrl}/users/create/`, {
					email: state.data.email,
					username: state.data.username,
					password: state.data.password1
				})
					.then(() => {
						axios.post(`${apiUrl}/users/token/`, {
							email: state.data.email,
							password: state.data.password1
						})
							.then(res => {
								dispatch({
									type: "login",
									token: res.data.token
								})
							})
							.catch(() => {
								dispatch({ type: "error" })
							})
					})
					.catch(() => {
						dispatch({ type: "error" })
					})
			} else {
				dispatch({ type: "error" })
			}
		} catch {
			dispatch({ type: "noCookie" })
		}
	}

	const closeSnackBar = (e?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch({ type: "closeSnack" })
	}

	return (
		<PageForm
			onSubmit={handleSubmit}
			snackBarData={state.snack}
			closeSnackBar={closeSnackBar}
		>
			<Typography
				className={classes.title}
				color="primary"
				variant="h1"
			>
				Signup
			</Typography>
			<TextField className={classes.input} label="Email" type="email" required name="email" value={state.data.email} onChange={handleChange} />
			<TextField className={classes.input} label="Username" required name="username" value={state.data.username} onChange={handleChange} />
			{state.passwordMatch ? null : <Typography color="error" variant="caption">The passwords do not match.</Typography>}
			<TextField className={classes.input} label="Password" type="password" required name="password1" value={state.data.password1} onChange={handleChange} />
			<TextField className={classes.input} label="Password (confirm)" type="password" required name="password2" value={state.data.password2} onChange={handleChange} />
			{
				state.loading
					? <Button className={classes.button} color="primary" variant="contained"><CircularProgress color="inherit" size={24} /></Button>
					: <Button className={classes.button} type="submit" color="primary" variant="contained">Submit</Button>
			}
		</PageForm>
	)
}

export default Signup
import { Button, CircularProgress, createStyles, makeStyles, TextField, Theme, Typography, IconButton, Input, FormControl } from '@material-ui/core'
import axios from 'axios'
import { FC, useContext, useReducer } from 'react'
import useSWR from 'swr'
import PageForm from '../components/Forms/PageForm'
import { getSignupFormReducer, SignupFormState } from '../reducers/signupReducer'
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { UserContext } from './_app'
import { useRouter } from 'next/dist/client/router'
import { en, fr } from '../translations/User/Signup'

const useStyles = makeStyles((theme: Theme) => createStyles({
	title: {
		width: '100%',
		textAlign: 'start',
		marginBottom: theme.spacing(2),
		marginLeft: -theme.spacing(4)
	},
	input: {
		marginBottom: theme.spacing(2),
		width: '100%'
	},
	smallLabel: {
		fontSize: theme.spacing(1.8)
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

	const router = useRouter()
	const { locale } = router
	const translation = locale === 'fr' ? fr : en

	const { apiUrl } = useSWR('/api/get-api-url/').data || { apiUrl: '' }
	const { setAuthToken } = useContext(UserContext)

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
		showPasswords: {
			password1: false,
			password2: false
		},
		passwordMatch: true,
		error: {
			email: false,
			username: false
		},
		loading: false
	}
	const reducer = getSignupFormReducer(initialState, translation)
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
			localStorage.getItem('authToken')
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
								setAuthToken(res.data.token)
								router.push('/')
							})
							.catch(err => {
								dispatch({ type: "error", error: err })
							})
					})
					.catch(err => {
						dispatch({ type: "error", error: err })
					})
			} else {
				dispatch({ type: "error", error: { type: "password" } })
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

	const handleClickShowPassword = (name: 'password1' | 'password2') => () => {
		dispatch({ type: "passwordVisibility", password: name, value: !state.showPasswords[name] })
	}
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
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
				{translation.title}
			</Typography>
			{state.error.email ? <Typography variant="caption" color="error">{translation.error.email}</Typography> : null}
			<TextField className={classes.input} label={translation.fields.email} type="email" required name="email" value={state.data.email} onChange={handleChange} />
			{state.error.username ? <Typography variant="caption" color="error">{translation.error.username}</Typography> : null}
			<TextField className={classes.input} label={translation.fields.username} required name="username" value={state.data.username} onChange={handleChange} />
			{state.passwordMatch ? null : <Typography color="error" variant="caption">{translation.error.password}</Typography>}
			<FormControl className={classes.input}>
				<InputLabel required>{translation.fields.password1}</InputLabel>
				<Input type={state.showPasswords.password1 ? "text" : "password"} required name="password1" value={state.data.password1} onChange={handleChange} endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword('password1')}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{state.showPasswords.password1 ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				} />
			</FormControl>
			<FormControl className={classes.input}>
				<InputLabel className={classes.smallLabel} required>{translation.fields.password2}</InputLabel>
				<Input type={state.showPasswords.password2 ? "text" : "password"} required name="password2" value={state.data.password2} onChange={handleChange} endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword('password2')}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{state.showPasswords.password2 ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				} />
			</FormControl>
			{
				state.loading
					? <Button className={classes.button} color="primary" variant="contained"><CircularProgress color="inherit" size={24} /></Button>
					: <Button className={classes.button} type="submit" color="primary" variant="contained">{translation.button}</Button>
			}
		</PageForm>
	)
}

export default Signup
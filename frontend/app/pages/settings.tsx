import { Button, CircularProgress, Container, createStyles, FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles, Paper, Snackbar, TextField, Theme, Typography } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import axios from 'axios'
import { useRouter } from 'next/dist/client/router'
import React, { FC, useContext, useEffect, useReducer } from 'react'
import useSWR from 'swr'
import Alert from '../components/Forms/Alert'
import PageForm from '../components/Forms/PageForm'
import { getSettingsFormReducer, SettingsFormState } from '../reducers/settingsReducer'
import { UserContext } from './_app'
import { en, fr } from '../translations/User/Settings'
import authFetcher from '../components/authFetcher'


const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		display: 'grid',
		placeItems: 'center'
	},
	formPaper: {
		padding: `${theme.spacing(5)}px ${theme.spacing(6)}px`
	},
	form: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
	},
	title: {
		width: '100%',
		textAlign: 'start',
		marginBottom: theme.spacing(2),
		marginLeft: -theme.spacing(5)
	},
	subtitle: {
		width: '100%',
		textAlign: 'start',
		marginBottom: theme.spacing(1),
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
const Settings: FC<Props> = () => {
	const classes = useStyles()

	const router = useRouter()
	const { locale } = router
	const translation = locale === "fr" ? fr : en
	const { apiUrl } = useSWR('/api/get-api-url/').data || { apiUrl: '' }
	const { authToken } = useContext(UserContext)

	const initialState: SettingsFormState = {
		data: {
			email: '',
			username: '',
			name: '',
			password1: '',
			password2: ''
		},
		showPasswords: {
			password1: false,
			password2: false
		},
		snack: {
			severity: 'info',
			message: '',
			open: false
		},
		error: {
			email: false,
			username: false
		},
		passwordMatch: true,
		loading: {
			general: false,
			password: false
		}
	}

	const reducer = getSettingsFormReducer(initialState, translation)
	const [state, dispatch] = useReducer(reducer, initialState)

	const userData = useSWR([`${apiUrl}/users/me`, authToken], authFetcher).data
	useEffect(() => {
		if (userData) {
			dispatch({
				type: 'patch',
				data: {
					email: userData.email,
					username: userData.username,
					name: userData.name
				}
			})
		}
	}, [userData])


	const closeSnackBar = (e?: React.SyntheticEvent, reason?: string) => {
		if (reason === 'clickaway') {
			return;
		}
		dispatch({ type: "closeSnack" })
	}

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: 'patch',
			data: {
				[e.target.name]: e.target.value
			}
		})
	}

	const handleClickShowPassword = (name: 'password1' | 'password2') => () => {
		dispatch({ type: "passwordVisibility", password: name, value: !state.showPasswords[name] })
	}
	const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
		event.preventDefault();
	}

	const handleSubmitGeneral: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		dispatch({ type: "loadingStart", form: "general" })
		try {
			const authToken = localStorage.getItem('authToken')
			axios.patch(`${apiUrl}/users/me/`, {
				email: state.data.email,
				username: state.data.username,
				name: state.data.name
			}, {
				headers: {
					"Authorization": `Token ${authToken}`
				}
			})
				.then(() => {
					dispatch({ type: "success", form: "general" })
				})
				.catch(err => { dispatch({ type: "error", form: "general", error: err }) })

		} catch {
			dispatch({ type: "noCookie" })
		}
	}

	const handleSubmitPassword: React.FormEventHandler<HTMLFormElement> = (e) => {
		e.preventDefault()
		dispatch({ type: "loadingStart", form: "password" })
		try {
			const authToken = localStorage.getItem('authToken')
			if (state.passwordMatch) {
				axios.patch(`${apiUrl}/users/me/`, {
					password: state.data.password1
				}, {
					headers: {
						"Authorization": `Token ${authToken}`
					}
				})
					.then(() => dispatch({ type: "success", form: "password" }))
					.catch(err => dispatch({ type: "error", form: "password", error: err }))
			} else {
				dispatch({
					type: "error",
					form: "password",
					error: {
						type: "password"
					}
				})
			}
		} catch {
			dispatch({ type: "noCookie" })
		}
	}

	return (
		<>
			<Container className={classes.container}>
				<Paper className={classes.formPaper} elevation={3}>

					<form className={classes.form} onSubmit={handleSubmitGeneral}>
						<Typography variant="h1" color="primary" className={classes.title}>{translation.title}</Typography>
						<Typography variant="h2" color="primary" className={classes.subtitle}>{translation.forms.general}</Typography>
						{state.error.email ? <Typography variant="caption" color="error">{translation.error.email}</Typography> : null}
						<TextField className={classes.input} label={translation.fields.email} name="email" value={state.data.email} onChange={handleChange} required />
						{state.error.username ? <Typography variant="caption" color="error">{translation.error.username}</Typography> : null}
						<TextField className={classes.input} label={translation.fields.username} name="username" value={state.data.username} onChange={handleChange} required />
						<TextField className={classes.input} label={translation.fields.name} name="name" value={state.data.name} onChange={handleChange} />
						{
							state.loading.general
								? <Button className={classes.button} color="primary" variant="contained"><CircularProgress color="inherit" size={24} /></Button>
								: <Button className={classes.button} type="submit" color="primary" variant="contained">{translation.button}</Button>
						}
					</form>

					<form className={classes.form} onSubmit={handleSubmitPassword}>
						<Typography variant="h2" color="primary" className={classes.subtitle} style={{ marginTop: '1em' }}>{translation.forms.password}</Typography>
						{state.passwordMatch ? null : <Typography color="error" variant="caption">{translation.error.password}</Typography>}
						<FormControl className={classes.input} >
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
						<FormControl className={classes.input}  >
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
							state.loading.password
								? <Button className={classes.button} color="primary" variant="contained"><CircularProgress color="inherit" size={24} /></Button>
								: <Button className={classes.button} type="submit" color="primary" variant="contained">{translation.button}</Button>
						}
					</form>

				</Paper>
			</Container>


			{state.snack ?
				<Snackbar
					open={state.snack.open}
					onClose={closeSnackBar}
					autoHideDuration={5000}
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				>
					<Alert severity={state.snack.severity}>{state.snack.message}</Alert>
				</Snackbar>
				: null
			}
		</>
	)
}

export default Settings
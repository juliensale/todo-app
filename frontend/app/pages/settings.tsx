import { Button, CircularProgress, Container, createStyles, FormControl, IconButton, Input, InputAdornment, InputLabel, makeStyles, Paper, Snackbar, TextField, Theme, Typography } from '@material-ui/core'
import { Visibility, VisibilityOff } from '@material-ui/icons'
import React, { FC, useReducer } from 'react'
import Alert from '../components/Forms/Alert'
import PageForm from '../components/Forms/PageForm'
import { getSettingsFormReducer, SettingsFormState } from '../reducers/settingsReducer'


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
		error: false,
		passwordMatch: true,
		loading: {
			general: false,
			password: false
		}
	}

	const reducer = getSettingsFormReducer(initialState)
	const [state, dispatch] = useReducer(reducer, initialState)

	const closeSnackBar = () => {
		dispatch({ type: 'closeSnack' })
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


	return (
		<>
			<Container className={classes.container}>
				<Paper className={classes.formPaper} elevation={3}>
					<form className={classes.form} >
						<Typography variant="h1" color="primary" className={classes.title}>Settings</Typography>
						<Typography variant="h2" color="primary" className={classes.subtitle}>General</Typography>
						<TextField className={classes.input} label="Email" name="email" value={state.data.email} onChange={handleChange} required />
						<TextField className={classes.input} label="Username" name="username" value={state.data.username} onChange={handleChange} required />
						<TextField className={classes.input} label="Full Name" name="name" value={state.data.name} onChange={handleChange} />
						{
							state.loading.general
								? <Button className={classes.button} color="primary" variant="contained"><CircularProgress color="inherit" size={24} /></Button>
								: <Button className={classes.button} type="submit" color="primary" variant="contained">Submit</Button>
						}
					</form>
					<form className={classes.form} >
						<Typography variant="h2" color="primary" className={classes.subtitle} style={{ marginTop: '1em' }}>Change Password</Typography>
						<FormControl className={classes.input} >
							<InputLabel required>Password</InputLabel>
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
							<InputLabel required>Password (confirm)</InputLabel>
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
								: <Button className={classes.button} type="submit" color="primary" variant="contained">Submit</Button>
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
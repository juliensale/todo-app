import { Button, CircularProgress, createStyles, makeStyles, TextField, Theme, Typography, FormControl, IconButton, Input } from '@material-ui/core'
import React, { FC, useContext, useReducer } from 'react'
import { getLoginFormReducer, LoginFormState } from '../reducers/loginReducer'
import PageForm from '../components/Forms/PageForm'
import axios from 'axios'
import useSWR from 'swr'
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff'
import { UserContext } from './_app'
import { useRouter } from 'next/dist/client/router'
import { en, fr } from '../translations/User/Login'

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
	button: {
		marginTop: theme.spacing(3),
		marginRight: 0,
		marginLeft: 'auto'
	}
}))

type Props = {

}
const Login: FC<Props> = () => {
	const classes = useStyles()

	const router = useRouter()
	const { locale } = router
	const translation = locale === 'fr' ? fr : en

	const { apiUrl } = useSWR('/api/get-api-url/').data || { apiUrl: '' }
	const { setAuthToken } = useContext(UserContext)
	const initialState: LoginFormState = {
		data: {
			email: '',
			password: ''
		},
		snack: {
			severity: 'info',
			message: '',
			open: false
		},
		showPassword: false,
		error: false,
		loading: false
	}
	const loginReducer = getLoginFormReducer(initialState)
	const [state, dispatch] = useReducer(loginReducer, initialState)

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
			axios.post(`${apiUrl}/users/token/`, state.data)
				.then(res => {
					dispatch({
						type: "login",
						token: res.data.token
					})
					setAuthToken(res.data.token)
				})
				.catch(() => {
					dispatch({ type: "error" })
				})
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

	const handleClickShowPassword = () => {
		dispatch({
			type: "passwordVisibility",
			value: !state.showPassword
		})
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
			<TextField className={classes.input} label={translation.fields.email} type="email" name="email" required value={state.data.email} onChange={handleChange} />
			<FormControl >
				<InputLabel required>{translation.fields.password}</InputLabel>
				<Input className={classes.input} type={state.showPassword ? "text" : "password"} required name="password" value={state.data.password} onChange={handleChange} endAdornment={
					<InputAdornment position="end">
						<IconButton
							aria-label="toggle password visibility"
							onClick={handleClickShowPassword}
							onMouseDown={handleMouseDownPassword}
							edge="end"
						>
							{state.showPassword ? <Visibility /> : <VisibilityOff />}
						</IconButton>
					</InputAdornment>
				} />
			</FormControl>
			{state.loading
				? <Button className={classes.button} color="primary" variant="contained"><CircularProgress color="inherit" size={24} /></Button>
				: <Button className={classes.button} type="submit" color="primary" variant="contained">{translation.button}</Button>
			}
		</PageForm>
	)
}

export default Login
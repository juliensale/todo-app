import { Button, CircularProgress, createStyles, makeStyles, TextField, Theme, Typography } from '@material-ui/core'
import React, { FC, useEffect, useReducer } from 'react'
import { getLoginFormReducer, LoginFormState } from '../reducers/loginReducer'
import PageForm from '../components/Forms/PageForm'
import axios from 'axios'
import useSWR from 'swr'

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
const Login: FC<Props> = () => {
	const classes = useStyles()
	const { apiUrl } = useSWR('/api/get-api-url/').data || { apiUrl: '' }
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
					console.log('success')
				})
				.catch(() => {
					dispatch({ type: "error" })
					console.log('error')
				})
		} catch {
			dispatch({ type: "noCookie" })
			console.log('No cookie')
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
				Login
			</Typography>
			<TextField className={classes.input} label="Email" type="email" name="email" required value={state.data.email} onChange={handleChange} />
			<TextField className={classes.input} label="Password" type="password" name="password" required value={state.data.password} onChange={handleChange} />
			{state.loading
				? <Button className={classes.button} color="primary" variant="contained"><CircularProgress color="inherit" size={24} /></Button>
				: <Button className={classes.button} type="submit" color="primary" variant="contained">Submit</Button>
			}
		</PageForm>
	)
}

export default Login
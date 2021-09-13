import { Button, Container, createStyles, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core'
import React, { FC, useReducer } from 'react'
import { getLoginFormReducer, LoginFormState } from '../reducers/loginReducer'
import PageForm from '../components/Forms/PageForm'

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
	const initialState: LoginFormState = {
		data: {
			email: '',
			password: ''
		},
		error: {
			email: null,
			password: null

		},
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

	return (
		<PageForm>
			<Typography
				className={classes.title}
				color="primary"
				variant="h1"
			>
				Login
			</Typography>
			<TextField className={classes.input} label="Email" type="email" name="email" required value={state.data.email} onChange={handleChange} />
			<TextField className={classes.input} label="Password" type="password" name="password" required value={state.data.password} onChange={handleChange} />
			<Button className={classes.button} type="submit" color="primary" variant="contained">Submit</Button>
		</PageForm>
	)
}

export default Login
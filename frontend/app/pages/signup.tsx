import { Button, Container, createStyles, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core'
import { FC, useReducer } from 'react'
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

	return (
		<PageForm>
			<Typography
				className={classes.title}
				color="primary"
				variant="h1"
			>
				Signup
			</Typography>
			<TextField className={classes.input} label="Email" type="email" required name="email" value={state.data.email} onChange={handleChange} />
			<TextField className={classes.input} label="Username" required name="username" value={state.data.username} onChange={handleChange} />
			<TextField className={classes.input} label="Password" type="password" required name="password1" value={state.data.password1} onChange={handleChange} />
			<TextField className={classes.input} label="Password (confirm)" type="password" required name="password2" value={state.data.password2} onChange={handleChange} />
			<Button className={classes.button} type="submit" color="primary" variant="contained">Submit</Button>
		</PageForm>
	)
}

export default Signup
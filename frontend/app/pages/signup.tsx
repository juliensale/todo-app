import { Button, Container, createStyles, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core'
import { FC } from 'react'
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
const Signup: FC<Props> = () => {
	const classes = useStyles()
	return (
		<PageForm>
			<Typography
				className={classes.title}
				color="primary"
				variant="h1"
			>
				Signup
			</Typography>
			<TextField className={classes.input} label="Email" type="email" required />
			<TextField className={classes.input} label="Username" required />
			<TextField className={classes.input} label="Password" type="password" required />
			<TextField className={classes.input} label="Password (confirm)" type="password" required />
			<Button className={classes.button} type="submit" color="primary" variant="contained">Submit</Button>
		</PageForm>
	)
}

export default Signup
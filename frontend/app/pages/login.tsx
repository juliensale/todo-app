import { Button, Container, createStyles, makeStyles, Paper, TextField, Theme, Typography } from '@material-ui/core'
import { FC } from 'react'

const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		display: 'grid',
		placeItems: 'center'
	},
	formPaper: {
		padding: `${theme.spacing(5)}px ${theme.spacing(8)}px`
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
	return (
		<Container className={classes.container}>
			<Paper className={classes.formPaper} elevation={3}>
				<form className={classes.form}>
					<Typography
						className={classes.title}
						color="primary"
						variant="h1"
					>
						Login
					</Typography>
					<TextField className={classes.input} label="Email" type="email" required />
					<TextField className={classes.input} label="Password" type="password" required />
					<Button className={classes.button} type="submit" color="primary" variant="contained">Submit</Button>
				</form>
			</Paper>
		</Container>
	)
}

export default Login
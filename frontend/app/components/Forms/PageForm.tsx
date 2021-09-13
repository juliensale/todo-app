import { Container, createStyles, makeStyles, Paper, Theme } from '@material-ui/core'
import React, { FC } from 'react'

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
	}
}))

type Props = {
	children: React.ReactNode | React.ReactNode[],
	onSubmit?: React.FormEventHandler<HTMLFormElement>
}
const PageForm: FC<Props> = ({ children, onSubmit }) => {
	const classes = useStyles()
	return (

		<Container className={classes.container}>
			<Paper className={classes.formPaper} elevation={3}>
				<form className={classes.form} onSubmit={onSubmit}>
					{children}
				</form>
			</Paper>
		</Container>

	)
}

export default PageForm
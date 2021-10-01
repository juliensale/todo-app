import { Container, createStyles, Snackbar, makeStyles, Paper, Theme } from '@material-ui/core'
import { Color } from '@material-ui/lab'
import React, { FC, useContext } from 'react'
import { UserContext } from '../../pages/_app'
import Alert from './Alert'

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
	onSubmit?: React.FormEventHandler<HTMLFormElement>,
	snackBarData?: {
		severity: Color,
		message: string,
		open: boolean
	},
	closeSnackBar?: (e?: React.SyntheticEvent, reason?: string) => void
}
const PageForm: FC<Props> = ({ children, onSubmit, snackBarData, closeSnackBar }) => {
	const classes = useStyles()
	const { snackBarActive } = useContext(UserContext)
	return (
		<>
			<Container className={classes.container}>
				<Paper className={classes.formPaper} elevation={3}>
					<form className={classes.form} onSubmit={onSubmit}>
						{children}
					</form>
				</Paper>
			</Container>
			{snackBarActive && snackBarData ?
				<Snackbar
					open={snackBarData.open}
					onClose={closeSnackBar}
					autoHideDuration={5000}
					anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
				>
					<Alert severity={snackBarData.severity}>{snackBarData.message}</Alert>
				</Snackbar>
				: null
			}
		</>

	)
}

export default PageForm
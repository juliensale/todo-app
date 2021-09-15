import { Button, Container, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import { useRouter } from 'next/dist/client/router'
import React, { FC, useContext } from 'react'
import { UserContext } from '../../pages/_app'
import { en, fr } from '../../translations/User/Logout'
import CustomModal from '../CustomModal'

const useStyles = makeStyles((theme: Theme) => createStyles({

	logoutModalContainer: {
		paddingTop: theme.spacing(3),
		paddingBottom: theme.spacing(3),
		fontSize: '.9em'
	},
	logoutButtonContainer: {
		display: 'flex',
		marginTop: theme.spacing(3)
	},
	logoutButton: {

		marginLeft: 'auto',
		marginRight: 0
	},
	title: {
		width: '100%',
		textAlign: 'start',
		marginBottom: theme.spacing(2)
	},
}))

type Props = {
	modalOpen: boolean,
	closeModal: () => void
}
const Logout: FC<Props> = ({ modalOpen, closeModal }) => {
	const { setAuthToken } = useContext(UserContext)
	const classes = useStyles()
	const router = useRouter()
	const { locale } = router
	const translation = locale === 'fr' ? fr : en
	const handleLogout = () => {
		setAuthToken('')
		closeModal()
		try {
			localStorage.removeItem('authToken')
		} catch { }
	}
	return (
		<CustomModal open={modalOpen} handleClose={() => { closeModal() }}>
			<Container className={classes.logoutModalContainer}>
				<Typography className={classes.title} variant="h1" color="error">{translation.title}</Typography>
				<Typography>
					{translation.message}
				</Typography>
				<Typography color="error" className={classes.logoutButtonContainer}>
					<Button color="inherit" variant="outlined" className={classes.logoutButton}
						onClick={handleLogout}
					>{translation.button}</Button>
				</Typography>
			</Container>
		</CustomModal>
	)
}

export default Logout
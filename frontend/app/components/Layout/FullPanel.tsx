import { useContext, useState } from "react"
import { NavigationContext } from "./Navigation"
import { Button, Container, createStyles, makeStyles, Modal, Paper, Switch, Theme, Typography } from '@material-ui/core'
import Image from 'next/image'
import { Brightness2 as MoonIcon } from '@material-ui/icons';
import React, { FC, useMemo } from 'react';
import { ClassNameMap } from "@material-ui/styles";
import LinkButton from "./LinkButton";
import NavButton from "./NavButton";
import CustomModal from "../CustomModal";
import { UserContext } from "../../pages/_app";
import { useRouter } from "next/dist/client/router";
import { en as logoutEn, fr as logoutFr } from '../../translations/User/Logout'

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		logoContainer: {
			display: 'grid',
			placeItems: 'center',
			marginTop: '.5em',
			marginBottom: '1.5em'
		},
		switchContainer: {
			display: 'flex',
			flexDirection: 'row',
			alignItems: 'center',
			justifyContent: 'center'
		},
		moon: {
			color: '#ffa200'
		},
		linksContainer: {
			display: 'flex',
			flexDirection: 'column',
			alignItems: 'center',
			justifyContent: 'flex-start'
		},
		firstLink: {
			borderTop: `1px solid ${theme.palette.divider}`
		},
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
	})
})

type ContextType = {
	classes: ClassNameMap,
	darkMode: boolean,
	switchDarkMode: () => void
}
const FullPanelContext = React.createContext({} as ContextType)
const { Provider } = FullPanelContext

const FullPanel: FC = ({ children }) => {
	const { darkMode, switchDarkMode } = useContext(NavigationContext)
	const classes = useStyles()
	const value = useMemo(() => ({
		classes,
		darkMode,
		switchDarkMode
	}), [classes, darkMode, switchDarkMode])

	return (
		<Provider value={value}>
			{children}
		</Provider>
	)
}

const Logo: FC = () => {
	const { classes } = useContext(FullPanelContext)
	return (
		<div className={classes.logoContainer}>
			<Image src="/PWA/apple-icon.png" alt="Checker Logo" width={50} height={50} />
		</div>
	)
}

const DarkModeSwitcher: FC = () => {
	const { classes, darkMode, switchDarkMode } = useContext(FullPanelContext)

	return (
		<div className={classes.switchContainer} title="Set Dark Mode">
			<Switch
				color="primary"
				checked={darkMode}
				onChange={switchDarkMode}
			/>
			<MoonIcon className={classes.moon} />
		</div>
	)
}

const User: FC = () => {
	const { classes } = useContext(FullPanelContext)
	const router = useRouter()
	const { locale } = router
	const logoutTranslation = locale === 'fr' ? logoutFr : logoutEn
	const { authToken, setAuthToken } = useContext(UserContext)

	const [modalOpen, setModalOpen] = useState(false)
	const handleLogout = () => {
		setAuthToken('')
		try {
			localStorage.removeItem('authToken')
		} catch { }
	}
	return (
		<div
			className={classes.linksContainer}
			style={{
				marginBottom: 0,
				marginTop: 'auto'
			}}
		>
			{authToken
				? <>
					<LinkButton href="/settings" className={classes.firstLink}>Settings</LinkButton>
					<NavButton color="error" onClick={() => setModalOpen(true)}>Logout</NavButton>
					<CustomModal open={modalOpen} handleClose={() => { setModalOpen(false) }}>
						<Container className={classes.logoutModalContainer}>
							<Typography className={classes.title} variant="h1" color="error">{logoutTranslation.title}</Typography>
							<Typography>
								{logoutTranslation.message}
							</Typography>
							<Typography color="error" className={classes.logoutButtonContainer}>
								<Button color="inherit" variant="outlined" className={classes.logoutButton}
									onClick={handleLogout}
								>{logoutTranslation.button}</Button>
							</Typography>
						</Container>
					</CustomModal>
				</>
				: <>
					<LinkButton href="/login" className={classes.firstLink}>Login</LinkButton>
					<LinkButton href="/signup">Signup</LinkButton>
				</>
			}
		</div>
	)
}

type UsageProps = {

}
const Usage: FC<UsageProps> = (props) => {
	return (
		<FullPanel {...props}>
			<Container >
				<Logo />
				<DarkModeSwitcher />
			</Container>
			<User />
		</FullPanel>
	)
}

export default (Usage)
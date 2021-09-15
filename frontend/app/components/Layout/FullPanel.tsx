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
import { en, fr, Translation } from '../../translations/Navigation'
import { en as logoutEn, fr as logoutFr } from '../../translations/User/Logout'
import Logout from "./Logout";

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
	})
})

type ContextType = {
	classes: ClassNameMap,
	darkMode: boolean,
	switchDarkMode: () => void,
	translation: Translation
}
const FullPanelContext = React.createContext({} as ContextType)
const { Provider } = FullPanelContext

const FullPanel: FC = ({ children }) => {
	const { darkMode, switchDarkMode } = useContext(NavigationContext)
	const router = useRouter()
	const { locale } = router
	const translation = locale === 'fr' ? fr : en
	const classes = useStyles()
	const value = useMemo(() => ({
		classes,
		darkMode,
		switchDarkMode,
		translation
	}), [classes, darkMode, switchDarkMode, translation])

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
	const { classes, darkMode, switchDarkMode, translation } = useContext(FullPanelContext)

	return (
		<div className={classes.switchContainer} title={translation.dark}>
			<Switch
				color="primary"
				checked={darkMode}
				onChange={switchDarkMode}
			/>
			<MoonIcon className={classes.moon} />
		</div>
	)
}

const Links: FC = () => {
	const { classes, translation } = useContext(FullPanelContext)
	return (
		<>
			<LinkButton className={classes.firstLink} href="/">{translation.home}</LinkButton>
		</>
	)
}

const User: FC = () => {
	const { classes, translation } = useContext(FullPanelContext)
	const { authToken } = useContext(UserContext)
	const { openLogout } = useContext(NavigationContext)


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
					<LinkButton href="/settings" className={classes.firstLink}>{translation.settings}</LinkButton>
					<NavButton color="error" onClick={openLogout}>{translation.logout}</NavButton>
				</>
				: <>
					<LinkButton href="/login" className={classes.firstLink}>{translation.login}</LinkButton>
					<LinkButton href="/signup">{translation.signup}</LinkButton>
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
			<Links />
			<User />
		</FullPanel>
	)
}

export default (Usage)
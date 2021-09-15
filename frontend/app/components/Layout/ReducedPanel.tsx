import React, { FC, useMemo, useState } from 'react';
import { ClassNameMap } from "@material-ui/styles";
import { useContext } from "react"
import { NavigationContext } from "./Navigation"
import { Box, ButtonBase, createStyles, makeStyles, Theme } from '@material-ui/core'
import Link from 'next/link'
import { Brightness2 as MoonIcon } from '@material-ui/icons';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import LockIcon from '@material-ui/icons/Lock';
import { UserContext } from '../../pages/_app';
import SettingsIcon from '@material-ui/icons/Settings';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import Logout from './Logout';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		container: {
			width: theme.spacing(5),
			height: '100%',
			display: 'flex',
			flexDirection: 'column'
		},
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
		clickBox: {
			padding: '.5em',
			borderBottom: `1px solid ${theme.palette.divider}`,
			width: '100%'
		},
		firstBox: {
			borderTop: `1px solid ${theme.palette.divider}`
		}
	})
})

type ContextType = {
	classes: ClassNameMap,
	darkMode: boolean,
	switchDarkMode: () => void,
	openDrawer: () => void
}
const ReducedPanelContext = React.createContext({} as ContextType)
const { Provider } = ReducedPanelContext

const ReducedPanel: FC = ({ children }) => {
	const { darkMode, switchDarkMode, openDrawer } = useContext(NavigationContext)
	const classes = useStyles()
	const value = useMemo(() => ({
		classes,
		darkMode,
		switchDarkMode,
		openDrawer
	}), [classes, darkMode, switchDarkMode, openDrawer])

	return (
		<Provider value={value}>
			<div className={classes.container}>
				{children}
			</div>
		</Provider>
	)
}


type ClickBoxProps = {
	children: React.ReactNode,
	onClick: React.MouseEventHandler<any>
}
const ClickBox: FC<ClickBoxProps> = ({ children, onClick }) => {
	const { classes } = useContext(ReducedPanelContext)
	return (
		<ButtonBase className={classes.clickBox} onClick={onClick}>
			{children}
		</ButtonBase>
	)
}

type LinkBoxProps = {
	children: React.ReactNode,
	href: string,
	style?: {},
	className?: string
}
const LinkBox: FC<LinkBoxProps> = ({ children, href, style = {}, className = '' }) => {
	const { classes } = useContext(ReducedPanelContext)
	return (
		<Link href={href}>
			<ButtonBase className={className ? `${className} ${classes.clickBox}` : classes.clickBox} style={style}>
				{children}

			</ButtonBase>
		</Link>
	)
}

const DrawerBurger: FC = () => {
	const { openDrawer } = useContext(ReducedPanelContext)
	return (
		<ClickBox onClick={openDrawer}>
			<MenuOpenIcon />
		</ClickBox>
	)
}

const DarkModeSwitcher: FC = () => {
	const { classes, darkMode, switchDarkMode } = useContext(ReducedPanelContext)

	return (
		<ClickBox onClick={switchDarkMode}>
			<MoonIcon className={classes.moon} />
		</ClickBox>
	)
}
const Links: FC = () => {
	return (
		<>
			<LinkBox href="/">
				<HomeIcon color="primary" />
			</LinkBox>
		</>
	)
}

const User: FC = () => {
	const { classes } = useContext(ReducedPanelContext)
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
					<LinkBox href="/settings" className={classes.firstBox}>
						<SettingsIcon color="primary" />
					</LinkBox>
					<ClickBox onClick={openLogout}>
						<ExitToAppIcon color="error" />
					</ClickBox>
				</>
				: <>
					<LinkBox href="/login" className={classes.firstBox}>
						<LockIcon color="primary" />
					</LinkBox>
					<LinkBox href="/signup">
						<PersonAddIcon color="primary" />
					</LinkBox>
				</>
			}

		</div>
	)
}

type UsageProps = {

}
const Usage: FC<UsageProps> = (props) => {
	return (
		<ReducedPanel {...props}>
			<DrawerBurger />
			<DarkModeSwitcher />
			<Links />
			<User />
		</ReducedPanel>
	)
}

export default (Usage)
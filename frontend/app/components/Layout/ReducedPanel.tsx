import React, { FC, useMemo } from 'react';
import { ClassNameMap } from "@material-ui/styles";
import { useContext } from "react"
import { NavigationContext } from "./Navigation"
import { Box, ButtonBase, createStyles, makeStyles, Theme } from '@material-ui/core'
import Image from 'next/image'
import { Brightness2 as MoonIcon } from '@material-ui/icons';
import MenuOpenIcon from '@material-ui/icons/MenuOpen';

const useStyles = makeStyles((theme: Theme) => {
	const darkTheme = theme.palette.type === 'dark'
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
		clickBox: {
			padding: '.5em',
			borderBottom: `1px solid ${theme.palette.divider}`

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
			{children}
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

type UsageProps = {

}
const Usage: FC<UsageProps> = (props) => {
	return (
		<ReducedPanel {...props}>
			<DrawerBurger />
			<DarkModeSwitcher />
		</ReducedPanel>
	)
}

export default (Usage)
import { useContext } from "react"
import { NavigationContext } from "./Navigation"
import { Container, createStyles, makeStyles, Switch, Theme } from '@material-ui/core'
import Image from 'next/image'
import { Brightness2 as MoonIcon } from '@material-ui/icons';



import React, { FC, useMemo } from 'react';
import { ClassNameMap } from "@material-ui/styles";

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
		}
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

type UsageProps = {

}
const Usage: FC<UsageProps> = (props) => {
	return (
		<FullPanel {...props}>
			<Container>
				<Logo />
				<DarkModeSwitcher />
			</Container>
		</FullPanel>
	)
}

export default (Usage)
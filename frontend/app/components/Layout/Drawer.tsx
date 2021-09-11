import { useContext } from "react"
import { NavigationContext } from "./Navigation"
import { createStyles, Drawer as MuiDrawer, makeStyles, Theme } from '@material-ui/core'
import FullPanel from './FullPanel'



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
	drawerOpen: boolean,
	closeDrawer: () => void,
	darkMode: boolean,
	switchDarkMode: () => void
}
const DrawerContext = React.createContext({} as ContextType)
const { Provider } = DrawerContext

const Drawer: FC = ({ children }) => {
	const { drawerOpen, closeDrawer, darkMode, switchDarkMode } = useContext(NavigationContext)
	const classes = useStyles()
	const value = useMemo(() => ({
		classes,
		drawerOpen,
		closeDrawer,
		darkMode,
		switchDarkMode
	}), [classes, drawerOpen, closeDrawer, darkMode, switchDarkMode])

	return (
		<Provider value={value}>
			<MuiDrawer anchor="left" open={drawerOpen} onClose={closeDrawer}>
				{children}
			</MuiDrawer>
		</Provider>
	)
}


type UsageProps = {

}
const Usage: FC<UsageProps> = (props) => {
	return (
		<Drawer {...props}>
			<FullPanel />
		</Drawer>
	)
}

export default (Usage)
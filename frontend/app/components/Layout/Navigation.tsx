import { Paper, useMediaQuery } from '@material-ui/core';
import React, { FC, useMemo, useState } from 'react';
import FullPanel from './FullPanel'
import ReducedPanel from './ReducedPanel'
import Drawer from './Drawer'

type ContextType = {
	drawerOpen: boolean,
	openDrawer: () => void,
	closeDrawer: () => void,
	darkMode: boolean,
	switchDarkMode: () => void
}
export const NavigationContext = React.createContext({} as ContextType)
const { Provider } = NavigationContext

type NavigationProps = {
	children: React.ReactNode | React.ReactNode[]
	darkMode: boolean,
	switchDarkMode: () => void
}
const Navigation: FC<NavigationProps> = ({ children, darkMode, switchDarkMode }) => {

	const [drawerOpen, setDrawerOpen] = useState(false)
	const openDrawer = () => { setDrawerOpen(true) }
	const closeDrawer = () => { setDrawerOpen(false) }
	const value = useMemo(() => ({
		drawerOpen,
		openDrawer,
		closeDrawer,
		darkMode,
		switchDarkMode
	}), [drawerOpen, openDrawer, closeDrawer, darkMode, switchDarkMode])

	return (
		<Provider value={value}>
			<Paper style={{ height: '100vh', display: 'flex', flexDirection: 'column' }} elevation={2}>
				{children}
			</Paper>
		</Provider>
	)
}

type UsageProps = {
	darkMode: boolean,
	switchDarkMode: () => void
}
const Usage: FC<UsageProps> = (props) => {
	const isMediaPhone = useMediaQuery('(max-width:700px)')
	return (
		<Navigation {...props}>
			{
				isMediaPhone
					? <>
						<ReducedPanel />
						<Drawer />
					</>
					: <FullPanel />
			}
		</Navigation>
	)
}



export default (Usage)
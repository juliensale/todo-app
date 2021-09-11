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
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}
export const NavigationContext = React.createContext({} as ContextType)
const { Provider } = NavigationContext

type NavigationProps = {
	children: React.ReactNode | React.ReactNode[]
	darkMode: boolean,
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}
const Navigation: FC<NavigationProps> = ({ children, darkMode, setDarkMode }) => {

	const [drawerOpen, setDrawerOpen] = useState(false)
	const openDrawer = () => { setDrawerOpen(true) }
	const closeDrawer = () => { setDrawerOpen(false) }
	const value = useMemo(() => ({
		drawerOpen,
		openDrawer,
		closeDrawer,
		darkMode,
		setDarkMode
	}), [drawerOpen, openDrawer, closeDrawer, darkMode, setDarkMode])

	return (
		<Provider value={value}>
			<Paper style={{ height: '100vh' }}>
				{children}
			</Paper>
		</Provider>
	)
}

type UsageProps = {
	darkMode: boolean,
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
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
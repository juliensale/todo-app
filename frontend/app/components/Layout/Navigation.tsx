import { Paper, Theme, useMediaQuery } from '@material-ui/core';
import React, { FC, useMemo, useState } from 'react';
import FullPanel from './FullPanel'
import ReducedPanel from './ReducedPanel'
import Drawer from './Drawer'
import { useTheme } from '@material-ui/styles';
import Logout from './Logout';

export const getNavWidth: (isMediaPhone: boolean, theme: Theme) => number = (isMediaPhone, theme) => {
	return isMediaPhone ? theme.spacing(5) : theme.spacing(15)
}

type ContextType = {
	drawerOpen: boolean,
	openDrawer: () => void,
	closeDrawer: () => void,
	darkMode: boolean,
	switchDarkMode: () => void,
	openLogout: () => void
}
export const NavigationContext = React.createContext({} as ContextType)
const { Provider } = NavigationContext

type NavigationProps = {
	children: React.ReactNode | React.ReactNode[]
	darkMode: boolean,
	switchDarkMode: () => void,
	isMediaPhone: boolean
}
const Navigation: FC<NavigationProps> = ({ children, darkMode, switchDarkMode, isMediaPhone }) => {

	const [drawerOpen, setDrawerOpen] = useState(false)
	const openDrawer = () => { setDrawerOpen(true) }
	const closeDrawer = () => { setDrawerOpen(false) }

	const [logoutOpen, setLogoutOpen] = useState(false)
	const openLogout = () => { setLogoutOpen(true) }
	const closeLogout = () => { setLogoutOpen(false) }

	const value = useMemo(() => ({
		drawerOpen,
		openDrawer,
		closeDrawer,
		darkMode,
		switchDarkMode,
		openLogout
	}), [drawerOpen, openDrawer, closeDrawer, darkMode, switchDarkMode, openLogout])

	const theme: Theme = useTheme()

	return (
		<Provider value={value}>
			<Logout modalOpen={logoutOpen} closeModal={closeLogout} />
			<Paper
				style={{
					display: 'flex',
					position: 'fixed',
					top: 0,
					bottom: 0,
					left: 0,
					flexDirection: 'column',
					width: getNavWidth(isMediaPhone, theme)
				}}
				elevation={2}
			>
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
		<Navigation {...props} isMediaPhone={isMediaPhone}>
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
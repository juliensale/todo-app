import { Paper, Theme, useMediaQuery } from '@material-ui/core';
import React, { FC, useCallback, useContext, useMemo, useState } from 'react';
import FullPanel from './FullPanel'
import ReducedPanel from './ReducedPanel'
import Drawer from './Drawer'
import { useTheme } from '@material-ui/styles';
import Logout from './Logout';
import { UserContext } from '../../pages/_app';

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
	const openDrawer = useCallback(() => { setDrawerOpen(true) }, [setDrawerOpen])
	const closeDrawer = useCallback(() => { setDrawerOpen(false) }, [setDrawerOpen])


	const [logoutOpen, setLogoutOpen] = useState(false)
	const openLogout = useCallback(() => { setLogoutOpen(true) }, [setLogoutOpen])
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
					width: getNavWidth(isMediaPhone, theme),
					borderRadius: 0,
					zIndex: 3
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
	const { isMediaPhone } = useContext(UserContext)
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
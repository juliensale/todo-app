import { Theme, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import React, { FC, ReactNode, useContext } from 'react'
import { UserContext } from '../../pages/_app'
import Navigation, { getNavWidth } from './Navigation'

type Props = {
	children: ReactNode,
	darkMode: boolean,
	switchDarkMode: () => void
}
const Layout: FC<Props> = ({ children, darkMode, switchDarkMode }) => {
	const { isMediaPhone } = useContext(UserContext)
	const theme: Theme = useTheme()
	const navWidth = getNavWidth(isMediaPhone, theme)
	return (
		<div style={{
			display: 'flex',
			flexDirection: 'row',
			minHeight: '100vh',
			// width: `calc(100vw - ${navWidth}px)`,
			marginLeft: navWidth
		}}>
			<Navigation darkMode={darkMode} switchDarkMode={switchDarkMode} />
			{children}
		</div>
	)
}

export default Layout
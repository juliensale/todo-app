import { Theme, useMediaQuery } from '@material-ui/core'
import { useTheme } from '@material-ui/styles'
import React, { FC, ReactNode } from 'react'
import Navigation, { getNavWidth } from './Navigation'

type Props = {
	children: ReactNode,
	darkMode: boolean,
	switchDarkMode: () => void
}
const Layout: FC<Props> = ({ children, darkMode, switchDarkMode }) => {
	const isMediaPhone = useMediaQuery('(max-width:700px)')
	const theme: Theme = useTheme()
	return (
		<div style={{ display: 'flex', flexDirection: 'row', minHeight: '100vh', marginLeft: getNavWidth(isMediaPhone, theme) }}>
			<Navigation darkMode={darkMode} switchDarkMode={switchDarkMode} />
			{children}
		</div>
	)
}

export default Layout
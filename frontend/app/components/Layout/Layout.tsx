import React, { FC, ReactNode } from 'react'
import Navigation from './Navigation'

type Props = {
	children: ReactNode,
	darkMode: boolean,
	switchDarkMode: () => void
}
const Layout: FC<Props> = ({ children, darkMode, switchDarkMode }) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<Navigation darkMode={darkMode} switchDarkMode={switchDarkMode} />
			{children}
		</div>
	)
}

export default Layout
import React, { FC, ReactNode } from 'react'
import Navigation from './Navigation'

type Props = {
	children: ReactNode,
	darkMode: boolean,
	setDarkMode: React.Dispatch<React.SetStateAction<boolean>>
}
const Layout: FC<Props> = ({ children, darkMode, setDarkMode }) => {
	return (
		<div style={{ display: 'flex', flexDirection: 'row' }}>
			<Navigation darkMode={darkMode} setDarkMode={setDarkMode} />
			{children}
		</div>
	)
}

export default Layout
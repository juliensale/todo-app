import { FC } from 'react'
import { makeStyles, Button, PropTypes } from '@material-ui/core'
import NextLink from 'next/link'
import NavigateNextIcon from '@material-ui/icons/NavigateNext'


type Props = {
	children: string,
	href: string,
	variant?: 'text' | 'outlined' | 'contained',
	color?: PropTypes.Color
}
const Link: FC<Props> = ({ children, href, variant = "outlined", color = "primary" }) => {
	return (
		<NextLink href={href}>
			<Button
				variant={variant}
				color={color}
				style={{
					margin: '1.5em 0',
					paddingLeft: 'calc(15px + 1em)'
				}}
			>
				{children} <NavigateNextIcon />
			</Button>
		</NextLink>
	)
}

export default Link
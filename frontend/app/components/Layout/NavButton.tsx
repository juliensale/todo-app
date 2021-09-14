import { ButtonBase, Color, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import React, { FC } from 'react'

const useStyles = makeStyles((theme: Theme) => createStyles({
	buttonBase: {
		width: '100%',
		padding: '.5em 0',
		display: 'grid',
		placeItems: 'center',
		borderBottom: `1px solid ${theme.palette.divider}`,
		transition: '.2s',
		'&:hover': {
			background: theme.palette.action.hover
		}
	},
}))

type Props = {
	onClick?: React.MouseEventHandler<any>
	children: React.ReactChild,
	style?: {},
	className?: string,
	color?: "inherit" | "primary" | "initial" | "secondary" | "textPrimary" | "textSecondary" | "error"
}
const NavButton: FC<Props> = ({ onClick, children, style = {}, className = '', color = "primary" }) => {
	const classes = useStyles()
	return (
		<ButtonBase
			onClick={onClick}
			className={className ? `${className} ${classes.buttonBase}` : classes.buttonBase}
			style={style}
			color={color}
		>

			<Typography color={color} >
				{children}
			</Typography>
		</ButtonBase>
	)
}

export default NavButton
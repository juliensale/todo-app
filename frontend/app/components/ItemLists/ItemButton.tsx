import { ButtonBase, Color, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import React, { FC, useCallback } from 'react'

const useStyles = makeStyles((theme: Theme) => createStyles({
	buttonBase: {
		padding: theme.spacing(1),
		height: '100%',
		display: 'grid',
		placeItems: 'center',
		// borderBottom: `1px solid ${theme.palette.divider}`,
		transition: '.2s'
	},
	hoverEffect: {
		'&:hover': {
			background: theme.palette.action.hover
		}
	}
}))

type Props = {
	onClick?: React.MouseEventHandler<HTMLButtonElement>,
	title?: string,
	children: React.ReactChild,
	style?: {},
	className?: string,
	color?: "inherit" | "primary" | "initial" | "secondary" | "textPrimary" | "textSecondary" | "error",
	noHoverEffect?: boolean,
	stopPropagation?: boolean
}
const ItemButton: FC<Props> = ({ onClick, title = '', children, style = {}, className = '', color = "inherit", noHoverEffect = false, stopPropagation = false }) => {
	const classes = useStyles()
	const baseClass = !noHoverEffect ? `${classes.buttonBase} ${classes.hoverEffect}` : classes.buttonBase
	const handleClick = useCallback((e: React.MouseEvent<HTMLButtonElement>) => {
		if (stopPropagation) {
			e.stopPropagation()
		}
		if (onClick) {
			onClick(e)
		}
	}, [onClick, stopPropagation])
	return (
		<ButtonBase
			onClick={handleClick}
			title={title}
			className={className ? `${className} ${baseClass}` : baseClass}
			style={style}
			color={color}
		>

			<Typography color={color} >
				{children}
			</Typography>
		</ButtonBase>
	)
}

export default ItemButton
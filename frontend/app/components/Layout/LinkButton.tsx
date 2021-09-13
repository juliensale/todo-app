import { ButtonBase, createStyles, makeStyles, Paper, Theme, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import Link from 'next/link'

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
	href: string,
	children: React.ReactChild,
	style?: {},
	className?: string
}
const LinkButton: FC<Props> = ({ href, children, style = {}, className = '' }) => {
	const classes = useStyles()
	return (
		<ButtonBase className={className ? `${className} ${classes.buttonBase}` : classes.buttonBase} style={style}>

			<Link href={href}>
				<Typography color="primary" >
					{children}
				</Typography>
			</Link>
		</ButtonBase>
	)
}

export default LinkButton
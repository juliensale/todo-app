import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { FC } from 'react'
import Link from 'next/link'

const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		width: '100%',
		boxShadow: theme.shadows[1],
		display: 'flex',
		height: theme.spacing(8),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'space-between',
		'&:hover': {
			background: theme.palette.action.hover
		},
		transition: '.2s'
	}
}))
type Props = {
	children: React.ReactNode | React.ReactNode[],
	href: string,
	className?: string,
	style?: React.StyleHTMLAttributes<HTMLDivElement>
}
const Item: FC<Props> = ({ children, href, className = "", style = {} }) => {
	const classes = useStyles()
	return (
		<Link href={href} passHref>
			<Box className={className ? `${className} ${classes.container}` : classes.container} style={style}>

				{children}
			</Box>
		</Link>
	)
}

export default Item
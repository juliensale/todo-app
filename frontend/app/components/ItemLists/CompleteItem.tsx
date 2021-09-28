import { Box, createStyles, makeStyles, Theme } from '@material-ui/core'
import React, { FC } from 'react'

const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		width: '100%',
		boxShadow: theme.shadows[1],
		display: 'flex',
		height: 'fit-content',
		minHeight: theme.spacing(8),
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
	onClick?: () => void,
	className?: string,
	style?: React.StyleHTMLAttributes<HTMLDivElement>
}
const CompleteItem: FC<Props> = ({ children, onClick, className = "", style = {} }) => {
	const classes = useStyles()
	return (
		<Box onClick={onClick} className={className ? `${className} ${classes.container}` : classes.container} style={style}>

			{children}
		</Box>
	)
}

export default CompleteItem
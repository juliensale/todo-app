import { Box, createStyles, makeStyles, Theme, Typography } from '@material-ui/core'
import React, { FC } from 'react'
import Link from 'next/link'
import { ChevronRight } from '@material-ui/icons'

const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		width: '100%',
		boxShadow: theme.shadows[3],
		display: 'flex',
		height: theme.spacing(8),
		flexDirection: 'row',
		alignItems: 'center',
		justifyContent: 'flex-start',
		padding: theme.spacing(2)
	},
	link: {
		cursor: 'pointer',
		fontFamily: 'Montserrat, Verdana',
		'&:hover': {
			textDecoration: 'underline'
		}
	},
	active: {
		cursor: 'mouse',
		fontFamily: 'Montserrat, Verdana'
	}

}))

type ObjectLink = {
	title: string,
	href: string,
	active: boolean
}

type Props = {
	className?: string,
	objectLinks: ObjectLink[]
	style?: React.StyleHTMLAttributes<HTMLDivElement>,

}
const Head: FC<Props> = ({ objectLinks, className = "", style = {} }) => {
	const classes = useStyles()
	return (
		<Box className={className ? `${className} classes.container` : classes.container} style={style}>
			<ChevronRight />
			{
				objectLinks?.map((item, index) => (
					item.active
						? (
							<Typography key={`head-${index}`} className={classes.active} >
								{item.title}
							</Typography>
						) : (
							<div key={`head-${index}`} style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
								<Link href={item.href} >
									<Typography className={classes.link} >
										{item.title}
									</Typography>
								</Link>
								<ChevronRight />
							</div>
						)
				))
			}
		</Box>
	)
}

export default Head
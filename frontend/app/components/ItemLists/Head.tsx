import { Box, createStyles, makeStyles, Theme, Typography, useMediaQuery } from '@material-ui/core'
import React, { FC } from 'react'
import Link from 'next/link'
import { ChevronLeft, ChevronRight } from '@material-ui/icons'

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
	const isMediaPhone = useMediaQuery('(max-width:700px)')
	return (
		<Box className={className ? `${className} classes.container` : classes.container} style={style}>
			{
				isMediaPhone === false
					? (
						<>
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
												<Link href={item.href} passHref>
													<Typography className={classes.link} >
														{item.title}
													</Typography>
												</Link>
												<ChevronRight />
											</div>
										)
								))
							}
						</>
					)
					: (
						<>
							{objectLinks.length > 1 ?
								<Link href={objectLinks.length > 1 ? objectLinks[objectLinks.length - 2].href : "/"}>
									<ChevronLeft />
								</Link>
								: null
							}
							<Typography className={classes.link}>{objectLinks[objectLinks.length - 1]?.title}</Typography>
						</>
					)
			}
		</Box>
	)
}

export default Head
import { Box, makeStyles, Theme, Typography } from '@material-ui/core'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import ArrowButtonLink from '../components/ArrowButtonLink'
import { en, fr } from '../translations/404'

const useStyles = makeStyles((theme: Theme) => ({
	box: {
		display: 'flex',
		flexDirection: 'column',
		alignItems: 'center',
		justifyContent: 'center',
		padding: `30vh ${theme.spacing(2)}px`,
		textAlign: 'center',
		width: '100%'
	}
})
)

type Props = {

}
const NotFound: FC<Props> = () => {
	const classes = useStyles()

	const router = useRouter()
	const { locale } = router
	const translation = locale === 'fr' ? fr : en

	return (
		<Box className={classes.box} >
			<Typography variant="h3" variantMapping={{ h3: 'h1' }} color="primary" paragraph>{translation.notFound}</Typography>
			<Typography >{translation.description}</Typography>
			<ArrowButtonLink
				href="/"
				variant='contained'
				color="primary"
			>
				{translation.home}
			</ArrowButtonLink>
		</Box>
	)
}

export default NotFound
import { CircularProgress, Theme, Typography } from '@material-ui/core'
import { createStyles, makeStyles } from '@material-ui/styles'
import { useRouter } from 'next/dist/client/router'
import { FC } from 'react'
import { en, fr } from '../translations/Loading'

const useStyles = makeStyles((theme: Theme) => createStyles({
	container: {
		display: "flex",
		flexDirection: "column",
		alignItems: "center",
		justifyContent: "center",
		width: '100%',
		padding: theme.spacing(3),
		gap: theme.spacing(2),
		'& > *': {
			textAlign: 'center'
		}
	}
}))
type Props = {

}
const DBLoading: FC<Props> = () => {
	const classes = useStyles()
	const router = useRouter()
	const { locale } = router
	const translation = locale === 'fr' ? fr : en

	return (
		<div className={classes.container}>
			<span>
				<Typography variant="h4" color="primary">{translation.dbLoading[0]}</Typography>
				<Typography variant="body1" color="textSecondary">{translation.dbLoading[1]}</Typography>
			</span>
			<CircularProgress />
		</div>
	)
}

export default DBLoading
import { Container, Button, Typography } from '@material-ui/core'
import { makeStyles } from '@material-ui/styles'
import { useRouter } from 'next/dist/client/router'
import React, { FC, useContext } from 'react'
import { UserContext } from '../../pages/_app'
import { en, fr } from '../../translations/LoginRequired'
import ArrowButtonLink from '../ArrowButtonLink'
import DBLoading from '../DBLoading'


type Props = {
	children: React.ReactNode | React.ReactNode[]
}
const LoginRequired: FC<Props> = ({ children }) => {
	const { authToken, hasChecked } = useContext(UserContext)
	const router = useRouter()
	const { locale } = router
	const translation = locale === 'fr' ? fr : en
	return (
		<>
			{hasChecked
				? authToken
					? children
					: <Container
						style={{
							display: 'flex',
							flexDirection: 'column',
							alignItems: 'center',
							justifyContent: 'center',
						}}
					>
						<Typography style={{ textAlign: 'center' }}>{translation.message}</Typography>
						<ArrowButtonLink href="/login">{translation.button}</ArrowButtonLink>
					</Container>
				: <DBLoading />
			}
		</>
	)
}

export default LoginRequired
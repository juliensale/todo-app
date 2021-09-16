import { Box, Button, Fab, Paper, TextField, Theme, useMediaQuery } from '@material-ui/core';
import { ClassNameMap, createStyles, makeStyles, useTheme } from '@material-ui/styles';
import React, { FC, useContext, useMemo } from 'react';
import LoginRequired from '../components/Layout/LoginRequired';
import { getNavWidth } from '../components/Layout/Navigation';
import AddIcon from '@material-ui/icons/Add'


const useStyles = makeStyles((theme: Theme) => createStyles({
	createFormPaper: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		position: 'fixed',
		bottom: 0,
		right: 0,
		boxShadow: theme.shadows[4],
		padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
	},
	createForm: {
		display: 'flex',
		alignItems: 'center',
		justifyContent: 'center',
		gap: theme.spacing(2),
		width: '100%'
	},
	input: {
		width: 'min(75%, 50em)'
	}
}))


type ContextType = {
	classes: ClassNameMap
}
const HomeContext = React.createContext({} as ContextType)
const { Provider } = HomeContext

type HomeProps = {

}
const Home: FC<HomeProps> = ({ children }) => {
	const classes = useStyles()


	const value = useMemo(() => ({
		classes
	}), [classes])

	return (
		<Provider value={value}>
			<LoginRequired>
				{children}
			</LoginRequired>
		</Provider>
	)
}




const CreateListForm: FC = () => {
	const { classes } = useContext(HomeContext)
	const isMediaPhone = useMediaQuery('(max-width: 700px)')
	const theme: Theme = useTheme()
	const navWidth = getNavWidth(isMediaPhone, theme)

	const handleSubmit: React.FormEventHandler = (e) => {
		e.preventDefault()
	}
	return (
		<Box className={classes.createFormPaper} style={{ left: navWidth }}>
			<form className={classes.createForm} onSubmit={handleSubmit}>
				<TextField className={classes.input} variant="outlined" label="Create a list" />
				<Fab color="primary" type="submit"><AddIcon /></Fab>
			</form>
		</Box>
	)
}


type UsageProps = {

}
const Usage: FC<UsageProps> = (props) => {
	return (
		<Home {...props}>
			<CreateListForm />
		</Home>
	)
}



export default (Usage)
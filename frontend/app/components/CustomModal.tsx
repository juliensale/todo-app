import React, { FC } from 'react'
import { makeStyles, Theme, createStyles, Modal, Container, Paper } from '@material-ui/core'

const useStyles = makeStyles((theme: Theme) => {
	return createStyles({
		modal: {
			display: 'grid',
			placeItems: 'center',
			overflowY: 'hidden',
		},
		scrollContainer: {
			width: '100%',
			height: '100%',
			padding: '3em 1em',
			overflowY: 'auto',
			'&:focus-visible': {
				outline: 'none'
			}
		},
		modalContainer: {
			width: 'fit-content',
			maxWidth: 'min(1000px, 100%)',
			padding: 0,
		},
		modalContent: {
			background: theme.palette.background.paper,
			padding: `${theme.spacing(2)}px ${theme.spacing(3)}px`,
			margin: '1.5em 0',
		}
	})
})

type Props = {
	children: React.ReactNode,
	open: boolean,
	handleClose: () => void
}
const CustomModal: FC<Props> = ({ children, handleClose, open }) => {
	const classes = useStyles()
	const stopPropagation = (e: React.SyntheticEvent) => {
		e.stopPropagation()
		e.nativeEvent.stopImmediatePropagation()
	}
	return (

		<Modal
			open={open}
			onClose={handleClose}
			aria-labelledby="create-modal"
			aria-describedby="Modal item for the creation of an object"
			className={classes.modal}
		>
			<div
				onClick={handleClose}
				className={classes.scrollContainer}
			>
				<Container className={classes.modalContainer} >
					<Paper
						onClick={stopPropagation}
						className={classes.modalContent}
					>
						{children}
					</Paper>
				</Container>
			</div>
		</Modal>
	)
}

export default CustomModal
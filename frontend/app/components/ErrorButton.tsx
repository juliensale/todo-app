import { Button, ButtonTypeMap, ExtendButtonBase, Typography } from '@material-ui/core'
import React, { FC } from 'react'

const ErrorButton: ExtendButtonBase<ButtonTypeMap<{}, "button">> = (props: any) => {
	return (
		<Typography color="error" style={{ width: '100%', display: 'flex' }}>
			<Button {...props} color="inherit" />
		</Typography>
	)
}

export default ErrorButton
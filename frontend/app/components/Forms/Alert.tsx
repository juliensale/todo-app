import { FC } from 'react'
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';

const Alert: FC<AlertProps> = (props) => {
	return (
		<MuiAlert elevation={2} variant="outlined" {...props} />
	)
}

export default Alert
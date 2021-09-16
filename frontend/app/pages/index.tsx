import { Typography } from '@material-ui/core'
import { FC } from 'react'
import LoginRequired from '../components/Layout/LoginRequired'

type Props = {

}
const Home: FC<Props> = () => {
  return (
    <LoginRequired>
      <Typography variant="h1" color="primary">Title</Typography>
      <Typography variant="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, cumque eaque aspernatur illo dolores quidem incidunt tenetur nobis ab reiciendis error excepturi iure est! Similique doloremque sequi enim cupiditate qui?</Typography>
    </LoginRequired>
  )
}

export default Home
import { Typography } from '@material-ui/core'
import { FC } from 'react'

type Props = {

}
const Home: FC<Props> = () => {
  return (
    <div>
      <Typography variant="h1" color="primary">Title</Typography>
      <Typography variant="body1">Lorem ipsum dolor sit amet consectetur adipisicing elit. Consequuntur, cumque eaque aspernatur illo dolores quidem incidunt tenetur nobis ab reiciendis error excepturi iure est! Similique doloremque sequi enim cupiditate qui?</Typography>
    </div>
  )
}

export default Home
import {
  Button,
  Descriptions,
} from 'antd'
import { useContext } from 'react'

import { UserContext } from '../../layouts/CommonLayout'

const MovieDescription = ({
  movie,
  onButtonClick,
}) => {

  const user = useContext(UserContext)

  console.log('user: ', user) // eslint-disable-line

  return (
    <Descriptions
      title="Video Info"
      bordered
      size="small"
      extra={<Button type="primary" disabled={!user || user.role.type !== 'authenticated'} onClick={onButtonClick}>Edit</Button>}
      column={1}
    >
      <Descriptions.Item label="name">{movie.name}</Descriptions.Item>
      <Descriptions.Item label="url">{movie.url}</Descriptions.Item>
      <Descriptions.Item
        label="description">{movie.description}</Descriptions.Item>
      <Descriptions.Item
        label="created_at">{movie.created_at}</Descriptions.Item>
      <Descriptions.Item
        label="updated_at">{movie.updated_at}</Descriptions.Item>
      <Descriptions.Item
        label="published_at">{movie.published_at}</Descriptions.Item>
    </Descriptions>
  )
}

export { MovieDescription }

import {
  Button,
  Descriptions,
} from 'antd'

const MovieDescription = ({
  movie,
  onButtonClick,
}) => {

  return (
    <Descriptions
      title="Video Info"
      bordered
      size="small"
      extra={<Button type="primary" onClick={onButtonClick}>Edit</Button>}
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

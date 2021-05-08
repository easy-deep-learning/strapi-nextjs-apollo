import {
  gql,
  useMutation,
} from '@apollo/client'

import {
  Button,
  Input,
  Form,
} from 'antd'

const CREATE_RESTAURANT_MUTATION = gql`
    mutation createRestaurant($input: createRestaurantInput!) {
        createRestaurant(input: $input) {
            restaurant {
                created_at
                updated_at
                name
                description
                published_at
            }
        }
    }
`

export default function Submit () {
  const [createPost, { loading }] = useMutation(CREATE_RESTAURANT_MUTATION)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const name = formData.get('name')
    const description = formData.get('description')
    form.reset()

    createPost({
      variables: { input: { data: { name, description } } },
      update: (cache, { data: { createRestaurant } }) => {
        cache.modify({
          fields: {
            allRestaurants (existingRestaurant = []) {
              const newRestaurantRef = cache.writeFragment({
                data: createRestaurant,
                fragment: gql`
                    fragment NewRestaurant on Restaurant {
                        id
                        name
                        description
                    }
                `,
              })
              return [newRestaurantRef, ...existingRestaurant]
            },
          },
        })
      },
    })
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input restaurant name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="description"
        name="description"
        rules={[{ message: 'Please input restaurant description!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" disabled={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

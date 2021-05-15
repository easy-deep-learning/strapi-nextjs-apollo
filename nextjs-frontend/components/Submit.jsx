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

  const createPostHandler = ({ name, description }) => {
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
    .then(res => console.log(res))
    .catch(error => console.error(error))
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  const onFinish = (formData) => {
    console.log('Success:', formData);
    createPostHandler(formData)
  };

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={{
        remember: true,
      }}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input restaurant name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ message: 'Please input restaurant description!' }]}
      >
        <Input.TextArea />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={loading}>
          Submit
        </Button>
      </Form.Item>
    </Form>
  )
}

import { useRouter } from 'next/router'
import {
  gql,
  useMutation,
} from '@apollo/client'
import {
  Button,
  Form,
  Input,
  notification,
} from 'antd'

import {
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons'

const LOGIN = gql`
  mutation login($input: UsersPermissionsLoginInput!) {
    login(input: $input) {
      jwt
      user {
        id
        username
      }
    }
  }
`

const LoginForm = ({
  formHandler,
  formData,
  formState = { disabled: false },
}) => {
  const [login, loginResult] = useMutation(LOGIN, {
    onError: (error) => {
      notification.open({
        message: 'Login error',
        description: error.message,
        onClick: () => {
          console.log('Notification Clicked!')
        },
      })
    },
  })
  const router = useRouter()

  const user = loginResult.data?.login?.user

  if (user?.id) {
    router.push('/youtube')
  }

  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  const onFinish = async (formData) => {
    await login({
      variables: {
        input: {
          identifier: formData.email,
          password: formData.password,
          provider: 'local',
        },
      },
    })

    formHandler(null, formData)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
    formHandler(errorInfo, null)
  }

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={formData}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: 'Please input email!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Password"
        name="password"
        rules={[{ required: true, message: 'Please input password!' }]}
      >
        <Input.Password
          placeholder="input password"
          iconRender={visible => (visible ? <EyeTwoTone /> :
            <EyeInvisibleOutlined />)}
        />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={formState.disabled}>
          Login
        </Button>
      </Form.Item>
    </Form>
  )
}

export { LoginForm }

import {
  gql,
  useMutation,
} from '@apollo/client'
import {
  Button,
  Form,
  Input,
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
  const [login, loginResult] = useMutation(LOGIN)
  console.log('loginResult: ', loginResult) // eslint-disable-line

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

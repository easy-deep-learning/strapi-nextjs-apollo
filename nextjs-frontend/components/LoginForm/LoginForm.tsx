import {
  Button,
  Form,
  Input,
} from 'antd'

import {
  EyeTwoTone,
  EyeInvisibleOutlined,
} from '@ant-design/icons'

const LoginForm = ({
  formHandler,
  formData,
  formState = { disabled: false },
}) => {
  const layout = {
    labelCol: { span: 8 },
    wrapperCol: { span: 16 },
  }
  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  }

  const onFinish = (formData) => {
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

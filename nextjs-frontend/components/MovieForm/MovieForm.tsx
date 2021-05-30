import {
  Button,
  Form,
  Input,
} from 'antd'
import { useContext } from 'react'

import { UserContext } from '../../layouts/CommonLayout'

const MovieForm = ({
  formHandler,
  formData,
  formState = { disabled: false },
  onButtonClick = () => {},
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
  const user = useContext(UserContext)

  return (
    <Form
      {...layout}
      name="basic"
      initialValues={formData}
      onFinish={onFinish}
      onFinishFailed={onFinishFailed}
    >
      <Form.Item
        label="URL"
        name="url"
        rules={[{ required: true, message: 'Please input video name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: 'Please input video name!' }]}
      >
        <Input />
      </Form.Item>

      <Form.Item
        label="Description"
        name="description"
        rules={[{ message: 'Please input video description!' }]}
      >
        <Input.TextArea autoSize showCount />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={formState.disabled || !user || user.role.type !== 'authenticated'}>
          Submit
        </Button>

        <Button onClick={() => {onButtonClick()}}>
          Cancel
        </Button>
      </Form.Item>
    </Form>
  )
}

export { MovieForm }

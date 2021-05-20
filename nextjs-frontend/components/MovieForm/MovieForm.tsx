import {
  Button,
  Form,
  Input,
} from 'antd'

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
    console.log('Success:', formData)
  }

  const onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo)
  }

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
        <Input.TextArea />
      </Form.Item>

      <Form.Item {...tailLayout}>
        <Button type="primary" htmlType="submit" disabled={formState.disabled}>
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

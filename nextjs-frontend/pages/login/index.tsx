import { CommonLayout } from '../../layouts/CommonLayout'
import { LoginForm } from '../../components'

const LoginPage = () => {
  return (
    <CommonLayout>
      <LoginForm
        formHandler={(err, data) => {
          console.log('err: ', err) // eslint-disable-line
          console.log('data: ', data) // eslint-disable-line
        }}
        formData={{ username: null, password: null }}
      />
    </CommonLayout>
  )

}

export default LoginPage


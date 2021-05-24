import { CommonLayout } from '../layouts/CommonLayout'
import { LoginForm } from '../components'

const IndexPage = () => {
  return (
    <CommonLayout>
      <LoginForm
        formHandler={(err, data) => {
          console.log('data: ', data) // eslint-disable-line
        }}
        formData={{ username: null, password: null }}
      />
    </CommonLayout>
  )

}
export default IndexPage

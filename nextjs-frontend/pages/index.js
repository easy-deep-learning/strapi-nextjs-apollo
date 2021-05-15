import App from '../components/App'

const IndexPage = (props) => (
  <App>
    {props.pageData}
  </App>
)

export async function getStaticProps() {
  return {
    pageData: 'TODO'
  }
}

export default IndexPage

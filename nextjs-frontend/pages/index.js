import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import RestaurantsList, {
  ALL_RESTAURANTS_QUERY,
  allRestaurantsQueryVars,
} from '../components/RestaurantsList'
import { initializeApollo, addApolloState } from '../lib/apolloClient'

const IndexPage = () => (
  <App>
    <Header />
    <InfoBox>ℹ️ This page shows how to use SSG with Apollo.</InfoBox>
    <Submit />
    <RestaurantsList />
  </App>
)

export async function getStaticProps() {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_RESTAURANTS_QUERY,
    variables: allRestaurantsQueryVars,
  })

  return addApolloState(apolloClient, {
    props: {},
    revalidate: 1,
  })
}

export default IndexPage

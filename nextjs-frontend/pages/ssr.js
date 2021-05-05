import App from '../components/App'
import InfoBox from '../components/InfoBox'
import Header from '../components/Header'
import Submit from '../components/Submit'
import RestaurantsList, {
  ALL_RESTAURANTS_QUERY,
  allRestaurantsQueryVars,
} from '../components/RestaurantsList'
import {
  initializeApollo,
  addApolloState,
} from '../lib/apolloClient'

const SSRPage = () => (
  <App>
    <Header />
    <InfoBox>ℹ️ This page shows how to use SSR with Apollo.</InfoBox>
    <Submit />
    <RestaurantsList />
  </App>
)

export async function getServerSideProps () {
  const apolloClient = initializeApollo()

  await apolloClient.query({
    query: ALL_RESTAURANTS_QUERY,
    variables: allRestaurantsQueryVars,
  })

  return addApolloState(apolloClient, {
    props: {},
  })
}

export default SSRPage

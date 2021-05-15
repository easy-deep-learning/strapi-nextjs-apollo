import {
  ApolloClient,
  HttpLink,
  InMemoryCache,
} from '@apollo/client'

const client = new ApolloClient({
  ssrMode: typeof window === 'undefined',
  uri: process.env.GRAPGQL_API_URI,
  cache: new InMemoryCache(),
})

export { client }

import {
  gql,
  useQuery,
} from '@apollo/client'
import ErrorMessage from './ErrorMessage'

export const ALL_RESTAURANTS_QUERY = gql`
    query restaurants {
        restaurants {
            id
            name
            description
            categories {
                name
            }
            updated_at
        }
    }
`

export const allRestaurantsQueryVars = {
  skip: 0,
  first: 10,
}

export default function RestaurantsList () {
  const { loading, error, data } = useQuery(
    ALL_RESTAURANTS_QUERY,
    {
      variables: allRestaurantsQueryVars,
      // Setting this value to true will make the component rerender when
      // the "networkStatus" changes, so we are able to know if it is fetching
      // more data
      notifyOnNetworkStatusChange: true,
    },
  )

  if (error) return <ErrorMessage message="Error loading posts." />
  if (loading) return <div>Loading</div>

  const { restaurants } = data

  return (
    <section>
      <ul>
        {restaurants.map((restaurant, index) => (
          <li key={restaurant.id}>
            <div>
              <span>{index + 1}. </span>
              <p>{restaurant.name}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

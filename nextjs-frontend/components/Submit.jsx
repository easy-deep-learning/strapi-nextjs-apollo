import {
  gql,
  useMutation,
} from '@apollo/client'

const CREATE_RESTAURANT_MUTATION = gql`
    mutation createRestaurant($input: createRestaurantInput!) {
        createRestaurant(input: $input) {
            restaurant {
                created_at
                updated_at
                name
                description
                published_at
            }
        }
    }
`

export default function Submit () {
  const [createPost, { loading }] = useMutation(CREATE_RESTAURANT_MUTATION)

  const handleSubmit = (event) => {
    event.preventDefault()
    const form = event.target
    const formData = new window.FormData(form)
    const name = formData.get('name')
    const description = formData.get('description')
    form.reset()

    createPost({
      variables: { input: { data: { name, description } } },
      update: (cache, { data: { createRestaurant } }) => {
        cache.modify({
          fields: {
            allRestaurants (existingRestaurant = []) {
              const newRestaurantRef = cache.writeFragment({
                data: createRestaurant,
                fragment: gql`
                    fragment NewRestaurant on Restaurant {
                        id
                        name
                        description
                    }
                `,
              })
              return [newRestaurantRef, ...existingRestaurant]
            },
          },
        })
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1>Submit</h1>
      <input placeholder="name" name="name" type="text" required />
      <input placeholder="description" name="description" type="text" required />
      <button type="submit" disabled={loading}>
        Submit
      </button>
    </form>
  )
}

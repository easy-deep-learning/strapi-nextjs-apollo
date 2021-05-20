import {
  gql,
  useMutation,
} from '@apollo/client'
import { MovieForm } from '../../components/MovieForm'

const CREATE_YOUTUBE_MOVIE = gql`
  mutation CreateYouTubeMove($input: createYouTubeMoveInput!) {
    createYouTubeMove(input: $input) {
      youTubeMove {
        id
        name
        url
        description
      }
    }
  }
`

export const CreateNewMovie = () => {
  const [create, result] = useMutation(CREATE_YOUTUBE_MOVIE)
  console.log('result: ', result) // eslint-disable-line

  return (
    <MovieForm
      formData={{}}
      formHandler={async (err, formData) => {
        if (err) {
          console.warn(err)
          return
        }

        create({ variables: { input: { data: formData } } })
      }}
    />
  )
}

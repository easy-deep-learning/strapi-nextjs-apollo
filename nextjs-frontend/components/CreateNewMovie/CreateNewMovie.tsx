import {
  gql,
  useMutation,
} from '@apollo/client'
import { useRouter } from 'next/router'

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
  const router = useRouter()

  if (result.data?.createYouTubeMove.youTubeMove.id) {
    router.push(`/youtube/${result.data?.createYouTubeMove.youTubeMove.id}`)
  }

  return (
    <MovieForm
      formData={{}}
      formHandler={(err, formData) => {
        if (err) {
          console.warn(err)
          return
        }
        create({ variables: { input: { data: formData } } })
      }}
    />
  )
}

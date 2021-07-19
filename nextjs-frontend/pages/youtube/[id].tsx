import {
  useState,
} from 'react'
import ReactPlayer from 'react-player'
import { GetServerSideProps } from 'next'
import {
  gql,
  useMutation,
} from '@apollo/client'
import {
  Row,
  Col,
  Space,
} from 'antd'

import {
  initializeApollo,
} from '../../lib/apolloClient'
import { CommonLayout } from '../../layouts/CommonLayout'
import {
  MovieForm,
  MovieDescription,
} from '../../components'

const GET_YOUTUBE_MOVIE = gql`
  query YouTubeMove($id: ID!) {
    youTubeMove(id: $id) {
      id
      name
      url
      description
      createdAt
      updatedAt
      published_at
    }
  }
`

const GET_YOUTUBE_MOVIES_IDS = gql`
  query YouTubeMoves {
    youTubeMoves {
      id
    }
  }
`

const UPDATE_YOUTUBE_MOVIE = gql`
  mutation updateYouTubeMove($input: updateYouTubeMoveInput) {
    updateYouTubeMove(input: $input) {
      youTubeMove {
        name
        description
        url
        updatedAt
      }
    }
  }
`

/**
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 *
 * @param context
 */
export const getServerSideProps: GetServerSideProps = async (context) => {
  // why `id` — see the file name: `[id].tsx` 
  const { params: { id } } = context

  const pageData = await initializeApollo().query({
      query: GET_YOUTUBE_MOVIE,
      variables: { id },
    },
  )

  return {
    props: {
      pageData,
    },
  }
}

const YoutubeItemPage = ({ pageData }) => {
  const { data: { youTubeMove }, loading } = pageData

  const [isEditMode, setEditMode] = useState(false)
  const [editMovie, editMovieResult] = useMutation(UPDATE_YOUTUBE_MOVIE)

  const currentYouTubeMove = editMovieResult.data?.updateYouTubeMove?.youTubeMove
    ? editMovieResult.data?.updateYouTubeMove?.youTubeMove
    : youTubeMove

  return (
    <CommonLayout>
      <Row gutter={[0, 48]}>
        <Col><ReactPlayer url={currentYouTubeMove.url} /></Col>
        <Col span={16}>
          {isEditMode ? (
            <MovieForm
              formData={currentYouTubeMove}
              formHandler={(err, formData) => {
                editMovie(
                  {
                    variables: {
                      input: {
                        where: {
                          id: currentYouTubeMove.id,
                        },
                        data: {
                          ...formData,
                        },
                      },
                    },
                  })
              }}
              onButtonClick={() => {setEditMode(false)}}
            />
          ) : (
            <MovieDescription
              movie={currentYouTubeMove}
              onButtonClick={() => setEditMode(true)}
            />
          )}
        </Col>
      </Row>

    </CommonLayout>
  )
}

export default YoutubeItemPage


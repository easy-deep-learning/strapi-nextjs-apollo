import { useState } from 'react'
import ReactPlayer from 'react-player'
import { GetStaticProps } from 'next'
import { gql } from '@apollo/client'
import {
  Row,
  Col,
  Space,
} from 'antd'

import { client } from '../../lib/apolloClient'
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
      created_at
      updated_at
      published_at
    }
  }
`

export const getStaticPaths = () => {
  const paths = [
    { params: { id: '1' } },
    { params: { id: '2' } },
  ]

  return {
    // required key
    paths,
    // https://nextjs.org/docs/basic-features/data-fetching#fallback-false
    fallback: false,
  }

}

/**
 * @see https://nextjs.org/docs/basic-features/data-fetching#getstaticprops-static-generation
 *
 * @param context
 */
export const getStaticProps: GetStaticProps = async (context) => {
  // why `id` — see the file name: `[id].tsx` 
  const { params: { id } } = context

  const pageData = await client.query(
    { query: GET_YOUTUBE_MOVIE, variables: { id } })

  return {
    props: {
      pageData,
    },
  }
}

const YoutubeItemPage = ({ pageData }) => {
  const { data: { youTubeMove }, loading } = pageData

  const [isEditMode, setEditMode] = useState(false)

  return (
    <CommonLayout>
      <Row gutter={[0, 48]}>
        <Col><ReactPlayer url={youTubeMove.url} /></Col>
        <Col span={16}>
          {isEditMode ? (
            <MovieForm formData={youTubeMove} formHandler={() => {}}
              onButtonClick={() => {setEditMode(false)}} />
          ) : (
            <MovieDescription movie={youTubeMove}
              onButtonClick={() => setEditMode(true)} />
          )}
        </Col>
      </Row>

    </CommonLayout>
  )
}

export default YoutubeItemPage


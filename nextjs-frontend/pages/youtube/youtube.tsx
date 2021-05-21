import {
  gql,
  useQuery,
} from '@apollo/client'
import {
  GetStaticProps,
} from 'next'
import Link from 'next/link'
import {
  Avatar,
  Card,
} from 'antd'
import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons'
import { initializeApollo } from '../../lib/apolloClient'
import { CommonLayout } from '../../layouts/CommonLayout'

const { Meta } = Card

const GET_YOUTUBE_MOVIES = gql`
  query YouTubeMoves {
    youTubeMoves {
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

export const getStaticProps: GetStaticProps = async () => {
  const pageData = await initializeApollo().query({
    query: GET_YOUTUBE_MOVIES,
  })

  return {
    props: {
      pageData,
    },
  }
}

export const YoutubePage = ({ pageData }) => {
  const data = useQuery(GET_YOUTUBE_MOVIES, { pollInterval: 500 })
  const currentData = data || pageData

  return (
    <CommonLayout>
      {!currentData.loading && currentData.data?.youTubeMoves?.map(movie => (
        <Card
          key={movie.id}
          style={{ width: 300 }}
          cover={
            <Link href={`/youtube/${movie.id}`}>
              <a>
                <img
                  alt={movie.name}
                  src={`https://img.youtube.com/vi/${movie.url.split(
                    'watch?v=')[1]}/mqdefault.jpg`}
                />
              </a>
            </Link>
          }
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" onClick={() => {}} />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Meta
            avatar={<Avatar
              src={`https://img.youtube.com/vi/${movie.url.split(
                'watch?v=')[1]}/mqdefault.jpg`} />}
            title={movie.name}
            description={movie.description}
          />
        </Card>
      ))}
    </CommonLayout>
  )
}

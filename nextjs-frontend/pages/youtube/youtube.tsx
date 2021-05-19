import {
  gql,
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
import { client } from '../../lib/apolloClient'
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
  const pageData = await client.query({ query: GET_YOUTUBE_MOVIES })

  return {
    props: {
      pageData,
    },
  }
}

export const YoutubePage = ({ pageData }) => {
  return (
    <CommonLayout>
      {!pageData.loading && pageData.data?.youTubeMoves?.map(movie => (
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
            <EditOutlined key="edit" />,
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





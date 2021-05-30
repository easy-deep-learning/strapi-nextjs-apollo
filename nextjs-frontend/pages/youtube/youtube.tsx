import {
  gql,
  useMutation,
  useQuery,
} from '@apollo/client'
import {
  GetStaticProps,
} from 'next'
import Link from 'next/link'
import {
  Avatar,
  Card,
  Popconfirm,
  Button,
} from 'antd'
import {
  EditOutlined,
  DeleteOutlined,
} from '@ant-design/icons'
import { initializeApollo } from '../../lib/apolloClient'
import {
  CommonLayout,
} from '../../layouts/CommonLayout'

const { Meta } = Card

const text = 'Are you sure to delete this task?'

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

const DELETE_YOUTUBE_MOVIES = gql`
  mutation DeleteYouTubeMove($input: deleteYouTubeMoveInput) {
    deleteYouTubeMove(input: $input) {
      youTubeMove {
        id
      }
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
  const data = useQuery(GET_YOUTUBE_MOVIES, { pollInterval: 5000 })
  const [deleteMovie, deleteMovieResult] = useMutation(DELETE_YOUTUBE_MOVIES)
  const currentData = data || pageData

  return (
    <CommonLayout>
      {!currentData.loading && currentData.data?.youTubeMoves?.map(movie => (
        <Card
          loading={currentData.loading}
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
            <Popconfirm
              placement="rightTop"
              title={text}
              onConfirm={() => {
                deleteMovie(
                  { variables: { input: { where: { id: movie.id } } } })
              }}
              okText="Yes"
              cancelText="No"
            >
              <Button><DeleteOutlined /></Button>
            </Popconfirm>,
            <Link href={`/youtube/${movie.id}`}><a><EditOutlined key="edit" /></a></Link>,
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

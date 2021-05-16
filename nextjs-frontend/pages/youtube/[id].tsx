import {
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
  UserOutlined,
} from '@ant-design/icons'
import {
  Avatar,
  Breadcrumb,
  Card,
  Layout,
  Menu,
} from 'antd'
const { Header, Footer, Sider, Content } = Layout
const { Meta } = Card
import { GetStaticProps } from 'next'
import { gql } from '@apollo/client'
import { client } from '../../lib/apolloClient'

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
  
  const pageData = await client.query({ query: GET_YOUTUBE_MOVIE, variables: { id } })
  
  return {
    props: {
      pageData,
    },
  }
}

const YoutubeItemPage = ({ pageData }) => {
  console.log("pageData: ", pageData); // eslint-disable-line
  
  const { data, loading } = pageData
  
  return (
    <div className={'YoutubeItemPage'}>
      <Layout>
        <Header>
          <Avatar size={64} icon={<UserOutlined />} />

        </Header>
        <Layout style={{ minHeight: '100vh' }}>
          <Sider>
            <Menu theme="light" mode="vertical-left"
              defaultSelectedKeys={['1']}>
              <Menu.Item key="1">YoutubePage</Menu.Item>
            </Menu>
          </Sider>
          <Content>
            <Breadcrumb>
              <Breadcrumb.Item>
                <a href="/">Home</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                <a href="/youtube">YoutubePage</a>
              </Breadcrumb.Item>
              <Breadcrumb.Item>
                item
              </Breadcrumb.Item>
            </Breadcrumb>

            <Card
              key={data.youTubeMove.id}
              style={{ height: '100%' }}
              cover={
                <img
                  alt={data.youTubeMove.name}
                  src={`https://img.youtube.com/vi/${data.youTubeMove.url.split('watch?v=')[1]}/maxresdefault.jpg`}
                />
              }
              actions={[
                <SettingOutlined key="setting" />,
                <EditOutlined key="edit" />,
                <EllipsisOutlined key="ellipsis" />,
              ]}
            >
              <Meta
                avatar={<Avatar
                  src={`https://img.youtube.com/vi/${data.youTubeMove.url.split('watch?v=')[1]}/mqdefault.jpg`} />}
                title={data.youTubeMove.name}
                description={data.youTubeMove.description}
              />
            </Card>


          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          ДАННОЕ СООБЩЕНИЕ (МАТЕРИАЛ (ПРОГРАММНОЕ ОБЕС ПЕЧЕНЬЕ)) СОЗДАНО И (ИЛИ) РАСПРОСТРАНЕНО С <br />
          ЦЕЛЬЮ УЛУЧШЕНИЯ ОБЕС ПЕЧЕНИЯ ЛИЦОМ/ЛИЦАМИ, ВЫПОЛНЯЮЩИМ ФУНКЦИИ/ДИСФУНКЦИИ КОНЪЮНКЦИЙ.
        </Footer>
      </Layout>
    </div>
  )
}

export default YoutubeItemPage


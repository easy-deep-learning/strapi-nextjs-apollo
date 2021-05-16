import {
  gql,
} from '@apollo/client'
import {
  GetStaticProps,
} from 'next'
import {
  Layout,
  Breadcrumb,
  Menu,
  Avatar,
  Card,
} from 'antd'
import {
  UserOutlined,
  EditOutlined,
  EllipsisOutlined,
  SettingOutlined,
} from '@ant-design/icons'
const { Header, Footer, Sider, Content } = Layout
const { Meta } = Card

import { client } from '../../lib/apolloClient'
import { App } from '../../components/App'

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
      pageData
    }
  }
}

export const YoutubePage = ({ pageData }) => {
  console.log("pageData: ", pageData); // eslint-disable-line
  
  return (
    <App>
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
                YoutubePage
              </Breadcrumb.Item>
            </Breadcrumb>

            {!pageData.loading && pageData.data?.youTubeMoves?.map(movie => (
              <Card
                key={movie.id}
                style={{ width: 300 }}
                cover={
                  <img
                    alt={movie.name}
                    src={`https://img.youtube.com/vi/${movie.url.split('watch?v=')[1]}/mqdefault.jpg`}
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
                    src={`https://img.youtube.com/vi/${movie.url.split('watch?v=')[1]}/mqdefault.jpg`} />}
                  title={movie.name}
                  description={movie.description}
                />
              </Card>
            ))}


          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          ДАННОЕ СООБЩЕНИЕ (МАТЕРИАЛ (ПРОГРАММНОЕ ОБЕС ПЕЧЕНЬЕ)) СОЗДАНО И (ИЛИ) РАСПРОСТРАНЕНО С <br />
          ЦЕЛЬЮ УЛУЧШЕНИЯ ОБЕС ПЕЧЕНИЯ ЛИЦОМ/ЛИЦАМИ, ВЫПОЛНЯЮЩИМ ФУНКЦИИ/ДИСФУНКЦИИ КОНЪЮНКЦИЙ.
        </Footer>
      </Layout>
    </App>
  )
}





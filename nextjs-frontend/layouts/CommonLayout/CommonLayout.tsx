import {
  UserOutlined,
} from '@ant-design/icons'
import { default as HeadNext } from 'next/head'
import {
  gql,
  useQuery,
} from '@apollo/client'

import {
  Layout,
  Breadcrumb,
  Menu,
} from 'antd'
import { CurrentUser } from '../../components'

const { Header, Footer, Sider, Content } = Layout

const ME = gql`
  query me {
    me {
      id
      username
      confirmed
      blocked
      role {
        id
        name
        description
        type
      }
    }
  }
`

const CommonLayout = ({ children }) => {
  const meResult = useQuery(ME)

  console.log('meResult: ', meResult) // eslint-disable-line
  const currentUser: { blocked: boolean, confirmed: boolean, id: string, role: object, username: string } = meResult.data?.me

  return (
    <>
      <HeadNext>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta
          name="description"
          content="TODO: description"
        />
        <meta name="og:title" content="TODO: title" />
        <title>TODO: title</title>
      </HeadNext>

      <Layout>
        <Header>
          <CurrentUser user={currentUser} />
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

            {children}

          </Content>
        </Layout>
        <Footer style={{ textAlign: 'center' }}>
          ДАННОЕ СООБЩЕНИЕ (МАТЕРИАЛ (ПРОГРАММНОЕ ОБЕС ПЕЧЕНЬЕ)) СОЗДАНО И (ИЛИ) РАСПРОСТРАНЕНО С <br />
          ЦЕЛЬЮ УЛУЧШЕНИЯ ОБЕС ПЕЧЕНИЯ ЛИЦОМ/ЛИЦАМИ, ВЫПОЛНЯЮЩИМ ФУНКЦИИ/ДИСФУНКЦИИ КОНЪЮНКЦИЙ.
        </Footer>
      </Layout>
    </>
  )
}

export { CommonLayout }

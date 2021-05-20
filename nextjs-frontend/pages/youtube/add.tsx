import {
  Row,
  Col,
} from 'antd'

import { CommonLayout } from '../../layouts/CommonLayout'
import {
  CreateNewMovie,
  ClientOnly,
} from '../../components'

const YoutubeItemPage = () => {
  return (
    <CommonLayout>
      <Row gutter={[0, 48]}>
        <Col span={16}>
          <ClientOnly>
            <CreateNewMovie />
          </ClientOnly>
        </Col>
      </Row>

    </CommonLayout>
  )
}

export default YoutubeItemPage


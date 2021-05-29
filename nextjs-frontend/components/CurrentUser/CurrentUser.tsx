import React from 'react'
import { UserOutlined } from '@ant-design/icons'
import {
  Avatar,
} from 'antd'

import styles from './CurrentUser.module.css'

type CurrentUserProps = {
  user?: {
    blocked: boolean
    confirmed: boolean
    id: string
    role: object
    username: string
  }
}

const CurrentUser: React.FC<CurrentUserProps> = ({ user }) => {
  return (
    <div className={styles.root}>
      <Avatar style={{ backgroundColor: '#87d068' }} size={32}>{user ? user.username[0] : '<>'}</Avatar>
      <div className={styles.name}>{user ? user.username : 'Not logged'}</div>
    </div>
  )
}

export { CurrentUser }

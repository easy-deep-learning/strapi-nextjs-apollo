import React from 'react'
import { useRouter } from 'next/router'
import {
  Avatar,
  Button,
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
  const router = useRouter()

  return (
    <div className={styles.root}>
      <Avatar style={{ backgroundColor: '#87d068' }} size={32}>{user ? user.username[0] : '<>'}</Avatar>
      <div className={styles.name}>{user ? user.username : 'Not logged'}</div>
      <div>
        {user && (
          <Button
            onClick={async () => {
              await fetch(
                '/logout',
                {
                  method: 'post',
                }).catch((error) => {
                console.error('Error:', error)
              })

              router.reload()
            }
            }
          >Logout</Button>
        )}
      </div>
      <div>
        {!user && (
          <Button
            onClick={() => {router.push('/login')}}
          >
            Login
          </Button>
        )}
      </div>
    </div>
  )
}

export { CurrentUser }

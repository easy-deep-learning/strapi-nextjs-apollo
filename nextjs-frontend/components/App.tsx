import React, {
  FC,
  ReactNode,
} from 'react'

export const App:FC<{children: ReactNode}> = ({ children }) => {
  return (
    <div className="app">
      {children}
    </div>
  )
}

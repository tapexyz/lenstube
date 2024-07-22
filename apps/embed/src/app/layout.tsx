import '../styles/index.css'

import { TAPE_APP_DESCRIPTION, TAPE_APP_NAME } from '@tape.xyz/constants'
import type { Metadata } from 'next'
import React from 'react'

export const metadata: Metadata = {
  title: TAPE_APP_NAME,
  description: TAPE_APP_DESCRIPTION
}

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}

export default RootLayout

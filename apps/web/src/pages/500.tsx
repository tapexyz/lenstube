import { Button } from '@radix-ui/themes'
import { STATIC_ASSETS, TAPE_APP_NAME } from '@tape.xyz/constants'
import Head from 'next/head'
import Link from 'next/link'
import React from 'react'

export default function Custom500() {
  return (
    <>
      <Head>
        <title>500 - Server Error</title>
      </Head>
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-4 text-center">
        <div className="mb-10">
          <img
            src={`${STATIC_ASSETS}/images/illustrations/404.gif`}
            draggable={false}
            height={200}
            width={200}
            alt={TAPE_APP_NAME}
          />
        </div>
        <h1 className="text-3xl font-bold">Looks like something went wrong!</h1>
        <div className="mb-6 max-w-lg">
          We track these errors automatically, but if the problem persists feel
          free to contact us. In the meantime, try refreshing.
        </div>
        <Link href="/">
          <Button highContrast size="3">
            Go Home
          </Button>
        </Link>
      </div>
    </>
  )
}

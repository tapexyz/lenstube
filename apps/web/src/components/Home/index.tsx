import { EVENTS } from '@tape.xyz/generic'
import type { NextPage } from 'next'
import React, { useEffect } from 'react'

import useSw from '@/hooks/useSw'

import Feed from './Feed'
import TopSection from './TopSection'

const Home: NextPage = () => {
  const { addEventToQueue } = useSw()

  useEffect(() => {
    addEventToQueue(EVENTS.PAGEVIEW, { page: EVENTS.PAGE_VIEW.HOME })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div className="max-w-screen-ultrawide container mx-auto">
      <TopSection />
      <Feed />
    </div>
  )
}

export default Home

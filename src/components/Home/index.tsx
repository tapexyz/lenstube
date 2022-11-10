import MetaTags from '@components/Common/MetaTags'
import Curated from '@components/Explore/Curated'
import { Analytics, TRACK } from '@utils/analytics'
import { NextPage } from 'next'
import { useEffect } from 'react'

import DispatcherAlert from './DispatcherAlert'

const Home: NextPage = () => {
  useEffect(() => {
    Analytics.track('Pageview', { path: TRACK.PAGE_VIEW.HOME })
  }, [])
  return (
    <>
      <MetaTags />
      <DispatcherAlert />
      <div className="md:my-2">
        <Curated />
      </div>
    </>
  )
}

export default Home

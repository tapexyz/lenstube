import VideoCard from '@components/Common/VideoCard'
import QueuedVideo from '@components/Common/VideoCard/QueuedVideo'
import useAuthPersistStore from '@lib/store/auth'
import usePersistStore from '@lib/store/persist'
import { getProfile, getPublication } from '@tape.xyz/generic'
import type { AnyPublication } from '@tape.xyz/lens'
import type { SimpleProfile } from '@tape.xyz/lens/custom-types'
import type { FC } from 'react'
import React from 'react'

type Props = {
  videos: AnyPublication[]
}

const Timeline: FC<Props> = ({ videos }) => {
  const queuedVideos = usePersistStore((state) => state.queuedVideos)
  const selectedSimpleProfile = useAuthPersistStore(
    (state) => state.selectedSimpleProfile
  ) as SimpleProfile

  const isProfilePage =
    location.pathname === getProfile(selectedSimpleProfile).link

  return (
    <div className="ultrawide:grid-cols-6 grid-col-1 desktop:grid-cols-4 tablet:grid-cols-3 grid gap-x-4 gap-y-2 md:gap-y-6">
      {isProfilePage &&
        queuedVideos?.map((queuedVideo) => (
          <QueuedVideo
            key={queuedVideo?.thumbnailUrl}
            queuedVideo={queuedVideo}
          />
        ))}
      {videos?.map((video: AnyPublication, i) => {
        const targetPublication = getPublication(video)

        return <VideoCard key={`${video?.id}_${i}`} video={targetPublication} />
      })}
    </div>
  )
}

export default Timeline

import VideoPlayer from '@dragverse/ui/VideoPlayer'
import type { FC } from 'react'
import { memo } from 'react'

type Props = {
  playback: string
  poster: string
}

const LiveVideo: FC<Props> = ({ playback, poster }) => {
  return (
    <div className="overflow-hidden rounded-xl">
      <VideoPlayer
        url={playback}
        posterUrl={poster}
        options={{
          loadingSpinner: true,
          isCurrentlyShown: true,
          autoPlay: true
        }}
        isSensitiveContent={false}
      />
    </div>
  )
}

export default memo(LiveVideo)

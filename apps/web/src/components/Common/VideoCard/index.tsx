import { LENSTUBE_BYTES_APP_ID } from '@lenstube/constants'
import {
  getProfilePicture,
  getRelativeTime,
  trimLensHandle
} from '@lenstube/generic'
import type { MirrorablePublication } from '@lenstube/lens'
import { Trans } from '@lingui/macro'
import Link from 'next/link'
import type { FC } from 'react'
import React, { useState } from 'react'

import Badge from '../Badge'
import ReportModal from './ReportModal'
import ShareModal from './ShareModal'
import ThumbnailImage from './ThumbnailImage'
import ThumbnailOverlays from './ThumbnailOverlays'
import VideoOptions from './VideoOptions'

type Props = {
  video: MirrorablePublication
}

const VideoCard: FC<Props> = ({ video }) => {
  const [showShare, setShowShare] = useState(false)
  const [showReport, setShowReport] = useState(false)
  const isBytes = video.publishedOn?.id === LENSTUBE_BYTES_APP_ID

  const href = isBytes ? `/bytes/${video.id}` : `/watch/${video.id}`

  return (
    <div className="group" data-testid="video-card">
      {video.isHidden ? (
        <div className="grid h-full place-items-center">
          <span className="text-xs">Video Hidden by User</span>
        </div>
      ) : (
        <>
          <ShareModal
            video={video}
            show={showShare}
            setShowShare={setShowShare}
          />
          <ReportModal
            video={video}
            show={showReport}
            setShowReport={setShowReport}
          />
          <Link href={href}>
            <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
              <ThumbnailImage video={video} />
              <ThumbnailOverlays video={video} />
            </div>
          </Link>
          <div className="py-2">
            <div className="flex items-start space-x-2.5">
              <Link
                href={`/channel/${trimLensHandle(video.by?.handle)}`}
                className="mt-0.5 flex-none"
              >
                <img
                  className="h-8 w-8 rounded-full"
                  src={getProfilePicture(video.by)}
                  alt={video.by?.handle}
                  draggable={false}
                />
              </Link>
              <div className="grid flex-1">
                <div className="flex w-full min-w-0 items-start justify-between space-x-1.5 pb-1">
                  <Link
                    className="ultrawide:line-clamp-1 ultrawide:break-all line-clamp-2 break-words text-sm font-semibold"
                    href={href}
                    title={video.metadata.marketplace?.name ?? ''}
                    data-testid="video-card-title"
                  >
                    {video.metadata.marketplace?.name}
                  </Link>
                  <VideoOptions
                    video={video}
                    setShowShare={setShowShare}
                    setShowReport={setShowReport}
                  />
                </div>
                <Link
                  href={`/channel/${trimLensHandle(video.by?.handle)}`}
                  className="flex w-fit items-center space-x-0.5 text-[13px] opacity-70 hover:opacity-100"
                  data-testid="video-card-channel"
                >
                  <span>{trimLensHandle(video.by?.handle)}</span>
                  <Badge id={video.by?.id} size="xs" />
                </Link>
                <div className="flex items-center overflow-hidden text-xs opacity-70">
                  <span className="whitespace-nowrap">
                    {video.stats?.reactions} <Trans>likes</Trans>
                  </span>
                  <span className="middot" />
                  {video.createdAt && (
                    <span className="whitespace-nowrap">
                      {getRelativeTime(video.createdAt)}
                    </span>
                  )}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default VideoCard

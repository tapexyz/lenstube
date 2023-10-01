import Badge from '@components/Common/Badge'
import MirrorOutline from '@components/Common/Icons/MirrorOutline'
import ThumbnailImage from '@components/Common/VideoCard/ThumbnailImage'
import {
  getIsSensitiveContent,
  getProfilePicture,
  getValueFromTraitType,
  trimLensHandle
} from '@lenstube/generic'
import type { Attribute, Mirror, MirrorablePublication } from '@lenstube/lens'
import {
  getDateString,
  getRelativeTime,
  getTimeFromSeconds
} from '@lib/formatTime'
import { Trans } from '@lingui/macro'
import Link from 'next/link'
import type { FC } from 'react'
import React from 'react'

type Props = {
  video: Mirror
}

const MirroredVideoCard: FC<Props> = ({ video }) => {
  const mirrorOn = video.mirrorOn as MirrorablePublication
  const isSensitiveContent = getIsSensitiveContent(mirrorOn.metadata, video.id)
  const videoDuration = getValueFromTraitType(
    mirrorOn.metadata?.marketplace?.attributes as Attribute[],
    'durationInSeconds'
  )

  return (
    <div className="group overflow-hidden rounded-xl">
      <Link href={`/watch/${mirrorOn.id}`}>
        <div className="aspect-w-16 aspect-h-8 relative overflow-hidden rounded-md">
          <ThumbnailImage video={mirrorOn} />
          {isSensitiveContent && (
            <div className="absolute left-3 top-2">
              <span className="rounded-full bg-white px-2 py-0.5 text-[10px] text-black">
                <Trans>Sensitive Content</Trans>
              </span>
            </div>
          )}
          {!isSensitiveContent && videoDuration ? (
            <div>
              <span className="absolute bottom-2 right-2 rounded bg-black px-1 py-0.5 text-xs text-white">
                {getTimeFromSeconds(videoDuration)}
              </span>
            </div>
          ) : null}
        </div>
      </Link>
      <div className="py-2">
        <div className="flex items-start space-x-2.5">
          <Link
            href={`/channel/${mirrorOn.by?.handle}`}
            className="mt-0.5 flex-none"
          >
            <img
              className="h-8 w-8 rounded-full"
              src={getProfilePicture(mirrorOn.by, 'AVATAR')}
              alt={mirrorOn.by.handle}
              draggable={false}
            />
          </Link>
          <div className="grid-col grid flex-1">
            <div className="flex w-full min-w-0 items-start justify-between space-x-1.5">
              <Link
                className="line-clamp-1 break-words text-[15px] font-medium opacity-80"
                href={`/watch/${mirrorOn.id}`}
                title={mirrorOn.metadata.marketplace?.name ?? ''}
              >
                {mirrorOn.metadata.marketplace?.name}
              </Link>
            </div>
            <Link
              href={`/channel/${trimLensHandle(mirrorOn.by?.handle)}`}
              className="flex w-fit items-center space-x-0.5 text-[13px] opacity-70 hover:opacity-100"
            >
              <span>{trimLensHandle(mirrorOn.by?.handle)}</span>
              <Badge id={mirrorOn.by?.id} size="xs" />
            </Link>
          </div>
        </div>
        <div className="relative overflow-hidden pb-1.5 pt-4 text-sm opacity-90">
          <div className="absolute inset-0 bottom-2.5 left-3 flex w-1.5 justify-center pb-2">
            <div className="pointer-events-none w-0.5 bg-gray-300 dark:bg-gray-700" />
          </div>
          <span className="absolute bottom-1.5 m-2 mb-0 opacity-70">
            <MirrorOutline className="h-3.5 w-3.5" />
          </span>
          <div className="pl-8">
            <div className="flex items-center text-xs leading-3 opacity-70">
              <span title={getDateString(video.createdAt)}>
                <Trans>Mirrored</Trans> {getRelativeTime(video.createdAt)}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default React.memo(MirroredVideoCard)

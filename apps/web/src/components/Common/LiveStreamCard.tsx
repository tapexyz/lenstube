import { FALLBACK_COVER_URL } from '@lenstube/constants'
import {
  getRandomProfilePicture,
  trimLensHandle,
  useDid
} from '@lenstube/generic'
import { getShortHandTime } from '@lib/formatTime'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'
import React from 'react'

type Props = {
  name: string
  thumbnailUrl: string
  isLive: boolean
  address: string
  username: string
  createdAt: string
  app: ReactNode
}

const LiveStreamCard: FC<Props> = ({
  name,
  thumbnailUrl,
  address,
  isLive,
  createdAt,
  username,
  app
}) => {
  const { did } = useDid({ address, enabled: Boolean(address) })

  return (
    <div className="w-72">
      <Link href={``}>
        <div className="aspect-w-16 aspect-h-9 relative overflow-hidden">
          <img
            src={thumbnailUrl}
            className="h-full w-full rounded-xl bg-gray-100 object-cover object-center dark:bg-gray-900 lg:h-full lg:w-full"
            alt="thumbnail"
            draggable={false}
            onError={({ currentTarget }) => {
              currentTarget.src = FALLBACK_COVER_URL
            }}
          />
          {isLive && (
            <div>
              <span className="absolute bottom-1 right-1 rounded-xl bg-red-500 px-2 text-sm font-semibold text-white">
                Live
              </span>
            </div>
          )}
        </div>
      </Link>
      <div className="py-1">
        <div className="flex items-center space-x-2.5">
          <img
            className="h-8 w-8 rounded-full"
            src={getRandomProfilePicture(address ?? '')}
            alt={username}
            draggable={false}
          />
          <div className="grid flex-1">
            <div className="flex w-full min-w-0 items-start justify-between space-x-1.5">
              <div className="ultrawide:line-clamp-1 ultrawide:break-all line-clamp-2 break-words font-semibold">
                {name}
              </div>
            </div>
            <div className="flex items-center overflow-hidden text-xs opacity-70">
              <span>{trimLensHandle(did) ?? username}</span>
              <span className="middot" />
              {app}
              <span className="middot" />
              {createdAt && (
                <span className="whitespace-nowrap">
                  {getShortHandTime(createdAt)}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LiveStreamCard

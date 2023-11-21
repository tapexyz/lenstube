import { useCopyToClipboard } from '@dragverse/browser'
import {
  STATIC_ASSETS,
  TAPE_APP_NAME,
  TAPE_WEBSITE_URL
} from '@dragverse/constants'
import {
  EVENTS,
  getProfile,
  getProfilePicture,
  getPublicationData,
  Tower
} from '@dragverse/generic'
import type { PrimaryPublication } from '@dragverse/lens'
import Link from 'next/link'
import type { FC } from 'react'
import { useEffect, useState } from 'react'

import CopyOutline from './icons/CopyOutline'

type OverlayProps = {
  playerRef: HTMLMediaElement | undefined
  video: PrimaryPublication
}

const TopOverlay: FC<OverlayProps> = ({ playerRef, video }) => {
  const [showVideoOverlay, setShowVideoOverlay] = useState(true)
  const [copy] = useCopyToClipboard()

  useEffect(() => {
    if (playerRef) {
      playerRef.onpause = () => {
        setShowVideoOverlay(true)
      }
      playerRef.onplay = () => {
        setShowVideoOverlay(false)
      }
    }
  }, [playerRef])

  const onCopyVideoUrl = async () => {
    await copy(`${TAPE_WEBSITE_URL}/watch/${video.id}`)
    Tower.track(EVENTS.EMBED_VIDEO.CLICK_COPY_URL)
  }

  return (
    <div
      className={`${
        showVideoOverlay ? 'visible' : 'invisible'
      } transition-all duration-200 ease-in-out group-hover:visible`}
    >
      <div className="absolute top-0 z-10 w-full text-white">
        <div className="flex items-center justify-between space-x-6 bg-gradient-to-b from-black/80 via-black/30 to-transparent p-3.5 pb-6">
          <div className="flex flex-1 items-center">
            <Link
              className="mr-3 flex-none cursor-pointer"
              href={`${TAPE_WEBSITE_URL}/u/${getProfile(video.by)?.slug}`}
              target="_blank"
              onClick={() =>
                Tower.track(EVENTS.EMBED_VIDEO.CLICK_EMBED_PROFILE)
              }
            >
              <img
                src={getProfilePicture(video.by, 'AVATAR')}
                className="h-9 w-9 rounded-full"
                draggable={false}
                alt={getProfile(video.by)?.slug}
              />
            </Link>
            <div className="flex flex-col">
              <Link
                className="line-clamp-1 break-words leading-5"
                href={`${TAPE_WEBSITE_URL}/watch/${video?.id}`}
                target="_blank"
                onClick={() =>
                  Tower.track(EVENTS.EMBED_VIDEO.CLICK_EMBED_TITLE)
                }
              >
                <h1 className="font-bold md:text-lg">
                  {getPublicationData(video.metadata)?.title}
                </h1>
              </Link>
              <Link
                className="line-clamp-1 break-words leading-3"
                href={`${TAPE_WEBSITE_URL}/u/${getProfile(video.by)?.slug}`}
                target="_blank"
                onClick={() =>
                  Tower.track(EVENTS.EMBED_VIDEO.CLICK_EMBED_PROFILE)
                }
              >
                <span className="text-sm">{getProfile(video.by)?.slug}</span>
              </Link>
            </div>
          </div>
          <button
            onClick={() => onCopyVideoUrl()}
            className="invisible rounded-full bg-brand-850/50 p-3 transition-all duration-200 ease-in-out group-hover:visible"
          >
            <CopyOutline className="h-3.5 w-3.5" />
          </button>
        </div>
      </div>
      <div className="absolute bottom-2 right-0 md:bottom-4">
        <Link
          className="rounded-l-small flex items-center space-x-1.5 bg-brand-850/50 px-3 py-1.5 text-white"
          title={`Watch on ${TAPE_APP_NAME}`}
          href={`${TAPE_WEBSITE_URL}/watch/${video?.id}`}
          target="_blank"
          onClick={() => Tower.track(EVENTS.EMBED_VIDEO.CLICK_WATCH_ON_TAPE)}
        >
          <img
            src={`${STATIC_ASSETS}/brand/logo.svg`}
            draggable={false}
            className="ml-0.5 h-6 w-6 md:h-10 md:w-10"
            alt={TAPE_APP_NAME}
          />
          <b>Watch on Dragverse</b>
        </Link>
      </div>
    </div>
  )
}

export default TopOverlay

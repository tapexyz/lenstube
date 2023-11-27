import Tooltip from '@components/UIElements/Tooltip'
import { useCopyToClipboard } from '@dragverse/browser'
import {
  HEY_LOGO,
  LINKEDIN_ICON_URL,
  REDDIT_ICON_URL,
  TAPE_WEBSITE_URL,
  TAPEXYZ_LOGO,
  TWITTER_ICON_URL
} from '@dragverse/constants'
import { EVENTS, getSharableLink, imageCdn, Tower } from '@dragverse/generic'
import type { PrimaryPublication } from '@dragverse/lens'
import { IconButton } from '@radix-ui/themes'
import Link from 'next/link'
import { useTheme } from 'next-themes'
import type { FC } from 'react'

import EmbedMedia from '../EmbedMedia'
import CopyOutline from '../Icons/CopyOutline'
import MirrorOutline from '../Icons/MirrorOutline'
import MirrorPublication from '../MirrorPublication'

type Props = {
  publication: PrimaryPublication
}

const Share: FC<Props> = ({ publication }) => {
  const [copy] = useCopyToClipboard()
  const { resolvedTheme } = useTheme()
  const isAudio = publication.metadata?.__typename === 'AudioMetadataV3'
  const url = `${TAPE_WEBSITE_URL}/${isAudio ? 'listen' : 'watch'}/${
    publication.id
  }`

  const onCopyVideoUrl = async () => {
    await copy(url)
    Tower.track(EVENTS.PUBLICATION.PERMALINK)
  }

  return (
    <div>
      <div className="no-scrollbar mb-4 flex flex-nowrap items-center space-x-3 overflow-x-auto">
        <EmbedMedia publicationId={publication.id} isAudio={isAudio} />
        <MirrorPublication video={publication}>
          <div className="rounded-full bg-gray-200 p-3 dark:bg-gray-800">
            <MirrorOutline className="h-5 w-5" />
          </div>
        </MirrorPublication>
        <Link
          className="rounded-full"
          target="_blank"
          rel="noreferrer"
          onClick={() => Tower.track(EVENTS.PUBLICATION.SHARE.TAPE)}
          href={getSharableLink('tape', publication)}
        >
          <img
            src={imageCdn(`${TAPEXYZ_LOGO}`, 'AVATAR_LG')}
            className="h-12 w-12 max-w-none rounded-full"
            loading="eager"
            alt="tape"
            draggable={false}
          />
        </Link>
        <Link
          className="rounded-full"
          target="_blank"
          rel="noreferrer"
          onClick={() => Tower.track(EVENTS.PUBLICATION.SHARE.HEY)}
          href={getSharableLink('hey', publication)}
        >
          <img
            src={imageCdn(`${HEY_LOGO}`, 'AVATAR_LG')}
            className="h-10 w-10 max-w-none"
            loading="eager"
            alt="hey"
            draggable={false}
          />
        </Link>
        <span className="middot" />
        <Link
          className="rounded-full"
          target="_blank"
          rel="noreferrer"
          href={getSharableLink('x', publication)}
          onClick={() => Tower.track(EVENTS.PUBLICATION.SHARE.X)}
        >
          <img
            src={imageCdn(`${TWITTER_ICON_URL}`, 'AVATAR')}
            className="h-10 w-10 max-w-none rounded-full"
            height={16}
            width={16}
            alt="X Logo"
            draggable={false}
          />
        </Link>
        <Link
          href={getSharableLink('reddit', publication)}
          onClick={() => Tower.track(EVENTS.PUBLICATION.SHARE.REDDIT)}
          target="_blank"
          rel="noreferrer"
        >
          <img
            src={imageCdn(`${REDDIT_ICON_URL}`, 'AVATAR_LG')}
            className="h-10 w-10 max-w-none rounded-full"
            loading="eager"
            alt="reddit"
            draggable={false}
          />
        </Link>
        <Link
          href={getSharableLink('linkedin', publication)}
          target="_blank"
          onClick={() => Tower.track(EVENTS.PUBLICATION.SHARE.LINKEDIN)}
          rel="noreferrer"
        >
          <img
            src={imageCdn(`${LINKEDIN_ICON_URL}`, 'AVATAR_LG')}
            loading="eager"
            alt="linkedin"
            className="h-10 w-10 max-w-none rounded-full"
            draggable={false}
          />
        </Link>
      </div>
      <div className="flex items-center justify-between rounded-lg border border-gray-200 p-2 dark:border-gray-800">
        <div className="select-all truncate text-sm">{url}</div>
        <Tooltip content="Copy" placement="top">
          <IconButton
            variant="soft"
            size="1"
            className="ml-2 hover:opacity-60 focus:outline-none"
            onClick={() => onCopyVideoUrl()}
          >
            <CopyOutline className="h-4 w-4" />
          </IconButton>
        </Tooltip>
      </div>
    </div>
  )
}

export default Share

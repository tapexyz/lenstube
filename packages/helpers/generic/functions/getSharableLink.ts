import {
  HEY_WEBSITE_URL,
  TAPE_APP_NAME,
  TAPE_WEBSITE_URL,
  TAPE_X_HANDLE
} from '@dragverse/constants'
import type { MirrorablePublication } from '@dragverse/lens'

import { getPublicationData } from './getPublicationData'

type Link = 'tape' | 'hey' | 'x' | 'reddit' | 'linkedin'

export const getSharableLink = (
  link: Link,
  publication: MirrorablePublication
) => {
  const { handle } = publication.by
  const { metadata } = publication
  const isAudio = metadata?.__typename === 'AudioMetadataV3'

  const url = `${TAPE_WEBSITE_URL}/${isAudio ? 'listen' : 'watch'}/${
    publication.id
  }`

  if (link === 'tape') {
    return `${TAPE_WEBSITE_URL}/watch/${publication.id}`
  } else if (link === 'hey') {
    return `${HEY_WEBSITE_URL}/?url=${url}&text=${
      (getPublicationData(metadata)?.title as string) ?? ''
    } by @${handle}&hashtags=${TAPE_APP_NAME}&preview=true`
  } else if (link === 'x') {
    return encodeURI(
      `https://x.com/intent/tweet?url=${url}&text=${
        (getPublicationData(metadata)?.title as string) ?? ''
      } by @${handle}&via=${TAPE_X_HANDLE}&related=${TAPE_APP_NAME}&hashtags=${TAPE_APP_NAME}`
    )
  } else if (link === 'reddit') {
    return `https://www.reddit.com/submit?url=${url}&title=${
      (getPublicationData(metadata)?.title as string) ?? ''
    } by @${handle}`
  } else if (link === 'linkedin') {
    return `https://www.linkedin.com/shareArticle/?url=${url} by @${handle}&title=${
      (getPublicationData(metadata)?.title as string) ?? ''
    }&summary=${
      getPublicationData(metadata)?.content as string
    }&source=${TAPE_APP_NAME}`
  }
  return ''
}

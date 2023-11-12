import { Document } from 'linkedom'
import { COMMON_REGEX } from './constants'

const ALLOWED_EMBEDS = [
  'youtube.com',
  'youtu.be',
  'embed.tape.xyz',
  'player.vimeo.com'
]

const constructIframe = async (document: Document, url: string) => {
  if (COMMON_REGEX.TIKTOK_WATCH.test(url)) {
    // Fetch oembed html from tiktok
    const response = await fetch(`https://tiktok.com/oembed?url=${url}`, {
      cf: {
        cacheTtl: 60 * 60 * 24 * 7,
        cacheEverything: true
      }
    })
    const { html }: { html: string } = await response.json()
    return `<iframe src="${html}" class="aspect-[16/9] w-full" allow="accelerometer; clipboard-write; encrypted-media" allowfullscreen></iframe>`
  }

  const ogURLTag =
    document.querySelector('meta[property="twitter:player"]') ||
    document.querySelector('meta[property="og:video:secure_url"]') ||
    document.querySelector('meta[property="og:video:url"]')

  let embedUrl = ogURLTag ? ogURLTag.getAttribute('content') : null
  if (!embedUrl) {
    return null
  }
  const urlObj = new URL(embedUrl)
  const hostname = urlObj.hostname.replace('www.', '')

  if (!ALLOWED_EMBEDS.includes(hostname)) {
    return null
  }

  if (COMMON_REGEX.YOUTUBE_WATCH.test(embedUrl)) {
    urlObj.searchParams.append('color', 'white')
    urlObj.searchParams.append('modestbranding', '1')
    urlObj.searchParams.append('rel', '0')
    embedUrl = urlObj.href
  }

  if (embedUrl) {
    return `<iframe src="${embedUrl}" class="aspect-[16/9] w-full" allow="accelerometer; clipboard-write; encrypted-media" allowfullscreen></iframe>`
  } else {
    return 'No embed URL available.'
  }
}

export default constructIframe
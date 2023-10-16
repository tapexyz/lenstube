import type { Profile } from '@tape.xyz/lens'

import { trimLensHandle } from './trimLensHandle'

export const getProfile = (
  profile: Profile
): {
  prefix: '@' | '#'
  slug: string
  slugWithPrefix: string
  displayName: string
  link: string
} | null => {
  if (!profile) {
    return null
  }

  const prefix = profile.handle ? '@' : '#'
  const slug = trimLensHandle(profile.handle) || profile.id

  return {
    prefix,
    slug,
    slugWithPrefix: `${prefix}${slug}`,
    displayName: profile.metadata?.displayName || slug,
    link: profile.handle
      ? `/u/${trimLensHandle(profile.handle)}`
      : `/profile/${profile.id}`
  }
}

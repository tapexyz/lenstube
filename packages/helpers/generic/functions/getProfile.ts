import type { Profile } from '@tape.xyz/lens'
import type { SimpleProfile } from '@tape.xyz/lens/custom-types'

export const getProfile = (
  profile: Profile | SimpleProfile
): {
  slug: string
  slugWithPrefix: string
  displayName: string
  link: string
  id: string
  address: string
} => {
  if (!profile) {
    return {
      slug: '',
      slugWithPrefix: '',
      displayName: '',
      link: '',
      id: '',
      address: ''
    }
  }

  const prefix = profile.handle ? '@' : '#'
  const slug: string = profile.handle?.localName || profile.id

  return {
    id: profile.id,
    slug,
    slugWithPrefix: `${prefix}${slug}`,
    displayName: profile.metadata?.displayName || slug,
    link: profile.handle
      ? `/u/${profile.handle.localName}`
      : `/profile/${profile.id}`,
    address: profile.ownedBy.address
  }
}

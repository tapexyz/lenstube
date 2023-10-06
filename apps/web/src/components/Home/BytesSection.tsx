import BytesOutline from '@components/Common/Icons/BytesOutline'
import ChevronLeftOutline from '@components/Common/Icons/ChevronLeftOutline'
import ChevronRightOutline from '@components/Common/Icons/ChevronRightOutline'
import BytesShimmer from '@components/Shimmers/BytesShimmer'
import useAppStore from '@lib/store'
import { Trans } from '@lingui/macro'
import {
  FALLBACK_COVER_URL,
  LENS_CUSTOM_FILTERS,
  LENSTUBE_BYTES_APP_ID
} from '@tape.xyz/constants'
import {
  getProfilePicture,
  getThumbnailUrl,
  imageCdn,
  trimLensHandle
} from '@tape.xyz/generic'
import type {
  ExplorePublicationRequest,
  PrimaryPublication
} from '@tape.xyz/lens'
import {
  ExplorePublicationsOrderByType,
  ExplorePublicationType,
  LimitType,
  PublicationMetadataMainFocusType,
  useExplorePublicationsQuery
} from '@tape.xyz/lens'
import Link from 'next/link'
import React, { useRef } from 'react'

const BytesSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null)
  const activeTagFilter = useAppStore((state) => state.activeTagFilter)

  const request: ExplorePublicationRequest = {
    where: {
      publicationTypes: [ExplorePublicationType.Post],
      customFilters: LENS_CUSTOM_FILTERS,
      metadata: {
        publishedOn: [LENSTUBE_BYTES_APP_ID],
        tags:
          activeTagFilter !== 'all' ? { oneOf: [activeTagFilter] } : undefined,
        mainContentFocus: [PublicationMetadataMainFocusType.ShortVideo]
      }
    },
    orderBy: ExplorePublicationsOrderByType.LensCurated,
    limit: LimitType.Fifty
  }

  const { data, error, loading } = useExplorePublicationsQuery({
    variables: { request }
  })

  const bytes = data?.explorePublications
    ?.items as unknown as PrimaryPublication[]

  const sectionOffsetWidth = sectionRef.current?.offsetWidth ?? 1000
  const scrollOffset = sectionOffsetWidth / 1.2

  const scroll = (offset: number) => {
    if (sectionRef.current) {
      sectionRef.current.scrollLeft += offset
    }
  }

  if (loading) {
    return <BytesShimmer />
  }

  if (!bytes?.length || error) {
    return null
  }

  return (
    <div className="hidden md:block">
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <BytesOutline className="h-4 w-4" />
          <h1 className="text-xl font-semibold">
            <Trans>Bytes</Trans>
          </h1>
        </div>
        <div className="flex justify-end space-x-3">
          <button
            onClick={() => scroll(-scrollOffset)}
            className="rounded-full bg-gray-500 bg-opacity-10 p-2 backdrop-blur-xl hover:bg-opacity-25 focus:outline-none"
          >
            <ChevronLeftOutline className="h-4 w-4" />
          </button>
          <button
            onClick={() => scroll(scrollOffset)}
            className="rounded-full bg-gray-500 bg-opacity-10 p-2 backdrop-blur-xl hover:bg-opacity-25 focus:outline-none"
          >
            <ChevronRightOutline className="h-4 w-4" />
          </button>
        </div>
      </div>
      <div
        ref={sectionRef}
        className="no-scrollbar relative mb-3 flex touch-pan-x items-start space-x-4 overflow-x-auto overflow-y-hidden scroll-smooth"
      >
        {bytes.map((byte) => {
          const thumbnailUrl = getThumbnailUrl(byte)
          return (
            <div key={byte.id} className="w-44 space-y-1">
              <Link href={`/bytes/${byte.id}`}>
                <div className="aspect-[9/16] h-[280px]">
                  <img
                    className="h-full rounded-xl object-cover"
                    src={
                      thumbnailUrl ? imageCdn(thumbnailUrl, 'THUMBNAIL_V') : ''
                    }
                    alt="thumbnail"
                    draggable={false}
                    onError={({ currentTarget }) => {
                      currentTarget.src = FALLBACK_COVER_URL
                    }}
                  />
                </div>
                <h1 className="line-clamp-2 break-words pt-2 text-[13px]">
                  {byte.metadata.marketplace?.name}
                </h1>
              </Link>
              <div className="flex items-end space-x-1.5">
                <Link
                  href={`/channel/${trimLensHandle(byte.by?.handle)}`}
                  className="flex-none"
                  title={byte.by.handle}
                >
                  <img
                    className="h-3.5 w-3.5 rounded-full bg-gray-200 dark:bg-gray-800"
                    src={getProfilePicture(byte.by, 'AVATAR')}
                    alt={byte.by?.handle}
                    draggable={false}
                  />
                </Link>
                <span className="text-xs leading-3 opacity-70">
                  {byte.stats?.reactions} <Trans>likes</Trans>
                </span>
              </div>
            </div>
          )
        })}
      </div>
      <hr className="border-theme my-8 border-opacity-10 dark:border-gray-700" />
    </div>
  )
}

export default BytesSection

import MetaTags from '@components/Common/MetaTags'
import Timeline from '@components/Home/Timeline'
import TimelineShimmer from '@components/Shimmers/TimelineShimmer'
import { NoDataFound } from '@components/UIElements/NoDataFound'
import {
  ALLOWED_APP_IDS,
  IS_MAINNET,
  LENS_CUSTOM_FILTERS,
  LENSTUBE_APP_ID,
  LENSTUBE_BYTES_APP_ID,
  SCROLL_ROOT_MARGIN
} from '@lenstube/constants'
import type {
  PrimaryPublication,
  PublicationSearchRequest
} from '@lenstube/lens'
import {
  LimitType,
  PublicationMetadataMainFocusType,
  useSearchPublicationsQuery
} from '@lenstube/lens'
import { Loader } from '@lenstube/ui'
import { t } from '@lingui/macro'
import { useRouter } from 'next/router'
import React from 'react'
import { useInView } from 'react-cool-inview'
import Custom404 from 'src/pages/404'

const ExploreHashtag = () => {
  const { query } = useRouter()
  const hashtag = query.hashtag as string

  const request: PublicationSearchRequest = {
    where: {
      metadata: {
        publishedOn: IS_MAINNET
          ? [LENSTUBE_APP_ID, LENSTUBE_BYTES_APP_ID, ...ALLOWED_APP_IDS]
          : undefined,
        mainContentFocus: [PublicationMetadataMainFocusType.Video]
      },
      customFilters: LENS_CUSTOM_FILTERS
    },
    query: hashtag,
    limit: LimitType.Fifty
  }

  const { data, loading, error, fetchMore } = useSearchPublicationsQuery({
    variables: {
      request
    },
    skip: !hashtag
  })

  const videos = data?.searchPublications
    ?.items as unknown as PrimaryPublication[]
  const pageInfo = data?.searchPublications?.pageInfo

  const { observe } = useInView({
    rootMargin: SCROLL_ROOT_MARGIN,
    onEnter: async () => {
      await fetchMore({
        variables: {
          request: {
            ...request,
            cursor: pageInfo?.next
          }
        }
      })
    }
  })

  if (!hashtag) {
    return <Custom404 />
  }

  return (
    <>
      <MetaTags title={hashtag?.toString()} />
      <div>
        <h1 className="font-semibold md:text-2xl">#{hashtag}</h1>
        <div className="my-4">
          {loading && <TimelineShimmer />}
          {videos?.length === 0 && (
            <NoDataFound isCenter withImage text={t`No videos found`} />
          )}
          {!error && !loading && (
            <>
              <Timeline videos={videos} />
              {pageInfo?.next && (
                <span ref={observe} className="flex justify-center p-10">
                  <Loader />
                </span>
              )}
            </>
          )}
        </div>
      </div>
    </>
  )
}

export default ExploreHashtag

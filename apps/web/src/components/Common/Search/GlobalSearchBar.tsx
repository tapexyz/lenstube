import { NoDataFound } from '@components/UIElements/NoDataFound'
import { t } from '@lingui/macro'
import { ScrollArea, Text, TextField } from '@radix-ui/themes'
import { Analytics, TRACK, useOutsideClick } from '@tape.xyz/browser'
import { LENS_CUSTOM_FILTERS } from '@tape.xyz/constants'
import { useDebounce } from '@tape.xyz/generic'
import type {
  PrimaryPublication,
  Profile,
  ProfileSearchRequest,
  PublicationSearchRequest
} from '@tape.xyz/lens'
import {
  LimitType,
  PublicationMetadataMainFocusType,
  SearchPublicationType,
  useSearchProfilesLazyQuery,
  useSearchPublicationsLazyQuery
} from '@tape.xyz/lens'
import { Loader } from '@tape.xyz/ui'
import clsx from 'clsx'
import type { FC } from 'react'
import React, { useEffect, useRef, useState } from 'react'

import SearchOutline from '../Icons/SearchOutline'
import Profiles from './Profiles'
import Publications from './Publications'

interface Props {
  onSearchResults?: () => void
}

const GlobalSearchBar: FC<Props> = ({ onSearchResults }) => {
  const [keyword, setKeyword] = useState('')
  const debouncedValue = useDebounce<string>(keyword, 500)
  const resultsRef = useRef(null)
  useOutsideClick(resultsRef, () => setKeyword(''))

  const [
    searchPublications,
    { data: publicationsData, loading: publicationsLoading }
  ] = useSearchPublicationsLazyQuery()

  const [searchProfiles, { data: profilesData, loading: profilesLoading }] =
    useSearchProfilesLazyQuery()

  const publicationSearchRequest: PublicationSearchRequest = {
    limit: LimitType.Ten,
    query: keyword,
    where: {
      metadata: {
        mainContentFocus: [
          PublicationMetadataMainFocusType.Video,
          PublicationMetadataMainFocusType.ShortVideo
        ]
      },
      publicationTypes: [SearchPublicationType.Post],
      customFilters: LENS_CUSTOM_FILTERS
    }
  }

  const profileSearchRequest: ProfileSearchRequest = {
    limit: LimitType.Ten,
    query: keyword,
    where: {
      customFilters: LENS_CUSTOM_FILTERS
    }
  }

  const onDebounce = () => {
    if (keyword.trim().length) {
      searchPublications({
        variables: {
          request: publicationSearchRequest
        }
      })
      searchProfiles({
        variables: {
          request: profileSearchRequest
        }
      })
      Analytics.track(TRACK.SEARCH)
    }
  }

  const profiles = profilesData?.searchProfiles?.items as Profile[]
  const publications = publicationsData?.searchPublications
    ?.items as unknown as PrimaryPublication[]

  useEffect(() => {
    onDebounce()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  const clearSearch = () => {
    setKeyword('')
    onSearchResults?.()
  }

  return (
    <div className="md:w-2/4">
      <div ref={resultsRef}>
        <div className="relative">
          <TextField.Root variant="soft" color="gray">
            <TextField.Slot>
              <SearchOutline className="h-3 w-3" />
            </TextField.Slot>
            <TextField.Input
              type="search"
              value={keyword}
              onChange={(event) => setKeyword(event.target.value)}
              placeholder={t`Search`}
            />
          </TextField.Root>
          <div
            className={clsx(
              'z-10 mt-1 h-[80vh] w-full rounded-md bg-white text-base shadow-2xl ring-1 ring-black ring-opacity-5 focus:outline-none dark:bg-black md:absolute',
              { hidden: debouncedValue.length === 0 }
            )}
          >
            <ScrollArea className="p-5" type="hover" scrollbars="vertical">
              {profilesLoading || publicationsLoading ? (
                <div className="flex justify-center p-5">
                  <Loader />
                </div>
              ) : (
                <>
                  <div className="space-y-2 pb-2 focus:outline-none">
                    <Text size="3" weight="bold">
                      Creators
                    </Text>
                    {profiles?.length ? (
                      <Profiles
                        results={profiles}
                        loading={profilesLoading}
                        clearSearch={clearSearch}
                      />
                    ) : (
                      <NoDataFound isCenter />
                    )}
                  </div>
                  <div className="space-y-2 focus:outline-none">
                    <Text size="3" weight="bold">
                      Releases
                    </Text>
                    {publications?.length ? (
                      <Publications
                        results={publications}
                        loading={publicationsLoading}
                        clearSearch={clearSearch}
                      />
                    ) : (
                      <NoDataFound isCenter />
                    )}
                  </div>
                </>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GlobalSearchBar

import type { Profile, RecipientDataInput } from '@tape.xyz/lens'
import type { FC, RefObject } from 'react'

import InfoOutline from '@components/Common/Icons/InfoOutline'
import TimesOutline from '@components/Common/Icons/TimesOutline'
import { Input } from '@components/UIElements/Input'
import { NoDataFound } from '@components/UIElements/NoDataFound'
import ProfileSuggestion from '@components/UIElements/ProfileSuggestion'
import Tooltip from '@components/UIElements/Tooltip'
import useAppStore from '@lib/store'
import { IconButton, Text } from '@radix-ui/themes'
import { useDebounce, useOutsideClick } from '@tape.xyz/browser'
import {
  LENS_CUSTOM_FILTERS,
  LENS_NAMESPACE_PREFIX,
  TAPE_ADMIN_ADDRESS,
  TAPE_APP_NAME
} from '@tape.xyz/constants'
import {
  getProfile,
  getProfilePicture,
  splitNumber,
  trimify
} from '@tape.xyz/generic'
import { LimitType, useSearchProfilesLazyQuery } from '@tape.xyz/lens'
import { Loader } from '@tape.xyz/ui'
import clsx from 'clsx'
import React, { useEffect, useRef, useState } from 'react'
import { isAddress } from 'viem'

type Props = {
  submitContainerRef: RefObject<HTMLDivElement>
}

const Splits: FC<Props> = ({ submitContainerRef }) => {
  const uploadedMedia = useAppStore((state) => state.uploadedMedia)
  const setUploadedMedia = useAppStore((state) => state.setUploadedMedia)
  const splitRecipients = uploadedMedia.collectModule.multiRecipients ?? []
  const [searchKeyword, setSearchKeyword] = useState('')
  const debouncedValue = useDebounce<string>(searchKeyword, 500)

  const [searchProfiles, { data: profilesData, loading: profilesLoading }] =
    useSearchProfilesLazyQuery()
  const profiles = profilesData?.searchProfiles?.items as Profile[]

  const setSplitRecipients = (multiRecipients: RecipientDataInput[]) => {
    const enabled = Boolean(splitRecipients.length)
    setUploadedMedia({
      collectModule: {
        ...uploadedMedia.collectModule,
        isMultiRecipientFeeCollect: enabled,
        multiRecipients
      }
    })
  }

  const getIsValidAddress = (address: string) => isAddress(address)
  const isIncludesDonationAddress =
    splitRecipients.filter((el) => el.recipient === TAPE_ADMIN_ADDRESS).length >
    0

  const resultsRef = useRef(null)
  useOutsideClick(resultsRef, () => {
    setSearchKeyword('')
  })

  const onDebounce = async () => {
    if (trimify(searchKeyword).length) {
      await searchProfiles({
        variables: {
          request: {
            limit: LimitType.Ten,
            query: searchKeyword,
            where: {
              customFilters: LENS_CUSTOM_FILTERS
            }
          }
        }
      })
    }
  }

  useEffect(() => {
    onDebounce()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedValue])

  const onChangeSplit = async (
    key: 'recipient' | 'split',
    value: string,
    index: number
  ) => {
    const splits = splitRecipients
    const changedSplit = splits[index]
    if (key === 'split') {
      changedSplit[key] = Number(Number(value).toFixed(2))
    } else {
      changedSplit[key] = value
      if (!getIsValidAddress(value)) {
        setSearchKeyword(value)
      }
    }
    splits[index] = changedSplit
    setSplitRecipients([...splits])
  }

  const scrollToSubmit = () => {
    // requires some time because the input fields shifts the layout back down
    setTimeout(() => {
      submitContainerRef.current?.scrollIntoView({ behavior: 'smooth' })
    }, 50)
  }

  const addDonation = () => {
    const splits = splitRecipients
    splits.push({ recipient: TAPE_ADMIN_ADDRESS, split: 2 })
    setSplitRecipients([...splits])
    scrollToSubmit()
  }

  const addRecipient = () => {
    const splits = splitRecipients
    splits.push({ recipient: '', split: 1 })
    setSplitRecipients([...splits])
    scrollToSubmit()
  }

  const removeRecipient = (index: number) => {
    const splits = splitRecipients
    if (index >= 0) {
      splits.splice(index, 1)
    }
    setSplitRecipients([...splits])
  }

  const splitEvenly = () => {
    const equalSplits = splitNumber(100, splitRecipients.length)
    const splits = splitRecipients.map((splitRecipient, i) => {
      return {
        recipient: splitRecipient.recipient,
        split: equalSplits[i]
      }
    })
    setSplitRecipients([...splits])
  }

  return (
    <div className="space-y-1">
      <div className="flex items-center">
        <Text size="2" weight="medium">
          Split revenue
        </Text>
        <Tooltip content="Split collect revenue with anyone" placement="top">
          <span>
            <InfoOutline className="mx-1 size-3 opacity-70" />
          </span>
        </Tooltip>
      </div>
      {splitRecipients.map((splitRecipient, i) => (
        <div className="flex gap-1.5" key={i}>
          <div className="relative w-full">
            <Input
              autoComplete="off"
              autoFocus
              disabled={splitRecipient.recipient === TAPE_ADMIN_ADDRESS}
              onChange={(e) => onChangeSplit('recipient', e.target.value, i)}
              placeholder={`0x12345...89 or ${LENS_NAMESPACE_PREFIX}tape`}
              showErrorLabel={false}
              spellCheck="false"
              suffix={
                splitRecipient.recipient === TAPE_ADMIN_ADDRESS
                  ? `${TAPE_APP_NAME}.xyz`.toLowerCase()
                  : ''
              }
              title={
                splitRecipient.recipient === TAPE_ADMIN_ADDRESS
                  ? TAPE_APP_NAME
                  : undefined
              }
              validationError={
                getIsValidAddress(splitRecipient.recipient) ? '' : ' '
              }
              value={splitRecipient.recipient}
            />
            {searchKeyword.length &&
            !getIsValidAddress(splitRecipients[i].recipient) ? (
              <div
                className="tape-border z-10 mt-1 w-full overflow-hidden rounded-md bg-white focus:outline-none dark:bg-black md:absolute"
                ref={resultsRef}
              >
                {profilesLoading && <Loader className="my-4" />}
                {!profiles?.length && !profilesLoading ? (
                  <NoDataFound isCenter text="No profiles found" />
                ) : null}
                {profiles?.slice(0, 2)?.map((profile) => (
                  <button
                    className="w-full"
                    key={profile.id}
                    onClick={() => {
                      onChangeSplit('recipient', getProfile(profile).address, i)
                      setSearchKeyword('')
                    }}
                    type="button"
                  >
                    <ProfileSuggestion
                      className="hover:bg-brand-50 text-left dark:hover:bg-black"
                      followers={profile.stats.followers}
                      handle={getProfile(profile).slug}
                      id={profile.id}
                      pfp={getProfilePicture(profile, 'AVATAR')}
                    />
                  </button>
                ))}
              </div>
            ) : null}
          </div>
          <div className="w-1/3">
            <Input
              onChange={(e) => onChangeSplit('split', e.target.value, i)}
              placeholder="2"
              suffix="%"
              type="number"
              value={splitRecipient.split}
            />
          </div>
          <IconButton
            color="red"
            onClick={() => removeRecipient(i)}
            type="button"
            variant="soft"
          >
            <TimesOutline className="size-4 p-0.5" outlined={false} />
          </IconButton>
        </div>
      ))}
      <div className="flex items-center justify-between space-x-1.5 pt-1">
        <div className="flex items-center space-x-1">
          <button
            className={clsx(
              'rounded border border-gray-700 px-1 text-[10px] font-bold uppercase tracking-wider opacity-70 dark:border-gray-300',
              splitRecipients.length >= 5 && 'invisible'
            )}
            onClick={() => addRecipient()}
            type="button"
          >
            Add recipient
          </button>
          {!isIncludesDonationAddress && (
            <button
              className={clsx(
                'rounded border border-gray-700 px-1 text-[10px] font-bold uppercase tracking-wider opacity-70 dark:border-gray-300',
                splitRecipients.length >= 5 && 'invisible'
              )}
              onClick={() => addDonation()}
              type="button"
            >
              Add Donation
            </button>
          )}
        </div>
        {splitRecipients?.length > 1 && (
          <button
            className="rounded border border-gray-700 px-1 text-[10px] font-bold uppercase tracking-wider opacity-70 dark:border-gray-300"
            onClick={() => splitEvenly()}
            type="button"
          >
            Split evenly
          </button>
        )}
      </div>
    </div>
  )
}

export default Splits

import InfoOutline from '@components/Common/Icons/InfoOutline'
import TimesOutline from '@components/Common/Icons/TimesOutline'
import { Input } from '@components/UIElements/Input'
import Tooltip from '@components/UIElements/Tooltip'
import useAppStore from '@lib/store'
import { Trans } from '@lingui/macro'
import { IconButton, Text } from '@radix-ui/themes'
import {
  IS_MAINNET,
  TAPE_ADMIN_ADDRESS,
  TAPE_APP_NAME
} from '@tape.xyz/constants'
import { splitNumber, trimLensHandle } from '@tape.xyz/generic'
import { type RecipientDataInput, useProfileLazyQuery } from '@tape.xyz/lens'
import clsx from 'clsx'
import type { FC, RefObject } from 'react'
import React from 'react'
import { isAddress } from 'viem'

type Props = {
  submitContainerRef: RefObject<HTMLDivElement>
}

const Splits: FC<Props> = ({ submitContainerRef }) => {
  const uploadedVideo = useAppStore((state) => state.uploadedVideo)
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)
  const splitRecipients = uploadedVideo.collectModule.multiRecipients ?? []

  const [resolveHandleAddress, { loading: resolving }] = useProfileLazyQuery()

  const setSplitRecipients = (multiRecipients: RecipientDataInput[]) => {
    const enabled = Boolean(splitRecipients.length)
    setUploadedVideo({
      collectModule: {
        ...uploadedVideo.collectModule,
        multiRecipients,
        isMultiRecipientFeeCollect: enabled
      }
    })
  }

  const getIsValidAddress = (address: string) => isAddress(address)
  const isIncludesDonationAddress =
    splitRecipients.filter((el) => el.recipient === TAPE_ADMIN_ADDRESS).length >
    0
  const getIsHandle = (value: string) => {
    return IS_MAINNET && value === 'lensprotocol'
      ? true
      : value.includes(IS_MAINNET ? '.lens' : '.test')
  }

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
      if (!getIsValidAddress(value) && getIsHandle(value)) {
        const { data } = await resolveHandleAddress({
          variables: {
            request: {
              forHandle: `test/@${trimLensHandle(value as string)}`
            }
          }
        })
        const resolvedAddress = data?.profile?.ownedBy.address ?? ''
        changedSplit[key] = resolvedAddress
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
    if (!isIncludesDonationAddress) {
      addDonation()
    }
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
        <Tooltip content="Split revenue with anyone" placement="top">
          <span>
            <InfoOutline className="mx-1 h-3 w-3 opacity-70" />
          </span>
        </Tooltip>
      </div>
      {splitRecipients.map((splitRecipient, i) => (
        <div className="flex gap-1.5" key={i}>
          <Input
            className={clsx(
              resolving &&
                getIsHandle(splitRecipient.recipient) &&
                'animate-pulse'
            )}
            size="3"
            placeholder={`0x12345...89 or handle${
              IS_MAINNET ? '.lens' : '.test'
            }`}
            value={splitRecipient.recipient}
            onChange={(e) => onChangeSplit('recipient', e.target.value, i)}
            autoFocus
            autoComplete="off"
            spellCheck="false"
            title={
              splitRecipient.recipient === TAPE_ADMIN_ADDRESS
                ? TAPE_APP_NAME
                : undefined
            }
            suffix={
              splitRecipient.recipient === TAPE_ADMIN_ADDRESS
                ? `${TAPE_APP_NAME}.xyz`.toLowerCase()
                : ''
            }
            disabled={splitRecipient.recipient === TAPE_ADMIN_ADDRESS}
            validationError={
              getIsValidAddress(splitRecipient.recipient) ? '' : ' '
            }
            showErrorLabel={false}
          />
          <div className="w-1/3">
            <Input
              type="number"
              placeholder="2"
              size="3"
              suffix="%"
              value={splitRecipient.split}
              onChange={(e) => onChangeSplit('split', e.target.value, i)}
            />
          </div>
          <IconButton
            variant="soft"
            type="button"
            color="red"
            size="3"
            onClick={() => removeRecipient(i)}
          >
            <TimesOutline className="h-4 w-4 p-0.5" outlined={false} />
          </IconButton>
        </div>
      ))}
      <div className="flex items-center justify-between space-x-1.5 pt-1">
        <div className="flex items-center space-x-1">
          <button
            type="button"
            className={clsx(
              'rounded border border-gray-700 px-1 text-[10px] font-semibold uppercase tracking-wider opacity-70 dark:border-gray-300',
              splitRecipients.length >= 5 && 'invisible'
            )}
            onClick={() => addRecipient()}
          >
            <Trans>Add recipient</Trans>
          </button>
          {!isIncludesDonationAddress && (
            <Tooltip
              content={`Help ${TAPE_APP_NAME} continue to grow by adding a donation.`}
              placement="top"
            >
              <button
                type="button"
                className={clsx(
                  'rounded border border-gray-700 px-1 text-[10px] font-semibold uppercase tracking-wider opacity-70 dark:border-gray-300',
                  splitRecipients.length >= 5 && 'invisible'
                )}
                onClick={() => addDonation()}
              >
                <Trans>Add Donation</Trans>
              </button>
            </Tooltip>
          )}
        </div>
        {splitRecipients?.length > 1 && (
          <button
            type="button"
            className="rounded border border-gray-700 px-1 text-[10px] font-semibold uppercase tracking-wider opacity-70 dark:border-gray-300"
            onClick={() => splitEvenly()}
          >
            <Trans>Split evenly</Trans>
          </button>
        )}
      </div>
    </div>
  )
}

export default Splits
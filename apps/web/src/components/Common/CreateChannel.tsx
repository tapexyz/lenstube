import { Button } from '@components/UIElements/Button'
import { Input } from '@components/UIElements/Input'
import Modal from '@components/UIElements/Modal'
import { zodResolver } from '@hookform/resolvers/zod'
import useHandleWrongNetwork from '@hooks/useHandleWrongNetwork'
import usePendingTxn from '@hooks/usePendingTxn'
import useChannelStore from '@lib/store/channel'
import { t, Trans } from '@lingui/macro'
import { IS_MAINNET, TAPE_APP_NAME, ZERO_ADDRESS } from '@tape.xyz/constants'
import {
  getRandomProfilePicture,
  imageCdn,
  trimify,
  useIsMounted
} from '@tape.xyz/generic'
import { useCreateProfileMutation } from '@tape.xyz/lens'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useAccount } from 'wagmi'
import type z from 'zod'
import { object, string } from 'zod'

const formSchema = object({
  channelName: string()
    .min(5, { message: 'Name should be atleast 5 characters' })
    .max(30, { message: 'Name should not exceed 30 characters' })
    .regex(/^[a-z0-9]+$/, {
      message: 'Name should only contain alphanumeric characters'
    })
})
type FormData = z.infer<typeof formSchema>

export const ClaimHandle = () => (
  <div className="mt-2">
    <span className="text-sm opacity-70">
      <Trans>Your address does not seem to have Lens handle.</Trans>
    </span>
    <div className="text-base">
      <Trans>Visit</Trans>{' '}
      <Link
        href="https://claim.lens.xyz/"
        target="_blank"
        className="text-brand-500"
        rel="noreferrer"
      >
        <Trans>lens claiming site</Trans>
      </Link>{' '}
      <Trans>to claim your handle and then check back here.</Trans>
    </div>
  </div>
)

const CreateChannel = () => {
  const showCreateChannel = useChannelStore((state) => state.showCreateChannel)
  const setShowCreateChannel = useChannelStore(
    (state) => state.setShowCreateChannel
  )

  const handleWrongNetwork = useHandleWrongNetwork()
  const [loading, setLoading] = useState(false)
  const [buttonText, setButtonText] = useState(t`Create`)
  const { mounted } = useIsMounted()
  const router = useRouter()
  const { address } = useAccount()
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors }
  } = useForm<FormData>({
    resolver: zodResolver(formSchema)
  })

  const onError = () => {
    setLoading(false)
    setButtonText('Create')
  }

  const [createProfile, { data, reset }] = useCreateProfileMutation({
    onCompleted: ({ createProfile }) => {
      setButtonText(t`Indexing...`)
      if (createProfile?.__typename === 'RelayError') {
        setLoading(false)
        setButtonText(t`Create`)
      }
    },
    onError
  })

  const onCancel = () => {
    setShowCreateChannel(false)
    onError()
    reset()
  }

  const { indexed } = usePendingTxn({
    txHash:
      data?.createProfile.__typename === 'RelayerResult'
        ? data?.createProfile?.txHash
        : null
  })

  useEffect(() => {
    if (indexed) {
      setLoading(false)
      setShowCreateChannel(false)
      router.push(`/channel/${getValues().channelName}`)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [indexed])

  const onCreate = ({ channelName }: FormData) => {
    if (handleWrongNetwork()) {
      return
    }
    const username = trimify(channelName.toLowerCase())
    setLoading(true)
    setButtonText(t`Creating...`)
    createProfile({
      variables: {
        request: {
          handle: username,
          profilePictureUri: imageCdn(
            getRandomProfilePicture(address ?? ZERO_ADDRESS),
            'AVATAR'
          )
        }
      }
    })
  }

  return (
    <Modal
      title={IS_MAINNET ? t`Claim Handle` : t`Create Channel`}
      onClose={() => setShowCreateChannel(false)}
      show={mounted && showCreateChannel}
      panelClassName="max-w-md"
    >
      {IS_MAINNET ? (
        <ClaimHandle />
      ) : (
        <form onSubmit={handleSubmit(onCreate)} className="space-y-4">
          <h6 className="text-sm opacity-70">
            Your new {TAPE_APP_NAME} channel
          </h6>
          <div className="mt-2">
            <Input
              {...register('channelName')}
              label="Channel Name"
              type="text"
              placeholder="handle"
              autoComplete="off"
              validationError={errors.channelName?.message}
            />
          </div>
          <div className="flex items-center justify-between">
            <span className="w-2/3 flex-wrap">
              {data?.createProfile?.__typename === 'RelayError' && (
                <div>
                  <p className="text-xs font-medium text-red-500">
                    {data?.createProfile?.reason === 'HANDLE_TAKEN'
                      ? 'Channel already exists, try unique.'
                      : data?.createProfile?.reason}
                  </p>
                </div>
              )}
            </span>
            <span className="flex items-center space-x-2">
              <Button
                type="button"
                onClick={() => onCancel()}
                variant="hover"
                disabled={loading}
              >
                <Trans>Cancel</Trans>
              </Button>
              <Button type="submit" loading={loading}>
                {buttonText}
              </Button>
            </span>
          </div>
        </form>
      )}
    </Modal>
  )
}

export default CreateChannel
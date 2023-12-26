import type { Profile } from '@tape.xyz/lens'

import KeyOutline from '@components/Common/Icons/KeyOutline'
import { signIn, signOut } from '@lib/store/auth'
import useProfileStore from '@lib/store/idb/profile'
import { Avatar, Button, Flex, Select, Text } from '@radix-ui/themes'
import { ERROR_MESSAGE } from '@tape.xyz/constants'
import {
  EVENTS,
  getProfile,
  getProfilePicture,
  logger,
  Tower
} from '@tape.xyz/generic'
import {
  LimitType,
  useAuthenticateMutation,
  useChallengeLazyQuery,
  useProfilesManagedQuery
} from '@tape.xyz/lens'
import { useApolloClient } from '@tape.xyz/lens/apollo'
import { Loader } from '@tape.xyz/ui'
import { useRouter } from 'next/router'
import React, { useCallback, useMemo, useState } from 'react'
import toast from 'react-hot-toast'
import { useAccount, useSignMessage } from 'wagmi'

import Signup from './Signup'

const Authenticate = () => {
  const {
    query: { as }
  } = useRouter()

  const [loading, setLoading] = useState(false)
  const [selectedProfileId, setSelectedProfileId] = useState<string>()
  const { activeProfile, setActiveProfile } = useProfileStore()

  const router = useRouter()
  const { address, connector, isConnected } = useAccount()
  const { resetStore: resetApolloStore } = useApolloClient()

  const onError = () => {
    signOut()
  }

  const {
    data,
    loading: profilesLoading,
    refetch
  } = useProfilesManagedQuery({
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      const profiles = data?.profilesManaged.items
      if (profiles?.length) {
        const profile = [...profiles].reverse()[0]
        setSelectedProfileId(as || profile.id)
      }
    },
    skip: !address,
    variables: {
      request: { for: address, includeOwned: true, limit: LimitType.Fifty }
    }
  })

  const profilesManaged = data?.profilesManaged.items as Profile[]
  const reversedProfilesManaged = useMemo(() => {
    // Use the spread operator to create a new array and sort it by the "handle" key
    return [...(profilesManaged || [])].reverse()
  }, [profilesManaged])

  const profile = reversedProfilesManaged?.[0]

  const { signMessageAsync } = useSignMessage({
    onError
  })

  const [loadChallenge] = useChallengeLazyQuery({
    // if cache old challenge persist issue (InvalidSignature)
    fetchPolicy: 'no-cache',
    onError
  })
  const [authenticate] = useAuthenticateMutation()

  const handleSign = useCallback(async () => {
    if (!isConnected) {
      signOut()
      return toast.error('Please connect to your wallet')
    }
    try {
      setLoading(true)
      const challenge = await loadChallenge({
        variables: { request: { for: selectedProfileId, signedBy: address } }
      })
      if (!challenge?.data?.challenge?.text) {
        return toast.error(ERROR_MESSAGE)
      }
      const signature = await signMessageAsync({
        message: challenge?.data?.challenge?.text
      })
      if (!signature) {
        return
      }
      const result = await authenticate({
        variables: {
          request: { id: challenge.data?.challenge.id, signature }
        }
      })
      const accessToken = result.data?.authenticate.accessToken
      const refreshToken = result.data?.authenticate.refreshToken
      signIn({ accessToken, refreshToken })
      if (profilesManaged.length === 0) {
        setActiveProfile(null)
        toast.error('No profile found')
      } else {
        const profile = profilesManaged.find(
          (profile) => profile.id === selectedProfileId
        )
        if (profile) {
          setActiveProfile(profile)
        }
        const next = router.query?.next as string
        if (next && next.startsWith('/') && !next.startsWith('//')) {
          router.push(next)
        } else {
          router.push('/')
        }
      }
      resetApolloStore()
      Tower.track(EVENTS.AUTH.SIGN_IN_WITH_LENS)
    } catch (error) {
      logger.error('[Error Sign In]', {
        connector: connector?.name,
        error
      })
    } finally {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    router,
    address,
    connector,
    authenticate,
    isConnected,
    loadChallenge,
    profilesManaged,
    selectedProfileId
  ])

  if (as && as === activeProfile?.id) {
    return null
  }

  if (!isConnected) {
    return null
  }

  if (profilesLoading) {
    return <Loader />
  }

  return (
    <div className="text-left">
      {as && <p className="pb-1">Login as</p>}
      {profile ? (
        <Flex direction="column" gap="2">
          <Select.Root
            defaultValue={as ?? profile?.id}
            onValueChange={(value) => setSelectedProfileId(value)}
            value={selectedProfileId}
          >
            <Select.Trigger className="w-full" />
            <Select.Content highContrast>
              {reversedProfilesManaged?.map((profile) => (
                <Select.Item key={profile.id} value={profile.id}>
                  <Flex align="center" gap="2">
                    <Avatar
                      alt={getProfile(profile)?.displayName}
                      fallback={getProfile(profile)?.displayName[0] ?? ';)'}
                      radius="full"
                      size="1"
                      src={getProfilePicture(profile, 'AVATAR')}
                    />
                    <Text>{getProfile(profile)?.slugWithPrefix}</Text>
                  </Flex>
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Root>
          <Button
            className="w-full"
            disabled={loading || !selectedProfileId}
            highContrast
            onClick={handleSign}
          >
            <KeyOutline className="size-4" />
            Sign message
          </Button>
        </Flex>
      ) : (
        <Signup onSuccess={() => refetch()} />
      )}
    </div>
  )
}

export default Authenticate

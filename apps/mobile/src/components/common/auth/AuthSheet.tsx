import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import { STATIC_ASSETS } from '@lenstube/constants'
import {
  getRandomProfilePicture,
  imageCdn,
  logger,
  shortenAddress
} from '@lenstube/generic'
import type { Profile } from '@lenstube/lens'
import {
  useAllProfilesLazyQuery,
  useAuthenticateMutation,
  useChallengeLazyQuery
} from '@lenstube/lens'
import { useWalletConnectModal } from '@walletconnect/modal-react-native'
import { Image as ExpoImage } from 'expo-image'
import type { FC } from 'react'
import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { createWalletClient, custom } from 'viem'
import { polygon } from 'viem/chains'
import type { SignableMessage } from 'viem/dist/types/types/misc'

import Button from '~/components/ui/Button'
import Sheet from '~/components/ui/Sheet'
import haptic from '~/helpers/haptic'
import normalizeFont from '~/helpers/normalize-font'
import { useMobileTheme } from '~/hooks'
import useMobileStore from '~/store'
import { useMobilePersistStore } from '~/store/persist'

type Props = {
  sheetRef: React.RefObject<BottomSheetModalMethods>
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    paddingTop: 15,
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 15
  }
})

const AuthSheet: FC<Props> = ({ sheetRef }) => {
  const { themeConfig } = useMobileTheme()

  const setChannels = useMobileStore((state) => state.setChannels)
  const setSelectedChannel = useMobileStore((state) => state.setSelectedChannel)
  const { signIn: persistSignin } = useMobilePersistStore()
  const setSelectedChannelId = useMobilePersistStore(
    (state) => state.setSelectedChannelId
  )

  const { provider, address } = useWalletConnectModal()

  const [loadChallenge, { loading: challengeLoading }] = useChallengeLazyQuery({
    fetchPolicy: 'no-cache' // if cache old challenge persist issue (InvalidSignature)
  })
  const [authenticate, { loading: signingIn }] = useAuthenticateMutation()
  const [getChannels] = useAllProfilesLazyQuery({
    fetchPolicy: 'no-cache'
  })

  const signIn = async () => {
    if (!provider) {
      return
    }
    try {
      const challenge = await loadChallenge({
        variables: { request: { address } }
      })
      const client = createWalletClient({
        chain: polygon,
        transport: custom(provider)
      })
      const signature = await client.signMessage({
        account: address as `0x${string}`,
        message: challenge?.data?.challenge?.text as SignableMessage
      })
      const { data } = await authenticate({
        variables: { request: { address, signature } }
      })
      const accessToken = data?.authenticate.accessToken
      const refreshToken = data?.authenticate.refreshToken
      persistSignin({ accessToken, refreshToken })
      const { data: channelsData } = await getChannels({
        variables: {
          request: { ownedBy: [address] }
        }
      })
      if (
        !channelsData?.profiles ||
        channelsData?.profiles?.items.length === 0
      ) {
        return persistSignin({ accessToken: null, refreshToken: null })
      }
      const channels = channelsData?.profiles?.items as Profile[]
      setChannels(channels)
      const defaultChannel = channels.find((channel) => channel.isDefault)
      setSelectedChannel(defaultChannel ?? channels[0])
      setSelectedChannelId(defaultChannel?.id ?? channels[0].id)
      sheetRef.current?.close()
    } catch (error) {
      logger.error('SIGN IN ERROR 🔒', error)
    }
  }

  const loading = challengeLoading || signingIn

  if (!address) {
    return null
  }

  return (
    <Sheet sheetRef={sheetRef}>
      <View style={styles.container}>
        <View
          style={{
            alignItems: 'center',
            flex: 1,
            justifyContent: 'space-between',
            gap: 10
          }}
        >
          <ExpoImage
            source={{
              uri: address
                ? getRandomProfilePicture(address)
                : imageCdn(`${STATIC_ASSETS}/mobile/icons/herb.png`)
            }}
            transition={300}
            contentFit="cover"
            style={{ width: 80, height: 80, borderRadius: 25 }}
          />
          <Text
            style={{
              color: themeConfig.textColor,
              fontFamily: 'font-medium',
              fontSize: normalizeFont(24)
            }}
          >
            {shortenAddress(address)}
          </Text>
          <Text
            style={{
              color: themeConfig.secondaryTextColor,
              fontFamily: 'font-normal',
              fontSize: normalizeFont(14)
            }}
          >
            Help us verify that you are the owner of the connected wallet by
            signing the message.
          </Text>
        </View>

        <Button
          text="Sign & Verify"
          disabled={loading}
          onPress={() => {
            haptic()
            signIn()
          }}
        />
      </View>
    </Sheet>
  )
}

export default AuthSheet

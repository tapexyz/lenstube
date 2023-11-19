import {
    getPublicationMediaUrl,
    getThumbnailUrl,
    imageCdn
} from '@dragverse/generic'
import type { PrimaryPublication } from '@dragverse/lens'
import type { MobileThemeConfig } from '@dragverse/lens/custom-types'
import Ionicons from '@expo/vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
import { ResizeMode, Video } from 'expo-av'
import type { FC } from 'react'
import React from 'react'
import { Pressable, StyleSheet, View } from 'react-native'

import { useMobileTheme } from '~/hooks'

type Props = {
  video: PrimaryPublication
}

const styles = (themeConfig: MobileThemeConfig) =>
  StyleSheet.create({
    close: {
      position: 'absolute',
      backgroundColor: themeConfig.buttonBackgroundColor,
      borderRadius: 100,
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: 30,
      height: 30,
      right: 7,
      top: 5,
      zIndex: 1
    }
  })

const VideoPlayer: FC<Props> = ({ video }) => {
  const { goBack } = useNavigation()
  const { themeConfig } = useMobileTheme()
  const style = styles(themeConfig)

  return (
    <View style={{ position: 'relative' }}>
      <Video
        usePoster
        shouldPlay
        useNativeControls
        isMuted={false}
        isLooping={false}
        resizeMode={ResizeMode.CONTAIN}
        source={{
          uri: getPublicationMediaUrl(video.metadata)
        }}
        posterSource={{ uri: imageCdn(getThumbnailUrl(video, true)) }}
        style={{
          width: '100%',
          aspectRatio: 16 / 9,
          backgroundColor: themeConfig.backgroudColor2
        }}
      />
      <Pressable onPress={() => goBack()} style={style.close}>
        <Ionicons
          name="close-outline"
          color={themeConfig.buttonTextColor}
          size={25}
        />
      </Pressable>
    </View>
  )
}

export default VideoPlayer

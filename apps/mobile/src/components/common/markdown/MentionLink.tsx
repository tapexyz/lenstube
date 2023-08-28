import { useNavigation } from '@react-navigation/native'
import React from 'react'
import { StyleSheet, Text } from 'react-native'

import AnimatedPressable from '~/components/ui/AnimatedPressable'
import normalizeFont from '~/helpers/normalize-font'
import { theme } from '~/helpers/theme'

export type MentionLinkProps = {
  handle: string
}
const styles = StyleSheet.create({
  mention: {
    fontFamily: 'font-normal',
    fontSize: normalizeFont(13),
    color: theme.colors.yellow,
    letterSpacing: 0.6,
    opacity: 0.9
  }
})

const MentionLink = ({ handle }: MentionLinkProps) => {
  const { navigate } = useNavigation()

  return (
    <AnimatedPressable
      onPress={() => {
        navigate('ProfileScreen', { handle })
      }}
    >
      <Text style={styles.mention}>{handle}</Text>
    </AnimatedPressable>
  )
}

export default MentionLink

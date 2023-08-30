import Ionicons from '@expo/vector-icons/Ionicons'
import { type BottomSheetModal } from '@gorhom/bottom-sheet'
import type { MobileThemeConfig } from '@lenstube/lens/custom-types'
import type { HeaderTitleProps } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import { useWalletConnectModal } from '@walletconnect/modal-react-native'
import type { FC } from 'react'
import React, { useRef } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import haptic from '~/helpers/haptic'
import normalizeFont from '~/helpers/normalize-font'
import { useMobileTheme } from '~/hooks'
import useMobileStore from '~/store'
import { signOut, useMobilePersistStore } from '~/store/persist'

import Menu from '../profile/Menu'
import MenuItem from '../profile/MenuItem'
import Switch from '../profile/Switch'
import AnimatedPressable from '../ui/AnimatedPressable'
import Sheet from '../ui/Sheet'
import AppInfo from './AppInfo'
import SignIn from './auth/SignIn'
import UserProfile from './UserProfile'

const styles = (themeConfig: MobileThemeConfig) =>
  StyleSheet.create({
    container: {
      flexDirection: 'row',
      width: '100%',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingBottom: 10
    },
    rightView: {
      display: 'flex',
      flexDirection: 'row',
      alignItems: 'center',
      gap: 20
    },
    forYouText: {
      color: themeConfig.textColor,
      fontFamily: 'font-bold',
      fontWeight: '500',
      fontSize: normalizeFont(22)
    },
    newButton: {
      width: 30,
      height: 30,
      borderRadius: 100,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: themeConfig.backgroudColor
    }
  })

const AuthenticatedUser = () => {
  const profileSheetRef = useRef<BottomSheetModal>(null)
  const { navigate } = useNavigation()
  const { provider } = useWalletConnectModal()

  const selectedChannel = useMobileStore((state) => state.selectedChannel)
  const setSelectedChannel = useMobileStore((state) => state.setSelectedChannel)

  const logout = () => {
    signOut()
    provider?.disconnect()
    setSelectedChannel(null)
    haptic()
  }

  if (!selectedChannel) {
    return null
  }

  return (
    <>
      <UserProfile
        profile={selectedChannel}
        showHandle={false}
        size={30}
        onPress={() => profileSheetRef.current?.present()}
      />
      <Sheet sheetRef={profileSheetRef} snap={['60%']}>
        <View style={{ padding: 10 }}>
          <Switch />
          <View style={{ marginTop: 15, gap: 15 }}>
            <Menu>
              <MenuItem
                icon="person-outline"
                title="My Profile"
                onPress={() => {
                  profileSheetRef.current?.close()
                  navigate('ProfileScreen', {
                    handle: selectedChannel.handle
                  })
                }}
              />
              <MenuItem
                icon="notifications-outline"
                title="Notifications"
                onPress={() => {
                  profileSheetRef.current?.close()
                  navigate('NotificationsModal')
                }}
              />
              <MenuItem icon="bookmark-outline" title="Bookmarks" />
            </Menu>
            <Menu>
              <MenuItem icon="pie-chart-outline" title="Creator Studio" />
              <MenuItem icon="people-outline" title="Manager" />
              <MenuItem icon="cog-outline" title="Settings" />
            </Menu>
            <Menu>
              <MenuItem
                icon="log-out-outline"
                title="Sign out"
                onPress={() => logout()}
                showArrow={false}
              />
            </Menu>
          </View>
        </View>
        <AppInfo />
      </Sheet>
    </>
  )
}

const Header: FC<HeaderTitleProps> = () => {
  const { themeConfig } = useMobileTheme()
  const { navigate } = useNavigation()

  const selectedChannel = useMobileStore((state) => state.selectedChannel)
  const theme = useMobilePersistStore((state) => state.theme)
  const setTheme = useMobilePersistStore((state) => state.setTheme)

  return (
    <View style={styles(themeConfig).container}>
      <Text style={styles(themeConfig).forYouText}>gm</Text>

      <View style={styles(themeConfig).rightView}>
        <AnimatedPressable
          style={styles(themeConfig).newButton}
          onPress={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
        >
          <Ionicons
            name="swap-horizontal"
            color={themeConfig.textColor}
            style={{ paddingLeft: 1 }}
            size={20}
          />
        </AnimatedPressable>
        {selectedChannel && (
          <AnimatedPressable
            style={styles(themeConfig).newButton}
            onPress={() => navigate('NewPublication')}
          >
            <Ionicons
              name="add-outline"
              color={themeConfig.textColor}
              style={{ paddingLeft: 1 }}
              size={20}
            />
          </AnimatedPressable>
        )}

        {selectedChannel ? <AuthenticatedUser /> : <SignIn />}
      </View>
    </View>
  )
}

export default Header

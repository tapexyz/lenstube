import 'react-native-reanimated'
import 'react-native-gesture-handler'

import { StatusBar } from 'expo-status-bar'
import { MotiView } from 'moti'
import React, { useReducer } from 'react'
import { Pressable, StyleSheet } from 'react-native'

import { useNotifications } from './hooks'
import { NotificationsProvider } from './providers'

const styles = StyleSheet.create({
  shape: {
    justifyContent: 'center',
    height: 250,
    width: 250,
    borderRadius: 25,
    marginRight: 10,
    backgroundColor: 'white'
  },
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: '#9c1aff'
  }
})

function Shape() {
  return (
    <MotiView
      from={{
        opacity: 0,
        scale: 0.5
      }}
      animate={{
        opacity: 1,
        scale: 1
      }}
      transition={{
        type: 'timing'
      }}
      style={styles.shape}
    />
  )
}

const App = (): JSX.Element => {
  const [visible, toggle] = useReducer((s) => !s, true)
  const { notify } = useNotifications()

  return (
    <>
      <NotificationsProvider />
      <Pressable
        onPress={() => {
          toggle()
          notify('success', {
            params: {
              title: 'Hello',
              description: 'Wow, that was easy'
            }
          })
        }}
        style={styles.container}
      >
        <StatusBar style="auto" />
        {visible && <Shape />}
      </Pressable>
    </>
  )
}

export default App

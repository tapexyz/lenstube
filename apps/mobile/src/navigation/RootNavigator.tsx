import { createStackNavigator } from '@react-navigation/stack'
import type { FC } from 'react'
import React from 'react'

import { CategoriesModal, TopsModal } from '~/components/common/modals'
import { WatchVideoScreen } from '~/screens'

import { BottomTabNavigator } from './BottomTabNavigator'

const { Navigator, Screen, Group } = createStackNavigator<RootStackParamList>()

export const RootNavigator: FC = () => {
  return (
    <Navigator>
      <Group key="authorized">
        <Screen
          name="MainTab"
          options={{
            headerShown: false
          }}
          component={BottomTabNavigator}
        />
        <Screen
          name="WatchVideo"
          options={{
            headerShown: false
          }}
          component={WatchVideoScreen}
        />
      </Group>
      <Group key="modals" screenOptions={{ presentation: 'modal' }}>
        <Screen
          name="ExploreTopsModal"
          component={TopsModal}
          options={{ headerShown: false, presentation: 'transparentModal' }}
        />
        <Screen
          name="ExploreCategoriesModal"
          component={CategoriesModal}
          options={{ headerShown: false, presentation: 'transparentModal' }}
        />
      </Group>
    </Navigator>
  )
}

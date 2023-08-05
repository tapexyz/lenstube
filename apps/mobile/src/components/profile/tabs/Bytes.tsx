import { LENS_CUSTOM_FILTERS, LENSTUBE_BYTES_APP_ID } from '@lenstube/constants'
import { getThumbnailUrl, imageCdn } from '@lenstube/generic'
import {
  type Profile,
  type Publication,
  PublicationTypes,
  useProfilePostsQuery
} from '@lenstube/lens'
import { Image as ExpoImage } from 'expo-image'
import type { FC } from 'react'
import React, { memo, useCallback } from 'react'
import type { NativeScrollEvent, NativeSyntheticEvent } from 'react-native'
import {
  ActivityIndicator,
  StyleSheet,
  useWindowDimensions,
  View
} from 'react-native'
import Animated from 'react-native-reanimated'

import AnimatedPressable from '~/components/ui/AnimatedPressable'
import { theme } from '~/helpers/theme'

type Props = {
  profile: Profile
  scrollHandler: (event: NativeSyntheticEvent<NativeScrollEvent>) => void
}

const GRID_GAP = 5

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: GRID_GAP,
    flex: 1
  },
  thumbnail: {
    width: '100%',
    height: 230,
    borderRadius: GRID_GAP,
    borderColor: theme.colors.grey,
    borderWidth: 0.5,
    backgroundColor: theme.colors.backdrop
  }
})

const Bytes: FC<Props> = ({ profile, scrollHandler }) => {
  const { height } = useWindowDimensions()

  const request = {
    publicationTypes: [PublicationTypes.Post],
    limit: 30,
    sources: [LENSTUBE_BYTES_APP_ID],
    customFilters: LENS_CUSTOM_FILTERS,
    profileId: profile?.id
  }

  const { data, loading, fetchMore } = useProfilePostsQuery({
    variables: {
      request
    },
    skip: !profile?.id
  })

  const bytes = data?.publications?.items as Publication[]
  const pageInfo = data?.publications?.pageInfo

  const fetchMorePublications = async () => {
    await fetchMore({
      variables: {
        request: {
          ...request,
          cursor: pageInfo?.next
        }
      }
    })
  }

  const renderItem = useCallback(
    ({ item, index }: { item: Publication; index: number }) => (
      <View
        style={{
          flex: 1,
          marginRight: index % 3 < 2 ? GRID_GAP : 0
        }}
      >
        <AnimatedPressable>
          <ExpoImage
            source={{
              uri: imageCdn(getThumbnailUrl(item, true), 'THUMBNAIL_V')
            }}
            transition={300}
            contentFit="cover"
            style={styles.thumbnail}
          />
        </AnimatedPressable>
      </View>
    ),
    []
  )

  return (
    <View style={[styles.container, { height }]}>
      <Animated.FlatList
        data={bytes}
        renderItem={renderItem}
        keyExtractor={(item, i) => `${item.id}_${i}`}
        ItemSeparatorComponent={() => <View style={{ height: GRID_GAP }} />}
        ListFooterComponent={() =>
          loading && <ActivityIndicator style={{ paddingVertical: 20 }} />
        }
        onEndReached={fetchMorePublications}
        onEndReachedThreshold={0.8}
        showsVerticalScrollIndicator={false}
        onScroll={scrollHandler}
        numColumns={3}
        scrollEventThrottle={16}
      />
    </View>
  )
}

export default memo(Bytes)

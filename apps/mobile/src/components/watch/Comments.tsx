import type { BottomSheetModal } from '@gorhom/bottom-sheet'
import { LENS_CUSTOM_FILTERS } from '@lenstube/constants'
import type { Publication, PublicationsQueryRequest } from '@lenstube/lens'
import { useCommentsQuery } from '@lenstube/lens'
import type { MobileThemeConfig } from '@lenstube/lens/custom-types'
import { FlashList } from '@shopify/flash-list'
import { Skeleton } from 'moti/skeleton'
import type { FC } from 'react'
import React, { useCallback, useRef } from 'react'
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  useWindowDimensions,
  View
} from 'react-native'

import normalizeFont from '~/helpers/normalize-font'
import { useMobileTheme } from '~/hooks'

import NotFound from '../ui/NotFound'
import Sheet from '../ui/Sheet'
import Comment from './Comment'
import CommentButton from './CommentButton'

// fixed height to fix CLS between comment and comment button
const CONTAINER_HEIGHT = 80

const styles = (themeConfig: MobileThemeConfig) =>
  StyleSheet.create({
    container: {
      display: 'flex',
      flexDirection: 'column',
      borderRadius: 15,
      borderColor: themeConfig.borderColor,
      borderWidth: 0.5,
      gap: 10,
      height: CONTAINER_HEIGHT,
      width: '100%'
    },
    title: {
      fontFamily: 'font-bold',
      color: themeConfig.textColor,
      fontSize: normalizeFont(14),
      paddingBottom: 10
    }
  })

type Props = {
  id: string
}

const Comments: FC<Props> = ({ id }) => {
  const { themeConfig } = useMobileTheme()
  const style = styles(themeConfig)

  const { height } = useWindowDimensions()
  const commentsSheetRef = useRef<BottomSheetModal>(null)

  const request: PublicationsQueryRequest = {
    limit: 10,
    customFilters: LENS_CUSTOM_FILTERS,
    commentsOf: id
  }

  const { data, fetchMore, loading, refetch } = useCommentsQuery({
    variables: { request },
    skip: !id
  })
  const comments = data?.publications?.items as Publication[]
  const pageInfo = data?.publications?.pageInfo

  const fetchMoreComments = async () => {
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
    ({ item }: { item: Publication }) => (
      <View style={{ marginTop: 20 }}>
        <Comment comment={item} richText />
      </View>
    ),
    []
  )

  return (
    <>
      <View style={style.container}>
        <Skeleton
          show={loading}
          colors={[`${themeConfig.backgroudColor}50`, 'transparent']}
          radius={15}
          height={CONTAINER_HEIGHT}
        >
          <Pressable
            style={{
              flex: 1,
              justifyContent: 'center',
              paddingHorizontal: 15
            }}
            onPress={() => commentsSheetRef.current?.present()}
          >
            {comments?.length ? (
              <Comment comment={comments[0]} numberOfLines={1} />
            ) : (
              <CommentButton />
            )}
          </Pressable>
        </Skeleton>
      </View>

      <Sheet sheetRef={commentsSheetRef} backdropOpacity={0.9}>
        <View
          style={{
            flex: 1,
            height: height / 2,
            paddingHorizontal: 20
          }}
        >
          <Text style={style.title}>Comments</Text>

          <FlashList
            data={comments ?? []}
            estimatedItemSize={Boolean(comments?.length) ? comments.length : 5}
            ListFooterComponent={() =>
              loading && <ActivityIndicator style={{ paddingVertical: 20 }} />
            }
            ListEmptyComponent={() => !loading && <NotFound />}
            keyExtractor={(item, i) => `${item.id}_${i}`}
            onEndReachedThreshold={0.8}
            onEndReached={pageInfo?.next ? fetchMoreComments : null}
            showsVerticalScrollIndicator={false}
            renderItem={renderItem}
            onRefresh={() => refetch()}
            refreshing={Boolean(comments?.length) && loading}
          />
        </View>
      </Sheet>
    </>
  )
}

export default Comments

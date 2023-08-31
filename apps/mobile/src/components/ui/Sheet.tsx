import type { BottomSheetBackdropProps } from '@gorhom/bottom-sheet'
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetScrollView
} from '@gorhom/bottom-sheet'
import type { BottomSheetModalMethods } from '@gorhom/bottom-sheet/lib/typescript/types'
import type { FC, PropsWithChildren } from 'react'
import React, { useCallback, useMemo, useRef } from 'react'

import { useMobileTheme } from '~/hooks'

type Props = {
  sheetRef?: React.RefObject<BottomSheetModalMethods>
  snap?: string[]
  marginX?: number
  backdropOpacity?: number
}

const BORDER_RADIUS = 35

const Sheet: FC<PropsWithChildren & Props> = ({
  snap,
  marginX,
  children,
  sheetRef,
  backdropOpacity = 0.5
}) => {
  const { themeConfig } = useMobileTheme()
  const bottomSheetModalRef = useRef<BottomSheetModal>(null)

  const snapPoints = useMemo(() => snap ?? ['40%'], [snap])

  const renderBackdrop = useCallback(
    (props: BottomSheetBackdropProps) => (
      <BottomSheetBackdrop
        {...props}
        opacity={backdropOpacity}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
      />
    ),
    [backdropOpacity]
  )

  return (
    <BottomSheetModal
      index={0}
      ref={sheetRef ?? bottomSheetModalRef}
      // handleComponent={null}
      handleIndicatorStyle={{
        backgroundColor: themeConfig.sheetBorderColor
      }}
      backgroundStyle={{
        borderRadius: BORDER_RADIUS,
        backgroundColor: themeConfig.sheetBackgroundColor,
        borderColor: themeConfig.sheetBorderColor,
        borderWidth: 1
      }}
      animationConfigs={{
        duration: 200
      }}
      style={{
        marginHorizontal: marginX ?? 9,
        overflow: 'hidden',
        borderRadius: BORDER_RADIUS
      }}
      detached={true}
      bottomInset={20}
      snapPoints={snapPoints}
      backdropComponent={renderBackdrop}
    >
      <BottomSheetScrollView
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
      >
        {children}
      </BottomSheetScrollView>
    </BottomSheetModal>
  )
}

export default Sheet

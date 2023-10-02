import { Analytics, TRACK } from '@lenstube/browser'
import type { CustomErrorWithData } from '@lenstube/lens/custom-types'
import useAuthPersistStore from '@lib/store/auth'
import { Trans } from '@lingui/macro'
import { Button, IconButton } from '@radix-ui/themes'
import { useConnectModal } from '@rainbow-me/rainbowkit'
import React from 'react'
import toast from 'react-hot-toast'
import { useAccount, useDisconnect } from 'wagmi'

import DisconnectOutline from '../Icons/DisconnectOutline'
import UserMenu from '../UserMenu'
import SelectProfile from './SelectProfile'

const ConnectWalletButton = () => {
  const selectedSimpleProfile = useAuthPersistStore(
    (state) => state.selectedSimpleProfile
  )

  const { isConnected } = useAccount()
  const { disconnect } = useDisconnect({
    onError(error: CustomErrorWithData) {
      toast.error(error?.data?.message ?? error?.message)
    }
  })
  const { openConnectModal } = useConnectModal()

  return isConnected ? (
    selectedSimpleProfile?.id ? (
      <UserMenu />
    ) : (
      <div className="flex items-center space-x-2">
        <SelectProfile />
        <IconButton
          color="red"
          variant="classic"
          onClick={() => disconnect?.()}
        >
          <DisconnectOutline className="h-4 w-4" />
        </IconButton>
      </div>
    )
  ) : (
    <Button
      highContrast
      variant="classic"
      onClick={() => {
        if (openConnectModal) {
          openConnectModal()
          Analytics.track(TRACK.AUTH.CONNECT_WALLET)
        } else {
          disconnect?.()
        }
      }}
    >
      <Trans>Connect</Trans>
    </Button>
  )
}

export default ConnectWalletButton

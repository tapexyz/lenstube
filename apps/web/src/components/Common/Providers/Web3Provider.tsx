import { TAPE_APP_NAME, WC_PROJECT_ID } from '@tape.xyz/constants'
import { type FC, type ReactNode } from 'react'
import React from 'react'
import { createConfig, http, WagmiProvider } from 'wagmi'
import { polygon, polygonAmoy } from 'wagmi/chains'
import { coinbaseWallet, injected, walletConnect } from 'wagmi/connectors'

const connectors = [
  injected(),
  walletConnect({ projectId: WC_PROJECT_ID }),
  coinbaseWallet({ appName: TAPE_APP_NAME })
]

const wagmiConfig = createConfig({
  connectors,
  chains: [polygon, polygonAmoy],
  transports: {
    [polygon.id]: http(),
    [polygonAmoy.id]: http()
  }
})

type Props = {
  children: ReactNode
}

const Web3Provider: FC<Props> = ({ children }) => {
  return <WagmiProvider config={wagmiConfig}>{children}</WagmiProvider>
}

export default Web3Provider

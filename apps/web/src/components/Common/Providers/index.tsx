import authLink from '@lib/authLink'
import { LivepeerConfig } from '@livepeer/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { getLivepeerClient } from '@tape.xyz/browser'
import { apolloClient, ApolloProvider } from '@tape.xyz/lens/apollo'
import { useRouter } from 'next/router'
import type { ReactNode } from 'react'
import React from 'react'

import ErrorBoundary from '../ErrorBoundary'
import Layout from '../Layout'
import CuratedProfilesProvider from './CuratedProfilesProvider'
import SubscriptionProvider from './SubscriptionProvider'
import ThemeProvider from './ThemeProvider'
import TogglesProvider from './TogglesProvider'
import Web3Provider from './Web3Provider'

const NO_TOP_NAV_PATHS = ['/login']
const NO_BOTTOM_NAV_PATHS = ['/bangers']
const NO_PADDING_PATHS = [
  '/u/[[...handle]]',
  '/bangers',
  '/profile/[id]',
  '/login',
  '/bytes',
  '/bytes/[id]',
  '/404',
  '/500'
]

const apolloQueryClient = apolloClient(authLink)
const livepeerClient = getLivepeerClient()
const reactQueryClient = new QueryClient({
  defaultOptions: { queries: { refetchOnWindowFocus: false } }
})

const Providers = ({ children }: { children: ReactNode }) => {
  const { pathname } = useRouter()

  return (
    <ErrorBoundary>
      <Web3Provider>
        <ApolloProvider client={apolloQueryClient}>
          <QueryClientProvider client={reactQueryClient}>
            <ThemeProvider>
              <CuratedProfilesProvider />
              <SubscriptionProvider />
              <TogglesProvider />
              <LivepeerConfig client={livepeerClient}>
                <Layout
                  skipNav={NO_TOP_NAV_PATHS.includes(pathname)}
                  skipBottomNav={NO_BOTTOM_NAV_PATHS.includes(pathname)}
                  skipPadding={NO_PADDING_PATHS.includes(pathname)}
                >
                  {children}
                </Layout>
              </LivepeerConfig>
            </ThemeProvider>
          </QueryClientProvider>
        </ApolloProvider>
      </Web3Provider>
    </ErrorBoundary>
  )
}

export default Providers

import MetaTags from '@components/Common/MetaTags'
import SettingsShimmer from '@components/Shimmers/SettingsShimmer'
import useAuthPersistStore from '@lib/store/auth'
import { t } from '@lingui/macro'
import { Analytics, TRACK } from '@tape.xyz/browser'
import type { Profile } from '@tape.xyz/lens'
import { useProfileQuery } from '@tape.xyz/lens'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Custom404 from 'src/pages/404'
import Custom500 from 'src/pages/500'

import BasicInfo from './BasicInfo'
import Blocked from './Blocked'
import DangerZone from './DangerZone'
import Permissions from './Permissions'
import ProfileInterests from './ProfileInterests'
import Sessions from './Sessions'
import SideNav from './SideNav'
import Subscription from './Subscription'

export const SETTINGS_SUBSCRIPTION = '/settings/subscription'
export const SETTINGS_INTERESTS = '/settings/interests'
export const SETTINGS_PERMISSIONS = '/settings/permissions'
export const SETTINGS_SESSIONS = '/settings/sessions'
export const SETTINGS_BLOCKED = '/settings/blocked'
export const SETTINGS_DANGER_ZONE = '/settings/danger'
export const SETTINGS = '/settings'

const Settings = () => {
  const router = useRouter()
  const selectedSimpleProfile = useAuthPersistStore(
    (state) => state.selectedSimpleProfile
  )

  useEffect(() => {
    Analytics.track('Pageview', { path: TRACK.PAGE_VIEW.SETTINGS })
  }, [])

  const { data, loading, error } = useProfileQuery({
    variables: {
      request: { forProfileId: selectedSimpleProfile?.id }
    },
    skip: !selectedSimpleProfile?.id
  })

  if (error) {
    return <Custom500 />
  }
  if (loading || !data) {
    return <SettingsShimmer />
  }

  if (!data?.profile || (!selectedSimpleProfile && router.isReady)) {
    return <Custom404 />
  }

  const channel = data?.profile as Profile

  return (
    <div className="ultrawide:max-w-[100rem] container mx-auto">
      <MetaTags title={t`Channel Settings`} />
      {!loading && !error && channel ? (
        <div className="grid gap-4 md:grid-cols-4">
          <div className="md:col-span-1">
            <SideNav />
          </div>
          <div className="md:col-span-3">
            {router.pathname === SETTINGS && <BasicInfo profile={channel} />}
            {router.pathname === SETTINGS_SUBSCRIPTION && (
              <Subscription channel={channel} />
            )}
            {router.pathname === SETTINGS_PERMISSIONS && <Permissions />}
            {router.pathname === SETTINGS_INTERESTS && <ProfileInterests />}
            {router.pathname === SETTINGS_SESSIONS && <Sessions />}
            {router.pathname === SETTINGS_BLOCKED && <Blocked />}
            {router.pathname === SETTINGS_DANGER_ZONE && <DangerZone />}
          </div>
        </div>
      ) : null}
    </div>
  )
}

export default Settings

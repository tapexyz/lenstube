import InterestsOutline from '@components/Common/Icons/InterestsOutline'
import KeyOutline from '@components/Common/Icons/KeyOutline'
import SubscribeOutline from '@components/Common/Icons/SubscribeOutline'
import UserOutline from '@components/Common/Icons/UserOutline'
import WarningOutline from '@components/Common/Icons/WarningOutline'
import { Trans } from '@lingui/macro'
import { Card } from '@radix-ui/themes'
import clsx from 'clsx'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

export const SETTINGS_MEMBERSHIP = '/settings/membership'
export const SETTINGS_INTERESTS = '/settings/interests'
export const SETTINGS_PERMISSIONS = '/settings/permissions'
export const SETTINGS_DANGER_ZONE = '/settings/danger'
export const SETTINGS = '/settings'

const SideNav = () => {
  const router = useRouter()

  const isActivePath = (path: string) => router.pathname === path

  return (
    <Card>
      <div className="m-1 flex flex-col space-y-1 text-sm">
        <Link
          href={SETTINGS}
          className={clsx(
            'flex items-center space-x-2 rounded-md p-3 hover:bg-gray-100 hover:dark:bg-gray-800',
            { 'bg-gray-100 dark:bg-gray-800': isActivePath(SETTINGS) }
          )}
        >
          <UserOutline className="h-4 w-4" />{' '}
          <span>
            <Trans>Basic Info</Trans>
          </span>
        </Link>
        <Link
          href={SETTINGS_MEMBERSHIP}
          className={clsx(
            'flex items-center space-x-2 rounded-md p-3 hover:bg-gray-100 hover:dark:bg-gray-800',
            {
              'bg-gray-100 dark:bg-gray-800': isActivePath(SETTINGS_MEMBERSHIP)
            }
          )}
        >
          <SubscribeOutline className="h-4 w-4" />{' '}
          <span>
            <Trans>Membership</Trans>
          </span>
        </Link>
        <Link
          href={SETTINGS_PERMISSIONS}
          className={clsx(
            'flex items-center space-x-2 rounded-md p-3 hover:bg-gray-100 hover:dark:bg-gray-800',
            {
              'bg-gray-100 dark:bg-gray-800': isActivePath(SETTINGS_PERMISSIONS)
            }
          )}
        >
          <KeyOutline className="h-4 w-4" />{' '}
          <span>
            <Trans>Permissions</Trans>
          </span>
        </Link>
        <Link
          href={SETTINGS_INTERESTS}
          className={clsx(
            'flex items-center space-x-2 rounded-md p-3 hover:bg-gray-100 hover:dark:bg-gray-800',
            {
              'bg-gray-100 dark:bg-gray-800': isActivePath(SETTINGS_INTERESTS)
            }
          )}
        >
          <InterestsOutline className="h-4 w-4" />{' '}
          <span>
            <Trans>Interests</Trans>
          </span>
        </Link>
        <Link
          href={SETTINGS_DANGER_ZONE}
          className={clsx(
            'flex items-center space-x-2 rounded-md p-3 text-red-500 hover:bg-red-100 hover:dark:bg-red-900/60',
            {
              'bg-red-100 dark:bg-red-900/60':
                isActivePath(SETTINGS_DANGER_ZONE)
            }
          )}
        >
          <WarningOutline className="h-4 w-4" />{' '}
          <span>
            <Trans>Danger Zone</Trans>
          </span>
        </Link>
      </div>
    </Card>
  )
}

export default SideNav

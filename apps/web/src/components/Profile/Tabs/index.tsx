import { EVENTS, getProfile } from '@tape.xyz/generic'
import type { Profile } from '@tape.xyz/lens'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@tape.xyz/ui'
import { useRouter } from 'next/router'
import type { FC } from 'react'
import React from 'react'

import useSw from '@/hooks/useSw'

import ProfileBytes from './ProfileBytes'
import ProfileVideos from './ProfileVideos'

type Props = {
  profile: Profile
}

const ProfileTabs: FC<Props> = ({ profile }) => {
  const router = useRouter()
  const { addEventToQueue } = useSw()

  const handleTabChange = (tab: string) => {
    if (tab) {
      const slug = getProfile(profile)?.slug
      const nextUrl = `${location.origin}/u/${slug}?tab=${tab}`
      history.replaceState({ path: nextUrl }, '', nextUrl)
    }
  }

  const activeTab = (router.query.tab ?? 'videos') as string

  return (
    <div className="my-4 w-full md:my-5">
      <Tabs defaultValue={activeTab}>
        <TabsList>
          <TabsTrigger
            className="rounded-t-lg border-black px-4 py-1.5 text-sm font-medium data-[state=active]:border-b data-[state=active]:bg-gray-100 dark:border-white data-[state=active]:dark:bg-gray-800"
            onClick={() => {
              handleTabChange('videos')
              addEventToQueue(EVENTS.PROFILE.CLICK_PROFILE_VIDEOS)
            }}
            value="videos"
          >
            Videos
          </TabsTrigger>
          <TabsTrigger
            className="rounded-t-lg border-black px-4 py-1.5 text-sm font-medium data-[state=active]:border-b data-[state=active]:bg-gray-100 dark:border-white data-[state=active]:dark:bg-gray-800"
            onClick={() => {
              handleTabChange('bytes')
              addEventToQueue(EVENTS.PROFILE.CLICK_PROFILE_BYTES)
            }}
            value="bytes"
          >
            Bytes
          </TabsTrigger>
        </TabsList>

        <div className="pt-3">
          <TabsContent value="videos">
            <ProfileVideos profile={profile} />
          </TabsContent>

          <TabsContent value="bytes">
            <ProfileBytes profileId={profile.id} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}

export default ProfileTabs

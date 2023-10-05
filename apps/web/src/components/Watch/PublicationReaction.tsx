import HeartOutline from '@components/Common/Icons/HeartOutline'
import { Analytics, TRACK } from '@lenstube/browser'
import { formatNumber, getPublication } from '@lenstube/generic'
import type { AnyPublication } from '@lenstube/lens'
import {
  PublicationReactionType,
  useAddReactionMutation,
  useRemoveReactionMutation
} from '@lenstube/lens'
import useAuthPersistStore from '@lib/store/auth'
import { t } from '@lingui/macro'
import clsx from 'clsx'
import type { FC } from 'react'
import React, { useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  publication: AnyPublication
  iconSize?: 'sm' | 'base' | 'lg'
  textSize?: 'sm' | 'base'
  isVertical?: boolean
  showLabel?: boolean
}

const PublicationReaction: FC<Props> = ({
  publication,
  iconSize = 'sm',
  textSize = 'sm',
  isVertical = false,
  showLabel = true
}) => {
  const targetPublication = getPublication(publication)

  const selectedSimpleProfile = useAuthPersistStore(
    (state) => state.selectedSimpleProfile
  )

  const [reaction, setReaction] = useState({
    isLiked: targetPublication.operations.hasReacted,
    likeCount: targetPublication.stats?.reactions
  })

  const [addReaction] = useAddReactionMutation({
    onError: (error) => {
      toast.error(error?.message)
    }
  })
  const [removeReaction] = useRemoveReactionMutation({
    onError: (error) => {
      toast.error(error?.message)
    }
  })

  const likeVideo = () => {
    if (!selectedSimpleProfile?.id) {
      return toast.error('Sign in to proceed')
    }
    setReaction((prev) => ({
      likeCount: prev.isLiked ? prev.likeCount - 1 : prev.likeCount + 1,
      isLiked: !prev.isLiked
    }))
    if (reaction.isLiked) {
      removeReaction({
        variables: {
          request: {
            for: publication.id,
            reaction: PublicationReactionType.Upvote
          }
        }
      })
    } else {
      Analytics.track(TRACK.PUBLICATION.LIKE)
      addReaction({
        variables: {
          request: {
            for: publication.id,
            reaction: PublicationReactionType.Upvote
          }
        }
      })
    }
  }

  return (
    <div
      className={clsx(
        'flex items-center justify-end',
        isVertical ? 'flex-col space-y-2.5 px-3 md:space-y-4' : 'space-x-5'
      )}
    >
      <button
        className="focus:outline-none disabled:opacity-50"
        onClick={() => likeVideo()}
      >
        <span
          className={clsx(
            'flex items-center focus:outline-none',
            isVertical ? 'flex-col space-y-2' : 'space-x-1.5',
            {
              'font-semibold text-indigo-500': reaction.isLiked
            }
          )}
        >
          <HeartOutline
            className={clsx({
              'h-3.5 w-3.5': iconSize === 'sm',
              'h-6 w-6': iconSize === 'lg',
              'h-4 w-4': iconSize === 'base',
              'text-indigo-500': reaction.isLiked
            })}
          />
          {showLabel && (
            <span
              className={clsx({
                'text-xs': textSize === 'sm',
                'text-base': textSize === 'base',
                'text-indigo-500': reaction.isLiked
              })}
            >
              {reaction.likeCount > 0
                ? formatNumber(reaction.likeCount)
                : t`Like`}
            </span>
          )}
        </span>
      </button>
    </div>
  )
}

export default PublicationReaction

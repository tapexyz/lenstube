import { DRAGVERSE_LOGO, TAPE_APP_NAME } from '@dragverse/constants'
import Link from 'next/link'
import type { FC } from 'react'

type Props = {
  commentId: string
}

const VideoComment: FC<Props> = ({ commentId }) => {
  return (
    <div className="my-2 rounded-xl border border-gray-300 px-4 py-3 dark:border-gray-700">
      <Link
        href={`/watch/${commentId}`}
        className="flex items-center space-x-2.5"
        target="_blank"
      >
        <img
          src={`${DRAGVERSE_LOGO}`}
          className="size-5"
          draggable={false}
          alt={TAPE_APP_NAME}
        />
        <span>Watch Video</span>
      </Link>
    </div>
  )
}
export default VideoComment

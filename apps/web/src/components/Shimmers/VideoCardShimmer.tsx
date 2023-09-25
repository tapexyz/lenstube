import clsx from 'clsx'
import React from 'react'

export const CardShimmer = ({ rounded = true }) => {
  return (
    <div className={clsx('w-full', rounded && 'rounded-xl')}>
      <div className="flex animate-pulse flex-col space-x-2">
        <div
          className={clsx(
            'aspect-w-16 aspect-h-9 bg-gray-300 dark:bg-gray-700',
            rounded && 'rounded-xl'
          )}
        />
      </div>
    </div>
  )
}

const VideoCardShimmer = () => {
  return (
    <div className="w-full rounded-xl">
      <div className="flex animate-pulse flex-col">
        <div className="aspect-w-16 aspect-h-9 rounded-md bg-gray-300 dark:bg-gray-700" />
        <div className="flex space-x-2 py-3">
          <div className="flex-1 space-y-2 py-1">
            <span className="space-y-2">
              <div className="h-4 rounded bg-gray-300 dark:bg-gray-700" />
            </span>
            <div>
              <div className="grid grid-cols-3 items-center">
                <div className="h-5 w-5 rounded-full bg-gray-300 dark:bg-gray-700" />
                <div className="col-span-2 h-3 rounded bg-gray-300 dark:bg-gray-700" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default VideoCardShimmer

import UploadOutline from '@components/Common/Icons/UploadOutline'
import useAppStore from '@lib/store'
import { t, Trans } from '@lingui/macro'
import { Box, Button } from '@radix-ui/themes'
import { Analytics, TRACK, useDragAndDrop } from '@tape.xyz/browser'
import { ALLOWED_VIDEO_TYPES } from '@tape.xyz/constants'
import { canUploadedToIpfs, logger } from '@tape.xyz/generic'
import clsx from 'clsx'
import fileReaderStream from 'filereader-stream'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast'

const DropZone = () => {
  const setUploadedVideo = useAppStore((state) => state.setUploadedVideo)

  const {
    dragOver,
    setDragOver,
    onDragOver,
    onDragLeave,
    fileDropError,
    setFileDropError
  } = useDragAndDrop()

  useEffect(() => {
    Analytics.track('Pageview', { path: TRACK.PAGE_VIEW.UPLOAD.DROPZONE })
  }, [])

  const uploadVideo = (file: File) => {
    try {
      if (file) {
        const preview = URL.createObjectURL(file)
        const isUnderFreeLimit = canUploadedToIpfs(file?.size)
        setUploadedVideo({
          stream: fileReaderStream(file),
          preview,
          videoType: file?.type || 'video/mp4',
          file,
          isUploadToIpfs: isUnderFreeLimit
        })
      }
    } catch (error) {
      toast.error(t`Error uploading file`)
      logger.error('[Error Upload Video]', error)
    }
  }

  const validateFile = (file: File) => {
    if (!ALLOWED_VIDEO_TYPES.includes(file?.type)) {
      const errorMessage = t`Video format not supported`
      toast.error(errorMessage)
      return setFileDropError(errorMessage)
    }
    uploadVideo(file)
  }

  const onDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault()
    setDragOver(false)
    validateFile(e?.dataTransfer?.files[0])
  }

  const onChooseFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      validateFile(e?.target?.files[0])
    }
  }

  return (
    <div className="relative flex w-full flex-1 flex-col">
      <label
        className={clsx(
          'grid w-full place-items-center rounded-3xl border border-dashed p-10 text-center focus:outline-none md:p-20',
          dragOver ? 'border-green-500' : 'border-gray-500'
        )}
        htmlFor="dropMedia"
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
      >
        <input
          type="file"
          className="hidden"
          onChange={onChooseFile}
          id="dropMedia"
          accept={ALLOWED_VIDEO_TYPES.join(',')}
        />
        <span className="mb-6 flex justify-center opacity-80">
          <UploadOutline className="h-10 w-10" />
        </span>
        <span className="space-y-10">
          <div className="space-y-4">
            <p className="text-2xl md:text-4xl">
              <Trans>Drag and drop</Trans>
            </p>
            <p>
              <Trans>Select multimedia from your device.</Trans>
            </p>
          </div>
          <Box>
            <Button size="2" highContrast className="!px-0" type="button">
              <label htmlFor="chooseMedia" className="cursor-pointer p-6">
                <Trans>Choose</Trans>
                <input
                  id="chooseMedia"
                  onChange={onChooseFile}
                  type="file"
                  className="hidden"
                  accept={ALLOWED_VIDEO_TYPES.join(',')}
                />
              </label>
            </Button>
          </Box>
          {fileDropError && (
            <div className="font-medium text-red-500">{fileDropError}</div>
          )}
        </span>
      </label>
    </div>
  )
}

export default DropZone
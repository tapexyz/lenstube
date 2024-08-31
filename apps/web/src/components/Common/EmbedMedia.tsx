import { useCopyToClipboard } from '@tape.xyz/browser'
import { TAPE_APP_NAME, TAPE_EMBED_URL } from '@tape.xyz/constants'
import { EVENTS } from '@tape.xyz/generic'
import { CodeOutline, CopyOutline, Modal, Tooltip } from '@tape.xyz/ui'
import type { FC } from 'react'
import React, { useState } from 'react'

import useSw from '@/hooks/useSw'

type Props = {
  publicationId: string
}

const EmbedMedia: FC<Props> = ({ publicationId }) => {
  const [copy] = useCopyToClipboard()
  const [showEmbedModal, setShowEmbedModal] = useState(false)
  const { addEventToQueue } = useSw()

  let iframeCode = `<iframe width="560" height="315" src="${TAPE_EMBED_URL}/${publicationId}?autoplay=1&t=0&loop=0" title="${TAPE_APP_NAME} player" frameborder="0" allow="accelerometer; autoplay; clipboard-write;" allowfullscreen></iframe>`

  const onCopyCode = () => {
    copy(iframeCode)
    addEventToQueue(EVENTS.EMBED_VIDEO.COPY)
  }

  const openModal = () => {
    setShowEmbedModal(true)
    addEventToQueue(EVENTS.EMBED_VIDEO.OPEN)
  }

  return (
    <>
      <button
        type="button"
        onClick={() => openModal()}
        className="rounded-full bg-gray-200 p-3 dark:bg-gray-800"
      >
        <CodeOutline className="size-5" />
      </button>
      <Modal
        title="Embed Media"
        size="md"
        show={showEmbedModal}
        setShow={setShowEmbedModal}
      >
        <div className="flex flex-col space-y-3">
          <div className="w-full overflow-hidden rounded">
            <iframe
              sandbox="allow-scripts allow-same-origin"
              className="aspect-[16/9] w-full"
              src={`${TAPE_EMBED_URL}/${publicationId}`}
              title={`${TAPE_APP_NAME} player`}
              allow="accelerometer; autoplay; clipboard-write; gyroscope;"
              allowFullScreen
            />
          </div>
          <div className="tape-border relative rounded-lg p-4">
            <code className="select-all text-sm opacity-60">{iframeCode}</code>
            <Tooltip content="Copy Code" placement="top">
              <button
                type="button"
                className="absolute right-2 top-2 rounded p-1 hover:bg-gray-100 dark:hover:bg-gray-900"
                onClick={() => onCopyCode()}
              >
                <CopyOutline className="size-4" />
              </button>
            </Tooltip>
          </div>
        </div>
      </Modal>
    </>
  )
}

export default EmbedMedia

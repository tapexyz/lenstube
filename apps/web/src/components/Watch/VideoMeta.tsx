import CollectorsList from '@components/Common/CollectorsList'
import CollectOutline from '@components/Common/Icons/CollectOutline'
import MirrorOutline from '@components/Common/Icons/MirrorOutline'
import MirroredList from '@components/Common/MirroredList'
import Modal from '@components/UIElements/Modal'
import { getPublicationMediaCid } from '@lenstube/generic'
import type { MirrorablePublication } from '@lenstube/lens'
import { getDateString, getRelativeTime } from '@lib/formatTime'
import { t, Trans } from '@lingui/macro'
import type { FC } from 'react'
import React, { useState } from 'react'

import ViewCount from './ViewCount'

type Props = {
  video: MirrorablePublication
}

const VideoMeta: FC<Props> = ({ video }) => {
  const [showCollectsModal, setShowCollectsModal] = useState(false)
  const [showMirrorsModal, setShowMirrorsModal] = useState(false)

  return (
    <div className="flex flex-wrap items-center opacity-70">
      <div className="flex items-center">
        <Modal
          title={t`Collected By`}
          onClose={() => setShowCollectsModal(false)}
          show={showCollectsModal}
          panelClassName="max-w-md"
        >
          <div className="no-scrollbar max-h-[40vh] overflow-y-auto">
            <CollectorsList videoId={video.id} />
          </div>
        </Modal>
        <Modal
          title={t`Mirrored By`}
          onClose={() => setShowMirrorsModal(false)}
          show={showMirrorsModal}
          panelClassName="max-w-md"
        >
          <div className="no-scrollbar max-h-[40vh] overflow-y-auto">
            <MirroredList videoId={video.id} />
          </div>
        </Modal>
        <ViewCount cid={getPublicationMediaCid(video.metadata)} />
        <button
          type="button"
          onClick={() => setShowCollectsModal(true)}
          className="flex items-center space-x-1 outline-none"
        >
          <CollectOutline className="h-3 w-3" />
          <span>
            {video.stats?.countOpenActions} <Trans>collects</Trans>
          </span>
        </button>
        <span className="middot px-1" />
        <button
          type="button"
          onClick={() => setShowMirrorsModal(true)}
          className="flex items-center space-x-1 outline-none"
        >
          <MirrorOutline className="h-3 w-3" />
          <span>
            {video.stats?.mirrors} <Trans>mirrors</Trans>
          </span>
        </button>
      </div>
      <span className="middot px-1" />
      <span title={getDateString(video.createdAt)}>
        uploaded {getRelativeTime(video.createdAt)}
      </span>
    </div>
  )
}

export default VideoMeta

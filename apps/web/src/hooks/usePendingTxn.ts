import {
  LensTransactionStatusType,
  useLensTransactionStatusQuery
} from '@tape.xyz/lens'
import { useEffect, useState } from 'react'
import toast from 'react-hot-toast'

type Props = {
  txHash?: string
  txId?: string
}

const usePendingTxn = ({ txHash, txId }: Props) => {
  const [indexed, setIndexed] = useState(false)

  const { data, loading, stopPolling } = useLensTransactionStatusQuery({
    notifyOnNetworkStatusChange: true,
    onCompleted: (data) => {
      if (data?.lensTransactionStatus?.reason) {
        stopPolling()
        setIndexed(false)
        return toast.error(data?.lensTransactionStatus?.reason)
      }
      if (
        data?.lensTransactionStatus?.__typename === 'LensTransactionResult' &&
        data?.lensTransactionStatus?.txHash &&
        data.lensTransactionStatus.status === LensTransactionStatusType.Complete
      ) {
        stopPolling()
        setIndexed(true)
      }
    },
    pollInterval: 1000,
    skip: !txHash && !txHash?.length && !txId && !txId?.length,
    variables: {
      request: { forTxHash: txHash, forTxId: txId }
    }
  })

  useEffect(() => {
    setIndexed(false)
  }, [txHash, txId])

  return {
    data,
    error: data?.lensTransactionStatus?.reason,
    indexed,
    loading
  }
}

export default usePendingTxn

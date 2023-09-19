import Video from '@components/Video'
import type { AnyPublication } from '@lenstube/lens'
import { PublicationDocument } from '@lenstube/lens'
import { apolloClient } from '@lenstube/lens/apollo'
import type { GetServerSideProps } from 'next'

export default Video

interface Props {
  video: AnyPublication
}

const client = apolloClient()

export const getServerSideProps: GetServerSideProps<Props> = async (
  context
) => {
  const publicationId = context.query.pubId as string
  const { data, error } = await client.query({
    query: PublicationDocument,
    variables: {
      request: { publicationId }
    }
  })
  if (!data?.publication || error) {
    return { notFound: true }
  }
  context.res.setHeader('Cache-Control', 'public, s-maxage=86400')
  return {
    props: { video: data.publication }
  }
}

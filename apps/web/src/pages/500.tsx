import MetaTags from '@components/Common/MetaTags'
import { STATIC_ASSETS, TAPE_APP_NAME } from '@dragverse/constants'
import { Button } from '@radix-ui/themes'
import Link from 'next/link'

const Custom500 = () => {
  return (
    <>
      <MetaTags title="500" />
      <div className="flex h-[calc(100vh-4rem)] flex-col items-center justify-center space-y-4 text-center">
        <div className="mb-10">
          <img
            src={`${STATIC_ASSETS}/images/illustrations/404.gif`}
            draggable={false}
            height={200}
            width={200}
            alt={TAPE_APP_NAME}
          />
        </div>
        <h1 className="text-3xl font-bold">
          Oh no, something is not right bish!
        </h1>
        <div className="mb-6 max-w-lg">
          We track these errors automatically, but if the problem persists feel
          free to contact us. In the meantime, try refreshing.
        </div>
        <Link href="/">
          <Button highContrast variant="surface">
            Go Home
          </Button>
        </Link>
      </div>
    </>
  )
}

export default Custom500

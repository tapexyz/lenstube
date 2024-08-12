import { CACHE_CONTROL, ERROR_MESSAGE, REDIS_KEYS } from '@tape.xyz/constants'
import { psql, REDIS_EXPIRY, rGet, rSet } from '@tape.xyz/server'
import { Hono } from 'hono'

const app = new Hono()

app.get('/profiles', async (c) => {
  try {
    c.header('Cache-Control', CACHE_CONTROL.FOR_ONE_HOUR)

    const cachedValue = await rGet(REDIS_KEYS.CURATED_PROFILES)
    if (cachedValue) {
      console.info('CACHE HIT')
      return c.json({ success: true, ids: JSON.parse(cachedValue) })
    }
    console.info('CACHE MISS')

    const results: { profileId: string }[] =
      await psql.$queryRaw`SELECT "profileId" FROM "Profile" WHERE "isCurated" = TRUE ORDER BY RANDOM() LIMIT 50;`

    const ids = results.map(({ profileId }) => profileId)

    await rSet(
      REDIS_KEYS.CURATED_PROFILES,
      JSON.stringify(ids),
      REDIS_EXPIRY.ONE_DAY
    )
    return c.json({ success: true, ids })
  } catch (error) {
    console.error('[CURATED PROFILES] Error:', error)
    return c.json({ success: false, message: ERROR_MESSAGE })
  }
})

export default app

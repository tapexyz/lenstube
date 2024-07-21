import { zValidator } from '@hono/zod-validator'
import { db } from '@tape.xyz/server'
import { Hono } from 'hono'
import { object, string } from 'zod'

import { ERROR_MESSAGE } from '@/helpers/constants'

const app = new Hono()

app.get(
  '/:profileId',
  zValidator(
    'param',
    object({
      profileId: string()
    })
  ),
  async (c) => {
    const { profileId } = c.req.param()

    try {
      const result = await db.oneOrNone(
        `
        SELECT suspended, limited, flagged
        FROM "ProfileRestriction"
        WHERE "profileId"  = $1
        LIMIT 1;
      `,
        [profileId]
      )

      c.header('Cache-Control', 'max-age=300')
      return c.json({
        success: true,
        restrictions: {
          suspended: Boolean(result?.suspended),
          limited: Boolean(result?.limited),
          flagged: Boolean(result?.flagged)
        }
      })
    } catch {
      return c.json({ success: false, message: ERROR_MESSAGE })
    }
  }
)

export default app

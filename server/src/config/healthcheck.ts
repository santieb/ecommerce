import { Router, Request, Response } from 'express'
const router = Router()

router.get('/', async (req: Request, res: Response) => {
  const healthcheck = {
    message: 'OK',
    uptime: process.uptime(),
    timestamp: Date.now()
  }

  try {
    res.send(healthcheck)
  } catch (error) {
    res.status(503).send()
  }
})

export default router

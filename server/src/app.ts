import { config } from './config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'
import healthcheck from './config/healthcheck'
import routes from './shared/router'

const { port } = config
const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))

app.use('/api', healthcheck)
app.use('/api', routes)

app.listen(port, () => {
  console.log(`server listening on port ${port}`)
})

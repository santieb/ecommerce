import { config } from './config'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import helmet from 'helmet'

const { port } = config
const app = express()

app.use(express.json())
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

app.get('/', (req, res) => {
	res.send('hello world')
})

app.listen(port, () => {
	console.log(`server listening on port ${port}`)
})

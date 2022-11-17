import { Response } from 'express'

type response = {
  res: Response
  status: number
  message: string
  token?: string
  // eslint-disable-next-line
  data?: any
}

const sucessResponse = ({ res, status = 200, message, data, token } : response) => {
	res.status(status).json({
		status,
		message,
		data,
		token
	})
}

export default sucessResponse

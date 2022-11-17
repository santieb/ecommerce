import { Request, Response } from 'express'
import sucessResponse from '../../shared/helpers/sucessResponse'

const registerUser = async (req: Request, res: Response) => {
	try {
		sucessResponse({
			res,
			status: 200,
			message: 'user registration success'
		})
	} catch (err) {
		res.status(400).send(err)
	}
}

export default { registerUser }

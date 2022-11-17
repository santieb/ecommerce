import db from '../../config/database'
import { ErrorObject } from '../../shared/helpers/error'
import { User } from '../types/user.type'
import { encrypt } from '../utils/bcrypt'

const registerUser = async ({ email, name, password } : User) => {
	const userExists = await db.user.findUnique({ where: { email } })
	if (userExists) throw new ErrorObject('user already exists', 400)

	const passwordHashed = await encrypt(password)

	return await db.user.create({
		data: {
			name,
			email,
			password: passwordHashed
		}
	})
}

export default { registerUser }

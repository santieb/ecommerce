import db from '../../config/database'
import { ErrorObject } from '../../shared/helpers/error'
import { User } from '../types-interfaces/user.interface'
import { Auth } from '../types-interfaces/auth.interface'
import { encrypt, verify } from '../utils/bcrypt'
import { generateToken } from '../utils/jwt'

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

const loginUser = async ({ email, password } : Auth) => {
	const user = await db.user.findUnique({ where: { email } })
	if (!user) throw new ErrorObject('user already exists', 403)

	const { id, isAdmin, password: passwordHashed } = user

	const isValid = await verify(password, passwordHashed)
	if (!isValid) throw new ErrorObject('password is invalid', 403)

	const token = await generateToken(id, isAdmin)
	user.password = ''

	return { user, token }
}

export default { registerUser, loginUser }

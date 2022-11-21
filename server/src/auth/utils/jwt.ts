import jwt from 'jsonwebtoken'
import { config } from '../../config/index'
const { secretKey } = config

const generateToken = (id: string, isAdmin: boolean): string => jwt.sign({ id, isAdmin }, secretKey, { expiresIn: 60 * 60 })

export { generateToken }

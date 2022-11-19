import jwt from 'jsonwebtoken'
import { config } from '../../config/index'
const { secretKey } = config

const generateToken = (id: string, role: boolean): string => jwt.sign({ id, role }, secretKey, { expiresIn: 60 * 60 })

export { generateToken }
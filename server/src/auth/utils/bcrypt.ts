import { hash, compare } from 'bcrypt'

const encrypt = async (password: string) => await hash(password, 8)

const verify = async (pass: string, passHash: string) => await compare(pass, passHash)

export { encrypt, verify }
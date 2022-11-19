import { hash } from 'bcrypt'

const encrypt = async (password: string) => await hash(password, 8)

export { encrypt }
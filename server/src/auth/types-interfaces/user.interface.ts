import { Auth } from './auth.interface'

export interface User extends Auth {
  name: string
  email: string
  password: string
}

import dotenv from 'dotenv'
dotenv.config()

export const config = {
  port: process.env.PORT || 3000,
  secretKey: process.env.SECRET_KEY || ''
}
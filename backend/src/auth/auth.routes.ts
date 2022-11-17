import express from 'express'
import userCtrl from './controllers/user.controller'
const router = express.Router()

router
	.get('/register', userCtrl.registerUser)

export default router

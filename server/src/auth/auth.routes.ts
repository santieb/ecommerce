import express from 'express'
import authCtrl from './controllers/auth.controller'
const router = express.Router()

router
	.post('/register', authCtrl.registerUser)

export default router

import express from 'express'
import user from "./users.mjs"
import admin from './admin.mjs'
const router = express.Router()

router.use('/users' , user)
router.use('/admins' , admin)

export default router
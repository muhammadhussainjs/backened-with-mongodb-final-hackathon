import express from 'express'
import user from "./users.mjs"
import Assignment from './assignments.mjs'
const router = express.Router()

router.use('/users' , user)
router.use('/assignments' , Assignment)


export default router
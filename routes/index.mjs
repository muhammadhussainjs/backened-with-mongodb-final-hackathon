import express from 'express'
import user from "./users.mjs"
import Assignment from './assignments.mjs'
import assignmentSubmitRouter from './assignmentsubmit.mjs'
import studentuser from './studentuser.mjs'
const router = express.Router()

router.use('/users' , user)
router.use('/assignments' , Assignment)
router.use('/assignmentsubmit', assignmentSubmitRouter);
router.use('/studentusers' , studentuser)


export default router
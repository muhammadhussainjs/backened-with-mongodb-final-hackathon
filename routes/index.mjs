import express from 'express'
import userRoutes from "./users.mjs"
const router = express.Router()

router.use('/users' , userRoutes)

export default router
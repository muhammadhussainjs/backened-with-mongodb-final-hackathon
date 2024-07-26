import express from 'express'
import userRoutes from "./users.mjs"
const router = express.Router()

router.use('/' , userRoutes)

export default router
import express from 'express'
import db from './config/db.mjs'
import routes from './routes/index.mjs'
import cors from 'cors'
const app = express()
app.use(cors());

db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))

const port = process.env.PORT || 3001

app.listen(port, function () {
    console.log('Server is running at port 3001')
})

app.use(express.json())

app.get("/health", (_, res) => {
    res.send({ message: "server theek hy" })
})

//GET, POST, PUT, DELETE
app.use('/', routes)
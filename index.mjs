import express from 'express'
import db from './config/db.mjs'
import routes from './routes/index.mjs'
import cors from 'cors'
const app = express()
app.use(cors());

app.use(express.json())

db.connection.once('open', () => console.log("connected to db")).on("error", (err) => console.log("error connecting db -->", err))

app.use('/', routes)

const port = 3001

app.listen(port, function () {
    console.log('Server is running at port 3001')
})




//GET, POST, PUT, DELETE
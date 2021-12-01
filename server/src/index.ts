import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import dotenv from 'dotenv'
import cors from 'cors'
dotenv.config()
const PORT = 8000
const main = async () => {
    const app = express()
    app.use(cors())
    app.use(express.json())
    mongoose.connect('mongodb://localhost/chatapp')
    const db = mongoose.connection
    db.on('error', err => console.error(err))
    db.on('open', () => console.log('WOAH'))
    Object.values(routes).forEach(well => app.use(`/${well.path}`, well.router))
    app.listen(PORT, () =>
        console.log(`listening on port ${PORT} url: http://localhost:${PORT}`)
    )
}

main().catch(err => console.error(err))

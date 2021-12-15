import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from './constants'
dotenv.config()
const PORT = 8000
const main = async () => {
    const app = express()
    app.use(cors(corsOptions))
    app.use(cookieParser())
    app.use(express.json())
    mongoose.connect('mongodb://localhost/chatapp')
    const db = mongoose.connection
    db.on('error', err => console.error(err))
    db.on('open', () => console.log('WOAH'))
    const server = app.listen(PORT, () =>
        console.log(`listening on port ${PORT} url: http://localhost:${PORT}`)
    )
    const io = new Server(server, {
        cors: {
            credentials: true,
            origin: ['http://localhost:3000']
        }
    })
    io.on('connection', socket => {
        console.log('a user connected: ', socket.id)
    })
    Object.values(routes).forEach(well => app.use(`/${well.path}`, well.router))
}

main().catch(err => console.error(err))

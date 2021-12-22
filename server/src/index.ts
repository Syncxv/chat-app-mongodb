import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import jwt from 'jsonwebtoken'
import { corsOptions } from './constants'
import { socketAuth } from './socket/middleware/scoketAuth'
dotenv.config()
const PORT = 8000
let connectedUser = new Map()
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
    io.use(socketAuth)
    io.on('connect', socket => {
        console.log('a user connected: ', socket.data.jwt)
        socket.on('hey-message', e => {
            console.log(e)
        })
    })
    Object.values(routes).forEach(well => app.use(`/${well.path}`, well.router))
}

main().catch(err => console.error(err))

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
import User, { UserType } from './models/user'
dotenv.config()
const PORT = 8000
let connectedUser = new Map<
    string,
    mongoose.Document<any, any, UserType> &
        UserType & {
            _id: mongoose.Types.ObjectId
        }
>()
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
    io.on('connect', async socket => {
        console.log('a user connected: ', socket.data.jwt)
        const user = await User.findById(socket.data.jwt.user.id)
        connectedUser.set(socket.data.jwt.user.id as string, user!)
        const { id }: { id: string } = socket.data.jwt.user
        socket.on('hey-message', e => {
            console.log(e)
        })
        socket.on('getCurrentUser', () => {
            console.log('I GOT IT NIGGA')
            socket.emit(
                'getCurrentUser',
                connectedUser.get(socket.data.jwt.user.id)!.toJSON()
            )
        })
        socket.on('inital-data', async () => {
            const user = await User.findById(id).populate([
                { path: 'friends', model: 'User' }
            ])
            socket.emit('inital-data', { data: user.friends })
        })
    })
    Object.values(routes).forEach(well => app.use(`/${well.path}`, well.router))
    //@ts-ignore
    global.users = connectedUser
}

main().catch(err => console.error(err))

import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from './constants'
import { socketAuth } from './socket/middleware/scoketAuth'
import User, { UserType } from './models/user'
import DmChannel from './models/channels'
import onUserInitalData, { USER_INITAL_DATA_EVENT_NAME } from './socket/users/initalData'
import onChannelInitalData, { CHANNEL_INITAL_DATA_EVENT_NAME } from './socket/channels/initalData'
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
    db.on('open', async () => {
        console.log('WOAH')
        globalThis.User = User
        globalThis.DmChannel = DmChannel
    })
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
        socket.on('hey-message', e => {
            console.log(e)
        })
        socket.on('getCurrentUser', () => {
            console.log('I GOT IT NIGGA')
            socket.emit('getCurrentUser', connectedUser.get(socket.data.jwt.user.id)!.toJSON())
        })
        socket.on(USER_INITAL_DATA_EVENT_NAME, async () => {
            onUserInitalData(socket)
        })
        socket.on(CHANNEL_INITAL_DATA_EVENT_NAME, async () => {
            onChannelInitalData(socket)
        })
    })
    Object.values(routes).forEach(well => app.use(`/${well.path}`, well.router))
    //@ts-ignore
    global.users = connectedUser
}

main().catch(err => console.error(err))

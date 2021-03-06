import express from 'express'
import mongoose from 'mongoose'
import routes from './routes'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import { corsOptions } from './constants'
import { socketAuth } from './socket/middleware/scoketAuth'
import User, { FriendModel, UserType } from './models/user'
import DmChannel from './models/channels'
import onUserInitalData, { USER_INITAL_DATA_EVENT_NAME } from './socket/users/initalData'
import onChannelInitalData, { CHANNEL_INITAL_DATA_EVENT_NAME } from './socket/channels/initalData'
import { handleMessagePost } from './socket/messages'
dotenv.config()
const PORT = process.env.PORT || 8000
export const connectedUser = new Map<
    string,
    {
        user: mongoose.Document<any, any, UserType> &
            UserType & {
                _id: mongoose.Types.ObjectId
            }
        socket_id: string
    }
>()
export const ioMap = new Map<string, Server>()
const main = async () => {
    const app = express()
    app.set('trust proxy', 1)
    app.use(cors(corsOptions))
    app.use(cookieParser())
    app.use(express.json())
    console.log(process.env.MONGODB_URL!)
    mongoose.connect(process.env.MONGODB_URL! || 'mongodb://localhost/chatapp')
    const db = mongoose.connection
    db.on('error', err => console.error(err))
    db.on('open', async () => {
        console.log('WOAH')
        ;(globalThis as any).User = User
        ;(globalThis as any).DmChannel = DmChannel
        ;(globalThis as any).FriendModel = FriendModel
    })
    const server = app.listen(PORT, () =>
        console.log(`listening on port ${PORT} url: http://localhost:${PORT}`)
    )
    const io = new Server(server, {
        cors: {
            credentials: true,
            origin: [process.env.FRONT_END_DOMAIN || 'http://localhost:3000']
        }
    })
    io.use(socketAuth)
    ioMap.set('io', io)
    io.on('connection', async socket => {
        console.log('a user connected: ', socket.data.jwt)
        const user = await User.findById(socket.data.jwt.user.id)
        connectedUser.set(socket.data.jwt.user.id as string, { user: user!, socket_id: socket.id })
        // socket.on('disconnect', scoketId => {
        //     const id = [...connectedUser.values()].find(thing => thing.socket_id === socket.id)!.user.id
        //     connectedUser.delete(id)
        //     console.log(connectedUser)
        // }) later idk man im stupid
        socket.on('create-message', e => {
            handleMessagePost(e, socket, io)
        })
        socket.on('getCurrentUser', () => {
            console.log('I GOT IT NIGGA')
            socket.emit('getCurrentUser', connectedUser.get(socket.data.jwt.user.id)?.user.toJSON())
        })
        socket.on(USER_INITAL_DATA_EVENT_NAME, async (_, cb) => {
            onUserInitalData(socket, cb)
        })
        socket.on(CHANNEL_INITAL_DATA_EVENT_NAME, async (_, cb: any) => {
            console.log(cb)
            onChannelInitalData(socket, cb)
        })
    })
    Object.values(routes).forEach(well => app.use(`/${well.path}`, well.router))
    //@ts-ignore
    global.users = connectedUser
}

main().catch(err => console.error(err))

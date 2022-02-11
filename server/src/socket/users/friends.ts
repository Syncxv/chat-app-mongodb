import { Server } from 'socket.io'
import { connectedUser } from '../..'
import { SOCKET_ACTIONS } from '../../constants'
import { MongooseUserType } from '../../models/user'

export const handleFriendRequest = (
    io: Server,
    requestedUser: MongooseUserType,
    sender: MongooseUserType
) => {
    sendRequestedUserNotifcation(io, requestedUser, sender)
    io.to(connectedUser.get(sender._id.toString())!.socket_id!).emit(
        SOCKET_ACTIONS.USER_UPDATE,
        sender.toJSON()
    )
}

const sendRequestedUserNotifcation = (
    io: Server,
    requestedUser: MongooseUserType,
    sender: MongooseUserType
) => {
    const user = connectedUser.get(requestedUser._id.toString())
    if (!user) return
    io.to(user.socket_id).emit(SOCKET_ACTIONS.RECIVE_FRIEND_REQUEST, sender.toJSON())
}

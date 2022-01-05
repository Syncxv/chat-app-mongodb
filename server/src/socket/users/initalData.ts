import { Socket } from 'socket.io'
import User, { FriendType } from '../../models/user'
export const USER_INITAL_DATA_EVENT_NAME = 'user-inital-data'
const onUserInitalData = async (socket: Socket, cb) => {
    const currentUser = await User.findById(socket.data.jwt.user.id).populate({
        path: 'friends',
        model: 'Friend'
    })
    const arr = await Promise.all(
        currentUser.friends.map(async (obj: FriendType) => await User.findById(obj.user._id.toString()))
    )
    const currentUserJson = currentUser.toJSON()
    delete (currentUserJson as any).friends
    cb({ users: arr, currentUser: currentUserJson })
}

export default onUserInitalData

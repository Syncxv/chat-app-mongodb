import { Socket } from 'socket.io'
import User, { FriendType } from '../../models/user'

const onInitalData = async (socket: Socket, name: string) => {
    const currentUser = await User.findById(socket.data.jwt.user.id).populate({
        path: 'friends',
        model: 'Friend'
    })
    const arr = await Promise.all(
        currentUser.friends.map(async (obj: FriendType) => await User.findById(obj.user._id.toString()))
    )
    const currentUserJson = currentUser.toJSON()
    delete (currentUserJson as any).friends
    socket.emit(name, { users: arr, currentUser: currentUserJson })
}

export default onInitalData

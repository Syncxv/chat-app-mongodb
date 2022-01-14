import { Server } from 'socket.io'
import { connectedUser } from '../..'
import { SOCKET_ACTIONS } from '../../constants'
import { UserType } from '../../models/user'

export const recciveFriendRequest = (socket: Server, idTO: string, sender: UserType) => {
    const user = connectedUser.get(idTO)
    if (!user) return
    socket.to(user.socket_id).emit(SOCKET_ACTIONS.RECIVE_FRIEND_REQUEST, sender)
}

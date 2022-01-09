import Message from '../../models/Message'
import { UserType } from '../../models/user'
import { Server, Socket } from 'socket.io'
import DmChannel from '../../models/channels'
import { connectedUser } from '../..'
import { SOCKET_ACTIONS } from '../../constants'

interface createMessageEvent {
    message: { author: UserType; content: string; channel_id: string }
}
export const handleMessagePost = async (event: createMessageEvent, socket: Socket, io: Server) => {
    try {
        const socketUser = connectedUser.get(socket.data.jwt.user.id!)
        const message = await new Message({
            content: event.message.content,
            author: socketUser!.user,
            channel_id: event.message.channel_id
        }).populate([{ path: 'author', model: 'User' }])
        const channel = await DmChannel.findById(event.message.channel_id)
        if (!channel) return
        await message.save()
        console.log(message)
        console.log(channel)
        channel.members.forEach(member => {
            const person = connectedUser.get(member.toString())
            console.log(person, member)
            if (!person) return
            io.to(person.socket_id).emit(SOCKET_ACTIONS.RECIVE_MESSAGE, message.toJSON())
        })
    } catch (err) {
        console.error(err)
    }
}
// i dont think ill use this

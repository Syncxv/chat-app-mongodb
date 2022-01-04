import Message from '../../models/Message'
import { UserType } from '../../models/user'
import { Socket } from 'socket.io'
import DmChannel from '../../models/channels'
import { connectedUser } from '../..'
import { SOCKET_ACTIONS } from '../../constants'

interface createMessageEvent {
    message: { author: UserType; content: string; channel_id: string }
}
export const handleMessagePost = async (event: createMessageEvent, socket: Socket) => {
    const message = await new Message({
        content: event.message.content,
        author: event.message.author,
        channel_id: event.message.channel_id
    }).populate([{ path: 'author', model: 'User' }])
    const channel = await DmChannel.findById(event.message.channel_id)
    if (!channel) return
    await message.save()
    console.log(message)
    channel.members.forEach(member => {
        const person = connectedUser.get(member)
        if (!person) return
        console.log(person)
        socket.nsp.to(person.socket_id).emit(SOCKET_ACTIONS.RECIVE_MESSAGE, message.toJSON())
    })
}
// i dont think ill use this

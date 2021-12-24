export const CHANNEL_INITAL_DATA_EVENT_NAME = 'channel-inital-data'
import { Socket } from 'socket.io'
import getChannels from '../../utils/getChannels'
const onChannelInitalData = async (socket: Socket) => {
    const channels = await getChannels(socket.data.jwt.user.id, true)
    socket.emit(CHANNEL_INITAL_DATA_EVENT_NAME, { channels })
}
export default onChannelInitalData

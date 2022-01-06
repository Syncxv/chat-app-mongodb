export const CHANNEL_INITAL_DATA_EVENT_NAME = 'channel-inital-data'
import { Socket } from 'socket.io'
import getChannels from '../../utils/getChannels'
const onChannelInitalData = async (socket: Socket, cb: any) => {
    const channels = await getChannels(socket.data.jwt.user.id, true)
    cb({ channels })
}
export default onChannelInitalData

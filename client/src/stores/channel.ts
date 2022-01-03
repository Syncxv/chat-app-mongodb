import { Socket } from 'socket.io-client'
import { RawChannel } from '../types'
import { Store } from 'flux/utils'
import dispatcher from './dispatcher'
import { SOCKET_ACTIONS } from '../constants'
const channels: { [key: string]: RawChannel } = {}
class channelStoreClass extends Store<any> {
    socket: Socket | null
    initialized: boolean
    constructor(Dispatcher: any) {
        super(Dispatcher)
        this.socket = null
        this.initialized = false
    }
    init(socket: Socket) {
        this.socket = socket
        this.socket.on(SOCKET_ACTIONS.CHANNEL_INIT, e => {
            console.log('BRO WHY')
            e.channels.forEach((channel: RawChannel) => (channels[channel._id] = channel))
            this.initialized = true
            this.__emitter.emit('initialized')
        })
        this.socket.emit(SOCKET_ACTIONS.CHANNEL_INIT)
    }
    getChannel(id: string): RawChannel | undefined {
        return channels[id]
    }
    getChannels() {
        return channels
    }
    __onDispatch(payload: any): void {
        console.log(payload)
    }
}
const channelStore = new channelStoreClass(dispatcher)
dispatcher.register(channelStore.__onDispatch.bind(channelStore))
export default channelStore

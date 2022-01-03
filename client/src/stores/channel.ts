import { Socket } from 'socket.io-client'
import { RawChannel } from '../types'
import { Store } from 'flux/utils'
import dispatcher from './dispatcher'
const channels: { [key: string]: RawChannel } = {}
class channelStoreClass extends Store<any> {
    socket: Socket | null
    eventName: string
    isInit: boolean
    constructor(Dispatcher: any) {
        super(Dispatcher)
        this.socket = null
        this.eventName = 'channel-inital-data'
        this.isInit = false
    }
    init(socket: Socket) {
        this.socket = socket
        this.socket.on(this.eventName, e => {
            e.channels.forEach((channel: RawChannel) => (channels[channel._id] = channel))
            this.isInit = true
            this.__emitter.emit('initialized')
        })
        this.socket.emit(this.eventName)
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

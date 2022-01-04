import { Socket } from 'socket.io-client'
import { MessageType, RawChannel } from '../types'
import { Store } from 'flux/utils'
import dispatcher from './dispatcher'
import { SOCKET_ACTIONS } from '../constants'
class messageStoreClass extends Store<any> {
    socket: Socket | null
    initialized: boolean
    constructor(Dispatcher: any) {
        super(Dispatcher)
        this.socket = null
        this.initialized = false
    }
    init(socket: Socket) {
        this.socket = socket
        // socket.on(SOCKET_ACTIONS.CREATE_MESSAGE, (message: MessageType) => {

        // })
        //how
        this.initialized = true
    }
    reciveMessage(channel_id: string, message: MessageType) {
        dispatcher.dispatch({ type: 'WOAH' })
    }
    __onDispatch(payload: any): void {
        console.log(payload)
    }
}
// ill do it later nigga
const messageStore = new messageStoreClass(dispatcher)
dispatcher.register(messageStore.__onDispatch.bind(messageStore))
export default messageStore

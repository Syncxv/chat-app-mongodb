import { Socket } from 'socket.io-client'
import { RawChannel } from '../types'
import { Store } from 'flux/utils'
import dispatcher from './dispatcher'
class loadingStoreClass extends Store<any> {
    socket: Socket | null
    eventName: string
    isInit: boolean
    constructor(Dispatcher: any) {
        super(Dispatcher)
        this.socket = null
        this.eventName = 'channel-inital-data'
        this.isInit = false
    }
    __onDispatch(payload: any): void {
        console.log(payload)
    }
}
const loadingStore = new loadingStoreClass(dispatcher)
dispatcher.register(loadingStore.__onDispatch.bind(loadingStore))
export default loadingStore

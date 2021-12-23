import { Socket } from 'socket.io-client'
import { UserType } from '../types'
import { Store } from 'flux/utils'
import dispatcher from './dispatcher'
const users: { [key: string]: UserType } = {}
class userStoreClass extends Store<any> {
    socket: Socket | null
    constructor(Dispatcher: any) {
        super(Dispatcher)
        this.socket = null
    }
    init(socket: Socket) {
        this.socket = socket
        this.socket.on('inital-data', e => {
            console.log(e)
        })
        this.socket.emit('inital-data')
    }
    getUser(id: string): UserType | undefined {
        return users[id]
    }
    getUsers() {
        return users
    }
}
const userStore = new userStoreClass(dispatcher)
export default userStore

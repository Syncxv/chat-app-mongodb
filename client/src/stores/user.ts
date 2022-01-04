import { Socket } from 'socket.io-client'
import { UserType } from '../types'
import { Store } from 'flux/utils'
import dispatcher from './dispatcher'
import { SOCKET_ACTIONS } from '../constants'
const users: { [key: string]: UserType } = {}
class userStoreClass extends Store<any> {
    socket: Socket | null
    ME: string | null
    initialized: boolean
    constructor(Dispatcher: any) {
        super(Dispatcher)
        this.socket = null
        this.ME = null
        this.initialized = false
    }
    init(socket: Socket) {
        this.socket = socket
        this.socket.on(SOCKET_ACTIONS.USER_INIT, e => {
            console.log(e)
            this.ME = e.currentUser._id
            e.users.forEach((user: UserType) => {
                users[user._id] = user
            })
            users[this.ME!] = e.currentUser
            this.initialized = true
            this.__emitter.emit('initialized')
        })
        this.socket.emit(SOCKET_ACTIONS.USER_INIT)
    }
    getCurrentUser() {
        return users[this.ME!]
    }
    getUser(id: string): UserType | undefined {
        return users[id]
    }
    getUsers() {
        return users
    }
    __onDispatch(s: any) {
        console.log(s)
    }
}
const userStore = new userStoreClass(dispatcher)
dispatcher.register(userStore.__onDispatch.bind(userStore))
export default userStore

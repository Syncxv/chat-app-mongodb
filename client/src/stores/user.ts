import { Socket } from 'socket.io-client'
import { UserType } from '../types'
import { Store } from 'flux/utils'
import dispatcher from './dispatcher'
const users: { [key: string]: UserType } = {}
class userStoreClass extends Store<any> {
    socket: Socket | null
    ME: string | null
    constructor(Dispatcher: any) {
        super(Dispatcher)
        this.socket = null
        this.ME = null
    }
    init(socket: Socket) {
        this.socket = socket
        this.socket.on('inital-data', e => {
            console.log(e)
            this.ME = e.currentUser._id
            e.users.forEach((user: UserType) => {
                users[user._id] = user
            })
            users[this.ME!] = e.currentUser
        })
        this.socket.emit('inital-data')
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
}
const userStore = new userStoreClass(dispatcher)
export default userStore

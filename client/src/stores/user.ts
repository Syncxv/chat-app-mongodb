import { UserType } from '../types'
import { socket } from '../context/Socket/ws'
const users: { [key: string]: UserType } = {}

class userStore {
    constructor() {
        socket
    }
    getUser(id: string): UserType | undefined {
        return users[id]
    }
}

export default userStore

import { Socket, io } from 'socket.io-client'
import { apiUrl } from '../../constants'

const socket = () => {
    return io(apiUrl)
}

const fuck = socket()
export { fuck as socket }

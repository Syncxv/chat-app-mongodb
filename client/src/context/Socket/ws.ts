import { Socket, io } from 'socket.io-client'
import { apiUrl } from '../../constants'

const socket: Socket = io(apiUrl)

export { socket }

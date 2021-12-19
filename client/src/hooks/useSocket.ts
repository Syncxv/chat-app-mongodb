import { useContext } from 'react'
import { Socket } from 'socket.io-client'
import { SocketContext } from '../context/SocketContext'

const useSocket = (): [boolean, Socket] => {
    const [loading, socket] = useContext(SocketContext)
    return [loading, socket as Socket]
}

export default useSocket

import { useContext } from 'react'
import socketAPI from '../context/Socket/SocketClient'
import { SocketContext } from '../context/Socket/SocketContext'

const useSocket = (): [boolean, socketAPI] => {
    const [loading, socket] = useContext(SocketContext)
    return [loading, socket as socketAPI]
}

export default useSocket

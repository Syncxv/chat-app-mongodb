import { io, Socket } from 'socket.io-client'
import { useState } from 'react'
const useConnect = (url: string) => {
    const [isLoading, setLoading] = useState(true)
    const socket: Socket = io(url)
    socket.on('connect', () => {
        setLoading(!socket.connected)
    })
    socket.on('disconnect', () => setLoading(!socket.connected))
    return [isLoading, socket] as [boolean, Socket]
}
export default useConnect

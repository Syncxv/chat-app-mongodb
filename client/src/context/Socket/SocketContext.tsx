import { NextApiRequest, NextApiResponse, NextPage } from 'next'
import React, { createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import Cookie from 'js-cookie'
import { LoadingWrapper } from '../../components/LoadingWrapper'
import { apiUrl } from '../../constants'
import userStore from '../../stores/user'
import channelStore from '../../stores/channel'

interface loading {
    channelStoreLoading: boolean
    userStoreLoading: boolean
    socketLoading: boolean
}
type initState = [boolean, null | Socket]
const initalState: initState = [true, null]

export const SocketContext = createContext(initalState)

interface Props {}

const SocketContextProvider: NextPage<Props> = ({ children }) => {
    const [loading, setLoading] = useState<loading>({
        channelStoreLoading: true,
        userStoreLoading: false,
        socketLoading: true
    })
    const [socket, setSocket] = useState<Socket | null>(null)
    const isLoading = () => {
        return Object.values(loading).some(s => s === true)
    }
    useEffect(() => {
        const socket = io(apiUrl, {
            query: {
                token: Cookie.get('token')
            }
        })
        userStore.init(socket)
        channelStore.init(socket)
        console.log(channelStore)
        //@ts-ignore
        channelStore.__emitter.once('initialized', () => {
            console.log('WOAH initalized eh,', loading)
            setLoading(prev => ({ ...prev, channelStoreLoading: false }))
            console.log('WOAH initalized after eh,', loading)
            console.log(isLoading())
        })
        console.log(isLoading(), loading)

        setSocket(socket)
        socket.on('connect', () => setLoading(prev => ({ ...prev, socketLoading: false })))
        socket.on('disconnect', () => setLoading(prev => ({ ...prev, socketLoading: true })))
    }, [])
    return (
        <>
            <LoadingWrapper loading={isLoading()} />
            <SocketContext.Provider value={[isLoading(), socket]}>{children}</SocketContext.Provider>
        </>
    )
}
export async function getStaticProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    console.log('HEY IN SOCKET CONTEXT: ', req, res)
    return { props: { token: req.cookies.token } }
}

export default SocketContextProvider

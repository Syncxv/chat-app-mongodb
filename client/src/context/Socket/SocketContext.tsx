import { NextApiRequest, NextApiResponse, NextPage } from 'next'
import React, { createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import Cookie from 'js-cookie'
import { LoadingWrapper } from '../../components/LoadingWrapper'
import { apiUrl } from '../../constants'
import userStore from '../../stores/user'
type initState = [boolean, null | Socket]
const initalState: initState = [true, null]

export const SocketContext = createContext(initalState)

interface Props {}

const SocketContextProvider: NextPage<Props> = ({ children }) => {
    const [loading, setLoading] = useState(true)
    const [socket, setSocket] = useState<Socket | null>(null)
    useEffect(() => {
        const socket = io(apiUrl, {
            query: {
                token: Cookie.get('token')
            }
        })
        userStore.init(socket)
        setSocket(socket)
        socket.on('connect', () => setLoading(false))
        socket.on('disconnect', () => setLoading(true))
    }, [])
    return (
        <>
            <LoadingWrapper loading={loading} />
            <SocketContext.Provider value={[loading, socket]}>{children}</SocketContext.Provider>
        </>
    )
}
export async function getStaticProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    console.log('HEY IN SOCKET CONTEXT: ', req, res)
    return { props: { token: req.cookies.token } }
}

export default SocketContextProvider

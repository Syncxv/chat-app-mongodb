import { NextPage } from 'next'
import React, { createContext, useState } from 'react'
import { Socket } from 'socket.io-client'
import { LoadingWrapper } from '../../components/LoadingWrapper'
import { socket } from './ws'
type initState = [boolean, null | Socket]
const initalState: initState = [true, null]

export const SocketContext = createContext(initalState)

interface Props {}

const SocketContextProvider: NextPage<Props> = ({ children }) => {
    const [loading, setLoading] = useState(true)
    socket.on('connect', () => setLoading(false))
    socket.on('disconnect', () => setLoading(true))
    return (
        <>
            <LoadingWrapper loading={loading} />
            <SocketContext.Provider value={[loading, socket]}>{children}</SocketContext.Provider>
        </>
    )
}

export default SocketContextProvider

import { NextPage } from 'next'
import React, { createContext } from 'react'
import { Socket } from 'socket.io-client'
import { apiUrl } from '../constants'
import useConnect from '../hooks/useConnect'

type initState = [boolean, null | Socket]
const initalState: initState = [true, null]

export const SocketContext = createContext(initalState)

interface Props {}

const SocketContextProvider: NextPage<Props> = ({ children }) => {
    const value = useConnect(apiUrl)
    return <SocketContext.Provider value={value as any}>{children}</SocketContext.Provider>
}

export default SocketContextProvider

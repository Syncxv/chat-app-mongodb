import { NextApiRequest, NextApiResponse, NextPage } from 'next'
import React, { createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import Cookie from 'js-cookie'
import { LoadingWrapper } from '../../components/LoadingWrapper'
import { apiUrl } from '../../constants'
import userStore from '../../stores/user'
import channelStore from '../../stores/channel'
import messageStore from '../../stores/messages'
import { useDispatch, useSelector, useStore } from 'react-redux'
import socketAPI from './SocketClient'
import { Actiontypes } from '../../types'
import { socketClient } from '../../pages/_app'
import { connectionOpen, isInitialized } from '../../reducers/initialize'
import { AppState } from '../../stores/store'

interface loading {
    channelStoreLoading: boolean
    userStoreLoading: boolean
    socketLoading: boolean
}
type initState = [boolean, null | socketAPI]
const initalState: initState = [true, null]

export const SocketContext = createContext(initalState)

interface Props {}

const SocketContextProvider: NextPage<Props> = ({ children }) => {
    const dispatch = useDispatch()
    const { initialized, failed } = useSelector((state: AppState) => state.connection)
    const isLoading = () => !initialized
    useEffect(() => {
        dispatch(connectionOpen())
        // userStore.init(socket)
        // channelStore.init(socket)
        // messageStore.init(socket)
        // console.log(channelStore)
        // //@ts-ignore
        // channelStore.__emitter.once('initialized', () => {
        //     setLoading(prev => ({ ...prev, channelStoreLoading: false }))
        // })
        // //@ts-ignore
        // userStore.__emitter.once('initialized', () => {
        //     setLoading(prev => ({ ...prev, userStoreLoading: false }))
        // })
        // console.log(isLoading(), loading)

        // setSocket(socket)
        // socket.on('connect', () => setLoading(prev => ({ ...prev, socketLoading: false })))
        // socket.on('disconnect', () => setLoading(prev => ({ ...prev, socketLoading: true })))
    }, [])
    return (
        <>
            <LoadingWrapper loading={isLoading()} />
            {!isLoading() && (
                <SocketContext.Provider value={[isLoading(), socketClient]}>
                    {children}
                </SocketContext.Provider>
            )}
        </>
    )
}
export async function getStaticProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    console.log('HEY IN SOCKET CONTEXT: ', req, res)
    return { props: { token: req.cookies.token } }
}

export default SocketContextProvider

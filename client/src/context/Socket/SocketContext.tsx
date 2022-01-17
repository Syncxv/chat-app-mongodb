import { NextApiRequest, NextApiResponse, NextPage } from 'next'
import React, { createContext, useEffect, useState } from 'react'
import { io, Socket } from 'socket.io-client'
import Cookie from 'js-cookie'
import { LoadingWrapper } from '../../components/LoadingWrapper'
import { apiUrl } from '../../constants'
import { useDispatch, useSelector, useStore } from 'react-redux'
import socketAPI from './SocketClient'
import { Actiontypes } from '../../types'
import { socketClient } from '../../pages/_app'
import { connectionOpen, isInitialized } from '../../reducers/initialize'
import { AppState } from '../../stores/store'
import { initalizeUsers } from '../../reducers/user'
import { initalizeChannels } from '../../reducers/channel'
import axios from 'axios'

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
    const state = useSelector((state: AppState) => state)
    useEffect(() => {
        dispatch(connectionOpen())
        dispatch(initalizeUsers())
        dispatch(initalizeChannels())
    }, [])
    const isLoading = () => Boolean(Object.values(state).filter(s => !s.initialized).length)
    console.log(!isLoading())
    return (
        <>
            <LoadingWrapper loading={isLoading()} />
            {/* {!isLoading() && (
                <>
                    {console.log('DONE')}
                    {console.log(!isLoading())}
                    <h1>DONE</h1>
                </>
            )} */}
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

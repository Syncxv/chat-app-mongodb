import axios from 'axios'
import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import { apiUrl, SOCKET_ACTIONS } from '../../constants'
import { getChannel, setCurrentChannel } from '../../reducers/channel'
import { fetchMessages, messageCreate, receiveMessage } from '../../reducers/message'
import { getCurrentUser } from '../../reducers/user'
import { AppDispatch, AppState } from '../../stores/store'
import { MessageType } from '../../types'
import MessageList from '../MessageList'
import Sidebar from '../sidebar'
import AppWrapper from '../Wrapper'
import FriendSection from './FriendSection'
import UnknownChannel from './UnkownChannel'
import { socketClient } from '../../pages/_app'
interface ChannelProps {
    params?: {
        cid: string
    }
}
export const getMessages = async (cid: string) => (await axios.get(`${apiUrl}/channels/${cid}/messages`)).data

export const sendMessage = async (id: string, content: string) => {
    await axios.post(`${apiUrl}/messages`, {
        channel_id: id,
        content
    })
}

const Main: NextPage<ChannelProps> = ({ params }) => {
    const textAreaRef = useRef<HTMLInputElement | null>(null)
    const scrollableRef = useRef<HTMLDivElement | null>(null)
    const dispatch = useDispatch()
    const state = useSelector((state: AppState) => state)
    useEffect(() => {
        if (params) {
            dispatch(setCurrentChannel(params.cid))
            dispatch(fetchMessages({ channel_id: params?.cid }))
        }
        socketClient.on(SOCKET_ACTIONS.RECIVE_MESSAGE, (message: MessageType) => {
            dispatch(receiveMessage({ message, channel_id: params!.cid }))
            //it aint stupid if it works
            scrollableRef?.current?.lastElementChild?.lastElementChild?.lastElementChild?.scrollIntoView()
        })
        return () => {
            socketClient.off(SOCKET_ACTIONS.RECIVE_MESSAGE)
        }
    }, [params])
    if (!params) {
        return <FriendSection />
    }
    const channel = getChannel(params!.cid, state)
    if (!channel) return <UnknownChannel />
    const messages = state.messageStore.channelMessages[params!.cid]
    const handleSendClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!textAreaRef.current?.value.length) return
        dispatch(
            messageCreate({
                channel_id: params!.cid,
                content: textAreaRef.current.value
            })
        )
        textAreaRef.current.value = ''
    }
    return (
        <>
            <AppWrapper>
                <Sidebar />
                <main className="hey flex flex-col  h-screen w-full">
                    <div
                        // style={{ display: 'flex', flexDirection: 'column-reverse' }}
                        ref={scrollableRef}
                        className="main-seciton"
                    >
                        <div className="scrollable">
                            <header>
                                <h1>{channel?.members[0].username}</h1>
                            </header>
                            <MessageList data={messages} />
                        </div>
                    </div>
                    <form onSubmit={handleSendClick} className="form-wrapper">
                        <input
                            ref={textAreaRef}
                            className="text-area"
                            type="text"
                            placeholder={`Message ${channel.members[0].username}`}
                        />
                    </form>
                </main>
            </AppWrapper>
        </>
    )
}

export default /*  React.memo(Main) */ Main

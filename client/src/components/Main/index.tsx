import axios from 'axios'
import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { Socket } from 'socket.io-client'
import { apiUrl, SOCKET_ACTIONS } from '../../constants'
import useSocket from '../../hooks/useSocket'
import channelStore from '../../stores/channel'
import messageStore from '../../stores/messages'
import userStore from '../../stores/user'
import { MessageType } from '../../types'
import MessageList from '../MessageList'
import Sidebar from '../sidebar'
import AppWrapper from '../Wrapper'
import FriendSection from './FriendSection'
import UnknownChannel from './UnkownChannel'

interface ChannelProps {
    params?: {
        cid: string
    }
    messages?: MessageType[]
    socket: Socket
}
export const getMessages = async (cid: string) => (await axios.get(`${apiUrl}/channels/${cid}/messages`)).data

export const sendMessage = async (id: string, content: string) => {
    await axios.post(`${apiUrl}/messages`, {
        channel_id: id,
        content
    })
}

const Main: NextPage<ChannelProps> = ({ params, messages: messagesProps, socket }) => {
    const [messages, setMessages] = useState<MessageType[]>()
    const ref = useRef<HTMLInputElement | null>(null)
    useEffect(() => {
        console.log('IN [MAIN]', messageStore)
        console.log('IN [MAIN]', userStore)
        console.log('IN [MAIN]', channelStore)
        setMessages(messagesProps)
        socket?.on(SOCKET_ACTIONS.RECIVE_MESSAGE, (message: MessageType) => {
            console.log('WOAH NEW MESSAGE EH?')
            setMessages(prev => [...prev!, message])
        })
    }, [])
    console.log(params, messages)
    if (!params) {
        return <FriendSection />
    }
    const channel = channelStore.getChannel(params!.cid)
    if (!channel) return <UnknownChannel />
    const handleSendClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!ref.current?.value.length) return
        // sendMessage(params.cid, ref.current.value)
        socket.emit(SOCKET_ACTIONS.CREATE_MESSAGE, {
            message: {
                author: userStore.getCurrentUser(),
                content: ref.current.value,
                channel_id: params.cid
            }
        })
        ref.current.value = ''
    }

    console.log('DATA IN CHANNEL PAGE', messages, channel)
    return (
        <>
            <AppWrapper>
                <Sidebar />
                <main className="main-seciton">
                    <div className="scrollable">
                        <header>
                            <h1>{channel?.members[0].username}</h1>
                        </header>
                        <MessageList data={messages} isLoading={false} />
                        {messages && (
                            <form onSubmit={handleSendClick} className="form-wrapper">
                                <input
                                    ref={ref}
                                    className="text-area"
                                    type="text"
                                    placeholder={`Message ${channel.members[0].username}`}
                                />
                                {/* <button type="submit" className="form-send-wrapper">
                                    <span className="form-send">Send</span>
                                </button> */}
                            </form>
                        )}
                    </div>
                </main>
            </AppWrapper>
        </>
    )
}
export const getServerSideProps = async (context: any) => {
    const messages = await getMessages(context.params.cid)

    return {
        props: { params: context.params, messages }
    }
}
export default /*  React.memo(Main) */ Main

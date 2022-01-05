import axios from 'axios'
import { NextPage } from 'next'
import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { Socket } from 'socket.io-client'
import { apiUrl, SOCKET_ACTIONS } from '../../constants'
import { getChannel } from '../../reducers/channel'
import { getCurrentUser } from '../../reducers/user'
import { AppState } from '../../stores/store'
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
    const textAreaRef = useRef<HTMLInputElement | null>(null)
    const scrollableRef = useRef<HTMLDivElement | null>(null)
    const state = useSelector((state: AppState) => state)
    useEffect(() => {
        console.log(socket)
        socket?.on(SOCKET_ACTIONS.RECIVE_MESSAGE, (message: MessageType) => {
            console.log('WOAH NEW MESSAGE EH?')
            setMessages(prev => [...prev!, message])
            //it aint stupid if it works
            scrollableRef?.current?.lastElementChild?.lastElementChild?.lastElementChild?.scrollIntoView()
        })
        setMessages(messagesProps)
    }, [])
    console.log(params, messages)
    if (!params) {
        return <FriendSection />
    }
    const channel = getChannel(params!.cid, state)
    if (!channel) return <UnknownChannel />
    const handleSendClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!textAreaRef.current?.value.length) return
        // sendMessage(params.cid, ref.current.value)
        socket.emit(SOCKET_ACTIONS.CREATE_MESSAGE, {
            message: {
                author: getCurrentUser(state),
                content: textAreaRef.current.value,
                channel_id: params.cid
            }
        })
        console.log(scrollableRef)
        textAreaRef.current.value = ''
        // scrollableRef.current?.lastElementChild?.lastElementChild?.scrollIntoView()
    }

    console.log('DATA IN CHANNEL PAGE', messages, channel)
    return (
        <>
            <AppWrapper>
                <Sidebar />
                <main className="hey flex flex-col  h-screen w-full">
                    <div ref={scrollableRef} className="main-seciton">
                        <div className="scrollable">
                            <header>
                                <h1>{channel?.members[0].username}</h1>
                            </header>
                            <MessageList data={messages} isLoading={false} />
                        </div>
                    </div>
                    {messages && (
                        <form onSubmit={handleSendClick} className="form-wrapper">
                            <input
                                ref={textAreaRef}
                                className="text-area"
                                type="text"
                                placeholder={`Message ${channel.members[0].username}`}
                            />
                            {/* <button type="submit" className="form-send-wrapper">
                                        <span className="form-send">Send</span>
                                    </button> */}
                        </form>
                    )}
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

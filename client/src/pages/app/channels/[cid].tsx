import axios from 'axios'
import { NextPage } from 'next'
import React, { useEffect, useRef } from 'react'
import { LoadingWrapper } from '../../../components/LoadingWrapper'
import MessageList from '../../../components/MessageList'
import Sidebar from '../../../components/sidebar'
import { apiUrl } from '../../../constants'
import useSocket from '../../../hooks/useSocket'
import { Channel, MessageType } from '../../../types'
import userStore from '../../../stores/user'
import Flux from 'flux/utils'
import { Dispatcher } from 'flux'
interface ChannelProps {
    params: {
        cid: string
    }
    messages: MessageType[]
}
export const getMessages = async (cid: string) => (await axios.get(`${apiUrl}/channels/${cid}/messages`)).data

export const sendMessage = async (id: string, content: string) => {
    await axios.post(`${apiUrl}/messages`, {
        channel_id: id,
        content
    })
}
const Channel: NextPage<ChannelProps> = ({ params, messages }) => {
    const [loading, socket] = useSocket()
    const ref = useRef<HTMLInputElement | null>(null)
    // const store = new userStore(socket)
    useEffect(() => {
        console.log(userStore)
    }, [])
    const handleSendClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!ref.current?.value.length) return
        // sendMessage(params.cid, ref.current.value)
        socket.emit('hey-message', { message: { author: {}, content: ref.current.value } })
        ref.current.value = ''
    }
    console.log('DATA IN CHANNEL PAGE', messages)
    return (
        <>
            <LoadingWrapper loading={loading} />
            <div className="app-wrapper">
                <Sidebar />
                <main className="main-seciton">
                    <div className="scrollable">
                        <header>
                            <h1>hehe</h1>
                        </header>
                        <MessageList data={messages} isLoading={false} />
                        {messages && (
                            <form onSubmit={handleSendClick} className="form-wrapper">
                                <input
                                    ref={ref}
                                    className="text-area"
                                    type="text"
                                    placeholder="Message Ya mum"
                                />
                                <button type="submit" className="form-send-wrapper">
                                    <span className="form-send">Send</span>
                                </button>
                            </form>
                        )}
                    </div>
                </main>
            </div>
        </>
    )
}
export const getServerSideProps = async (context: any) => {
    const messages = await getMessages(context.params.cid)

    return {
        props: { params: context.params, messages }
    }
}
export default Channel

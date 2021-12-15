import axios from 'axios'
import { NextPage } from 'next'
import React, { useRef } from 'react'
import { useQuery } from 'react-query'
import Input from '../../../components/Input'
import Message from '../../../components/Message'
import Sidebar from '../../../components/sidebar'
import { apiUrl } from '../../../constants'
import { Channel, MessageType } from '../../../types'
interface ChannelProps {
    params: {
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
const Channel: NextPage<ChannelProps> = ({ params }) => {
    const { isLoading, data } = useQuery<MessageType[]>('messages', async () => getMessages(params.cid))
    const ref = useRef<HTMLInputElement | null>(null)
    const handleSendClick = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!ref.current?.value.length) return
        console.log(ref.current)
        sendMessage(params.cid, ref.current.value)
        ref.current.value = ''
    }
    console.log('DATA IN CHANNEL PAGE', data)
    return (
        <div className="app-wrapper">
            <Sidebar />
            <main className="main-seciton">
                <div className="scrollable">
                    <header>
                        <h1>hehe</h1>
                    </header>
                    <ul className="messages-list">
                        {!isLoading ? (
                            data?.map(message => (
                                <li key={message._id} id={message.author._id} className="message-item">
                                    <Message message={message} />
                                </li>
                            )) || <h1>welp</h1>
                        ) : (
                            <h1>welp</h1>
                        )}
                    </ul>
                    {data && (
                        <form onSubmit={handleSendClick} className="form-wrapper">
                            <input ref={ref} className="text-area" type="text" placeholder="Message Ya mum" />
                            <button type="submit" className="form-send-wrapper">
                                <span className="form-send">Send</span>
                            </button>
                        </form>
                    )}
                </div>
            </main>
        </div>
    )
}
export const getServerSideProps = async (context: any) => {
    return {
        props: { params: context.params }
    }
}
export default Channel

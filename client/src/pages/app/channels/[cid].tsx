import axios from 'axios'
import { NextPage } from 'next'
import React from 'react'
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

const Channel: NextPage<ChannelProps> = ({ params }) => {
    const { isLoading, data } = useQuery<MessageType[]>('messages', async () => getMessages(params.cid))
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
                    <div className="form-wrapper">
                        <input className="text-area" type="text" placeholder="Message Ya mum" />
                        <div className="form-send-wrapper">
                            <span className="form-send">Send</span>
                        </div>
                    </div>
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

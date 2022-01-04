import axios from 'axios'
import { NextPage } from 'next'
import React from 'react'
import { apiUrl } from '../../../constants'
import { Channel, MessageType } from '../../../types'
import Main from '../../../components/Main'
import useSocket from '../../../hooks/useSocket'
interface ChannelProps {
    params: {
        cid: string
    }
    messages: MessageType[]
}
export const getMessages = async (cid: string) =>
    (await axios.get(`${apiUrl}/channels/${cid}/messages?limit=50`)).data

export const sendMessage = async (id: string, content: string) => {
    await axios.post(`${apiUrl}/messages`, {
        channel_id: id,
        content
    })
}
const Channel: NextPage<ChannelProps> = ({ messages, params }) => {
    const [_, socket] = useSocket()
    return <Main messages={messages} params={params} socket={socket} />
}
export const getServerSideProps = async (context: any) => {
    const messages = await getMessages(context.params.cid)

    return {
        props: { params: context.params, messages }
    }
}
export default Channel

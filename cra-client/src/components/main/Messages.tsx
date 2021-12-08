import axios from 'axios'
import React from 'react'
import { useQuery } from 'react-query'
import { apiUrl } from '../../constants'
import { MessageType } from '../../types'
import Message from './Message'

interface MessagesProps {
    channel_id: string
}
const getMessages = async (channel_id: string) => {
    const res = await axios(`${apiUrl}/channels/${channel_id}/messages`)
    return res.data
}
const Messages: React.FC<MessagesProps> = ({ channel_id }) => {
    const { isLoading, data } = useQuery('getMessages', async () => getMessages(channel_id))
    if (isLoading) return <div>LOADING</div>
    console.log(data)
    return (
        <>
            <div className="wrapper">
                {data.map((msg: MessageType) => {
                    return <Message message={msg} />
                })}
            </div>
        </>
    )
}

export default Messages

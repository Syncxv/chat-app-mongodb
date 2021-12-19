import { NextPage } from 'next'
import React, { memo } from 'react'
import { MessageType } from '../types'
import Message from './Message'

interface Props {
    isLoading: boolean
    data?: MessageType[]
}

const MessageList: NextPage<Props> = memo(({ data, isLoading }) => {
    return (
        <>
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
        </>
    )
})

export default MessageList

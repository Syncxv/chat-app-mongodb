import { NextPage } from 'next'
import React from 'react'
import { defaultPfp } from '../constants'
import { MessageType } from '../types'

interface MessageProps {
    message: MessageType
}

const Message: NextPage<MessageProps> = ({ message }) => {
    const date = new Date(message.createdAt)
    return (
        <div className="message">
            <div className="avatar-wrapp">
                <img
                    className="avatar"
                    src={message.author.avatar === null ? defaultPfp : message.author.avatar}
                    alt=""
                />
            </div>
            <div className="message-contents">
                <div className="message-header">
                    <div className="date">
                        {date.toDateString()} {date.toLocaleTimeString()}
                    </div>
                    <span className="message-username">{message.author.username}</span>
                </div>
                <div className="message-text">{message.content}</div>
            </div>
        </div>
    )
}

export default Message

import React from 'react'
import { MessageType } from '../../types'
interface MessageProps {
    message: MessageType
}
const Message: React.FC<MessageProps> = ({ message: { content, author } }) => {
    return (
        <div className="message-wrapper">
            {/* <img src="" alt="" /> */}
            <h3>{author.username}</h3>
            <p>{content}</p>
        </div>
    )
}

export default Message

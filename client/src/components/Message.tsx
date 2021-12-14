import React from 'react'
import { UserType } from '../types'

interface MessageProps {
    author: UserType
}

const Message = (props: MessageProps) => {
    return <div className="message"></div>
}

export default Message

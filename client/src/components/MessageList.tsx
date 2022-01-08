import { NextPage } from 'next'
import React, { memo } from 'react'
import { useSelector } from 'react-redux'
import { AppState } from '../stores/store'
import { MessageType } from '../types'
import { AlwaysScrollToBottom } from '../util/AlwaysScrollToBottom'
import Message from './Message'
import MessagePlaceholder from './MessagePlaceholder'

interface Props {
    data?: MessageType[]
}

const MessageList: NextPage<Props> = memo(({ data }) => {
    const isLoading = useSelector((state: AppState) => state.messageStore.loading)
    return (
        <>
            <ul className="messages-list">
                <div className="placeholder-wrapper-iguess-idk-man">
                    {Array.from(Array(10)).map(() => (
                        <MessagePlaceholder />
                    ))}
                </div>
                {!isLoading ? (
                    data?.map(message => (
                        <li key={message._id} id={message.author._id} className="message-item">
                            <Message message={message} />
                        </li>
                    )) || <h1>welp</h1>
                ) : (
                    <h1>welp</h1>
                )}
                <AlwaysScrollToBottom />
            </ul>
        </>
    )
})

export default memo(MessageList)

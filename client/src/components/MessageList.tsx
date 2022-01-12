import { NextPage } from 'next'
import React, { memo, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import inView from '../hooks/inView'
import { fetchMessages } from '../reducers/message'
import { AppState } from '../stores/store'
import { MessageType } from '../types'
import { AlwaysScrollToBottom } from '../util/AlwaysScrollToBottom'
import Message from './Message'
import MessagePlaceholder from './MessagePlaceholder'

interface Props {
    data?: MessageType[]
}

const MessageList: NextPage<Props> = memo(({ data }) => {
    const {
        messageStore: {
            fetching: { loading: isLoading },
            channelMessages,
            hasMore
        },
        channelStore: { currentChanel }
    } = useSelector((state: AppState) => state)
    const refthingy = useRef<HTMLDivElement>(null)
    const rootRef = useRef<HTMLUListElement>(null)
    const renderd = useRef(false)
    const isVisible = inView({ threshold: 0 }, refthingy)
    const dispatch = useDispatch()
    const realIsVisible = isVisible && !isLoading
    console.log(currentChanel, realIsVisible)
    useEffect(() => {
        console.log(rootRef)
        if (renderd.current) {
            if (data) rootRef.current?.lastElementChild?.scrollIntoView()
        }
        return () => {
            renderd.current = true
        }
    }, [isLoading])
    useEffect(() => {
        console.log('FETCHING test', realIsVisible, hasMore)
        if (realIsVisible) {
            const messages = channelMessages[currentChanel!]
            console.log('FETCHING test', hasMore, messages)
            if (hasMore) {
                dispatch(
                    fetchMessages({
                        channel_id: currentChanel,
                        before: messages.length ? messages[0]._id : undefined
                    })
                )
            }
        }
    }, [realIsVisible])
    return (
        <>
            <ul ref={rootRef} className="messages-list">
                {hasMore && (
                    <div ref={refthingy} className="placeholder-wrapper-iguess-idk-man">
                        {Array.from(Array(10)).map(() => (
                            <MessagePlaceholder />
                        ))}
                    </div>
                )}
                {!isLoading ? (
                    data?.map(message => (
                        <li key={message._id} id={message.author._id} className="message-item">
                            <Message message={message} />
                        </li>
                    )) || <h1>welp</h1>
                ) : (
                    <h1>welp</h1>
                )}
                {/* <AlwaysScrollToBottom /> */}
            </ul>
        </>
    )
})

export default memo(MessageList)

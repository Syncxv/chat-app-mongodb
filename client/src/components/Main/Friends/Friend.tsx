import { NextPage } from 'next'
import React from 'react'
import { defaultPfp, FreindTypes } from '../../../constants'
import { UserType } from '../../../types'

interface Props {
    type: number
    user: UserType
}
interface ActionButtonProps {
    type: number
}
const ActionButton: NextPage<ActionButtonProps> = ({ type }) => {
    switch (type) {
        case FreindTypes.FRIEND:
            return (
                <>
                    <button className="message-him idk man">Chat</button>
                </>
            )
        case FreindTypes.PENDING_OUTGOING:
            return (
                <>
                    <button className="cancel idk man">Cancel</button>
                </>
            )
        case FreindTypes.PENDING_INCOMMING:
            return (
                <>
                    <button className="accept idk man">Accept</button>
                    <button className="ignore idk man">Ignore</button>
                </>
            )
        default:
            return <></>
    }
}
const Friend: NextPage<Props> = ({ type, user }) => {
    return (
        <>
            <div className="friend">
                <div className="friend-details">
                    <div className="friend-avatar-wrapper">
                        <img className="friend-avatar" src={user.avatar || defaultPfp} alt="well then" />
                    </div>
                    <span className="text-lg">{user.username}</span>
                </div>
                <div className="flex gap-4">
                    <ActionButton type={type} />
                </div>
            </div>
        </>
    )
}

export default Friend

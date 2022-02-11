import { NextPage } from 'next'
import React from 'react'
import { useDispatch } from 'react-redux'
import { defaultPfp, FreindTypes } from '../../../constants'
import { acceptFriend, removeFriend } from '../../../reducers/user'
import { UserType } from '../../../types'

interface Props {
    type: number
    user: UserType
}
interface ActionButtonProps {
    user: UserType
    type: number
}
const ActionButton: NextPage<ActionButtonProps> = ({ user, type }) => {
    const dispatch = useDispatch()
    switch (type) {
        case FreindTypes.FRIEND:
            return (
                <>
                    <button className="message-him idk man">Chat</button>
                    <button
                        className="message-him idk man"
                        onClick={() => dispatch(removeFriend({ id: user._id }))}
                    >
                        Remove
                    </button>
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
                    <button
                        className="accept idk man"
                        onClick={() => dispatch(acceptFriend({ id: user._id }))}
                    >
                        Accept
                    </button>
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
                    <ActionButton user={user} type={type} />
                </div>
            </div>
        </>
    )
}

export default Friend

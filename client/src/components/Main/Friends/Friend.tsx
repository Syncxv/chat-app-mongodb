import { NextPage } from 'next'
import { useRouter } from 'next/router'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { defaultPfp, FreindTypes } from '../../../constants'
import { addChannel } from '../../../reducers/channel'
import { acceptFriend, removeFriend } from '../../../reducers/user'
import { AppState } from '../../../stores/store'
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
    const { channelStore } = useSelector((state: AppState) => state)
    const router = useRouter()
    const handleChatClick = () => {
        const channel_id = Object.values(channelStore.channels).find(s =>
            s.members.map(another => another._id).includes(user._id)
        )?._id
        console.log(channel_id)
        channel_id ? router.push(`/app/channels/${channel_id}`) : dispatch(addChannel(user._id))
    }
    switch (type) {
        case FreindTypes.FRIEND:
            return (
                <>
                    <button className="message-him idk man" onClick={handleChatClick}>
                        Chat
                    </button>
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

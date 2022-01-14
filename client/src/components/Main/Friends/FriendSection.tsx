import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FreindTypes, SOCKET_ACTIONS } from '../../../constants'
import { socketClient } from '../../../pages/_app'
import { AppState } from '../../../stores/store'
import Sidebar from '../../sidebar'
import AppWrapper from '../../Wrapper'
import Friend from './Friend'

interface Props {}
export const FriendPagesLabels = {
    0: 'All',
    1: 'Friends',
    3: 'Incomming Friend Requests',
    4: 'Outgoing Friend Requests'
}
const FriendSection: NextPage<Props> = props => {
    const { friends, users } = useSelector((state: AppState) => state.userStore)
    const [page, setPage] = useState(FreindTypes.PENDING_OUTGOING)
    useEffect(() => {
        console.log(friends, FreindTypes)
        socketClient.on(SOCKET_ACTIONS.RECIVE_FRIEND_REQUEST, (user: any) => {
            console.log('NEW FRIEND REQ', user)
        })
    }, [])
    return (
        <>
            <AppWrapper>
                <h1>{FriendPagesLabels[page]}</h1>
                <div className="flex items-center justify-center gap-2 w-full ">
                    <button className="btn" onClick={() => setPage(FreindTypes.PENDING_OUTGOING)}>
                        Pending
                    </button>
                    <button className="btn" onClick={() => setPage(FreindTypes.PENDING_INCOMMING)}>
                        Incomming Requests
                    </button>
                    <button className="btn" onClick={() => setPage(FreindTypes.FRIEND)}>
                        Friends
                    </button>
                </div>
                <div className="friends">
                    {friends.length ? (
                        friends
                            .filter(s => s.type === page)
                            .map(s => {
                                const user = users[s.user]
                                return <Friend type={s.type} user={user} />
                            })
                    ) : (
                        <h1>no friends eh :pens</h1>
                    )}
                </div>
            </AppWrapper>
        </>
    )
}

export default FriendSection

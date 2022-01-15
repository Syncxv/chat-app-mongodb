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
    2: 'Pending'
}
const FriendSection: NextPage<Props> = props => {
    const { friends, users } = useSelector((state: AppState) => state.userStore)
    const [page, setPage] = useState<0 | 1 | 2>(FreindTypes.FRIEND)
    useEffect(() => {
        console.log(friends, FreindTypes)
        socketClient.on(SOCKET_ACTIONS.RECIVE_FRIEND_REQUEST, (user: any) => {
            console.log('NEW FRIEND REQ', user)
        })
    }, [])
    const filterd = friends.filter(s => s.type === page)
    return (
        <>
            <AppWrapper>
                <div className="friend-page-buttons flex items-center justify-center gap-2 w-full">
                    <button className="friend-page-btn" onClick={() => setPage(FreindTypes.FRIEND)}>
                        Friends
                    </button>
                    <button className="friend-page-btn" onClick={() => setPage(FreindTypes.PENDING)}>
                        Pending
                    </button>
                    <button className="friend-page-btn add-friend" onClick={() => console.log('well then')}>
                        Add Friend
                    </button>
                </div>
                <div className="p-7">
                    <h1>{FriendPagesLabels[page]}</h1>
                    <div className="friends mt-5">
                        {filterd.length ? (
                            filterd.map(s => {
                                const user = users[s.user]
                                return <Friend type={s.type} user={user} />
                            })
                        ) : (
                            <h1>nothing to show eh</h1>
                        )}
                    </div>
                </div>
            </AppWrapper>
        </>
    )
}

export default FriendSection

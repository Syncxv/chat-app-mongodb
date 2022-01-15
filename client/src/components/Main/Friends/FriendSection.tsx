import { NextPage } from 'next'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { FreindTypes, SOCKET_ACTIONS } from '../../../constants'
import { socketClient } from '../../../pages/_app'
import { AppState } from '../../../stores/store'
import Sidebar from '../../sidebar'
import AppWrapper from '../../Wrapper'
import AddFriendSection from './AddFriendSection'
import Friend from './Friend'
import FriendList from './FriendList'

interface Props {}
export const FriendPagesLabels = {
    0: 'All',
    1: 'Friends',
    2: 'Pending',
    addFriend: 'Add Friend'
}
const FriendSection: NextPage<Props> = props => {
    const { friends } = useSelector((state: AppState) => state.userStore)
    const [page, setPage] = useState<0 | 1 | 2 | 'addFriend'>(FreindTypes.FRIEND)
    useEffect(() => {
        console.log(friends, FreindTypes)
        socketClient.on(SOCKET_ACTIONS.RECIVE_FRIEND_REQUEST, (user: any) => {
            console.log('NEW FRIEND REQ', user)
        })
    }, [])
    const filterd = friends.filter(s => s.type === page)
    const isAddFriend = page === 'addFriend'
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
                    <button className="friend-page-btn add-friend" onClick={() => setPage('addFriend')}>
                        Add Friend
                    </button>
                </div>
                <div className="p-7">
                    {isAddFriend ? (
                        <AddFriendSection />
                    ) : (
                        <div className="friends mt-5">
                            <FriendList filterd={filterd} />
                        </div>
                    )}
                </div>
            </AppWrapper>
        </>
    )
}

export default FriendSection

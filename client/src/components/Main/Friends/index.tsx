import { NextPage } from 'next'
import React, { useState } from 'react'
import { useSelector } from 'react-redux'
import { FreindTypes } from '../../../constants'
import { AppState } from '../../../stores/store'
import AppWrapper from '../../Wrapper'
import AddFriendSection from './AddFriendSection'
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
    const filterd = friends.filter(s =>
        page === FreindTypes.PENDING
            ? s.type === FreindTypes.PENDING_INCOMMING || s.type === FreindTypes.PENDING_OUTGOING
            : s.type === page
    )
    const isAddFriend = page === 'addFriend'
    return (
        <>
            <AppWrapper>
                <div className="friend-page-buttons flex items-center justify-center gap-2 w-full">
                    <button
                        className={`friend-page-btn ${page === FreindTypes.FRIEND ? 'friend-selected' : ''}`}
                        onClick={() => setPage(FreindTypes.FRIEND)}
                    >
                        Friends
                    </button>
                    <button
                        className={`friend-page-btn ${page === FreindTypes.PENDING ? 'friend-selected' : ''}`}
                        onClick={() => setPage(FreindTypes.PENDING)}
                    >
                        Pending
                    </button>
                    <button className="friend-page-btn add-friend" onClick={() => setPage('addFriend')}>
                        Add Friend
                    </button>
                </div>
                <div className="py-7 px-3">
                    {isAddFriend ? (
                        <AddFriendSection />
                    ) : (
                        <div className="friends mt-5">
                            <FriendList filterd={filterd} type={page} />
                        </div>
                    )}
                </div>
            </AppWrapper>
        </>
    )
}

export default FriendSection

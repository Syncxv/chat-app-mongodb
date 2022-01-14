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

const FriendSection: NextPage<Props> = props => {
    const { friends, users } = useSelector((state: AppState) => state.userStore)
    const [page, setPage] = useState(FreindTypes.FRIEND)
    useEffect(() => {
        console.log(friends, FreindTypes)
        socketClient.on(SOCKET_ACTIONS.RECIVE_FRIEND_REQUEST, (user: any) => {
            console.log('NEW FRIEND REQ', user)
        })
    }, [])
    return (
        <>
            <AppWrapper>
                {/* {FreindTypes} */}
                <div className="friends">
                    {friends.length ? (
                        friends.map(s => {
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

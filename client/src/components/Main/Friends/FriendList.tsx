import { NextPage } from 'next'
import React from 'react'
import { useSelector } from 'react-redux'
import { FreindTypes } from '../../../constants'
import { AppState } from '../../../stores/store'
import { FriendType } from '../../../types'
import Friend from './Friend'

interface Props {
    filterd: FriendType[]
    type: FreindTypes
}

const FriendList: NextPage<Props> = ({ filterd, type }) => {
    const { users } = useSelector((state: AppState) => state.userStore)
    return (
        <>
            <span className="text-sm font-semibold">
                {type === FreindTypes.FRIEND ? 'Friends' : 'Pending'} - {filterd.length}
            </span>
            {filterd.length ? (
                filterd.map(s => {
                    const user = users[s.user]
                    return <Friend type={s.type} user={user} />
                })
            ) : (
                <h1>nothing to show eh</h1>
            )}
        </>
    )
}

export default FriendList

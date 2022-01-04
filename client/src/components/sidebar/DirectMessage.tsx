import { NextPage } from 'next'
import React from 'react'
import { defaultPfp } from '../../constants'
import { UserType } from '../../types'
import { BaseSideButton } from './BaseSidebarButton'

interface DirectMessageProps {
    user: UserType
    onClick?: any
}

const DirectMessage: NextPage<DirectMessageProps> = ({ user, onClick = () => {} }) => {
    return (
        <div onClick={onClick} className="base">
            <BaseSideButton active={false}>
                <img className="avatar" src={user.avatar ? user.avatar : defaultPfp} alt="" />
                <h4>{user.username}</h4>
            </BaseSideButton>
        </div>
    )
}

export default DirectMessage

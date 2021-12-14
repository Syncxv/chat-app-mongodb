import { NextPage } from 'next'
import React from 'react'
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
                <img
                    className="avatar"
                    src="https://cdn.discordapp.com/avatars/549244932213309442/5b3984903ff4d507f93465a1e1d86ec7.png"
                    alt=""
                />
                <h4>{user.username}</h4>
            </BaseSideButton>
        </div>
    )
}

export default DirectMessage

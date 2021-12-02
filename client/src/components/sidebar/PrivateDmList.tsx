import { NextPage } from 'next'
import React, { useContext } from 'react'
import { AuthContext } from '../../context/Auth/AuthContext'
import { Channel, RawChannel } from '../../types'
import DirectMessage from './DirectMessage'

interface PrivateDmListsInterface {
    channels: RawChannel[]
    isLoading: boolean
}

const PrivateDmList: NextPage<PrivateDmListsInterface> = ({ channels, isLoading }) => {
    return (
        <>
            <div className="channel-users">
                {!isLoading ? (
                    channels.map(chan => <DirectMessage key={chan.members[0].id} user={chan.members[0]} />)
                ) : (
                    <div> LOADING </div>
                )}
            </div>
        </>
    )
}

export default PrivateDmList

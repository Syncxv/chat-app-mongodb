import React from 'react'
import { Channel, RawChannel } from '../../types'
import DirectMessage from './DirectMessage'

interface PrivateDmListsInterface {
    channels: RawChannel[]
    isLoading: boolean
}

const PrivateDmList: React.FC<PrivateDmListsInterface> = ({ channels, isLoading }) => {
    console.log(channels)
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

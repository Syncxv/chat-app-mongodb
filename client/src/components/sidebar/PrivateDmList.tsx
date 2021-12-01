import { NextPage } from 'next'
import React from 'react'
import { Channel, RawChannel } from '../../types'
import { requestWrapper } from '../../util/reqeust'
import DirectMessage from './DirectMessage'

interface PrivateDmListsInterface {
    channels: RawChannel[]
    isLoading: boolean
}

const PrivateDmList: NextPage<PrivateDmListsInterface> = ({ channels, isLoading }) => {
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

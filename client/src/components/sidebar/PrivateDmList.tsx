import { NextPage } from 'next'
import router from 'next/router'
import React from 'react'
import { Channel, RawChannel } from '../../types'
import DirectMessage from './DirectMessage'

interface PrivateDmListsInterface {
    channels: RawChannel[]
    isLoading: boolean
}

const PrivateDmList: NextPage<PrivateDmListsInterface> = ({ channels, isLoading }) => {
    const hasChannels = channels.length
    return (
        <>
            <div className="channel-users">
                {hasChannels ? (
                    !isLoading ? (
                        channels.map(chan => (
                            <DirectMessage
                                onClick={() => router.push(`/app/channels/${chan._id}`)}
                                key={chan.members[0]._id}
                                user={chan.members[0]}
                            />
                        ))
                    ) : (
                        <div> LOADING </div>
                    )
                ) : (
                    <div> no channels eh </div>
                )}
            </div>
        </>
    )
}
// im not sorry
export default PrivateDmList

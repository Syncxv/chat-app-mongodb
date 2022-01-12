import { NextPage } from 'next'
import router from 'next/router'
import React from 'react'
import { Channel, RawChannel } from '../../types'
import DirectMessage from './DirectMessage'

interface PrivateDmListsInterface {
    channels: RawChannel[]
    isLoading: boolean
    closeSidebar: any
}

const PrivateDmList: NextPage<PrivateDmListsInterface> = ({ channels, isLoading, closeSidebar }) => {
    const hasChannels = channels?.length || false
    return (
        <>
            <div className="channel-users">
                {hasChannels ? (
                    !isLoading ? (
                        channels.map(chan => (
                            <DirectMessage
                                onClick={() => {
                                    router.push(`/app/channels/${chan._id}`)
                                    closeSidebar()
                                }}
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

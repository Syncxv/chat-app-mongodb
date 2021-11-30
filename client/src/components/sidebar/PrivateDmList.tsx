import { NextPage } from 'next'
import React from 'react'
import { Channel } from '../../types'

interface PrivateDmListsInterface {
    channels: Channel[]
}

const PrivateDmList : NextPage<PrivateDmListsInterface> = ({channels}) => {
    // const newChannels = channels.map(chan => chan.members.map(id => ))
    return (
        <>
            
        </>
    )
}

export default PrivateDmList

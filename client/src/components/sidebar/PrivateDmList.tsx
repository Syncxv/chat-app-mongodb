import { NextPage } from 'next'
import React from 'react'
import { Channel } from '../../types'
import { requestWrapper } from '../../util/reqeust'

interface PrivateDmListsInterface {
    channels: Channel[]
}

const PrivateDmList: NextPage<PrivateDmListsInterface> = ({ channels }) => {
    console.log(channels)
    window.channels = channels
    window.requestWrapper = requestWrapper
    return (
        <>
            <div className="">
                {/* {channels.map(chan => {
                    chan.members.map(id => getUser(id))
                })} */}
            </div>
        </>
    )
}

export default PrivateDmList

import { NextPage } from 'next'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { getUser } from '../../hooks/getUser'
import getChannels from '../../hooks/useGetChannels'
import { Channel, RawChannel } from '../../types'
import PrivateDmList from './PrivateDmList'

interface Props {
    channels?: Channel[]
}
const getRawChannels = async () => {
    const channels = await getChannels()
    console.log('CHANNELS IN GETRAWCHANNELS: ', channels)
    return Promise.all(
        channels.map(async (chann: Channel) => {
            console.log(chann.members[0])
            const members = await Promise.all(chann.members.map(async id => await getUser(id)))
            chann.members = members
            return chann
        })
    )
}
const Sidebar: NextPage<Props> = ({}) => {
    const { isLoading, data } = useQuery('heh', getRawChannels)
    console.log('DATA IN SIDEBAR: ', data)
    return (
        <div className="sidebar-outer">
            <div className="sidbar-head">
                <h3>Friends</h3>
            </div>
            <PrivateDmList isLoading={isLoading} channels={data as RawChannel[]} />
        </div>
    )
}

export default Sidebar

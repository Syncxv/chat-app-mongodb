import React, { createContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import { useGlobal } from '../../hooks/useGlobal'
import { getUser, getChannels } from '../../hooks/useUser'
import { Channel, RawChannel } from '../../types'
import PrivateDmList from './PrivateDmList'

interface Props {
    channels?: Channel[]
}
const GetRawChannels = async () => {
    const channels = await getChannels()
    const rawChannels = await Promise.all(
        channels.map(async (chann: Channel) => {
            console.log(chann.members[0])
            const members = await Promise.all(chann.members.map(async id => await getUser(id)))
            chann.members = members
            return chann
        })
    )
    return rawChannels
}
const Sidebar: React.FC<Props> = ({}) => {
    const { isLoading, data } = useQuery('rawChannels', GetRawChannels)
    const _global = useGlobal()
    _global.set('channels', data)
    console.log('GLOBAL IN SIDEBAR: ', _global)
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

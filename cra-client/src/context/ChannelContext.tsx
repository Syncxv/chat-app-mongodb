import React, { createContext, useState } from 'react'
import { getChannels, getUser } from '../hooks/useUser'
import { Channel, RawChannel } from '../types'

export const ChannelContext = createContext<RawChannel[]>([])
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
const ChannelContextProvider: React.FC = ({ children }) => {
    const [channels, setChannels] = useState<RawChannel[]>([])
    return <ChannelContext.Provider value={channels}>{children}</ChannelContext.Provider>
}

export default ChannelContextProvider

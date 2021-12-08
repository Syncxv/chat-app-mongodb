// import React, { createContext, useMemo, useState } from 'react'
// import { useQuery } from 'react-query'
// import { getChannels, getUser } from '../hooks/useUser'
// import { Channel, RawChannel } from '../types'

// export const ChannelContext = createContext<RawChannel[]>([])
// const getRawChannels = async () =>  {
//     const channels = await getChannels()
//     console.log('CHANNELS IN GETRAWCHANNELS: ', channels)
//     return Promise.all(
//         channels.map(async (chann: Channel) => {
//             console.log(chann.members[0])
//             const members = await Promise.all(chann.members.map(async id => await getUser(id)))
//             chann.members = members
//             return chann
//         })
//     )
// }
// const ChannelContextProvider: React.FC = ({ children }) => {
//     const [channels, setChannels] = useState<RawChannel[]>([])
//     const realValue = useMemo(() => (channels), [channels, setChannels])
//     const { isLoading, data } = useQuery<>('heh', getRawChannels)
//     setChannels(data as RawChannel[])
//     console.log('DATA IN CHANNEL CONTEXT: ', data)
//     return <ChannelContext.Provider value={realValue}>{children}</ChannelContext.Provider>
// }

// export default ChannelContextProvider
export {}

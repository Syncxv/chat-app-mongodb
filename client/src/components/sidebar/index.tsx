import { NextPage } from 'next'
import React, { useContext, useEffect } from 'react'
import { useQuery } from 'react-query'
import { AuthContext, initStateType } from '../../context/Auth/AuthContext'
import { getUser } from '../../hooks/getUser'
import getChannels from '../../hooks/useGetChannels'
import { Channel, RawChannel } from '../../types'
import { requestWrapper } from '../../util/reqeust'
import PrivateDmList from './PrivateDmList'

interface Props {
    channels?: Channel[]
}
const getRawChannels = async (data: initStateType) => {
    console.log(data)
    requestWrapper.updateToken(data.accessToken!)
    const channels = await getChannels()
    console.log(channels)
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
    const please = useContext(AuthContext)
    const { isLoading, data } = useQuery('heh', async () => getRawChannels(please))
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

import { AxiosResponse } from 'axios'
import { NextPage } from 'next'
import React from 'react'
import { useQuery } from 'react-query'
import getChannels from '../../hooks/useGetChannels'
import { Channel } from '../../types'
import PrivateDmList from './PrivateDmList'

interface Props {}

const Sidebar: NextPage<Props> = ({}) => {
    const { isError, isLoading, data } = useQuery<Channel[]>(['getChannels'], getChannels)
    return (
        <div className="sidebar-outer">
            <div className="sidbar-head">
                <h3>Friends</h3>
            </div>
            {isLoading ? <h3> LOADING </h3> : <PrivateDmList channels={data!} />}
        </div>
    )
}

export default Sidebar

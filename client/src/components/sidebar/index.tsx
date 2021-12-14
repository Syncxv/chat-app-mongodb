import { NextPage, NextApiRequest, NextApiResponse } from 'next'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import { getUser } from '../../hooks/getUser'
import getChannels from '../../hooks/useGetChannels'
import { Channel, RawChannel } from '../../types'
import PrivateDmList from './PrivateDmList'

interface Props {
    channels?: Channel[]
    token?: string
}
const getRawChannels = async () => {
    const channels = await getChannels()
    return Promise.all(
        channels.map(async (chann: Channel) => {
            console.log(chann.members[0])
            const members = await Promise.all(chann.members.map(async id => await getUser(id)))
            chann.members = members
            return chann
        })
    )
}
const Sidebar: NextPage<Props> = ({ token }) => {
    const { isLoading, data } = useQuery('heh', getRawChannels)
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

export async function getStaticProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    console.log(req, res)
    return { props: { token: req.cookies.token } }
}

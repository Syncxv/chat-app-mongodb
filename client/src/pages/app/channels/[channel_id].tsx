import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import { ParsedUrlQuery } from 'querystring'
import React from 'react'
import Sidebar from '../../../components/sidebar'
import { getUser } from '../../../hooks/getUser'
import getChannels from '../../../hooks/useGetChannels'
import { Channel, UserType } from '../../../types'
interface ChannelProps {
    recipiant: UserType
}
interface ContextParams {
    slug: string
}
export const getStaticPaths = async () => {
    console.log('hi FROM SATIC PATHS')
    const channels = await getChannels()
    console.log(channels)
    const paths = channels.map((channel: Channel) => ({ params: { id: channel.id } }))
    console.log(paths)
    return {
        paths,
        fallback: false
    }
}
export const getStaticProps: GetStaticProps<ChannelProps> = async context => {
    console.log(context)
    const id = context!.params!.id as string
    const user = await getUser(id)
    return {
        props: {
            recipiant: user
        }
    }
}
const Channel: NextPage<ChannelProps> = ({ recipiant }) => {
    return (
        <div className="app-wrapper">
            <Sidebar />
            <main>
                <header>
                    <h1>{recipiant.username}</h1>
                </header>
            </main>
        </div>
    )
}

export default Channel

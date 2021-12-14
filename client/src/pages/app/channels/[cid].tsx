import axios from 'axios'
import { GetStaticProps, GetStaticPropsResult, NextPage } from 'next'
import { getServerSession } from 'next-auth'
import { useRouter } from 'next/router'
import { ParsedUrlQuery } from 'querystring'
import React, { useEffect } from 'react'
import { useQuery } from 'react-query'
import Sidebar from '../../../components/sidebar'
import { apiUrl } from '../../../constants'
import { getUser } from '../../../hooks/getUser'
import getChannels from '../../../hooks/useGetChannels'
import { Channel, UserType } from '../../../types'
interface ChannelProps {
    params: {
        cid: string
    }
}
interface ContextParams {
    slug: string
}
// export const getStaticPaths = async (thing: any) => {
//     try {
//         console.log('hi FROM SATIC PATHS', thing)
//         const { data: channels } = await axios.get(`api/hello`)
//         console.log(channels)
//         const paths = channels.map((channel: Channel) => ({ params: { channel_id: channel._id } }))
//         console.log(paths)
//         return {
//             paths,
//             fallback: false
//         }
//     } catch (e) {
//         console.log(e.message)
//         return {
//             paths: [
//                 {
//                     params: {
//                         channel_id: 'ehe'
//                     }
//                 }
//             ],
//             fallback: false
//         }
//     }
// }
// export const getStaticProps: GetStaticProps<ChannelProps> = async context => {
//     const hehe = getServerSession(context, {
//         providers: [

//         ]
//     })
//     console.log(context)
//     const id = context!.params!.channel_id as string
//     const user = await getUser(id)
//     console.log(user)
//     return {
//         props: {
//             recipiant: user
//         }
//     }
// }
export const getMessages = async (cid: string) => {
    const { data: messages } = await axios.get(`${apiUrl}/channels/${cid}/messages`)
    console.log('DATA IN GET MESSAGES FUNCTION', messages)
    return messages
}
const Channel: NextPage<ChannelProps> = ({ params }) => {
    const { isLoading, data } = useQuery('messages', async () => getMessages(params.cid))
    console.log('DATA IN CHANNEL PAGE', data)
    return (
        <div className="app-wrapper">
            <Sidebar />
            <main>
                <header>
                    <h1>hehe</h1>
                </header>
                <main>
                    <ul></ul>
                </main>
            </main>
        </div>
    )
}
export const getServerSideProps = async (context: any) => {
    return {
        props: { params: context.params }
    }
}
export default Channel

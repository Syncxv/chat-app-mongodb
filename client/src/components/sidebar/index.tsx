import { NextPage, NextApiRequest, NextApiResponse } from 'next'
import router from 'next/router'
import React, { memo, useEffect } from 'react'
import { useQuery } from 'react-query'
import { getUser } from '../../hooks/getUser'
import getChannels from '../../hooks/useGetChannels'
import { Channel, RawChannel } from '../../types'
import { open } from '../../util/openModal'
import Divider from '../Divider'
import Plus from '../icons/Plus'
import Modal from '../Modal'
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
const addChannelModal: NextPage<{ onClick: Function }> = ({ onClick }) => {
    return (
        <Modal onClick={onClick}>
            <Modal.Content>
                <div className="flex flex-col gap-2">
                    <label htmlFor="idkman">User ID</label>
                    <input
                        id="idkman"
                        type="text"
                        placeholder="User Id"
                        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-slate-700 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    />
                </div>
            </Modal.Content>
            <Modal.Footer>
                <button>FOOTER NIGGA</button>
            </Modal.Footer>
        </Modal>
    )
}
const Sidebar: NextPage<Props> = memo(({ token }) => {
    const { isLoading, data, isError } = useQuery<RawChannel[]>('heh', getRawChannels)
    if (isError) {
        router.push('/login')
    }
    return (
        <div className="sidebar-outer">
            <div className="sidbar-head">
                <h3>Channels</h3>
            </div>
            <div className="sidebar-main w-full">
                <div className="sidebar-sub-heading w-full flex justify-between hover:cursor-pointer">
                    <span className="text-gray-500 text-sm font-bold">Messages</span>
                    <div onClick={() => open(addChannelModal)} className="icon-wrapper">
                        <Plus size={20} />
                    </div>
                </div>
                <PrivateDmList isLoading={isLoading} channels={data!} />
            </div>
        </div>
    )
})

export default Sidebar

export async function getStaticProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    console.log(req, res)
    return { props: { token: req.cookies.token } }
}

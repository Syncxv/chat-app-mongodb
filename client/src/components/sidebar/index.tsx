import axios from 'axios'
import { NextPage, NextApiRequest, NextApiResponse } from 'next'
import { GearSix } from 'phosphor-react'
import React, { memo, useRef } from 'react'
import { useSelector } from 'react-redux'
import { apiUrl, defaultPfp } from '../../constants'
import useSocket from '../../hooks/useSocket'
import channelStore from '../../stores/channel'
import { AppState } from '../../stores/store'
import userStore from '../../stores/user'
import { Channel } from '../../types'
import { open } from '../../util/openModal'
import Plus from '../icons/Plus'
import Modal from '../Modal'
import PrivateDmList from './PrivateDmList'

interface Props {
    channels?: Channel[]
    token?: string
}
const addChannel = async (id: string) => {
    const { data } = await axios.post(`${apiUrl}/@me/channels`, {
        members: [id]
    })
    return data
}
const addChannelModal: NextPage<{ onClick: Function }> = ({ onClick }) => {
    const ref = useRef<HTMLInputElement | null>(null)
    return (
        <Modal onClick={onClick}>
            <Modal.Content>
                <div className="flex flex-col gap-2">
                    <label htmlFor="idkman">User ID</label>
                    <input
                        ref={ref}
                        id="idkman"
                        type="text"
                        placeholder="User Id"
                        className="px-3 py-3 placeholder-blueGray-300 text-blueGray-600 relative bg-slate-700 rounded text-sm border-0 shadow outline-none focus:outline-none focus:ring w-full"
                    />
                </div>
            </Modal.Content>
            <Modal.Footer>
                <button
                    onClick={() => {
                        console.log(ref.current!.value)
                        addChannel(ref.current!.value)
                    }}
                    className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
                >
                    Add
                </button>
            </Modal.Footer>
        </Modal>
    )
}
const Sidebar: NextPage<Props> = memo(({ token }) => {
    const [loading] = useSocket()
    if (loading) return <h1>Loading Nigga</h1>
    const {
        channelStore: { channels: storeChannels },
        userStore: { users, currentUserId }
    } = useSelector((state: AppState) => state)
    console.log(users, currentUserId)
    const currentUser = users[currentUserId!]

    const channels = Object.values(storeChannels)
    console.log('CHANNELS IN SIDEBAR: ', channels)
    return (
        <div className="sidebar-outer">
            <div className="sidbar-head">
                <h3>Channels</h3>
            </div>
            <div className="sidebar-main w-full">
                <div className="sidebar-sub-heading w-full flex justify-between hover:cursor-pointer">
                    <span className="text-gray-500 text-sm font-bold">Messages</span>
                    <div onClick={() => open(addChannelModal)} className="icon-wrapper">
                        <Plus size={16} />
                    </div>
                </div>
                <PrivateDmList isLoading={false} channels={channels!} />
            </div>
            <div className="current-user mt-auto">
                <div className="cu-container">
                    <div className="avatar-wrapp">
                        <img
                            src={currentUser.avatar ? currentUser.avatar : defaultPfp}
                            alt=""
                            className="avatar"
                        />
                    </div>
                    <h2 className="text-lg font-semibold">{currentUser.username}</h2>
                </div>
                <div className="settings-icon sizeIcon">
                    <GearSix size={18} />
                </div>
            </div>
        </div>
    )
})

export default Sidebar

export async function getStaticProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    console.log(req, res)
    return { props: { token: req.cookies.token } }
}

import axios from 'axios'
import { AnimatePresence, motion } from 'framer-motion'
import { NextPage, NextApiRequest, NextApiResponse } from 'next'
import { GearSix } from 'phosphor-react'
import React, { memo, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import { apiUrl, defaultPfp } from '../../constants'
import { useMediaQuery } from '../../hooks/useMediaQuery'
import useSocket from '../../hooks/useSocket'
import { AppState } from '../../stores/store'
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
    const [isOpen, setOpen] = useState(false)
    const isMobile = useMediaQuery('(max-width: 35em)')
    const close = () => setOpen(false)
    if (loading) return <h1>Loading Nigga</h1>
    const {
        channelStore: { channels: storeChannels },
        userStore: { users, currentUserId }
    } = useSelector((state: AppState) => state)

    const currentUser = users[currentUserId!]

    const channels = Object.values(storeChannels)

    return (
        <>
            <div onClick={() => setOpen(!isOpen)} className={`mobile-bar-icon ${isOpen ? 'close' : ''}`}>
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
            </div>
            <div
                style={{
                    zIndex: '2',
                    transform: isMobile ? (isOpen ? 'none' : 'translateX(-100%)') : 'none'
                }}
                className="sidebar-outer"
            >
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
                    <PrivateDmList isLoading={false} channels={channels!} closeSidebar={close} />
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
            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        style={{ zIndex: '1' }}
                        onClick={() => setOpen(false)}
                        className="backdrop"
                    ></motion.div>
                )}
            </AnimatePresence>
        </>
    )
})

export default Sidebar

export async function getStaticProps({ req, res }: { req: NextApiRequest; res: NextApiResponse }) {
    return { props: { token: req.cookies.token } }
}

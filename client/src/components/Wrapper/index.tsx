import React from 'react'
import { NextPage } from 'next'
import useSocket from '../../hooks/useSocket'
import Sidebar from '../sidebar'
interface Props {}

const AppWrapper: NextPage = ({ children }) => {
    const [loading, socket] = useSocket()
    if (loading) return <h1>Loading</h1>
    console.log('hey from app wrapper')
    return (
        <div className="app-wrapper">
            <Sidebar />
            <main className="hey flex flex-col  h-screen w-full">{children}</main>
        </div>
    )
}

export default AppWrapper

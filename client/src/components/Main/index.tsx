import React from 'react'
import { NextPage } from 'next'
import useSocket from '../../hooks/useSocket'
interface Props {}

const AppWrapper: NextPage = ({ children }) => {
    const [loading, socket] = useSocket()
    if (loading) return <h1>Loading</h1>
    console.log('hey from app wrapper')
    return <div className="app-wrapper">{children}</div>
}

export default AppWrapper

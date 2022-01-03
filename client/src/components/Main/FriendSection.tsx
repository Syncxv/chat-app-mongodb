import { NextPage } from 'next'
import React from 'react'
import Sidebar from '../sidebar'

interface Props {}

const FriendSection: NextPage<Props> = props => {
    return (
        <>
            <Sidebar />
            <div>FRIENDS NIGGA</div>
        </>
    )
}

export default FriendSection

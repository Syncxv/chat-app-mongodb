import { NextPage } from 'next'
import React from 'react'
import Sidebar from '../sidebar'
import AppWrapper from '../Wrapper'

interface Props {}

const FriendSection: NextPage<Props> = props => {
    return (
        <>
            <AppWrapper>
                <Sidebar />
                <div>FRIENDS NIGGA</div>
            </AppWrapper>
        </>
    )
}

export default FriendSection

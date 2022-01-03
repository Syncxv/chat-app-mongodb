import { NextPage } from 'next'
import React from 'react'
import Sidebar from '../sidebar'
import AppWrapper from '../Wrapper'

interface Props {}

const UnknownChannel: NextPage<Props> = props => {
    return (
        <>
            <AppWrapper>
                <Sidebar />
                <div>What channel is this eh never head of it</div>
            </AppWrapper>
        </>
    )
}

export default UnknownChannel

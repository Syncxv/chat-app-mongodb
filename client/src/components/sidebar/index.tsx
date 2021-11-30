import { NextPage } from 'next'
import React from 'react'
import PrivateDmList from './PrivateDmList'

interface Props {
    
}

const Sidebar : NextPage<Props> = ({}) => {
    return (
        <div className="sidebar-outer">
            <div className="sidbar-head">
                  <h3>Friends</h3>  
            </div>
            <PrivateDmList channels={[]} />
        </div>
    )
}

export default Sidebar

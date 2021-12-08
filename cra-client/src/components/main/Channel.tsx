import React from 'react'
import { RawChannel } from '../../types'
import Messages from './Messages'

interface ChannelProps {
    channel?: RawChannel
}

const Channel: React.FC<ChannelProps> = ({ channel }) => {
    if (!channel) {
        return <div>no channel eh</div>
    }
    return (
        <div>
            <Messages channel_id={channel.id}></Messages>
        </div>
    )
}

export default Channel

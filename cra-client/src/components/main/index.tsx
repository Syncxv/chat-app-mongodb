import { randomBytes } from 'crypto'
import { useState } from 'react'
import { useQuery } from 'react-query'
import { Params, RouteMatch } from 'react-router'
import { useGlobal } from '../../hooks/useGlobal'
import { getChannel } from '../../hooks/useUser'
import { RawChannel } from '../../types'
import Button from '../Button'
import Channel from './Channel'

interface Props {
    match: Readonly<Params<string>>
}

const MainChat: React.FC<Props> = ({ match }) => {
    const _global = useGlobal()
    const { isLoading, data } = useQuery('currentChannel', async () => getChannel(match.id as string))
    return (
        <div>
            <Button
                onClick={() => _global.get('channels')}
                text="Add To Map"
                size={Button.Size.Large}
            ></Button>
            <Channel channel={data} />
        </div>
    )
}

export default MainChat

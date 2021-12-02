import { Channel } from '../../types'
import Button from '../../components/Button'
import Sidebar from '../../components/sidebar'
import { apiUrl } from '../../constants'
import { getUser } from '../../hooks/getUser'
import getChannels from '../../hooks/useGetChannels'
import { requestWrapper } from '../../util/reqeust'
import { NextPage } from 'next'
import { getAcessToken } from '../../hooks/getAcessToken'

interface AppProps {
    // channels: Channel[]
}

const App: NextPage<AppProps> = ({}) => {
    return (
        <>
            <div className="app-wrapper">
                <Sidebar />
                <Button size={Button.Size.Large} text="hehe" onClick={() => requestWrapper.get(`${apiUrl}/users/@me`)}>
                    Hehe
                </Button>
            </div>
        </>
    )
}

export default App

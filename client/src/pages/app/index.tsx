import { NextPage } from 'next'
import FriendSection from '../../components/Main/Friends/FriendSection'
import AppWrapper from '../../components/Wrapper'

interface AppProps {
    // channels: Channel[]
}

const App: NextPage<AppProps> = ({}) => {
    return (
        <>
            <FriendSection />
        </>
    )
}

export default App

import { NextPage } from 'next'
import FriendSection from '../../components/Main/Friends'
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

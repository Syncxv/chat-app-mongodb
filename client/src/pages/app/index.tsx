import { NextPage } from 'next'
import Main from '../../components/Main'
import useSocket from '../../hooks/useSocket'

interface AppProps {
    // channels: Channel[]
}

const App: NextPage<AppProps> = ({}) => {
    const [_, socket] = useSocket()
    return (
        <>
            <Main socket={socket} />
        </>
    )
}

export default App

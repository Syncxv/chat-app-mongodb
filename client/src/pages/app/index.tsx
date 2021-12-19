import Button from '../../components/Button'
import Sidebar from '../../components/sidebar'
import { NextPage } from 'next'
import useConnect from '../../hooks/useConnect'
import { LoadingWrapper } from '../../components/LoadingWrapper'
import SocketContextProvider, { SocketContext } from '../../context/SocketContext'
import { useContext } from 'react'
import useSocket from '../../hooks/useSocket'

interface AppProps {
    // channels: Channel[]
}

const App: NextPage<AppProps> = ({}) => {
    console.log('HEY IN APP INDEX')
    const [loading] = useSocket()
    return (
        <>
            <LoadingWrapper loading={loading} />
            <div className="app-wrapper">
                <Sidebar />
                <Button size={Button.Size.Large} text="hehe" onClick={async () => ''}>
                    Hehe
                </Button>
            </div>
        </>
    )
}

export default App

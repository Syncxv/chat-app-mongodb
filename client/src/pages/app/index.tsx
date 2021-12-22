import Button from '../../components/Button'
import Sidebar from '../../components/sidebar'
import { NextPage } from 'next'
import useSocket from '../../hooks/useSocket'
import getCurrentUserFetch from '../../hooks/getCurrentUserFetch'

interface AppProps {
    // channels: Channel[]
}

const App: NextPage<AppProps> = ({}) => {
    console.log('HEY IN APP INDEX')
    const [loading, ws] = useSocket()
    return (
        <>
            <div className="app-wrapper">
                <Sidebar />
                <Button
                    size={Button.Size.Large}
                    text="hehe"
                    onClick={async () => console.log(await getCurrentUserFetch())}
                >
                    Hehe
                </Button>
            </div>
        </>
    )
}

export default App

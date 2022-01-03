import Button from '../../components/Button'
import Sidebar from '../../components/sidebar'
import { NextPage } from 'next'
import useSocket from '../../hooks/useSocket'
import getCurrentUserFetch from '../../hooks/getCurrentUserFetch'
import AppWrapper from '../../components/Main'

interface AppProps {
    // channels: Channel[]
}

const App: NextPage<AppProps> = ({}) => {
    console.log('HEY IN APP INDEX')
    const [loading, ws] = useSocket()
    return (
        <>
            <AppWrapper>
                <Sidebar />
                <Button
                    size={Button.Size.Large}
                    text="hehe"
                    onClick={async () => console.log(await getCurrentUserFetch())}
                >
                    Hehe
                </Button>
            </AppWrapper>
        </>
    )
}

export default App

import Button from '../../components/Button'
import Sidebar from '../../components/sidebar'
import { NextPage } from 'next'

interface AppProps {
    // channels: Channel[]
}

const App: NextPage<AppProps> = ({}) => {
    return (
        <>
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

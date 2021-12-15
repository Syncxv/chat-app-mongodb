import Button from '../../components/Button'
import Sidebar from '../../components/sidebar'
import { NextPage } from 'next'
import useConnect from '../../hooks/useConnect'
import { LoadingWrapper } from '../../components/LoadingWrapper'

interface AppProps {
    // channels: Channel[]
}

const App: NextPage<AppProps> = ({}) => {
    const [isLoading, socket] = useConnect('http://localhost:8000')
    return (
        <>
            <LoadingWrapper loading={isLoading as boolean} />
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

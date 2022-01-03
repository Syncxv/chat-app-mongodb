import { NextPage } from 'next'
import Main from '../../components/Main'

interface AppProps {
    // channels: Channel[]
}

const App: NextPage<AppProps> = ({}) => {
    return (
        <>
            <Main />
        </>
    )
}

export default App

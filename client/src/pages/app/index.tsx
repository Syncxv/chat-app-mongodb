import Button from '../../components/Button'
import Sidebar from '../../components/sidebar'
import { NextPage } from 'next'
import useSocket from '../../hooks/useSocket'
import getCurrentUserFetch from '../../hooks/getCurrentUserFetch'
import AppWrapper from '../../components/Wrapper'
import Main from '../../components/Main'

interface AppProps {
    // channels: Channel[]
}

const App: NextPage<AppProps> = ({}) => {
    console.log('HEY IN APP INDEX')
    return (
        <>
            <Main />
        </>
    )
}

export default App

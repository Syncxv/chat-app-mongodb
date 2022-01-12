import { NextPage } from 'next'
import AppWrapper from '../../components/Wrapper'

interface AppProps {
    // channels: Channel[]
}

const App: NextPage<AppProps> = ({}) => {
    return (
        <>
            <AppWrapper>
                <div>OK THIS IS NOT HTE MAIN COMPINENT GNAG app/index.tsx</div>
            </AppWrapper>
        </>
    )
}

export default App

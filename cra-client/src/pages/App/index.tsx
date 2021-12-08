import React from 'react'
import { useNavigate } from 'react-router'
import Sidebar from '../../components/sidebar'
import useAuth from '../../hooks/useAuth'
import MainArea from '../../components/main'
import { useParams } from 'react-router'
import GlobalStateContextProvider from '../../context/GlobalStateContext'

interface Props {}

const App: React.FC<Props> = () => {
    const params = useParams()
    const isLoggedIn = useAuth()
    const router = useNavigate()
    if (!isLoggedIn) router('/login')
    return (
        <div className="app-wrapper">
            <GlobalStateContextProvider>
                <Sidebar />
                <MainArea match={params} />
            </GlobalStateContextProvider>
        </div>
    )
}

export default App

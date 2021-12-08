import React, { useContext } from 'react'
import { RouteMatch, useNavigate } from 'react-router'
import Button from '../../components/Button'
import Sidebar from '../../components/sidebar'
import { AuthContext } from '../../context/AuthContext'
import useAuth from '../../hooks/useAuth'
import MainArea from '../../components/main'
import { useParams } from 'react-router'

interface Props {}

const App: React.FC<Props> = props => {
    const bruh = useParams()
    console.log(bruh)
    const { authState, setAuthState } = useContext(AuthContext)
    const hehe = useAuth()
    const router = useNavigate()
    console.log(authState)
    if (hehe === undefined) router('/login')
    return (
        <div className="app-wrapper">
            <Sidebar />
            <MainArea match={bruh} />
        </div>
    )
}

export default App

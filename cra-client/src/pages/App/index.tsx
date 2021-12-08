import React, { useContext } from 'react'
import { useNavigate } from 'react-router'
import Button from '../../components/Button'
import { AuthContext } from '../../context/AuthContext'
import useAuth from '../../hooks/useAuth'

const App = () => {
    const { authState, setAuthState } = useContext(AuthContext)
    const hehe = useAuth()
    const router = useNavigate()
    console.log(authState)
    if (hehe === undefined) router('/login')
    return (
        <div>
            <h1>please</h1>
            <Button
                text="MAKE TOKEN BAD"
                size={Button.Size.Xlarge}
                onClick={() => setAuthState({ token: 'hehehhehe' })}
            />
        </div>
    )
}

export default App

import React, { useContext } from 'react'
import { AuthContext } from '../../context/AuthContext'

const App = () => {
    const hehe = useContext(AuthContext)
    console.log('BRUH WHY ', hehe)
    return (
        <div>
            <h1>please</h1>
        </div>
    )
}

export default App

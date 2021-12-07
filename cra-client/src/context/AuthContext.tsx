import React, { useContext, useEffect, useMemo, useState, createContext } from 'react'
interface fuck {
    authState: {
        token: string | null
    }
    setAuthState:
        | Function
        | React.Dispatch<
              React.SetStateAction<{
                  token: string | null
              }>
          >
}
const initalState = {
    token: localStorage.getItem('token') || null
}

export const AuthContext = createContext<fuck>({ authState: initalState, setAuthState: () => {} })

const AuthContextProvider: React.FC = ({ children }) => {
    const [authState, setAuthState] = useState(initalState)
    const realValue = useMemo(() => ({ authState, setAuthState }), [authState, setAuthState])
    useEffect(() => {
        if (authState.token) localStorage.setItem('token', authState.token!)
    }, [authState.token])
    return <AuthContext.Provider value={realValue}>{children}</AuthContext.Provider>
}

export default AuthContextProvider

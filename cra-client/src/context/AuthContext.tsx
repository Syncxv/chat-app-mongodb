import React, { useContext, useEffect, useMemo, useState, createContext } from 'react'
import axios, { AxiosRequestConfig } from 'axios'
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
let init = true
export const AuthContext = createContext<fuck>({ authState: initalState, setAuthState: () => {} })

const AuthContextProvider: React.FC = ({ children }) => {
    const [authState, setAuthState] = useState(initalState)
    const realValue = useMemo(() => ({ authState, setAuthState }), [authState, setAuthState])
    const setTokenToAxios = (token: string) => {
        if (authState.token) {
            localStorage.setItem('token', authState.token!)
            axios.interceptors.request.use(function (config: AxiosRequestConfig) {
                config.headers!.Authorization = authState.token!
                return config
            })
        }
    }
    if (init) {
        init = false
        setTokenToAxios(authState.token!)
    }
    useEffect(() => {
        setTokenToAxios(authState.token!)
    }, [authState.token])
    return <AuthContext.Provider value={realValue}>{children}</AuthContext.Provider>
}

export default AuthContextProvider

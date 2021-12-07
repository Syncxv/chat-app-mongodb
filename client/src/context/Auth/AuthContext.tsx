import axios, { AxiosRequestConfig } from 'axios'
import { NextPage } from 'next'
import { createContext } from 'react'
export const AuthContext = createContext({ token: '' })
export const AuthContextProvider: NextPage = ({ children }) => {
    let token = ''
    if (typeof window !== 'undefined') {
        token = localStorage.getItem('token') as string
        axios.interceptors.request.use(function (config: AxiosRequestConfig) {
            config.headers!.Authorization = token
            return config
        })
    }
    return <AuthContext.Provider value={{ token }}>{children}</AuthContext.Provider>
}

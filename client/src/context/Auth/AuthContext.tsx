import { NextPage } from 'next'
import { Dispatch, useEffect, useReducer } from 'react'
import { createContext } from 'react'
import AuthReducer, { Actions } from './AuthReducer'
interface initStateType {
    accessToken: string | null
    isFetching: boolean
    error: boolean
    dispatch?: Dispatch<Actions>
}
export const initState: initStateType = {
    accessToken: null,
    isFetching: false,
    error: false
}
export const AuthContext = createContext(initState)

export const AuthContextProvider: NextPage = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initState)
    useEffect(() => {
        state.accessToken = localStorage.getItem('token')
    }, [])
    useEffect(() => {
        localStorage.setItem('token', state.accessToken!)
        console.log('IN USE EFFECT:', state)
    }, [state.accessToken])
    console.log(state)
    return (
        <AuthContext.Provider
            value={{ isFetching: state.isFetching, error: state.error, accessToken: state.accessToken, dispatch }}
        >
            {children}
        </AuthContext.Provider>
    )
}

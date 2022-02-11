import axios from 'axios'
import type { NextPage } from 'next'
import { useRouter } from 'next/router'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Button from '../components/atoms/Button'
import Input from '../components/atoms/Input'
import { LinkP } from '../components/atoms/Link'
import { clearLoginOrRegisterState, loginUser, registerUser } from '../reducers/user'
import { AppState } from '../stores/store'
export type Wrapper<P = {}> = NextPage & {
    isNotApp: boolean
}
const LoginHehe: Wrapper = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const router = useRouter()
    // const [invalid, setError] = useState<ErrorResponse>()
    const dispatch = useDispatch()
    const { loading, failed, success, error } = useSelector(
        (state: AppState) => state.userStore.loginOrRegister
    )
    // dispatch(incrementAsync(20))
    const [signUp, setSignUp] = useState(false)
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        // loginSubmit(username, password, email, signUp)
        if (!signUp) {
            dispatch(clearLoginOrRegisterState())
            dispatch(loginUser({ username, password }))
        } else {
            dispatch(clearLoginOrRegisterState())
            dispatch(registerUser({ username, password, email }))
        }
    }
    console.log(loading, success, failed)
    // ;(window as any).axios = axios
    if (success) {
        dispatch(clearLoginOrRegisterState())
        router.push('/app')
    }
    console.log(error)
    return (
        <>
            <div className="login-form-wrapper" style={{ width: '100%', margin: '0 auto' }}>
                <form onSubmit={handleLogin} className="login-form">
                    <Input
                        label="Username"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
                        type="text"
                    />
                    <Input
                        label="Password"
                        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                        type="password"
                    />
                    {signUp && (
                        <Input
                            label="Email"
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                            type="text"
                        />
                    )}
                    <LinkP onClick={() => setSignUp(!signUp)}>
                        {signUp ? 'already have an account :|' : 'sign up'}
                    </LinkP>
                    <Button
                        disabled={loading}
                        className="w-full"
                        text="Continue"
                        size={Button.Size.Small}
                        type="submit"
                    ></Button>
                    {loading && <h1>LOADING</h1>}
                    {failed && <h1>{error?.message}</h1>}
                </form>
            </div>
        </>
    )
}
LoginHehe.isNotApp = true
export default LoginHehe

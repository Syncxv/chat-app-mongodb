import type { NextPage } from 'next'
import React, { useContext, useState } from 'react'
import { useDispatch } from 'react-redux'
import Button from '../components/Button'
import Input from '../components/Input'
import { LinkP } from '../components/Link'
import { incrementAsync } from '../reducers/counter'
import loginSubmit from '../util/loginSubmit'
export type Wrapper<P = {}> = NextPage & {
    isNotApp: boolean
}
const LoginHehe: Wrapper = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    // const [invalid, setError] = useState<ErrorResponse>()
    const dispatch = useDispatch()
    // dispatch(incrementAsync(20))
    const [signUp, setSignUp] = useState(false)
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        loginSubmit(username, password, signUp)
    }
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
                        {signUp ? 'already have an account :|' : 'sign up nig'}
                    </LinkP>
                    <Button
                        disabled={false}
                        className="w-full"
                        text="Continue"
                        size={Button.Size.Small}
                        type="submit"
                    ></Button>
                </form>
            </div>
        </>
    )
}
LoginHehe.isNotApp = true
export default LoginHehe

import type { NextPage } from 'next'
import React, { useContext, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import { LinkP } from '../components/Link'
import loginSubmit from '../util/loginSubmit'
import { AuthContext } from '../context/Auth/AuthContext'
const LoginHehe: NextPage = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    // const [invalid, setError] = useState<ErrorResponse>()
    const [signUp, setSignUp] = useState(false)
    const bruh = useContext(AuthContext)
    const handleLogin = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        console.log(bruh)
        console.log(bruh.dispatch, bruh.isFetching)
        loginSubmit(username, password, signUp, bruh.dispatch!)
    }
    return (
        <>
            <div className="form-wrapper" style={{ width: '18rem', margin: '0 auto' }}>
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
                        disabled={bruh.isFetching}
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

export default LoginHehe

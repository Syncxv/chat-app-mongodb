import axios, { AxiosResponse } from 'axios'
import { NextPage } from 'next'
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import { apiUrl } from '../../constants'
import { UserType } from '../../types'
import Button from '../Button'
import Input from '../Input'
import Link, { LinkP } from '../Link'
import loginSubmit from './loginSubmit'

interface LoginProps {}
type ErrorResponse = {
    error: boolean
    feild?: string
    message: string
}
const Login: NextPage<LoginProps> = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    // const [invalid, setError] = useState<ErrorResponse>()
    const [signUp, setSignUp] = useState(false)
    let disabled = false

    return (
        <>
            <div className="form-wrapper" style={{ width: '18rem', margin: '0 auto' }}>
                <form onSubmit={e => loginSubmit(e, username, password, signUp)} className="login-form">
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
                        disabled={disabled}
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

export default Login

import { NextPage } from 'next'
import React from 'react'
import Button from '../Button'
import Input from '../Input'

interface LoginProps {}

const Login: NextPage<LoginProps> = () => {
    return (
        <>
            <form className="login-form">
                <Input
                    label="Username"
                    onChange={() => console.log('hey')}
                    type="text"
                />
                <Input
                    label="Password"
                    onChange={() => console.log('hey')}
                    type="password"
                />
                <Button
                    text="hehe"
                    size={Button.Size.Large}
                    onClick={(e: React.MouseEvent) => e.stopPropagation()}
                ></Button>
            </form>
        </>
    )
}

export default Login

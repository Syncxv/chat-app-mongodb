import { NextPage } from 'next'
import React from 'react'
import Input from '../Input'

interface LoginProps {

}

const Login : NextPage<LoginProps> = () => {
    return (
        <>
            <form>
                <Input placeholder="hehe" onChange={() => console.log("hey")} />
            </form>
        </>
    )
}

export default Login

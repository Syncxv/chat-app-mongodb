import { useContext, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../../components/Button'
import Input from '../../components/Input'
import { LinkP } from '../../components/Link'
import { AuthContext } from '../../context/AuthContext'
import submitLogin from './submitLogin'

const Login = () => {
    const [signUp, setSignUp] = useState(false)
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [email, setEmail] = useState('')
    const bruh = useContext(AuthContext)
    const router = useNavigate()
    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        const hehe = await submitLogin(username, password, signUp, bruh.setAuthState)
        console.log(hehe)
        if (hehe) {
            router('/app')
        }
    }
    return (
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
                    disabled={false}
                    className="w-full"
                    text="Continue"
                    size={Button.Size.Small}
                    type="submit"
                ></Button>
            </form>
        </div>
    )
}

export default Login

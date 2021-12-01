import axios, { AxiosResponse } from 'axios'
import { apiUrl } from '../../constants'
import { UserType } from '../../types'
import { requestWrapper } from '../../util/reqeust'
import router from 'next/router'
interface response {
    user: UserType
    acessToken: string
}
const loginSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
    username: string,
    password: string,
    signUp: boolean
) => {
    e.preventDefault()
    if (!signUp) {
        const res: AxiosResponse<response> = await axios.post(`${apiUrl}/users/login`, {
            username,
            password
        })
        if (res.data.acessToken) {
            window.localStorage.setItem('token', res.data.acessToken)
            requestWrapper.updateToken(res.data.acessToken)
            router.push('/app')
        }
    }
}
export default loginSubmit

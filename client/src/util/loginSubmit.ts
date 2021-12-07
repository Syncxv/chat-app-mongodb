import axios, { AxiosResponse } from 'axios'
import { ACTIONS_TYPES, apiUrl } from '../constants'
import { UserType } from '../types'
import { requestWrapper } from './reqeust'
import router from 'next/router'
interface response {
    user: UserType
    acessToken: string
}
const loginSubmit = async (username: string, password: string, signUp: boolean) => {
    if (!signUp) {
        try {
            const res: AxiosResponse<response> = await axios.post(`${apiUrl}/users/login`, {
                username,
                password
            })
            window.localStorage.setItem('token', res.data.acessToken)
            router.push('/app')
        } catch {
            console.log('failed eh')
        }
    }
}
export default loginSubmit

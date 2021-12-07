import axios, { AxiosResponse } from 'axios'
import { Navigate } from 'react-router'
import { apiUrl } from '../../constants'
import { UserType } from '../../types'
interface response {
    user: UserType
    acessToken: string
}
export default async (username: string, password: string, signUp: boolean, setAuthState: Function) => {
    if (!signUp) {
        try {
            const res: AxiosResponse<response> = await axios.post(`${apiUrl}/users/login`, {
                username,
                password
            })
            console.log(res)
            setAuthState({ token: res.data.acessToken })
            return true
        } catch {
            return false
        }
    }
}

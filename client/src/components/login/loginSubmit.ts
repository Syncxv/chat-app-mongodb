import axios, { AxiosResponse } from 'axios'
import { useQuery } from 'react-query'
import { apiUrl } from '../../constants'
import { UserType } from '../../types'
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
        }
    }
}
export default loginSubmit

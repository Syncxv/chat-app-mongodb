import axios, { AxiosResponse } from 'axios'
import { ACTIONS_TYPES, apiUrl } from '../constants'
import { UserType } from '../types'
import { requestWrapper } from './reqeust'
import router from 'next/router'
interface response {
    user: UserType
    acessToken: string
}
const loginSubmit = async (username: string, password: string, signUp: boolean, dispatch: Function) => {
    if (!signUp) {
        dispatch({ type: ACTIONS_TYPES.LOGIN_START })
        try {
            const res: AxiosResponse<response> = await axios.post(`${apiUrl}/users/login`, {
                username,
                password
            })
            dispatch({ type: ACTIONS_TYPES.LOGIN_SUCCESS, payload: res.data.acessToken })
            router.push('/app')
        } catch {
            dispatch({ type: ACTIONS_TYPES.LOGIN_FAILURE })
        }
    }
}
export default loginSubmit

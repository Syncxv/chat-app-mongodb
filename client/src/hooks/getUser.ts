import axios from 'axios'
import { apiUrl } from '../constants'
import { requestWrapper } from '../util/reqeust'

export const getUser = async (id: string) => {
    return (await axios.get(`${apiUrl}/users/${id}`)).data.data
}

import axios from 'axios'
import { apiUrl } from '../constants'

const getCurrentUserFetch = async () => {
    const { data } = await axios.get(`${apiUrl}/@me`)
    return data
}

export default getCurrentUserFetch

import { useQuery } from 'react-query'
import axios from 'axios'
import { apiUrl } from '../constants'
const getCurrentUser = async () => {
    try {
        const res = await axios.get(`${apiUrl}/@me`)
        return res.data
    } catch {
        return false
    }
}
const useAuth = () => {
    const { data } = useQuery('getUser', getCurrentUser)
    console.log('USE AUTH HOOK: ', data)
    return data
}
export default useAuth

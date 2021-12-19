import axios from 'axios'
import { apiUrl } from '../constants'

const getChannels = async () => {
    const channels = await axios.get(`${apiUrl}/@me/channels`)
    return channels.data
}
export default getChannels

import axios from 'axios'
import { apiUrl } from '../constants'
import { requestWrapper } from '../util/reqeust'
import useRequest from './requests'

const getChannels = async () => {
    const channels = await axios.get(`${apiUrl}/@me/channels`)
    console.log(channels)
    return channels.data
}
export default getChannels

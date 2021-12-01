import { apiUrl } from '../constants'
import { requestWrapper } from '../util/reqeust'

const getChannels = async () => {
    const channels = await requestWrapper.get(`${apiUrl}/users/@me/channels`)
    return channels.data
}
export default getChannels

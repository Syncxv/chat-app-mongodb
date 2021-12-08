import axios from 'axios'
import { apiUrl } from '../constants'

export const getUser = async (id: string) => {
    return (await axios.get(`${apiUrl}/users/${id}`)).data.data
}
export const getChannels = async () => {
    const channels = await axios.get(`${apiUrl}/@me/channels`)
    console.log(channels)
    return channels.data
}

export const getChannel = async (id: string) => {
    const channels = await axios.get(`${apiUrl}/channels/${id}`)
    console.log(channels)
    return channels.data
}

import { requestWrapper } from '../util/reqeust'

export const getUser = async (id: string) => {
    return (await requestWrapper.get(`users/${id}`, { apiurl: true })).data.data
}

import axios, { AxiosRequestConfig } from 'axios'
import { apiUrl } from '../constants'
import { getAcessToken } from '../hooks/getAcessToken'

export const hehe = ''
interface options {
    apiurl: boolean
}
class RequestThingy {
    public token: string | boolean
    constructor() {
        try {
            this.token = getAcessToken() || false
        } catch {
            this.token = false
        }
    }
    updateToken(token: string) {
        this.token = token
    }
    getHeaders() {}
    async get(url: string, opt?: options) {
        console.log(this.token, url)
        return axios.get(opt?.apiurl ? `${apiUrl}/${url}` : url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: getAcessToken() as string
            }
        })
    }
}

export const requestWrapper = new RequestThingy()

import axios, { AxiosRequestConfig } from 'axios'
import { apiUrl } from '../constants'

export const hehe = ''
interface options {
    apiurl: boolean
}
class RequestThingy {
    public token: string | boolean
    constructor() {
        try {
            this.token = window.localStorage.getItem('token') || false
        } catch {
            this.token = false
        }
    }
    updateToken(token: string) {
        this.token = token
    }
    getHeaders() {}
    async get(url: string, opt?: options) {
        return axios.get(opt?.apiurl ? `${apiUrl}${url}` : url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.token as string
            }
        })
    }
}

export const requestWrapper = new RequestThingy()

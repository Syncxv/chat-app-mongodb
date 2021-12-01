import axios, { AxiosRequestConfig } from 'axios'

export const hehe = ''
interface options {}
class RequestThingy {
    public token: string | boolean
    constructor() {
        this.token = window.localStorage.getItem('token') || false
    }
    updateToken(token: string) {
        this.token = token
    }
    getHeaders() {}
    async get(url: string, opt?: options) {
        return await axios.get(url, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: this.token as string
            }
        })
    }
}

export const requestWrapper = new RequestThingy()

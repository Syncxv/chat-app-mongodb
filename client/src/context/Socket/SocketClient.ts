import Cookie from 'js-cookie'
import io, { Socket } from 'socket.io-client'
import { apiUrl } from '../../constants'
export default class socketAPI {
    socket!: Socket

    connect() {
        this.socket = io(apiUrl, {
            query: {
                token: Cookie.get('token')
            }
        })
        return new Promise((resolve, reject) => {
            this.socket.on('connect', () => resolve(true))
            this.socket.on('connect_error', error => reject(error))
        })
    }

    disconnect() {
        return new Promise(resolve => {
            this.socket.disconnect()
            resolve(true)
        })
    }

    emit(event: string, data: any) {
        return new Promise((resolve, reject) => {
            if (!this.socket) return reject('No socket connection.')

            return this.socket.emit(event, data, (response: any) => {
                // Response is the optional callback that you can use with socket.io in every request. See 1 above.
                if (response.error) {
                    console.error(response.error)
                    return reject(response.error)
                }

                return resolve(response)
            })
        })
    }

    on(event: string, fun: any) {
        // No promise is needed here, but we're expecting one in the middleware.
        return new Promise((resolve, reject) => {
            if (!this.socket) return reject('No socket connection.')

            this.socket.on(event, fun)
            resolve(true)
        })
    }
}

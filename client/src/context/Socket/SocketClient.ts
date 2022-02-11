import Cookie from 'js-cookie'
import router from 'next/router'
import io, { Socket } from 'socket.io-client'
import { apiUrl, FreindTypes, SOCKET_ACTIONS } from '../../constants'
import { acceptFriend, updateFriends, updateUser } from '../../reducers/user'
import store from '../../stores/store'
import { UserType } from '../../types'
export default class socketAPI {
    socket!: Socket

    connect() {
        console.log(window)
        this.socket = io(apiUrl, {
            query: {
                token: Cookie.get('token') || window.localStorage.getItem('token')
            }
        })
        return new Promise((resolve, reject) => {
            this.socket.on('connect', () => {
                this.registerCommon()
                resolve(true)
            })
            this.socket.on('connect_error', error => this.handleError(error))
        })
    }

    disconnect() {
        return new Promise(resolve => {
            this.socket.disconnect()
            resolve(true)
        })
    }

    emit(event: string, data?: any) {
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
        return new Promise((resolve, reject) => {
            if (!this.socket) return reject('No socket connection.')

            this.socket.on(event, fun)
            resolve(true)
        })
    }
    off(event: string, cb?: any) {
        this.socket.off(event, cb)
    }

    handleError(error: Error) {
        console.error(error)
        if (error.message === 'auth failed eh') router.push('/login')
    }

    registerCommon() {
        this.on(SOCKET_ACTIONS.RECIVE_FRIEND_REQUEST, (user: UserType) => {
            this.log(SOCKET_ACTIONS.RECIVE_FRIEND_REQUEST)
            store.dispatch(updateFriends({ user, type: FreindTypes.PENDING_INCOMMING }))
        })
        this.on(SOCKET_ACTIONS.USER_UPDATE, (user: UserType) => {
            this.log(SOCKET_ACTIONS.USER_UPDATE)
            store.dispatch(updateUser(user))
        })
    }

    log(str: string) {
        console.log('%c[SOCKET]', 'color: blue', str)
    }
}

export const COOKIE_NAME = 'token'
export const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin || ['http://localhost:3000'].indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}
export enum SOCKET_ACTIONS {
    CREATE_MESSAGE = 'create-message',
    CHANNEL_INIT = 'channel-inital-data',
    USER_INIT = 'user-inital-data',
    RECIVE_MESSAGE = 'recive-message'
}

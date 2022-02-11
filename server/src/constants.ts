export const COOKIE_NAME = 'token'
export const corsOptions = {
    origin: function (origin: any, callback: any) {
        if (!origin || [process.env.FRONT_END_DOMAIN! || 'http://localhost:3000'].indexOf(origin) !== -1) {
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
    USER_UPDATE = 'user-update',
    RECIVE_MESSAGE = 'recive-message',
    RECIVE_FRIEND_REQUEST = 'recive-friend-request'
}

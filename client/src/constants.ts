export enum SOCKET_ACTIONS {
    CREATE_MESSAGE = 'create-message',
    CHANNEL_INIT = 'channel-inital-data',
    USER_INIT = 'user-inital-data',
    RECIVE_MESSAGE = 'recive-message',
    RECIVE_FRIEND_REQUEST = 'recive-friend-request'
}
export enum FreindTypes {
    NONE = 0,
    FRIEND = 1,
    PENDING_INCOMMING = 3,
    PENDING_OUTGOING = 4
}

export const defaultPfp =
    'https://media.discordapp.net/attachments/770534108832858132/920445840600989747/default_pfp.png?width=50&height=38'
export const apiUrl = process.env.APIRUL || 'http://localhost:8000'

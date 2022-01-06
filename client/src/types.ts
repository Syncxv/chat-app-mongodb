export interface Channel {
    id: string
    _id: string
    members: string[]
}
export interface UserType {
    id: string
    _id: string
    username: string
    discriminator: number
    email: string
    avatar: string | null
    createdAt: string
    updatedAt: string
}
export interface RawChannel {
    id: string
    _id: string
    members: UserType[]
    createdAt: string
    updatedAt: string
}
export interface _Sizes {
    Icon: 'sizeIcon'
    Large: 'sizeLarge'
    Max: 'sizeMax'
    Medium: 'sizeMedium'
    Min: 'sizeMin'
    Small: 'sizeSmall'
    Tiny: 'sizeTiny'
    Xlarge: 'sizeXlarge'
}
export interface MessageType {
    _id: string
    channel_id: string
    content: string
    author: UserType
    createdAt: string
    updatedAt: string
}
export type _sizes =
    | 'sizeIcon'
    | 'sizeLarge'
    | 'sizeMax'
    | 'sizeMedium'
    | 'sizeMin'
    | 'sizeSmall'
    | 'sizeTiny_'
    | 'sizeXlarge'

export enum Actiontypes {
    TEST_1 = 'TEST_1',
    START_INITIALIZE = 'START_INITIALIZE',
    INITIALIZE_SUCCESS = 'INITIALIZE_SUCCESS',
    INITIALIZE_FAIL = 'INITIALIZE_FAIL',
    CONNECTION_OPEN = 'CONNECTION_OPEN',
    CONNECTION_SUCCESS = 'CONNECTION_SUCCESS',
    CONNECTION_FAIL = 'CONNECTION_FAIL',
    CHANNEL_INIT_START = 'CHANNEL_INIT_START',
    CHANNEL_INIT_FAIL = 'CHANNEL_INIT_FAIL',
    CHANNEL_INIT_SUCCESS = 'CHANNEL_INIT_SUCCESS',
    LOGIN_START = 'LOGIN_START',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE'
}

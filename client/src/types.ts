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
}
export interface RawChannel {
    id: string
    _id: string
    members: UserType[]
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
    CONNECTION_OPEN = 'CONNECTION_OPEN',
    CONNECTION_SUCCESS = 'CONNECTION_SUCCESS',
    CONNECTION_FAIL = 'CONNECTION_FAIL',
    LOGIN_START = 'LOGIN_START',
    LOGIN_SUCCESS = 'LOGIN_SUCCESS',
    LOGIN_FAILURE = 'LOGIN_FAILURE'
}

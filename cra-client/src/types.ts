export interface Channel {
    id: string
    _id: string
    members: string[]
}
export interface UserType {
    _id: string
    id: string
    username: string
    discriminator: number
    email: string
    avatar?: string
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

export type _sizes =
    | 'sizeIcon'
    | 'sizeLarge'
    | 'sizeMax'
    | 'sizeMedium'
    | 'sizeMin'
    | 'sizeSmall'
    | 'sizeTiny_'
    | 'sizeXlarge'

export interface MessageType {
    channel_id: string
    content: string
    author: UserType
}

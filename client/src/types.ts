export interface Channel {
    id: string
    members: string[]
}
export interface UserType {
    id: string
    username: string
    discriminator: number
    email: string
    avatar?: string
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

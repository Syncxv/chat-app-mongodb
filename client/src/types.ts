export interface Channel {
    id: string,
    members: string[]
}
export interface UserType {
    id: string
    username: string
    discriminator: number
    email: string
    avatar?: string
}

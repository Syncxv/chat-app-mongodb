import { UserType } from './models/user'

export interface queryAuthType {
    jwt: { user: UserType }
}

export enum FreindTypes {
    NONE = 0,
    FRIEND = 1,
    PENDING_INCOMMING = 3,
    PENDING_OUTGOING = 4
}

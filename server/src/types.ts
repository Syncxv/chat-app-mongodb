import { UserType } from './models/user'

export interface queryAuthType {
    jwt: { user: UserType }
}

import { UserType } from '../models/user'
import { sign } from 'jsonwebtoken'

export const createAcessToken = (user: UserType, id: string) => {
    return sign(
        { user: { id, username: user.username, email: user.email } },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: '60m'
        }
    )
}

export const createRefreshToken = (user: UserType, id: string) => {
    return sign(
        { user: { id, username: user.username, email: user.email } },
        process.env.ACCESS_TOKEN_SECRET!,
        {
            expiresIn: '7d'
        }
    )
}

import argon2 from 'argon2'
import { Request, Response } from 'express'
import { UserType } from '../../models/user'
import { createAcessToken } from '../../utils/auth'
import User from '../../models/user'
import { COOKIE_NAME } from '../../constants'
import cleanJson from '../../utils/cleanJson'
const login = async (req: Request<any, any, UserType>, res: Response) => {
    console.log('hey')
    try {
        const user = (
            await User.find({ username: req.body.username }).select('+password')
        )[0]
        if (!user)
            return res.send({
                error: { feild: 'username', message: 'unkown username' }
            })
        const valid = await argon2.verify(user.password, req.body.password)
        if (!valid)
            return res.send({
                error: {
                    feild: 'password',
                    message: 'password is incorrect nobba'
                }
            })
        const token = createAcessToken(user, user.id)
        res.cookie(COOKIE_NAME, token, {
            maxAge: 900000,
            httpOnly: true,
            secure: false
        })
        const cleanUser = cleanJson(user.toJSON(), ['password'])
        return res.send({
            user: cleanUser
        })
    } catch (err) {
        console.error(err)
        return res.send({ error: err.message })
    }
}
export default login

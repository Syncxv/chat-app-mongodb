import argon2 from 'argon2'
import { Request, Response } from 'express'
import { UserType } from '../../models/user'
import { createAcessToken } from '../../utils/auth'
import User from '../../models/user'
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
        // delete user.password
        // delete THE FUCKING PASSOWRD from the response pls idk man VSCODE IS SO SLOW FOR SOME REASON
        return res.send({
            user,
            acessToken: createAcessToken(user, user.id)
        })
    } catch (err) {
        console.error(err)
        return res.send({ error: err.message })
    }
}
export default login

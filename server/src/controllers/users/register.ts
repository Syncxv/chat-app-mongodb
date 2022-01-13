import argon2 from 'argon2'
import { Request, Response } from 'express'
import { UserType } from '../../models/user'
import { createAcessToken } from '../../utils/auth'
import User from '../../models/user'
import { COOKIE_NAME } from '../../constants'
const register = async (req: Request<any, any, UserType>, res: Response) => {
    try {
        const { username, password, email } = req.body
        const sameEmails = await User.find({ email })
        if (sameEmails.length) {
            return res
                .status(403)
                .send({ error: { feild: 'email', error: 'bruv email is already taken :|' } })
        }
        const sameUsernames = await User.find({ username })
        if (sameUsernames.length) {
            return res
                .status(403)
                .send({ error: { feild: 'username', error: 'bruv username is already taken :|' } })
        }
        const hash = await argon2.hash(password)
        const user = new User({ username, password: hash, email })
        console.log(user)
        const token = createAcessToken(user, user.id)
        console.log(token)
        user.save()
        res.cookie(COOKIE_NAME, token)
        return res.status(201).send({ user })
    } catch (err) {
        console.error(err)
        return res.send({ error: err.message })
    }
}

export default register

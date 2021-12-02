import argon2 from 'argon2'
import { Request, Response } from 'express'
import { UserType } from '../../models/user'
import { createAcessToken } from '../../utils/auth'
import User from '../../models/user'
const register = async (req: Request<any, any, UserType>, res: Response) => {
    try {
        const { username, password, email } = req.body
        const hash = await argon2.hash(password)
        const user = new User({ username, password: hash, email })
        console.log(user)
        const token = createAcessToken(user, user.id)
        console.log(token)
        user.save()
        res.status(201).send({ user, acessToken: token })
    } catch (err) {
        console.error(err)
        res.send({ error: err.message })
    }
}

export default register

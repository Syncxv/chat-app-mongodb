import { Request, Response } from 'express'
import User, { UserType } from '../../models/user'
const users = {
    index: async (req: Request, res: Response) => {
        const data = await User.find()
        res.send({ data })
    },
    getUser: async (req: Request<{ id: string }>, res: Response) => {
        try {
            const { id } = req.query
            const user = await User.find({ id })
            if (!user) {
                return res.status(404).send({ error: 'cant find him :|' })
            }
            console.log(user)
            return res.send({ data: user } || { data: null })
        } catch (err) {
            return res.send({ error: err.message })
        }
    },
    register: async (req: Request<any, any, UserType>, res: Response) => {
        try {
            const { username, password, email } = req.body
            const user = await User.create({ username, password, email })
            user.save()
            res.status(201).send(user)
        } catch (err) {
            res.send({ error: err.message })
        }
    }
}

export default users

import { Request, Response } from 'express'
import User, { UserType } from '../../models/user'
const users = {
    index: async (req: Request, res: Response) => {
        const data = await User.find()
        res.send({ data })
    },
    register: async (req: Request<any, any, UserType>, res: Response) => {
        const { username, password, email } = req.body
        if (!username || !password || !email)
            return res.send({ error: 'missing feilds' })
        const user = await User.create({ username, password, email })
        user.save()
        return res.send(user)
    }
}

export default users

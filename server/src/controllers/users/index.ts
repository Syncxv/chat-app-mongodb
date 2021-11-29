import { Request, Response } from 'express'
import user from '../../models/user'
const users = {
    index: async (req: Request, res: Response) => {
        const data = await user.find()
        res.send({ data })
    }
}

export default users

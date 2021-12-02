import { Request, Response } from 'express'
import Message from '../../models/Message'
import User, { UserType } from '../../models/user'

const messageController = {
    index: {
        get: async (_: Request, res: Response) => {
            res.send({ welp: 'hehe' })
        },
        post: async (
            req: Request<any, any, any, { jwt: { user: UserType } }>,
            res: Response
        ) => {
            try {
                const { user: jwt_user } = req.query.jwt
                const user = await User.findOne({ id: jwt_user.id })
                const { content, channel_id } = req.body
                if (!(content || channel_id)) {
                    return res.send({ error: 'invalid BODY' })
                }
                const message = new Message({
                    content,
                    channel_id,
                    author: user
                })
                await message.save()
                return res.send(message)
            } catch (err) {
                return res.send({ error: err.message })
            }
        },
        delete: async (
            req: Request<any, any, any, { jwt: { user: UserType } }>,
            res: Response
        ) => {
            //ill doo this later eh
        }
    }
}

export default messageController

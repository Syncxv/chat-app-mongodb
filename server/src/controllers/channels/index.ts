import Channel from '../../models/channels'
import { Request, Response } from 'express'
import Message from '../../models/Message'
const channels = {
    index: {
        get: async (req: Request, res: Response) => {
            const channel = await Channel.findOne({ id: req.params.id })
            res.send(channel || null)
        },
        messages: async (req: Request<any, any, any, { limit: string }>, res: Response) => {
            const limit = parseInt(req.query.limit) || 50
            const channel = await Channel.findOne({ id: req.params.id })
            if (!channel) return res.status(404).send({ error: 'channel not found eh' })
            const messages = await Message.find({
                channel_id: channel.id
            })
                .limit(limit)
                .populate([{ path: 'author', model: 'User' }])
            return res.send(messages)
        }
    }
}

export default channels

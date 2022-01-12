import Channel from '../../models/channels'
import { Request, Response } from 'express'
import Message from '../../models/Message'
const channels = {
    index: {
        get: async (req: Request, res: Response) => {
            const channel = await Channel.findOne({ id: req.params.id })
            res.send(channel || null)
        },
        messages: async (req: Request<any, any, any, { limit: string; before: string }>, res: Response) => {
            const limit = parseInt(req.query.limit) || 50
            const channel = await Channel.findById(req.params.id)
            if (!channel) return res.status(404).send({ error: 'channel not found eh' })
            if (!req.query.before) {
                console.log(req.params)
                ;(global as any).channel = channel
                ;(global as any).Channel = Channel
                ;(global as any).Message = Message
                const messages = await Message.find({
                    channel_id: channel.id
                })
                    .sort({ $natural: -1 })
                    .limit(limit)
                    .populate([{ path: 'author', model: 'User' }])
                return res.send(messages.reverse())
            }
            const message = await Message.findOne({ _id: req.query.before })
            if (!message) return res.status(404).send({ error: 'wot message is that eh' })
            const messages = await Message.aggregate([{ $match: { _id: { $lt: message._id } } }])
            const real = await Message.populate(messages, { path: 'author', model: 'User' })
            return res.status(200).send(real)
        }
    }
}

export default channels

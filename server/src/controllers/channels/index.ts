import { Request, Response } from 'express'
import Channel from '../../models/channels'
import Message from '../../models/Message'
const channels = {
    index: {
        messages: async (req: Request, res: Response) => {
            const channel = await Channel.findOne({ id: req.params.id })
            if (!channel)
                return res.status(404).send({ error: 'channel not found eh' })
            const messages = await Message.find({ channel_id: channel.id })
            return res.send(messages)
        }
    }
}

export default channels

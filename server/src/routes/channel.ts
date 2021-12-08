import { Router } from 'express'
import channel from '../controllers/channels'
const router = Router()
router.route('/:id').get(channel.index.get)
router.route('/:id/messages').get(channel.index.messages)
export default { path: 'channels', router }

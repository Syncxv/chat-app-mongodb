import { Router } from 'express'
import channel from '../controllers/channels'
const router = Router()
router.route('/:id/messages').get(channel.index.messages)
// router.route('/create').post(channel.createChannel)
export default { path: 'channels', router }

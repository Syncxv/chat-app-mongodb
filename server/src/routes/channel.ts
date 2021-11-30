import { Router } from 'express'
import channel from '../controllers/channels'
const router = Router()
router.route('/').get(channel.index)
// router.route('/create').post(channel.createChannel)
export default { path: 'channels', router }

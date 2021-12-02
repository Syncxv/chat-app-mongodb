import { Router } from 'express'
import messageController from '../controllers/message'
import isAuth from '../utils/isAuth'
const router = Router()
router.use('/', isAuth)
router.route('/').post(messageController.index.post)
router.route('/').get(messageController.index.get)
export default { path: 'messages', router }

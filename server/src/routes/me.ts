import { Router } from 'express'
import users from '../controllers/users'
import isAuth from '../utils/isAuth'
const router = Router()
router.use('/', isAuth)
router.route('/').get(users.me.index)
router.route('/channels').post(users.me.createChannel)
router.route('/channels').get(users.me.getChannels)
export default { path: '@me', router }

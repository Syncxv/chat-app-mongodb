import { Router } from 'express'
import users from '../controllers/users'
import isAuth from '../utils/isAuth'
const router = Router()
router.use('/', isAuth)
router.route('/').get(users.me.index)
router.route('/channels').post(users.me.createChannel)
router.route('/channels').get(users.me.getChannels)
router.route('/friends').get(users.me.friends.index)
router.route('/friends/add').post(users.me.friends.add)
router.route('/friends/accept/:id').put(users.me.friends.accept)
router.route('/friends/remove/:id').get(users.me.friends.remove)
export default { path: '@me', router }

import { Router } from 'express'
import users from '../controllers/users'

const router = Router()
router.route('/').get(users.index)
router.route('/getuser/:id').get(users.getUser)
router.route('/register').post(users.register)
router.route('/login').post(users.login)
router.route('/@me').get(users.me.index)
router.route('/@me/channels').post(users.me.createChannel)
router.route('/@me/channels/:id').get(users.me.getChannels)
export default { path: 'users', router }

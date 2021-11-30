import { Router } from 'express'
import users from '../controllers/users'

const router = Router()
router.route('/').get(users.index)
router.route('/register').post(users.register)

export default { path: 'users', router }

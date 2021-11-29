import { Router } from 'express'
import users from '../controllers/users'

const router = Router()
router.route('/').get(users.index)

export default { path: 'users', router }

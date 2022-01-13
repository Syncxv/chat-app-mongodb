import { Router } from 'express'
import users from '../controllers/users'
// import isAuth from '../utils/isAuth'

const router = Router()
router.route('/:id').get(users.index)
router.route('/register').post(users.register)
router.route('/login').post(users.login)
export default { path: 'users', router }

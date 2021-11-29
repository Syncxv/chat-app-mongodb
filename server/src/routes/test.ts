import { Router } from 'express'
import test from '../controllers/test'
const router = Router()
router.route('/').get(test.index)
export default { path: 'test', router }

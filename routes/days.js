import { Router } from 'express'
import * as daysCtrl from '../controllers/days.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()


// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
// POST (create)/api/days
router.post('/', checkAuth, daysCtrl.create)
// GET (read/index)/api/days
router.get('/', checkAuth, daysCtrl.index)

export { router }
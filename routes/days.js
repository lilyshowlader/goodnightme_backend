import { Router } from 'express'
import * as daysCtrl from '../controllers/days.js'
import { decodeUserFromToken, checkAuth } from '../middleware/auth.js'

const router = Router()


// ========== Public Routes ===========


// ========= Protected Routes ========= 
router.use(decodeUserFromToken)
// POST /api/days  -> to create a Day entry
router.post('/', checkAuth, daysCtrl.create)
// GET /api/days -> to view all Day entries
router.get('/', checkAuth, daysCtrl.index)
// GET /api/days/:id -> to view a specific Day entry
router.get('/:id', checkAuth, daysCtrl.show)
// PUT /api/days/:id -> to update a specific Day entry
router.put('/:id', checkAuth, daysCtrl.update)
// DELETE /api/days/:id -> to delete a specific Day entry
router.delete('/:id', checkAuth, daysCtrl.delete)

// feelings
// POST /api/days/:id/feelings
router.post('/:id/feelings', checkAuth, daysCtrl.createFeeling)

export { router }
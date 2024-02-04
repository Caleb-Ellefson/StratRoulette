import { Router }  from 'express'
import { validateStratInput } from '../middleware/validationMiddleware.js'

const router = Router()

import { createStrat, findStrat, deleteStrat, updateStrat, approvedStrat, getStrat } from '../controllers/stratController.js'

router.route('/').post(validateStratInput, createStrat).get(findStrat)
router.route('/all').get(approvedStrat)
router.route('/:id').delete(deleteStrat).patch(updateStrat).get(getStrat)

export default router
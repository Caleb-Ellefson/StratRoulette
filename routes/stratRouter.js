import { Router }  from 'express'

const router = Router()

import { createStrat, getStrat } from '../controllers/stratcontroller.js'

// router.post('/',createStrat)


//Chain .post(function).get(function).delete(function)
router.route('/').post(createStrat).get(getStrat)
// router.route('/:id').delete(deleteStrat)

export default router
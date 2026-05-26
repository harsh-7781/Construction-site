const express = require('express')
const router  = express.Router()
const { getPOs, createPO, updatePO, deletePO } = require('../controllers/procurementController')
const { protect } = require('../middleware/auth')

router.route('/').get(protect, getPOs).post(protect, createPO)
router.route('/:id').put(protect, updatePO).delete(protect, deletePO)

module.exports = router
const express = require('express')
const router  = express.Router()
const { getContracts, createContract, updateContract, deleteContract } = require('../controllers/contractController')
const { protect } = require('../middleware/auth')

router.route('/').get(protect, getContracts).post(protect, createContract)
router.route('/:id').put(protect, updateContract).delete(protect, deleteContract)

module.exports = router
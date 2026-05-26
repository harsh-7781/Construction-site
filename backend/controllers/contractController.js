const Contract = require('../models/Contract')

exports.getContracts = async (req, res) => {
  try {
    const contracts = await Contract.find().sort({ createdAt: -1 })
    res.json({ success: true, count: contracts.length, data: contracts })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.createContract = async (req, res) => {
  try {
    const contract = await Contract.create(req.body)
    res.status(201).json({ success: true, data: contract })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

exports.updateContract = async (req, res) => {
  try {
    const contract = await Contract.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    })
    if (!contract) return res.status(404).json({ success: false, message: 'Contract not found' })
    res.json({ success: true, data: contract })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

exports.deleteContract = async (req, res) => {
  try {
    await Contract.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Contract deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
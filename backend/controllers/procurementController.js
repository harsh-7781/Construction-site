const PurchaseOrder = require('../models/PurchaseOrder')

exports.getPOs = async (req, res) => {
  try {
    const pos = await PurchaseOrder.find().sort({ createdAt: -1 })
    res.json({ success: true, count: pos.length, data: pos })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.createPO = async (req, res) => {
  try {
    const po = await PurchaseOrder.create(req.body)
    res.status(201).json({ success: true, data: po })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

exports.updatePO = async (req, res) => {
  try {
    const po = await PurchaseOrder.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    })
    if (!po) return res.status(404).json({ success: false, message: 'PO not found' })
    res.json({ success: true, data: po })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

exports.deletePO = async (req, res) => {
  try {
    await PurchaseOrder.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'PO deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
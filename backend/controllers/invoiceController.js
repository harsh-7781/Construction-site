const Invoice = require('../models/Invoice')

exports.getInvoices = async (req, res) => {
  try {
    const invoices = await Invoice.find().sort({ createdAt: -1 })
    res.json({ success: true, count: invoices.length, data: invoices })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}

exports.createInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.create(req.body)
    res.status(201).json({ success: true, data: invoice })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

exports.updateInvoice = async (req, res) => {
  try {
    const invoice = await Invoice.findByIdAndUpdate(req.params.id, req.body, {
      new: true, runValidators: true,
    })
    if (!invoice) return res.status(404).json({ success: false, message: 'Invoice not found' })
    res.json({ success: true, data: invoice })
  } catch (err) {
    res.status(400).json({ success: false, message: err.message })
  }
}

exports.deleteInvoice = async (req, res) => {
  try {
    await Invoice.findByIdAndDelete(req.params.id)
    res.json({ success: true, message: 'Invoice deleted' })
  } catch (err) {
    res.status(500).json({ success: false, message: err.message })
  }
}
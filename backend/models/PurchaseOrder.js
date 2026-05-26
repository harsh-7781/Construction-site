const mongoose = require('mongoose')

const PurchaseOrderSchema = new mongoose.Schema({
  poNo:     { type: String, unique: true },
  vendor:   { type: String, required: true },
  item:     { type: String, required: true },
  project:  { type: String, required: true },
  qty:      { type: Number },
  unit:     { type: String },
  rate:     { type: Number },
  amount:   { type: Number },
  category: { type: String },
  ordered:  { type: Date, default: Date.now },
  delivery: { type: Date },
  status:   { type: String, enum: ['pending','confirmed','transit','delivered','cancelled'], default: 'pending' },
  notes:    { type: String },
}, { timestamps: true })

PurchaseOrderSchema.pre('save', async function(next) {
  if (!this.poNo) {
    const count = await mongoose.model('PurchaseOrder').countDocuments()
    this.poNo = `PO-${String(count + 1000).padStart(4, '0')}`
  }
  this.amount = (this.qty || 0) * (this.rate || 0)
  next()
})

module.exports = mongoose.model('PurchaseOrder', PurchaseOrderSchema)
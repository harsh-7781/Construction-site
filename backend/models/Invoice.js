const mongoose = require('mongoose')

const InvoiceSchema = new mongoose.Schema({
  invoiceNo: { type: String, unique: true },
  project:   { type: String, required: true },
  client:    { type: String, required: true },
  amount:    { type: Number, required: true },
  gst:       { type: Number, default: 0 },
  total:     { type: Number },
  type:      { type: String, enum: ['advance','progress','milestone','final'], default: 'progress' },
  status:    { type: String, enum: ['draft','sent','pending','paid','overdue'], default: 'draft' },
  raised:    { type: Date, default: Date.now },
  due:       { type: Date },
  paidDate:  { type: Date },
  notes:     { type: String },
}, { timestamps: true })

// Auto generate invoice number
InvoiceSchema.pre('save', async function(next) {
  if (!this.invoiceNo) {
    const count = await mongoose.model('Invoice').countDocuments()
    this.invoiceNo = `INV-${String(count + 300).padStart(3, '0')}`
  }
  this.total = this.amount + (this.gst || 0)
  next()
})

module.exports = mongoose.model('Invoice', InvoiceSchema)
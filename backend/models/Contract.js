const mongoose = require('mongoose')

const ContractSchema = new mongoose.Schema({
  contractNo:   { type: String, unique: true },
  title:        { type: String, required: true },
  client:       { type: String, required: true },
  project:      { type: String, required: true },
  type:         { type: String },
  value:        { type: Number },
  service:      { type: String },
  status:       { type: String, enum: ['draft','active','expiring','completed','terminated'], default: 'draft' },
  startDate:    { type: Date },
  endDate:      { type: Date },
  signedDate:   { type: Date },
  signed:       { type: Boolean, default: false },
  paymentTerms: { type: String },
  penalty:      { type: String },
  dpl:          { type: String },
  clauses:      [{ title: String, category: String, required: Boolean }],
  site:         { type: String },
  notes:        { type: String },
}, { timestamps: true })

ContractSchema.pre('save', async function(next) {
  if (!this.contractNo) {
    const count = await mongoose.model('Contract').countDocuments()
    this.contractNo = `CON-${String(count + 1000).padStart(4, '0')}`
  }
  next()
})

module.exports = mongoose.model('Contract', ContractSchema)
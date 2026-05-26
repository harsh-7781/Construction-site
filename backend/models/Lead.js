const mongoose = require('mongoose')

const LeadSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  contact:     { type: String },
  phone:       { type: String },
  email:       { type: String },
  location:    { type: String },
  service:     { type: String, enum: ['Civil','Interior','MEP','Renovation','Structural','Architecture'] },
  value:       { type: Number },
  stage:       { type: String, enum: ['new','contacted','proposal','negotiation','won','lost'], default: 'new' },
  priority:    { type: String, enum: ['low','medium','high'], default: 'medium' },
  rating:      { type: Number, min: 1, max: 5, default: 3 },
  notes:       { type: String },
  nextFollow:  { type: Date },
  assignedTo:  { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
}, { timestamps: true })

module.exports = mongoose.model('Lead', LeadSchema)
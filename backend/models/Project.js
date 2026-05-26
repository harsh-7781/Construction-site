const mongoose = require('mongoose')

const TaskSchema = new mongoose.Schema({
  title:    { type: String, required: true },
  assignee: { type: String },
  due:      { type: Date },
  status:   { type: String, enum: ['pending','in-progress','done','blocked'], default: 'pending' },
  priority: { type: String, enum: ['low','medium','high'], default: 'medium' },
})

const MilestoneSchema = new mongoose.Schema({
  title: { type: String, required: true },
  date:  { type: Date },
  done:  { type: Boolean, default: false },
})

const ProjectSchema = new mongoose.Schema({
  name:         { type: String, required: true },
  client:       { type: String, required: true },
  type:         { type: String, enum: ['Civil','Interior','MEP','Renovation','Structural','Architecture'] },
  value:        { type: Number },
  status:       { type: String, enum: ['on-track','at-risk','delayed','completed'], default: 'on-track' },
  progress:     { type: Number, default: 0, min: 0, max: 100 },
  startDate:    { type: Date },
  endDate:      { type: Date },
  site:         { type: String },
  manager:      { type: String },
  supervisor:   { type: String },
  team:         { type: Number, default: 0 },
  description:  { type: String },
  tasks:        [TaskSchema],
  milestones:   [MilestoneSchema],
}, { timestamps: true })

module.exports = mongoose.model('Project', ProjectSchema)
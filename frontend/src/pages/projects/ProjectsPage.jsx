import { useState } from 'react'
import {
 Plus, Search, MapPin,
  Calendar, Users, ChevronRight, MoreVertical,
  CheckSquare,  TrendingUp,
  Building2, Camera, 
 Target, Flag, Edit3, 
  ArrowLeft,  Phone, Mail, Download
} from 'lucide-react'

// ── Mock Data ──────────────────────────────────────────────
const projects = [
  {
    id: 'PRJ-001',
    name: 'Oberoi Residency Tower',
    client: 'Oberoi Group',
    clientContact: 'Vikas Oberoi',
    clientPhone: '+91 98200 11111',
    clientEmail: 'vikas@oberoi.com',
    type: 'Civil',
    value: '₹2.4 Cr',
    status: 'on-track',
    progress: 68,
    startDate: '01 Mar 2025',
    endDate: '15 Dec 2025',
    site: 'Worli, Mumbai',
    manager: 'Sneha Desai',
    supervisor: 'Vikram Singh',
    team: 24,
    description: 'G+18 residential tower with basement parking, amenity floor and rooftop garden.',
    tasks: [
      { id: 1, title: 'Slab casting — Floor 14',         assignee: 'Vikram S.',  due: 'Today',    status: 'in-progress', priority: 'high'   },
      { id: 2, title: 'Column shuttering — Floor 15',    assignee: 'Ram S.',     due: 'Tomorrow', status: 'pending',     priority: 'high'   },
      { id: 3, title: 'Waterproofing — Basement 2',      assignee: 'Sunil K.',   due: '05 Aug',   status: 'in-progress', priority: 'medium' },
      { id: 4, title: 'Rebar tying — Floor 14 east',     assignee: 'Ganesh M.',  due: '03 Aug',   status: 'done',        priority: 'medium' },
      { id: 5, title: 'Plumbing rough-in — Floor 12-13', assignee: 'Anil P.',    due: '08 Aug',   status: 'pending',     priority: 'low'    },
      { id: 6, title: 'External scaffolding check',      assignee: 'Vikram S.',  due: '04 Aug',   status: 'done',        priority: 'medium' },
    ],
    milestones: [
      { title: 'Foundation Complete',    date: 'Mar 2025', done: true  },
      { title: 'Plinth Level',           date: 'Apr 2025', done: true  },
      { title: 'Floor 10 Slab',          date: 'Jun 2025', done: true  },
      { title: 'Floor 18 Slab',          date: 'Sep 2025', done: false },
      { title: 'Brick & Plaster',        date: 'Oct 2025', done: false },
      { title: 'Finishing & Handover',   date: 'Dec 2025', done: false },
    ],
    materials: [
      { name: 'TMT Steel',       status: 'low',  qty: '12.5 MT',  required: '18 MT'   },
      { name: 'Cement',          status: 'low',  qty: '180 bags', required: '350 bags'},
      { name: 'RMC Concrete',    status: 'ok',   qty: '45 M³',    required: '45 M³'   },
      { name: 'Plywood',         status: 'out',  qty: '0 nos',    required: '40 nos'  },
    ],
    documents: [
      { name: 'Architectural Drawings v3', type: 'DWG', date: '20 Jun 2025', size: '14.2 MB' },
      { name: 'Structural Drawing Set',    type: 'PDF', date: '18 May 2025', size: '8.5 MB'  },
      { name: 'BOQ — Civil Works',         type: 'XLS', date: '01 Mar 2025', size: '2.1 MB'  },
      { name: 'Site Photos — July',        type: 'ZIP', date: '28 Jul 2025', size: '45 MB'   },
    ],
  },
  {
    id: 'PRJ-002',
    name: 'Kohinoor Mall Interior',
    client: 'Kohinoor Infra',
    clientContact: 'Suresh Kohinoor',
    clientPhone: '+91 98200 22222',
    clientEmail: 'suresh@kohinoor.com',
    type: 'Interior',
    value: '₹85 L',
    status: 'at-risk',
    progress: 42,
    startDate: '01 May 2025',
    endDate: '30 Sep 2025',
    site: 'Dadar, Mumbai',
    manager: 'Sneha Desai',
    supervisor: 'Arjun Kumar',
    team: 12,
    description: 'Complete interior fit-out of 3-floor mall including food court, retail zones and common areas.',
    tasks: [
      { id: 1, title: 'False ceiling — Food court',   assignee: 'Arjun K.', due: '05 Aug', status: 'pending',     priority: 'medium' },
      { id: 2, title: 'Flooring — Level 2',           assignee: 'Ravi M.',  due: '10 Aug', status: 'in-progress', priority: 'high'   },
      { id: 3, title: 'Electrical — Level 1',         assignee: 'Nitin D.', due: '03 Aug', status: 'blocked',     priority: 'high'   },
    ],
    milestones: [
      { title: 'Site Handover',        date: 'May 2025', done: true  },
      { title: 'Level 1 Complete',     date: 'Jul 2025', done: false },
      { title: 'Level 2 Complete',     date: 'Aug 2025', done: false },
      { title: 'Final Handover',       date: 'Sep 2025', done: false },
    ],
    materials: [
      { name: 'Gypsum Board',  status: 'ok',  qty: '800 M²', required: '1200 M²' },
      { name: 'Vitrified Tile',status: 'low', qty: '200 M²', required: '500 M²'  },
    ],
    documents: [
      { name: 'Interior Design Concept', type: 'PDF', date: '01 May 2025', size: '22 MB' },
      { name: 'Material Schedule',       type: 'XLS', date: '10 May 2025', size: '1.8 MB'},
    ],
  },
  {
    id: 'PRJ-003',
    name: 'Tech Park MEP Works',
    client: 'Raheja Corp',
    clientContact: 'Rahul Raheja',
    clientPhone: '+91 98200 33333',
    clientEmail: 'rahul@raheja.com',
    type: 'MEP',
    value: '₹1.1 Cr',
    status: 'on-track',
    progress: 81,
    startDate: '15 Jan 2025',
    endDate: '20 Aug 2025',
    site: 'Powai, Mumbai',
    manager: 'Sneha Desai',
    supervisor: 'Ravi Mehta',
    team: 18,
    description: 'Full MEP package for 8-floor tech park including HVAC, fire fighting, plumbing and electrical.',
    tasks: [
      { id: 1, title: 'HVAC — Floor 7 & 8',        assignee: 'Ravi M.',  due: 'Today',  status: 'in-progress', priority: 'high' },
      { id: 2, title: 'Fire sprinkler — Floor 8',  assignee: 'Sunil K.', due: '05 Aug', status: 'pending',     priority: 'high' },
    ],
    milestones: [
      { title: 'Electrical Floors 1-4',  date: 'Mar 2025', done: true  },
      { title: 'Plumbing Complete',      date: 'May 2025', done: true  },
      { title: 'HVAC Floors 1-6',        date: 'Jun 2025', done: true  },
      { title: 'All MEP Complete',       date: 'Aug 2025', done: false },
    ],
    materials: [
      { name: 'GI Ducts',     status: 'ok',  qty: '450 M²', required: '500 M²' },
      { name: 'CPVC Pipes',   status: 'ok',  qty: '800 RFT',required: '900 RFT'},
    ],
    documents: [
      { name: 'MEP Coordination Drawing', type: 'DWG', date: '10 Jan 2025', size: '18 MB' },
    ],
  },
]

// ── Helpers ────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    'on-track':    { label: 'On Track',    cls: 'bg-green-900/40 text-green-400 border-green-800' },
    'at-risk':     { label: 'At Risk',     cls: 'bg-amber-900/40 text-amber-400 border-amber-800' },
    'delayed':     { label: 'Delayed',     cls: 'bg-red-900/40   text-red-400   border-red-800'   },
    'completed':   { label: 'Completed',   cls: 'bg-blue-900/40  text-blue-400  border-blue-800'  },
    'in-progress': { label: 'In Progress', cls: 'bg-blue-900/40  text-blue-400  border-blue-800'  },
    'pending':     { label: 'Pending',     cls: 'bg-slate-800    text-slate-400 border-slate-700' },
    'blocked':     { label: 'Blocked',     cls: 'bg-red-900/40   text-red-400   border-red-800'   },
    'done':        { label: 'Done',        cls: 'bg-green-900/40 text-green-400 border-green-800' },
  }
  const { label, cls } = map[status] || map['pending']
  return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>{label}</span>
}

const TypeBadge = ({ type }) => {
  const colors = {
    Civil:      'bg-blue-900/40   text-blue-400',
    Interior:   'bg-purple-900/40 text-purple-400',
    MEP:        'bg-teal-900/40   text-teal-400',
    Renovation: 'bg-amber-900/40  text-amber-400',
    Structural: 'bg-orange-900/40 text-orange-400',
  }
  return <span className={`text-xs px-2 py-0.5 rounded font-medium ${colors[type] || 'bg-slate-800 text-slate-400'}`}>{type}</span>
}

const PriorityDot = ({ priority }) => {
  const colors = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-green-500' }
  return <span className={`w-2 h-2 rounded-full shrink-0 ${colors[priority]}`} />
}

const MaterialStatus = ({ status }) => {
  const map = {
    ok:  { label: 'OK',           cls: 'bg-green-900/40 text-green-400 border-green-800' },
    low: { label: 'Low Stock',    cls: 'bg-amber-900/40 text-amber-400 border-amber-800' },
    out: { label: 'Out of Stock', cls: 'bg-red-900/40   text-red-400   border-red-800'   },
  }
  const { label, cls } = map[status]
  return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>{label}</span>
}

const DocTypeColor = (type) => {
  const m = { PDF: 'text-red-400 bg-red-900/30', DWG: 'text-blue-400 bg-blue-900/30', XLS: 'text-green-400 bg-green-900/30', ZIP: 'text-amber-400 bg-amber-900/30' }
  return m[type] || 'text-slate-400 bg-slate-800'
}

// ── Project Detail View ────────────────────────────────────
function ProjectDetail({ project, onBack }) {
  const [activeTab, setActiveTab] = useState('overview')

  const doneTasks    = project.tasks.filter(t => t.status === 'done').length
  const totalTasks   = project.tasks.length
  const doneMilestones = project.milestones.filter(m => m.done).length

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <button onClick={onBack} className="text-xs text-slate-500 hover:text-slate-300 mb-2 flex items-center gap-1">
            <ArrowLeft size={12} /> Back to projects
          </button>
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-bold text-white">{project.name}</h1>
            <TypeBadge type={project.type} />
            <StatusBadge status={project.status} />
          </div>
          <div className="flex items-center gap-4 mt-1">
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <MapPin size={12} className="text-slate-600" /> {project.site}
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <Calendar size={12} className="text-slate-600" /> {project.startDate} → {project.endDate}
            </span>
            <span className="text-slate-400 text-sm flex items-center gap-1">
              <Users size={12} className="text-slate-600" /> {project.team} workers
            </span>
          </div>
        </div>
        <div className="flex gap-2 shrink-0">
          <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg transition flex items-center gap-1">
            <Edit3 size={13} /> Edit
          </button>
          <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1">
            <Camera size={13} /> Daily Report
          </button>
        </div>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Overall Progress', value: `${project.progress}%`,           color: 'bg-blue-600',   icon: TrendingUp   },
          { label: 'Tasks Done',       value: `${doneTasks}/${totalTasks}`,      color: 'bg-green-600',  icon: CheckSquare  },
          { label: 'Milestones',       value: `${doneMilestones}/${project.milestones.length}`, color: 'bg-purple-600', icon: Flag },
          { label: 'Project Value',    value: project.value,                     color: 'bg-amber-600',  icon: Target       },
        ].map((k, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className={`w-8 h-8 rounded-lg ${k.color} flex items-center justify-center mb-2`}>
              <k.icon size={16} className="text-white" />
            </div>
            <p className="text-xl font-bold text-white">{k.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{k.label}</p>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-white">Overall Completion</span>
          <span className="text-sm font-bold text-blue-400">{project.progress}%</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              project.status === 'delayed'  ? 'bg-red-500'   :
              project.status === 'at-risk'  ? 'bg-amber-500' : 'bg-blue-500'
            }`}
            style={{ width: `${project.progress}%` }}
          />
        </div>
        <div className="flex items-center justify-between mt-2 text-xs text-slate-500">
          <span>{project.startDate}</span>
          <span>{project.endDate}</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 w-fit">
        {['overview','tasks','milestones','materials','documents'].map(tab => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition capitalize ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Project Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Project Info</h2>
            <p className="text-sm text-slate-400 mb-4">{project.description}</p>
            <div className="space-y-3">
              {[
                { label: 'Project ID',   value: project.id },
                { label: 'Type',         value: project.type },
                { label: 'Start Date',   value: project.startDate },
                { label: 'End Date',     value: project.endDate },
                { label: 'Site',         value: project.site },
                { label: 'Manager',      value: project.manager },
                { label: 'Supervisor',   value: project.supervisor },
              ].map((row, i) => (
                <div key={i} className="flex items-center justify-between text-sm border-b border-slate-800 pb-2 last:border-0 last:pb-0">
                  <span className="text-slate-500">{row.label}</span>
                  <span className="text-white font-medium">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Client Details</h2>
            <div className="flex items-center gap-3 mb-4 p-3 bg-slate-800/50 rounded-xl border border-slate-800">
              <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-800 flex items-center justify-center">
                <Building2 size={22} className="text-blue-400" />
              </div>
              <div>
                <p className="text-white font-semibold">{project.client}</p>
                <p className="text-slate-400 text-xs mt-0.5">{project.clientContact}</p>
              </div>
            </div>
            <div className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Phone size={14} className="text-slate-600" />
                <span className="text-slate-300">{project.clientPhone}</span>
                <button className="ml-auto text-xs text-blue-400 hover:text-blue-300">Call</button>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Mail size={14} className="text-slate-600" />
                <span className="text-slate-300">{project.clientEmail}</span>
                <button className="ml-auto text-xs text-blue-400 hover:text-blue-300">Email</button>
              </div>
            </div>

            {/* Quick Milestones Preview */}
            <div className="mt-4 pt-4 border-t border-slate-800">
              <h3 className="text-xs font-semibold text-white mb-3">Milestone Progress</h3>
              <div className="space-y-2">
                {project.milestones.map((m, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      m.done ? 'border-green-500 bg-green-500' : 'border-slate-600'
                    }`}>
                      {m.done && <span className="text-white text-xs">✓</span>}
                    </div>
                    <span className={`text-xs flex-1 ${m.done ? 'text-slate-500 line-through' : 'text-slate-300'}`}>
                      {m.title}
                    </span>
                    <span className="text-xs text-slate-600">{m.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── TASKS TAB ── */}
      {activeTab === 'tasks' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Task List</h2>
            <button className="text-xs bg-blue-600/20 text-blue-400 border border-blue-800 px-2 py-1 rounded-lg flex items-center gap-1">
              <Plus size={12} /> Add Task
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-800">
                <th className="text-left px-5 py-3 font-medium">Task</th>
                <th className="text-left px-5 py-3 font-medium">Assignee</th>
                <th className="text-left px-5 py-3 font-medium">Priority</th>
                <th className="text-left px-5 py-3 font-medium">Due</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {project.tasks.map(t => (
                <tr key={t.id} className="hover:bg-slate-800/50 transition cursor-pointer">
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <PriorityDot priority={t.priority} />
                      <span className="text-slate-300 font-medium">{t.title}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                        {t.assignee.charAt(0)}
                      </div>
                      <span className="text-slate-400 text-xs">{t.assignee}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3">
                    <span className={`text-xs font-medium capitalize ${
                      t.priority === 'high' ? 'text-red-400' : t.priority === 'medium' ? 'text-amber-400' : 'text-green-400'
                    }`}>{t.priority}</span>
                  </td>
                  <td className="px-5 py-3 text-slate-400 text-xs">{t.due}</td>
                  <td className="px-5 py-3"><StatusBadge status={t.status} /></td>
                  <td className="px-5 py-3">
                    <button className="text-slate-500 hover:text-white transition">
                      <MoreVertical size={14} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── MILESTONES TAB ── */}
      {activeTab === 'milestones' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-white">Project Milestones</h2>
            <button className="text-xs bg-blue-600/20 text-blue-400 border border-blue-800 px-2 py-1 rounded-lg flex items-center gap-1">
              <Plus size={12} /> Add Milestone
            </button>
          </div>
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-800" />
            <div className="space-y-6">
              {project.milestones.map((m, i) => (
                <div key={i} className="flex items-start gap-4 relative pl-12">
                  <div className={`absolute left-3 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    m.done
                      ? 'border-green-500 bg-green-500'
                      : 'border-slate-600 bg-slate-900'
                  }`}>
                    {m.done && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  <div className={`flex-1 p-4 rounded-xl border ${
                    m.done
                      ? 'border-green-900/40 bg-green-900/10'
                      : 'border-slate-800 bg-slate-800/30'
                  }`}>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-semibold ${m.done ? 'text-green-400' : 'text-white'}`}>
                        {m.title}
                      </p>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar size={11} /> {m.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">
                      {m.done ? 'Completed' : 'Upcoming'}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── MATERIALS TAB ── */}
      {activeTab === 'materials' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Material Status</h2>
            <button className="text-xs bg-blue-600/20 text-blue-400 border border-blue-800 px-2 py-1 rounded-lg flex items-center gap-1">
              <Plus size={12} /> Request Material
            </button>
          </div>
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-800">
                <th className="text-left px-5 py-3 font-medium">Material</th>
                <th className="text-left px-5 py-3 font-medium">Available</th>
                <th className="text-left px-5 py-3 font-medium">Required</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {project.materials.map((m, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition">
                  <td className="px-5 py-3 text-white font-medium">{m.name}</td>
                  <td className="px-5 py-3 text-slate-300">{m.qty}</td>
                  <td className="px-5 py-3 text-slate-400">{m.required}</td>
                  <td className="px-5 py-3"><MaterialStatus status={m.status} /></td>
                  <td className="px-5 py-3">
                    {m.status !== 'ok' && (
                      <button className="text-xs text-blue-400 hover:text-blue-300 transition">
                        Order Now
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ── DOCUMENTS TAB ── */}
      {activeTab === 'documents' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Project Documents</h2>
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1">
              <Plus size={13} /> Upload
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {project.documents.map((doc, i) => (
              <div key={i} className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition cursor-pointer">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${DocTypeColor(doc.type)}`}>
                  {doc.type}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{doc.date} · {doc.size}</p>
                </div>
                <button className="text-slate-500 hover:text-blue-400 transition shrink-0">
                  <Download size={16} />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}

// ── Project List ───────────────────────────────────────────
export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  const [search, setSearch] = useState('')
  const [typeFilter, setTypeFilter] = useState('All')

  if (selectedProject) {
    return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />
  }

  const types = ['All', 'Civil', 'Interior', 'MEP', 'Renovation', 'Structural']

  const filtered = projects.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                        p.client.toLowerCase().includes(search.toLowerCase())
    const matchType   = typeFilter === 'All' || p.type === typeFilter
    return matchSearch && matchType
  })

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Projects</h1>
          <p className="text-slate-400 text-sm mt-0.5">All active and completed projects</p>
        </div>
        <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1">
          <Plus size={14} /> New Project
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Projects',  value: '25',      color: 'text-blue-400'   },
          { label: 'On Track',        value: '8',       color: 'text-green-400'  },
          { label: 'At Risk',         value: '3',       color: 'text-amber-400'  },
          { label: 'Delayed',         value: '2',       color: 'text-red-400'    },
        ].map((s, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
            <p className="text-sm text-slate-400 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Filters */}
      <div className="flex items-center gap-3 flex-wrap">
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 w-64">
          <Search size={14} className="text-slate-500" />
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects..."
            className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"
          />
        </div>
        <div className="flex gap-2">
          {types.map(t => (
            <button
              key={t}
              onClick={() => setTypeFilter(t)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                typeFilter === t
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-900 border border-slate-800 text-slate-400 hover:text-white'
              }`}
            >
              {t}
            </button>
          ))}
        </div>
      </div>

      {/* Project Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
        {filtered.map(p => (
          <div
            key={p.id}
            onClick={() => setSelectedProject(p)}
            className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition cursor-pointer group"
          >
            {/* Top */}
            <div className="flex items-start justify-between mb-3">
              <div className="flex-1 min-w-0 mr-2">
                <p className="text-sm font-semibold text-white group-hover:text-blue-400 transition truncate">
                  {p.name}
                </p>
                <p className="text-xs text-slate-500 mt-0.5">{p.client}</p>
              </div>
              <StatusBadge status={p.status} />
            </div>

            {/* Progress */}
            <div className="mb-4">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="text-slate-500">Progress</span>
                <span className="text-white font-medium">{p.progress}%</span>
              </div>
              <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full ${
                    p.status === 'delayed' ? 'bg-red-500' :
                    p.status === 'at-risk' ? 'bg-amber-500' : 'bg-blue-500'
                  }`}
                  style={{ width: `${p.progress}%` }}
                />
              </div>
            </div>

            {/* Meta */}
            <div className="grid grid-cols-2 gap-y-2 mb-4">
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <MapPin size={11} className="text-slate-600" />{p.site}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Calendar size={11} className="text-slate-600" />{p.endDate}
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <CheckSquare size={11} className="text-slate-600" />
                {p.tasks.filter(t=>t.status==='done').length}/{p.tasks.length} tasks
              </div>
              <div className="flex items-center gap-1.5 text-xs text-slate-400">
                <Users size={11} className="text-slate-600" />{p.team} workers
              </div>
            </div>

            {/* Footer */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-800">
              <TypeBadge type={p.type} />
              <div className="flex items-center gap-2">
                <span className="text-xs text-slate-500 font-medium">{p.value}</span>
                <ChevronRight size={14} className="text-slate-600 group-hover:text-blue-400 transition" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
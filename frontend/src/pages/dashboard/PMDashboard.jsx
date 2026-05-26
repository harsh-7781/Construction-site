import {
  FolderKanban, CheckSquare, Users, AlertTriangle,
  TrendingUp, MapPin, ArrowUpRight,
  Calendar, ChevronRight
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from 'recharts'

// ── Mock Data ──────────────────────────────────────────────
const projects = [
  {
    id: 'PRJ-001',
    name: 'Oberoi Residency Tower',
    client: 'Oberoi Group',
    type: 'Civil',
    value: '₹2.4 Cr',
    progress: 68,
    status: 'on-track',
    deadline: '15 Dec 2025',
    manager: 'Sneha Desai',
    site: 'Worli, Mumbai',
    tasks: { total: 48, done: 33, pending: 15 },
    team: 24,
  },
  {
    id: 'PRJ-002',
    name: 'Kohinoor Mall Interior',
    client: 'Kohinoor Infra',
    type: 'Interior',
    value: '₹85 L',
    progress: 42,
    status: 'at-risk',
    deadline: '30 Sep 2025',
    manager: 'Sneha Desai',
    site: 'Dadar, Mumbai',
    tasks: { total: 32, done: 14, pending: 18 },
    team: 12,
  },
  {
    id: 'PRJ-003',
    name: 'Tech Park MEP Works',
    client: 'Raheja Corp',
    type: 'MEP',
    value: '₹1.1 Cr',
    progress: 81,
    status: 'on-track',
    deadline: '20 Aug 2025',
    manager: 'Sneha Desai',
    site: 'Powai, Mumbai',
    tasks: { total: 40, done: 33, pending: 7 },
    team: 18,
  },
  {
    id: 'PRJ-004',
    name: 'Villa Renovation Bandra',
    client: 'Private Client',
    type: 'Renovation',
    value: '₹38 L',
    progress: 25,
    status: 'delayed',
    deadline: '10 Oct 2025',
    manager: 'Sneha Desai',
    site: 'Bandra, Mumbai',
    tasks: { total: 20, done: 5, pending: 15 },
    team: 8,
  },
  {
    id: 'PRJ-005',
    name: 'Lodha Commercial Fit-out',
    client: 'Lodha Group',
    type: 'Interior',
    value: '₹1.8 Cr',
    progress: 55,
    status: 'on-track',
    deadline: '05 Nov 2025',
    manager: 'Sneha Desai',
    site: 'Lower Parel, Mumbai',
    tasks: { total: 55, done: 30, pending: 25 },
    team: 20,
  },
]

const tasks = [
  { id: 'T-201', project: 'Oberoi Tower',     title: 'Slab casting — Floor 14',       priority: 'high',   status: 'in-progress', due: 'Today',    assignee: 'Vikram S.' },
  { id: 'T-202', project: 'Tech Park MEP',    title: 'HVAC duct installation B-wing',  priority: 'high',   status: 'in-progress', due: 'Tomorrow', assignee: 'Ravi M.'   },
  { id: 'T-203', project: 'Kohinoor Mall',    title: 'False ceiling — Food court',     priority: 'medium', status: 'pending',     due: '05 Aug',   assignee: 'Arjun K.'  },
  { id: 'T-204', project: 'Villa Bandra',     title: 'Tile work — Master bedroom',     priority: 'low',    status: 'pending',     due: '08 Aug',   assignee: 'Suresh P.' },
  { id: 'T-205', project: 'Lodha Fit-out',    title: 'Electrical wiring — Level 3',   priority: 'high',   status: 'blocked',     due: '03 Aug',   assignee: 'Nitin D.'  },
  { id: 'T-206', project: 'Oberoi Tower',     title: 'Column shuttering — Floor 15',  priority: 'medium', status: 'pending',     due: '09 Aug',   assignee: 'Vikram S.' },
]

const weeklyProgress = [
  { day: 'Mon', planned: 12, actual: 10 },
  { day: 'Tue', planned: 15, actual: 14 },
  { day: 'Wed', planned: 10, actual: 13 },
  { day: 'Thu', planned: 18, actual: 15 },
  { day: 'Fri', planned: 14, actual: 11 },
  { day: 'Sat', planned: 8,  actual: 7  },
]

const teamMembers = [
  { name: 'Vikram Singh',  role: 'Site Supervisor', site: 'Worli',       status: 'on-site',  tasks: 8  },
  { name: 'Ravi Mehta',    role: 'MEP Engineer',    site: 'Powai',       status: 'on-site',  tasks: 6  },
  { name: 'Arjun Kumar',   role: 'Interior Lead',   site: 'Dadar',       status: 'on-site',  tasks: 5  },
  { name: 'Nitin Desai',   role: 'Electrician',     site: 'Lower Parel', status: 'delayed',  tasks: 4  },
  { name: 'Suresh Patil',  role: 'Tile Contractor', site: 'Bandra',      status: 'off-site', tasks: 3  },
]

// ── Sub-components ──────────────────────────────────────────
const KPICard = ({ label, value, sub, icon: Icon, color, trend }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      {trend && (
        <span className="flex items-center gap-1 text-xs font-medium text-green-400">
          <TrendingUp size={13} /> {trend}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-slate-400 mt-0.5">{label}</p>
    {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
  </div>
)

const StatusBadge = ({ status }) => {
  const map = {
    'on-track':    { label: 'On Track',  cls: 'bg-green-900/40 text-green-400 border-green-800' },
    'at-risk':     { label: 'At Risk',   cls: 'bg-amber-900/40 text-amber-400 border-amber-800' },
    'delayed':     { label: 'Delayed',   cls: 'bg-red-900/40   text-red-400   border-red-800'   },
    'completed':   { label: 'Done',      cls: 'bg-blue-900/40  text-blue-400  border-blue-800'  },
    'in-progress': { label: 'In Progress',cls:'bg-blue-900/40  text-blue-400  border-blue-800'  },
    'pending':     { label: 'Pending',   cls: 'bg-slate-800    text-slate-400 border-slate-700' },
    'blocked':     { label: 'Blocked',   cls: 'bg-red-900/40   text-red-400   border-red-800'   },
    'on-site':     { label: 'On Site',   cls: 'bg-green-900/40 text-green-400 border-green-800' },
    'off-site':    { label: 'Off Site',  cls: 'bg-slate-800    text-slate-400 border-slate-700' },
  }
  const { label, cls } = map[status] || map['pending']
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>
      {label}
    </span>
  )
}

const PriorityDot = ({ priority }) => {
  const colors = { high: 'bg-red-500', medium: 'bg-amber-500', low: 'bg-green-500' }
  return <span className={`w-2 h-2 rounded-full shrink-0 ${colors[priority]}`} />
}

const TypeBadge = ({ type }) => {
  const colors = {
    Civil:       'bg-blue-900/40  text-blue-400',
    Interior:    'bg-purple-900/40 text-purple-400',
    MEP:         'bg-teal-900/40  text-teal-400',
    Renovation:  'bg-amber-900/40 text-amber-400',
    Structural:  'bg-coral-900/40 text-orange-400',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium ${colors[type] || 'bg-slate-800 text-slate-400'}`}>
      {type}
    </span>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value} tasks
        </p>
      ))}
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────
export default function PMDashboard() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Project Manager Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">All projects overview · July 2025</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg transition">
            Export
          </button>
          <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition">
            + New Project
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Active Projects"  value="13"   sub="5 due this quarter"  icon={FolderKanban} color="bg-blue-600"   trend="+2 this month" />
        <KPICard label="Open Tasks"       value="124"  sub="18 due today"         icon={CheckSquare}  color="bg-purple-600" />
        <KPICard label="Team Members"     value="84"   sub="Across 5 sites"       icon={Users}        color="bg-teal-600"   />
        <KPICard label="Delayed Tasks"    value="14"   sub="Needs attention"       icon={AlertTriangle}color="bg-red-600"    />
      </div>

      {/* Project Cards */}
      <div>
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-semibold text-white">Active Projects</h2>
          <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
            View all <ArrowUpRight size={12} />
          </button>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 md:grid-cols-3 gap-4">
          {projects.map((p) => (
            <div key={p.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition cursor-pointer">

              {/* Top row */}
              <div className="flex items-start justify-between mb-3">
                <div className="flex-1 min-w-0 mr-2">
                  <p className="text-sm font-semibold text-white truncate">{p.name}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{p.client}</p>
                </div>
                <StatusBadge status={p.status} />
              </div>

              {/* Progress bar */}
              <div className="mb-3">
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-500">Progress</span>
                  <span className="text-white font-medium">{p.progress}%</span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full transition-all ${
                      p.status === 'delayed'  ? 'bg-red-500'   :
                      p.status === 'at-risk'  ? 'bg-amber-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>

              {/* Meta row */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <MapPin size={11} className="text-slate-600" />
                  {p.site}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Calendar size={11} className="text-slate-600" />
                  {p.deadline}
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <CheckSquare size={11} className="text-slate-600" />
                  {p.tasks.done}/{p.tasks.total} tasks
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-400">
                  <Users size={11} className="text-slate-600" />
                  {p.team} workers
                </div>
              </div>

              {/* Footer */}
              <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                <TypeBadge type={p.type} />
                <div className="flex items-center gap-2">
                  <span className="text-xs text-slate-500 font-medium">{p.value}</span>
                  <ChevronRight size={14} className="text-slate-600" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Weekly Progress Chart + Team */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Weekly Progress */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Weekly Task Progress</h2>
              <p className="text-xs text-slate-500">Planned vs Actual tasks completed</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={weeklyProgress} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="planned" name="Planned" fill="#334155" radius={[4, 4, 0, 0]} />
              <Bar dataKey="actual"  name="Actual"  fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Team Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Team Status</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300">View all</button>
          </div>
          <div className="space-y-3">
            {teamMembers.map((m, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {m.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-medium text-white truncate">{m.name}</p>
                  <p className="text-xs text-slate-500">{m.role} · {m.site}</p>
                </div>
                <div className="text-right shrink-0">
                  <StatusBadge status={m.status} />
                  <p className="text-xs text-slate-600 mt-1">{m.tasks} tasks</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Task List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Task Tracker</h2>
          <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition">
            + Add Task
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-800">
                <th className="text-left pb-3 font-medium">Task</th>
                <th className="text-left pb-3 font-medium">Project</th>
                <th className="text-left pb-3 font-medium">Assignee</th>
                <th className="text-left pb-3 font-medium">Priority</th>
                <th className="text-left pb-3 font-medium">Due</th>
                <th className="text-left pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {tasks.map((t) => (
                <tr key={t.id} className="hover:bg-slate-800/50 transition cursor-pointer">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <PriorityDot priority={t.priority} />
                      <span className="text-slate-300 font-medium">{t.title}</span>
                    </div>
                  </td>
                  <td className="py-3 text-slate-500 text-xs">{t.project}</td>
                  <td className="py-3 text-slate-400 text-xs">{t.assignee}</td>
                  <td className="py-3">
                    <span className={`text-xs font-medium capitalize ${
                      t.priority === 'high'   ? 'text-red-400'   :
                      t.priority === 'medium' ? 'text-amber-400' : 'text-green-400'
                    }`}>
                      {t.priority}
                    </span>
                  </td>
                  <td className="py-3 text-slate-400 text-xs">{t.due}</td>
                  <td className="py-3"><StatusBadge status={t.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
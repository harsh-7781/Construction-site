import {
  HardHat, AlertTriangle,
   Camera, MapPin, Users, TrendingUp,
  ArrowUpRight, Wrench,  Sun,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

// ── Mock Data ──────────────────────────────────────────────
const attendanceData = [
  { day: 'Mon', present: 22, absent: 3 },
  { day: 'Tue', present: 24, absent: 1 },
  { day: 'Wed', present: 20, absent: 5 },
  { day: 'Thu', present: 23, absent: 2 },
  { day: 'Fri', present: 21, absent: 4 },
  { day: 'Sat', present: 18, absent: 7 },
]

const todayTasks = [
  { id: 'ST-01', work: 'Slab casting — Floor 14',        crew: 'Concrete team A', workers: 8,  status: 'in-progress', pct: 65 },
  { id: 'ST-02', work: 'Column shuttering — Floor 15',   crew: 'Shuttering team', workers: 5,  status: 'pending',     pct: 0  },
  { id: 'ST-03', work: 'Rebar tying — Floor 14 east',    crew: 'Steel fixers',    workers: 6,  status: 'done',        pct: 100},
  { id: 'ST-04', work: 'Waterproofing — Basement 2',     crew: 'WP crew',         workers: 4,  status: 'in-progress', pct: 40 },
  { id: 'ST-05', work: 'Backfilling — North side',       crew: 'Excavation team', workers: 3,  status: 'blocked',     pct: 20 },
]

const materials = [
  { name: 'TMT Steel Bars',    unit: 'MT',  stock: 12.5, required: 18.0, status: 'low'    },
  { name: 'Ready Mix Concrete',unit: 'M³',  stock: 45.0, required: 45.0, status: 'ok'     },
  { name: 'Bricks (Red)',      unit: 'Nos', stock: 8200, required: 5000, status: 'ok'     },
  { name: 'Cement Bags',       unit: 'Bags',stock: 180,  required: 350,  status: 'low'    },
  { name: 'Plywood Sheets',    unit: 'Nos', stock: 0,    required: 40,   status: 'out'    },
  { name: 'Binding Wire',      unit: 'Kg',  stock: 85,   required: 60,   status: 'ok'     },
]

const issues = [
  { id: 'ISS-12', desc: 'Plywood shortage — shuttering halted',       priority: 'high',   raised: '08:30 AM', status: 'open'     },
  { id: 'ISS-11', desc: 'Crane breakdown — Floor 14 access delayed',   priority: 'high',   raised: 'Yesterday',status: 'open'     },
  { id: 'ISS-10', desc: 'Safety harness missing — 3 workers',          priority: 'medium', raised: 'Yesterday',status: 'resolved' },
  { id: 'ISS-09', desc: 'Concrete mixer making noise',                  priority: 'low',    raised: '2 days ago',status:'resolved' },
]

const workers = [
  { name: 'Ram Shinde',    trade: 'Mason',        status: 'present', floor: '14' },
  { name: 'Sunil Kamble',  trade: 'Steel fixer',  status: 'present', floor: '14' },
  { name: 'Ganesh More',   trade: 'Carpenter',    status: 'absent',  floor: '—'  },
  { name: 'Anil Pawar',    trade: 'Helper',       status: 'present', floor: 'B2' },
  { name: 'Deepak Jadhav', trade: 'Electrician',  status: 'present', floor: '13' },
  { name: 'Raju Salve',    trade: 'Plumber',      status: 'absent',  floor: '—'  },
]

// ── Sub-components ──────────────────────────────────────────
const KPICard = ({ label, value, sub, icon: Icon, color }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-slate-400 mt-0.5">{label}</p>
    {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
  </div>
)

const StatusBadge = ({ status }) => {
  const map = {
    'in-progress': { label: 'In Progress', cls: 'bg-blue-900/40  text-blue-400  border-blue-800'  },
    'pending':     { label: 'Pending',     cls: 'bg-slate-800    text-slate-400 border-slate-700' },
    'done':        { label: 'Done',        cls: 'bg-green-900/40 text-green-400 border-green-800' },
    'blocked':     { label: 'Blocked',     cls: 'bg-red-900/40   text-red-400   border-red-800'   },
    'open':        { label: 'Open',        cls: 'bg-red-900/40   text-red-400   border-red-800'   },
    'resolved':    { label: 'Resolved',    cls: 'bg-green-900/40 text-green-400 border-green-800' },
    'present':     { label: 'Present',     cls: 'bg-green-900/40 text-green-400 border-green-800' },
    'absent':      { label: 'Absent',      cls: 'bg-red-900/40   text-red-400   border-red-800'   },
    'low':         { label: 'Low Stock',   cls: 'bg-amber-900/40 text-amber-400 border-amber-800' },
    'out':         { label: 'Out of Stock',cls: 'bg-red-900/40   text-red-400   border-red-800'   },
    'ok':          { label: 'Sufficient',  cls: 'bg-green-900/40 text-green-400 border-green-800' },
  }
  const { label, cls } = map[status] || map['pending']
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>
      {label}
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
          {p.name}: {p.value}
        </p>
      ))}
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────
export default function SupervisorDashboard() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Site Dashboard</h1>
          <div className="flex items-center gap-2 mt-1">
            <MapPin size={12} className="text-slate-500" />
            <p className="text-slate-400 text-sm">Oberoi Residency Tower — Worli, Mumbai</p>
          </div>
        </div>
        <div className="flex gap-2">
          {/* Weather widget */}
          <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5">
            <Sun size={15} className="text-amber-400" />
            <span className="text-xs text-slate-300">32°C · Clear</span>
          </div>
          <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1">
            <Camera size={13} /> Submit DPR
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Workers Today"    value="22/25"  sub="3 absent today"      icon={HardHat}      color="bg-blue-600"   />
        <KPICard label="Tasks In Progress"value="3"      sub="2 pending start"      icon={Wrench}       color="bg-purple-600" />
        <KPICard label="Open Issues"      value="2"      sub="1 high priority"      icon={AlertTriangle}color="bg-red-600"    />
        <KPICard label="Today Progress"   value="64%"    sub="vs 70% planned"       icon={TrendingUp}   color="bg-teal-600"   />
      </div>

      {/* Today's Work + Material Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Today Tasks */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Today's Work Plan</h2>
            <button className="text-xs bg-blue-600/20 text-blue-400 border border-blue-800 px-2 py-1 rounded-lg">
              + Add Work Item
            </button>
          </div>
          <div className="space-y-3">
            {todayTasks.map((t) => (
              <div key={t.id} className="bg-slate-800/50 border border-slate-800 rounded-lg p-3">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <p className="text-sm font-medium text-white">{t.work}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Users size={10} /> {t.workers} workers · {t.crew}
                      </span>
                    </div>
                  </div>
                  <StatusBadge status={t.status} />
                </div>
                {t.status !== 'pending' && (
                  <div className="flex items-center gap-2 mt-2">
                    <div className="flex-1 h-1.5 bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${
                          t.status === 'done'    ? 'bg-green-500' :
                          t.status === 'blocked' ? 'bg-red-500'   : 'bg-blue-500'
                        }`}
                        style={{ width: `${t.pct}%` }}
                      />
                    </div>
                    <span className="text-xs text-slate-500 w-8 text-right">{t.pct}%</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Material Status */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Material Stock</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300">Request</button>
          </div>
          <div className="space-y-3">
            {materials.map((m, i) => (
              <div key={i} className="flex items-center justify-between">
                <div className="flex-1 min-w-0 mr-3">
                  <p className="text-xs font-medium text-slate-300 truncate">{m.name}</p>
                  <p className="text-xs text-slate-600 mt-0.5">
                    {m.stock} / {m.required} {m.unit}
                  </p>
                  <div className="h-1 bg-slate-800 rounded-full overflow-hidden mt-1">
                    <div
                      className={`h-full rounded-full ${
                        m.status === 'out' ? 'bg-red-500'   :
                        m.status === 'low' ? 'bg-amber-500' : 'bg-green-500'
                      }`}
                      style={{ width: `${Math.min((m.stock / m.required) * 100, 100)}%` }}
                    />
                  </div>
                </div>
                <StatusBadge status={m.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Attendance Chart + Issues */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Attendance Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Worker Attendance</h2>
              <p className="text-xs text-slate-500">This week</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={attendanceData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="day"     tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis                   tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Bar dataKey="present" name="Present" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="absent"  name="Absent"  fill="#ef4444" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Site Issues */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Site Issues</h2>
            <button className="text-xs bg-red-600/20 text-red-400 border border-red-800 px-2 py-1 rounded-lg">
              + Raise Issue
            </button>
          </div>
          <div className="space-y-3">
            {issues.map((iss) => (
              <div key={iss.id} className="flex items-start gap-3 pb-3 border-b border-slate-800 last:border-0 last:pb-0">
                <div className={`w-1.5 h-1.5 rounded-full mt-1.5 shrink-0 ${
                  iss.priority === 'high'   ? 'bg-red-500'   :
                  iss.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-500'
                }`} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">{iss.desc}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{iss.id} · {iss.raised}</p>
                </div>
                <StatusBadge status={iss.status} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Worker List */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Worker Register — Today</h2>
          <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
            Full register <ArrowUpRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-800">
                <th className="text-left pb-3 font-medium">Worker</th>
                <th className="text-left pb-3 font-medium">Trade</th>
                <th className="text-left pb-3 font-medium">Floor / Zone</th>
                <th className="text-left pb-3 font-medium">Attendance</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {workers.map((w, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition">
                  <td className="py-3">
                    <div className="flex items-center gap-2">
                      <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold">
                        {w.name.charAt(0)}
                      </div>
                      <span className="text-slate-300 font-medium text-xs">{w.name}</span>
                    </div>
                  </td>
                  <td className="py-3 text-slate-400 text-xs">{w.trade}</td>
                  <td className="py-3 text-slate-400 text-xs">Floor {w.floor}</td>
                  <td className="py-3"><StatusBadge status={w.status} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
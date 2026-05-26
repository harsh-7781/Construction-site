import {
  TrendingUp, TrendingDown, Building2, Users, IndianRupee,
  HardHat, AlertCircle, CheckCircle2, Clock, ArrowUpRight
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell
} from 'recharts'

// ── Mock Data ──────────────────────────────────────────────
const revenueData = [
  { month: 'Jan', revenue: 42, expense: 28 },
  { month: 'Feb', revenue: 58, expense: 35 },
  { month: 'Mar', revenue: 51, expense: 30 },
  { month: 'Apr', revenue: 74, expense: 42 },
  { month: 'May', revenue: 68, expense: 38 },
  { month: 'Jun', revenue: 89, expense: 51 },
  { month: 'Jul', revenue: 95, expense: 55 },
  { month: 'Aug', revenue: 82, expense: 48 },
]

const projectStatusData = [
  { name: 'On Track',  value: 8,  color: '#22c55e' },
  { name: 'At Risk',   value: 3,  color: '#f59e0b' },
  { name: 'Delayed',   value: 2,  color: '#ef4444' },
  { name: 'Completed', value: 12, color: '#3b82f6' },
]

const serviceData = [
  { service: 'Architecture', projects: 6,  revenue: 38 },
  { service: 'Interior',     projects: 8,  revenue: 52 },
  { service: 'Civil',        projects: 5,  revenue: 71 },
  { service: 'MEP',          projects: 4,  revenue: 29 },
  { service: 'Renovation',   projects: 7,  revenue: 44 },
]

const recentProjects = [
  { name: 'Oberoi Residency Tower',  client: 'Oberoi Group',    value: '₹2.4 Cr', status: 'on-track',  progress: 68, type: 'Civil' },
  { name: 'Kohinoor Mall Interior',  client: 'Kohinoor Infra',  value: '₹85 L',   status: 'at-risk',   progress: 42, type: 'Interior' },
  { name: 'Tech Park MEP Works',     client: 'Raheja Corp',     value: '₹1.1 Cr', status: 'on-track',  progress: 81, type: 'MEP' },
  { name: 'Villa Renovation Bandra', client: 'Private Client',  value: '₹38 L',   status: 'delayed',   progress: 25, type: 'Renovation' },
  { name: 'Structural Audit SEEPZ',  client: 'MIDC',            value: '₹62 L',   status: 'completed', progress: 100, type: 'Structural' },
]

const activities = [
  { text: 'Quotation #QT-2041 approved by Oberoi Group',   time: '10 min ago',  type: 'success' },
  { text: 'Material delivery delayed — Kohinoor site',      time: '1 hr ago',    type: 'warning' },
  { text: 'New lead: Lodha Group — Residential Complex',    time: '2 hrs ago',   type: 'info' },
  { text: 'Invoice #INV-318 paid — ₹14.5L received',       time: '3 hrs ago',   type: 'success' },
  { text: 'Contract signed — Tech Park Phase 2',            time: 'Yesterday',   type: 'success' },
  { text: 'Site inspection due — Villa Bandra tomorrow',    time: 'Yesterday',   type: 'warning' },
]

// ── Sub-components ─────────────────────────────────────────
const KPICard = ({ label, value, sub, icon: Icon, trend, trendVal, color }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      <span className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
        {trend === 'up' ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
        {trendVal}
      </span>
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-slate-400 mt-0.5">{label}</p>
    {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
  </div>
)

const StatusBadge = ({ status }) => {
  const map = {
    'on-track':  { label: 'On Track',  cls: 'bg-green-900/40 text-green-400 border-green-800' },
    'at-risk':   { label: 'At Risk',   cls: 'bg-amber-900/40 text-amber-400 border-amber-800' },
    'delayed':   { label: 'Delayed',   cls: 'bg-red-900/40 text-red-400 border-red-800' },
    'completed': { label: 'Completed', cls: 'bg-blue-900/40 text-blue-400 border-blue-800' },
  }
  const { label, cls } = map[status] || map['on-track']
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>
      {label}
    </span>
  )
}

const ActivityIcon = ({ type }) => {
  if (type === 'success') return <CheckCircle2 size={15} className="text-green-400 shrink-0 mt-0.5" />
  if (type === 'warning') return <AlertCircle  size={15} className="text-amber-400 shrink-0 mt-0.5" />
  return                         <Clock        size={15} className="text-blue-400  shrink-0 mt-0.5" />
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: ₹{p.value}L
        </p>
      ))}
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────
export default function CEODashboard() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Executive Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">Business overview · July 2025</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-xs text-slate-400">Live data</span>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Revenue"     value="₹4.82 Cr" sub="FY 2025–26"       icon={IndianRupee} trend="up"   trendVal="+18%"  color="bg-blue-600" />
        <KPICard label="Active Projects"   value="13"        sub="3 need attention"  icon={Building2}   trend="up"   trendVal="+3"    color="bg-purple-600" />
        <KPICard label="Active Clients"    value="27"        sub="6 new this month"  icon={Users}       trend="up"   trendVal="+22%"  color="bg-teal-600" />
        <KPICard label="On-Site Workers"   value="84"        sub="Across all sites"  icon={HardHat}     trend="down" trendVal="-5"    color="bg-amber-600" />
      </div>

      {/* Revenue Chart + Project Status */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Revenue Area Chart */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Revenue vs Expense</h2>
              <p className="text-xs text-slate-500">In Lakhs (₹)</p>
            </div>
            <span className="text-xs bg-blue-600/20 text-blue-400 border border-blue-800 px-2 py-1 rounded-lg">
              This Year
            </span>
          </div>
          <ResponsiveContainer width="100%" height={200}>
            <AreaChart data={revenueData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="revGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="expGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="revenue" name="Revenue" stroke="#3b82f6" strokeWidth={2} fill="url(#revGrad)" />
              <Area type="monotone" dataKey="expense" name="Expense" stroke="#ef4444" strokeWidth={2} fill="url(#expGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Project Status Pie */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-1">Project Status</h2>
          <p className="text-xs text-slate-500 mb-3">25 total projects</p>
          <ResponsiveContainer width="100%" height={140}>
            <PieChart>
              <Pie data={projectStatusData} cx="50%" cy="50%" innerRadius={45} outerRadius={65} paddingAngle={3} dataKey="value">
                {projectStatusData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
                itemStyle={{ color: '#e2e8f0' }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-2">
            {projectStatusData.map((d) => (
              <div key={d.name} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ background: d.color }} />
                  <span className="text-slate-400">{d.name}</span>
                </div>
                <span className="text-white font-medium">{d.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Service Bar Chart + Activity Feed */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Service Revenue Bar */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-1">Revenue by Service</h2>
          <p className="text-xs text-slate-500 mb-4">In Lakhs (₹)</p>
          <ResponsiveContainer width="100%" height={180}>
            <BarChart data={serviceData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="service" tick={{ fill: '#64748b', fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip
                contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: 8, fontSize: 12 }}
                itemStyle={{ color: '#e2e8f0' }}
                formatter={(v) => [`₹${v}L`, 'Revenue']}
              />
              <Bar dataKey="revenue" fill="#3b82f6" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Activity Feed */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Recent Activity</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="space-y-3">
            {activities.map((a, i) => (
              <div key={i} className="flex items-start gap-3 pb-3 border-b border-slate-800 last:border-0 last:pb-0">
                <ActivityIcon type={a.type} />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-slate-300">{a.text}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{a.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Projects Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Active Projects</h2>
          <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
            View all projects <ArrowUpRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-800">
                <th className="text-left pb-3 font-medium">Project</th>
                <th className="text-left pb-3 font-medium">Client</th>
                <th className="text-left pb-3 font-medium">Type</th>
                <th className="text-left pb-3 font-medium">Value</th>
                <th className="text-left pb-3 font-medium">Progress</th>
                <th className="text-left pb-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {recentProjects.map((p, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition cursor-pointer">
                  <td className="py-3 font-medium text-white">{p.name}</td>
                  <td className="py-3 text-slate-400">{p.client}</td>
                  <td className="py-3">
                    <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded">
                      {p.type}
                    </span>
                  </td>
                  <td className="py-3 text-slate-300 font-medium">{p.value}</td>
                  <td className="py-3 w-32">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full rounded-full bg-blue-500"
                          style={{ width: `${p.progress}%` }}
                        />
                      </div>
                      <span className="text-xs text-slate-500 w-8">{p.progress}%</span>
                    </div>
                  </td>
                  <td className="py-3">
                    <StatusBadge status={p.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  )
}
import { useState } from 'react'
import {
  Users, Phone, Mail, MapPin, Plus, Search,
  Filter, TrendingUp,
  Clock, IndianRupee, ChevronRight, MoreVertical,
  Star, Building2,
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

// ── Mock Data ──────────────────────────────────────────────
const pipelineStages = [
  { id: 'new',        label: 'New Lead',    color: 'bg-slate-600',  count: 8,  value: '₹3.2 Cr' },
  { id: 'contacted',  label: 'Contacted',   color: 'bg-blue-600',   count: 6,  value: '₹2.8 Cr' },
  { id: 'proposal',   label: 'Proposal',    color: 'bg-purple-600', count: 4,  value: '₹4.1 Cr' },
  { id: 'negotiation',label: 'Negotiation', color: 'bg-amber-600',  count: 3,  value: '₹2.5 Cr' },
  { id: 'won',        label: 'Won',         color: 'bg-green-600',  count: 12, value: '₹9.8 Cr' },
  { id: 'lost',       label: 'Lost',        color: 'bg-red-600',    count: 4,  value: '₹1.2 Cr' },
]

const leads = [
  {
    id: 'LD-101', name: 'Lodha Group',         contact: 'Abhishek Lodha',    phone: '+91 98200 11234',
    email: 'abhishek@lodha.com',   location: 'Lower Parel, Mumbai', service: 'Civil',
    value: '₹3.2 Cr', stage: 'proposal',    priority: 'high',   date: '28 Jul 2025',
    nextFollow: 'Tomorrow',        notes: 'Interested in residential tower, needs detailed BOQ',
    rating: 5,
  },
  {
    id: 'LD-102', name: 'Godrej Properties',   contact: 'Pirojsha Godrej',   phone: '+91 98200 22345',
    email: 'pirojsha@godrej.com',  location: 'Vikhroli, Mumbai',    service: 'Interior',
    value: '₹1.8 Cr', stage: 'negotiation', priority: 'high',   date: '25 Jul 2025',
    nextFollow: 'Today',           notes: 'Price negotiation ongoing, 15% discount requested',
    rating: 4,
  },
  {
    id: 'LD-103', name: 'Hiranandani Group',   contact: 'Niranjan Hiranandani', phone: '+91 98200 33456',
    email: 'contact@hiranandani.com', location: 'Powai, Mumbai',   service: 'MEP',
    value: '₹95 L',   stage: 'contacted',   priority: 'medium', date: '22 Jul 2025',
    nextFollow: '05 Aug',          notes: 'Initial meeting done, sent company profile',
    rating: 3,
  },
  {
    id: 'LD-104', name: 'Kalpataru Ltd',       contact: 'Mofatraj Munot',    phone: '+91 98200 44567',
    email: 'mofatraj@kalpataru.com', location: 'Thane, Mumbai',    service: 'Structural',
    value: '₹2.1 Cr', stage: 'new',          priority: 'medium', date: '20 Jul 2025',
    nextFollow: '08 Aug',          notes: 'Referral from Raheja Corp, needs structural audit',
    rating: 3,
  },
  {
    id: 'LD-105', name: 'Rustomjee Developers',contact: 'Boman Irani',       phone: '+91 98200 55678',
    email: 'boman@rustomjee.com',  location: 'Bandra, Mumbai',     service: 'Renovation',
    value: '₹45 L',   stage: 'won',          priority: 'low',    date: '15 Jul 2025',
    nextFollow: 'Done',            notes: 'Contract signed, project starts Aug 10',
    rating: 5,
  },
  {
    id: 'LD-106', name: 'Shapoorji Pallonji',  contact: 'Shapoor Mistry',    phone: '+91 98200 66789',
    email: 'shapoor@sp.com',       location: 'Nariman Point, Mumbai', service: 'Civil',
    value: '₹5.5 Cr', stage: 'proposal',    priority: 'high',   date: '18 Jul 2025',
    nextFollow: '03 Aug',          notes: 'Large commercial project, sent proposal v2',
    rating: 4,
  },
]

const clients = [
  { name: 'Oberoi Group',   projects: 3, totalValue: '₹6.2 Cr', since: '2022', status: 'active' },
  { name: 'Raheja Corp',    projects: 2, totalValue: '₹3.8 Cr', since: '2021', status: 'active' },
  { name: 'Kohinoor Infra', projects: 1, totalValue: '₹85 L',   since: '2024', status: 'active' },
  { name: 'MIDC',           projects: 4, totalValue: '₹2.1 Cr', since: '2020', status: 'active' },
  { name: 'Lodha Group',    projects: 1, totalValue: '₹1.8 Cr', since: '2025', status: 'new'    },
]

const conversionData = [
  { month: 'Mar', leads: 12, won: 4 },
  { month: 'Apr', leads: 15, won: 6 },
  { month: 'May', leads: 10, won: 3 },
  { month: 'Jun', leads: 18, won: 8 },
  { month: 'Jul', leads: 14, won: 5 },
]

const followUps = [
  { lead: 'Godrej Properties',    contact: 'Pirojsha Godrej',  time: 'Today 3:00 PM',  type: 'Call'    },
  { lead: 'Lodha Group',          contact: 'Abhishek Lodha',   time: 'Tomorrow 11 AM', type: 'Meeting' },
  { lead: 'Shapoorji Pallonji',   contact: 'Shapoor Mistry',   time: '03 Aug 2:00 PM', type: 'Call'    },
  { lead: 'Hiranandani Group',    contact: 'Niranjan H.',      time: '05 Aug 10 AM',   type: 'Site visit'},
]

// ── Sub-components ──────────────────────────────────────────
const KPICard = ({ label, value, sub, icon: Icon, color }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
    <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color} mb-3`}>
      <Icon size={20} className="text-white" />
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-slate-400 mt-0.5">{label}</p>
    {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
  </div>
)

const StageBadge = ({ stage }) => {
  const map = {
    new:         { label: 'New Lead',    cls: 'bg-slate-800    text-slate-300 border-slate-700' },
    contacted:   { label: 'Contacted',   cls: 'bg-blue-900/40  text-blue-400  border-blue-800'  },
    proposal:    { label: 'Proposal',    cls: 'bg-purple-900/40 text-purple-400 border-purple-800'},
    negotiation: { label: 'Negotiation', cls: 'bg-amber-900/40 text-amber-400 border-amber-800' },
    won:         { label: 'Won',         cls: 'bg-green-900/40 text-green-400 border-green-800' },
    lost:        { label: 'Lost',        cls: 'bg-red-900/40   text-red-400   border-red-800'   },
  }
  const { label, cls } = map[stage] || map['new']
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

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star
        key={i}
        size={11}
        className={i <= rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}
      />
    ))}
  </div>
)

const ServiceTag = ({ service }) => {
  const colors = {
    Civil:      'bg-blue-900/40  text-blue-400',
    Interior:   'bg-purple-900/40 text-purple-400',
    MEP:        'bg-teal-900/40  text-teal-400',
    Renovation: 'bg-amber-900/40 text-amber-400',
    Structural: 'bg-orange-900/40 text-orange-400',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium ${colors[service] || 'bg-slate-800 text-slate-400'}`}>
      {service}
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
export default function CRMPage() {
  const [activeTab, setActiveTab]     = useState('leads')
  const [searchQuery, setSearchQuery] = useState('')
  const [stageFilter, setStageFilter] = useState('all')

  const filteredLeads = leads.filter(l => {
    const matchSearch = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                        l.contact.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStage  = stageFilter === 'all' || l.stage === stageFilter
    return matchSearch && matchStage
  })

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">CRM & Sales</h1>
          <p className="text-slate-400 text-sm mt-0.5">Lead pipeline, clients & follow-ups</p>
        </div>
        <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1">
          <Plus size={14} /> Add Lead
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Leads"      value="37"       sub="8 new this month"    icon={Users}       color="bg-blue-600"   />
        <KPICard label="Pipeline Value"   value="₹23.6 Cr" sub="Active opportunities" icon={IndianRupee} color="bg-purple-600" />
        <KPICard label="Conversion Rate"  value="38%"      sub="+5% vs last month"   icon={TrendingUp}  color="bg-green-600"  />
        <KPICard label="Follow-ups Due"   value="4"        sub="2 due today"          icon={Clock}       color="bg-amber-600"  />
      </div>

      {/* Pipeline Stages */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h2 className="text-sm font-semibold text-white mb-4">Sales Pipeline</h2>
        <div className="grid grid-cols-3 lg:grid-cols-6 gap-3">
          {pipelineStages.map((stage) => (
            <button
              key={stage.id}
              onClick={() => setStageFilter(stage.id === stageFilter ? 'all' : stage.id)}
              className={`text-left p-3 rounded-xl border transition ${
                stageFilter === stage.id
                  ? 'border-blue-500 bg-blue-600/10'
                  : 'border-slate-800 bg-slate-800/50 hover:border-slate-700'
              }`}
            >
              <div className={`w-8 h-8 rounded-lg ${stage.color} flex items-center justify-center mb-2`}>
                <span className="text-white text-xs font-bold">{stage.count}</span>
              </div>
              <p className="text-xs font-medium text-white">{stage.label}</p>
              <p className="text-xs text-slate-500 mt-0.5">{stage.value}</p>
            </button>
          ))}
        </div>
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 w-fit">
        {['leads', 'clients', 'analytics'].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition capitalize ${
              activeTab === tab
                ? 'bg-blue-600 text-white'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* ── LEADS TAB ── */}
      {activeTab === 'leads' && (
        <div className="space-y-4">

          {/* Search + Filter */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 flex-1 max-w-sm">
              <Search size={14} className="text-slate-500" />
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search leads..."
                className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"
              />
            </div>
            <button className="flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 px-3 py-2 rounded-lg transition">
              <Filter size={13} /> Filter
            </button>
          </div>

          {/* Leads Table */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800 bg-slate-900">
                  <th className="text-left px-5 py-3 font-medium">Lead</th>
                  <th className="text-left px-5 py-3 font-medium">Contact</th>
                  <th className="text-left px-5 py-3 font-medium">Service</th>
                  <th className="text-left px-5 py-3 font-medium">Value</th>
                  <th className="text-left px-5 py-3 font-medium">Stage</th>
                  <th className="text-left px-5 py-3 font-medium">Next Follow-up</th>
                  <th className="text-left px-5 py-3 font-medium">Rating</th>
                  <th className="px-5 py-3" />
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredLeads.map((lead) => (
                  <tr key={lead.id} className="hover:bg-slate-800/50 transition cursor-pointer">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <PriorityDot priority={lead.priority} />
                        <div>
                          <p className="font-medium text-white text-sm">{lead.name}</p>
                          <div className="flex items-center gap-1 mt-0.5">
                            <MapPin size={10} className="text-slate-600" />
                            <p className="text-xs text-slate-500">{lead.location}</p>
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <p className="text-xs text-slate-300">{lead.contact}</p>
                      <div className="flex items-center gap-3 mt-1">
                        <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-400 transition">
                          <Phone size={10} /> Call
                        </button>
                        <button className="flex items-center gap-1 text-xs text-slate-500 hover:text-blue-400 transition">
                          <Mail size={10} /> Mail
                        </button>
                      </div>
                    </td>
                    <td className="px-5 py-4">
                      <ServiceTag service={lead.service} />
                    </td>
                    <td className="px-5 py-4 text-white font-medium">{lead.value}</td>
                    <td className="px-5 py-4">
                      <StageBadge stage={lead.stage} />
                    </td>
                    <td className="px-5 py-4 text-xs text-slate-400">{lead.nextFollow}</td>
                    <td className="px-5 py-4">
                      <StarRating rating={lead.rating} />
                    </td>
                    <td className="px-5 py-4">
                      <button className="text-slate-500 hover:text-white transition">
                        <MoreVertical size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── CLIENTS TAB ── */}
      {activeTab === 'clients' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {clients.map((c, i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition cursor-pointer">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-800 flex items-center justify-center">
                      <Building2 size={18} className="text-blue-400" />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{c.name}</p>
                      <p className="text-xs text-slate-500">Client since {c.since}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                    c.status === 'new'
                      ? 'bg-blue-900/40 text-blue-400 border-blue-800'
                      : 'bg-green-900/40 text-green-400 border-green-800'
                  }`}>
                    {c.status === 'new' ? 'New' : 'Active'}
                  </span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-xs text-slate-500">Projects</p>
                    <p className="text-lg font-bold text-white">{c.projects}</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-3">
                    <p className="text-xs text-slate-500">Total Value</p>
                    <p className="text-sm font-bold text-white">{c.totalValue}</p>
                  </div>
                </div>
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-slate-800">
                  <div className="flex gap-2">
                    <button className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 transition">
                      <Phone size={11} /> Call
                    </button>
                    <button className="text-xs text-slate-400 hover:text-blue-400 flex items-center gap-1 transition">
                      <Mail size={11} /> Email
                    </button>
                  </div>
                  <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                    View <ChevronRight size={12} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ANALYTICS TAB ── */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Conversion Chart */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-1">Lead Conversion</h2>
            <p className="text-xs text-slate-500 mb-4">Leads vs Won deals per month</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={conversionData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
                <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip content={<CustomTooltip />} />
                <Bar dataKey="leads" name="Leads" fill="#334155" radius={[4,4,0,0]} />
                <Bar dataKey="won"   name="Won"   fill="#22c55e" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>

          {/* Follow-ups Due */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-sm font-semibold text-white">Upcoming Follow-ups</h2>
              <button className="text-xs bg-blue-600/20 text-blue-400 border border-blue-800 px-2 py-1 rounded-lg">
                + Schedule
              </button>
            </div>
            <div className="space-y-3">
              {followUps.map((f, i) => (
                <div key={i} className="flex items-center gap-3 p-3 bg-slate-800/50 border border-slate-800 rounded-lg">
                  <div className="w-8 h-8 rounded-full bg-blue-600/20 border border-blue-800 flex items-center justify-center shrink-0">
                    {f.type === 'Call'
                      ? <Phone    size={14} className="text-blue-400" />
                      : f.type === 'Meeting'
                      ? <Users    size={14} className="text-purple-400" />
                      : <MapPin   size={14} className="text-teal-400" />
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white">{f.lead}</p>
                    <p className="text-xs text-slate-500">{f.contact} · {f.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-xs text-amber-400 font-medium">{f.time}</p>
                    <button className="text-xs text-blue-400 hover:text-blue-300 mt-0.5">Mark done</button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Service Distribution */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Leads by Service Type</h2>
            <div className="space-y-3">
              {[
                { service: 'Civil',      count: 12, pct: 32, color: 'bg-blue-500'   },
                { service: 'Interior',   count: 9,  pct: 24, color: 'bg-purple-500' },
                { service: 'MEP',        count: 7,  pct: 19, color: 'bg-teal-500'   },
                { service: 'Renovation', count: 5,  pct: 14, color: 'bg-amber-500'  },
                { service: 'Structural', count: 4,  pct: 11, color: 'bg-orange-500' },
              ].map((s) => (
                <div key={s.service}>
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-slate-400">{s.service}</span>
                    <span className="text-white font-medium">{s.count} leads <span className="text-slate-500">({s.pct}%)</span></span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${s.color}`} style={{ width: `${s.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Win/Loss Summary */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Win / Loss Summary</h2>
            <div className="grid grid-cols-2 gap-3 mb-4">
              <div className="bg-green-900/20 border border-green-900 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-green-400">12</p>
                <p className="text-xs text-slate-400 mt-1">Deals Won</p>
                <p className="text-xs text-green-400 font-medium mt-0.5">₹9.8 Cr</p>
              </div>
              <div className="bg-red-900/20 border border-red-900 rounded-xl p-4 text-center">
                <p className="text-2xl font-bold text-red-400">4</p>
                <p className="text-xs text-slate-400 mt-1">Deals Lost</p>
                <p className="text-xs text-red-400 font-medium mt-0.5">₹1.2 Cr</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Win rate</span>
                <span className="text-white font-medium">75%</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Avg deal size</span>
                <span className="text-white font-medium">₹81.6 L</span>
              </div>
              <div className="flex justify-between text-xs">
                <span className="text-slate-400">Avg sales cycle</span>
                <span className="text-white font-medium">42 days</span>
              </div>
            </div>
          </div>

        </div>
      )}

    </div>
  )
}
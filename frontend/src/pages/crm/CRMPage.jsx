import { useState } from 'react'
import {
  Users, Phone, Mail, MapPin, Plus, Search,
  Filter, TrendingUp, Clock, ChevronRight, MoreVertical,
   Calendar, Eye, Target, Zap, Activity,
  PhoneCall, MessageSquare, FileText, AlertTriangle, Flame
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

// ── DATA ──────────────────────────────────────────────────
const STAGE_WEIGHTS = {
  inquiry:       0.10,
  site_visit:    0.25,
  proposal_sent: 0.40,
  negotiation:   0.55,
  verbal_win:    0.80,
  po_received:   1.00,
  lost:          0.00,
}

const STAGE_LABELS = {
  inquiry:       'Inquiry',
  site_visit:    'Site Visit Done',
  proposal_sent: 'Proposal Sent',
  negotiation:   'Negotiation',
  verbal_win:    'Verbal Win',
  po_received:   'PO Received',
  lost:          'Lost',
}

const leads = [
  {
    id:'LD-101', name:'Lodha Group',
    contact:'Abhishek Lodha',     phone:'+91 98200 11234', email:'abhishek@lodha.com',
    location:'Lower Parel, Mumbai', service:'Civil',      type:'Commercial',
    value:32000000, stage:'proposal_sent', priority:'high',
    date:'28 Jul 2025', nextFollow:'Tomorrow',
    source:'Builder Tie-up', daysSinceLastActivity:2,
    notes:'Residential tower — needs detailed BOQ. Very interested.',
    rating:5, leadScore:88,
    salesCycleDays:22,
  },
  {
    id:'LD-102', name:'Godrej Properties',
    contact:'Pirojsha Godrej',    phone:'+91 98200 22345', email:'pirojsha@godrej.com',
    location:'Vikhroli, Mumbai',  service:'Interior',     type:'Residential',
    value:18000000, stage:'negotiation', priority:'high',
    date:'25 Jul 2025', nextFollow:'Today',
    source:'Architect Referral', daysSinceLastActivity:0,
    notes:'Price negotiation — 12% discount requested. Counter with 8%.',
    rating:4, leadScore:75,
    salesCycleDays:34,
  },
  {
    id:'LD-103', name:'Hiranandani Group',
    contact:'Niranjan Hiranandani',phone:'+91 98200 33456',email:'contact@hiranandani.com',
    location:'Powai, Mumbai',     service:'MEP',          type:'Commercial',
    value:9500000, stage:'site_visit', priority:'medium',
    date:'22 Jul 2025', nextFollow:'05 Aug',
    source:'Website/SEO', daysSinceLastActivity:7,
    notes:'Site visit done. Awaiting feasibility study.',
    rating:3, leadScore:52,
    salesCycleDays:15,
  },
  {
    id:'LD-104', name:'Kalpataru Ltd',
    contact:'Mofatraj Munot',     phone:'+91 98200 44567', email:'mofatraj@kalpataru.com',
    location:'Thane, Mumbai',     service:'Structural',   type:'Residential',
    value:21000000, stage:'inquiry', priority:'medium',
    date:'20 Jul 2025', nextFollow:'08 Aug',
    source:'IndiaMart', daysSinceLastActivity:10,
    notes:'Referral from Raheja. Needs structural audit.',
    rating:3, leadScore:38,
    salesCycleDays:8,
  },
  {
    id:'LD-105', name:'Rustomjee Developers',
    contact:'Boman Irani',        phone:'+91 98200 55678', email:'boman@rustomjee.com',
    location:'Bandra, Mumbai',    service:'Renovation',   type:'Residential',
    value:4500000, stage:'po_received', priority:'low',
    date:'15 Jul 2025', nextFollow:'Done',
    source:'Repeat Client', daysSinceLastActivity:1,
    notes:'PO signed. Handover to PM team.',
    rating:5, leadScore:100,
    salesCycleDays:42,
  },
  {
    id:'LD-106', name:'Shapoorji Pallonji',
    contact:'Shapoor Mistry',     phone:'+91 98200 66789', email:'shapoor@sp.com',
    location:'Nariman Point, Mumbai',service:'Civil',      type:'Commercial',
    value:55000000, stage:'proposal_sent', priority:'high',
    date:'18 Jul 2025', nextFollow:'03 Aug',
    source:'Cold Call', daysSinceLastActivity:4,
    notes:'Large commercial project. Proposal v2 sent.',
    rating:4, leadScore:70,
    salesCycleDays:28,
  },
  {
    id:'LD-107', name:'Prestige Group',
    contact:'Irfan Razack',       phone:'+91 98200 77890', email:'irfan@prestige.com',
    location:'BKC, Mumbai',       service:'Interior',      type:'Commercial',
    value:14000000, stage:'verbal_win', priority:'high',
    date:'10 Jul 2025', nextFollow:'01 Aug',
    source:'Architect Referral', daysSinceLastActivity:3,
    notes:'Verbal approval. Awaiting formal PO.',
    rating:5, leadScore:85,
    salesCycleDays:55,
  },
  {
    id:'LD-108', name:'DLF Limited',
    contact:'Mohit Gujral',       phone:'+91 98200 88901', email:'mohit@dlf.com',
    location:'Andheri, Mumbai',   service:'Turnkey',       type:'Commercial',
    value:42000000, stage:'lost', priority:'high',
    date:'05 Jul 2025', nextFollow:'—',
    source:'Government Tender', daysSinceLastActivity:25,
    notes:'Lost to competitor — 12% lower price on MEP.',
    rating:2, leadScore:0,
    salesCycleDays:68,
  },
]

const clients = [
  {
    id:'CLT-01', name:'Oberoi Group',   contact:'Vikas Oberoi',    phone:'+91 98200 11111',
    email:'vikas@oberoi.com', location:'Worli, Mumbai',
    projects:3, totalValue:62000000, activeProjects:1, lastProject:'Mar 2025',
    status:'platinum', clv:150000000, nextOpportunity:'Tower B — Q1 2026',
    tags:['Residential','High Rise','Repeat'],
  },
  {
    id:'CLT-02', name:'Raheja Corp',    contact:'Rahul Raheja',    phone:'+91 98200 22222',
    email:'rahul@raheja.com', location:'Powai, Mumbai',
    projects:2, totalValue:38000000, activeProjects:1, lastProject:'Jan 2025',
    status:'gold', clv:80000000, nextOpportunity:'Phase 3 MEP — Q3 2025',
    tags:['Commercial','MEP','Repeat'],
  },
  {
    id:'CLT-03', name:'Kohinoor Infra', contact:'Suresh Kohinoor', phone:'+91 98200 33333',
    email:'suresh@kohinoor.com', location:'Dadar, Mumbai',
    projects:1, totalValue:8500000, activeProjects:1, lastProject:'May 2025',
    status:'silver', clv:25000000, nextOpportunity:'Level 3 Extension',
    tags:['Interior','Mall'],
  },
  {
    id:'CLT-04', name:'MIDC',           contact:'Govt. Officer',   phone:'+91 98200 44444',
    email:'midc@gov.in',      location:'SEEPZ, Mumbai',
    projects:4, totalValue:21000000, activeProjects:0, lastProject:'Jun 2025',
    status:'gold', clv:60000000, nextOpportunity:'New Tender — Aug 2025',
    tags:['Government','Structural','Tender'],
  },
  {
    id:'CLT-05', name:'Lodha Group',    contact:'Abhishek Lodha',  phone:'+91 98200 55555',
    email:'abhishek@lodha.com', location:'Lower Parel, Mumbai',
    projects:1, totalValue:18000000, activeProjects:1, lastProject:'Apr 2025',
    status:'new', clv:90000000, nextOpportunity:'Residential Wing B',
    tags:['Turnkey','High Rise','New Client'],
  },
]

const conversionData = [
  { month:'Mar', leads:12, won:4,  conversion:33 },
  { month:'Apr', leads:15, won:6,  conversion:40 },
  { month:'May', leads:10, won:3,  conversion:30 },
  { month:'Jun', leads:18, won:8,  conversion:44 },
  { month:'Jul', leads:14, won:5,  conversion:36 },
]

const sourceROIData = [
  { source:'Architect Referral', cac:18000,  avgDeal:2800000, conversion:42, ltv:9000000,  roi:156 },
  { source:'Builder Tie-up',     cac:45000,  avgDeal:8500000, conversion:28, ltv:22000000, roi:189 },
  { source:'Website/SEO',        cac:12000,  avgDeal:1200000, conversion:18, ltv:3500000,  roi:92  },
  { source:'IndiaMart',          cac:8000,   avgDeal:650000,  conversion:12, ltv:1200000,  roi:48  },
  { source:'Cold Call',          cac:22000,  avgDeal:3200000, conversion:8,  ltv:8000000,  roi:65  },
  { source:'Repeat Client',      cac:5000,   avgDeal:4500000, conversion:75, ltv:18000000, roi:360 },
  { source:'Govt Tender',        cac:85000,  avgDeal:15000000,conversion:6,  ltv:35000000, roi:41  },
]

const serviceLineData = [
  { service:'Civil',      margin:22, growth:18, pipeline:8500000,  color:'#3b82f6' },
  { service:'Interior',   margin:42, growth:35, pipeline:4200000,  color:'#8b5cf6' },
  { service:'MEP',        margin:36, growth:12, pipeline:3800000,  color:'#0891b2' },
  { service:'Renovation', margin:52, growth:28, pipeline:1800000,  color:'#f59e0b' },
  { service:'Structural', margin:44, growth:8,  pipeline:2100000,  color:'#f97316' },
  { service:'Turnkey',    margin:18, growth:22, pipeline:12000000, color:'#10b981' },
]

const earlyWarnings = [
  { type:'stalled',    icon:'🐌', title:'Stalled Deal — 45+ days',      desc:'Hiranandani Group — No movement since 22 Jul',      action:'Call Now',    severity:'high'   },
  { type:'overdue',    icon:'💳', title:'Overdue Collection — 60+ days', desc:'₹48.5L from Oberoi Group — Invoice INV-324',         action:'Send Reminder',severity:'high'  },
  { type:'cost',       icon:'⚠️', title:'Budget Overrun Risk',           desc:'Kohinoor Mall — Material cost +9% vs estimate',      action:'Review BOQ',  severity:'medium' },
  { type:'conversion', icon:'📉', title:'Conversion Drop Alert',         desc:'MEP service line down 18% vs 3-month avg',           action:'Audit Funnel', severity:'medium' },
  { type:'sentiment',  icon:'😟', title:'Client Sentiment Alert',        desc:'DLF — 3 negative keywords in last WhatsApp msgs',    action:'Call Client', severity:'high'   },
]

const followUps = [
  { lead:'Godrej Properties',   contact:'Pirojsha Godrej',      time:'Today 3:00 PM',   type:'Call',      priority:'high'   },
  { lead:'Lodha Group',         contact:'Abhishek Lodha',       time:'Tomorrow 11 AM',  type:'Meeting',   priority:'high'   },
  { lead:'Shapoorji Pallonji',  contact:'Shapoor Mistry',       time:'03 Aug 2:00 PM',  type:'Call',      priority:'medium' },
  { lead:'Hiranandani Group',   contact:'Niranjan H.',          time:'05 Aug 10 AM',    type:'Site Visit',priority:'medium' },
  { lead:'Prestige Group',      contact:'Irfan Razack',         time:'01 Aug 4:00 PM',  type:'Call',      priority:'high'   },
]

// ── Helpers ───────────────────────────────────────────────
const formatINR = (n) => {
  if (!n) return '₹0'
  if (n >= 10000000) return `₹${(n/10000000).toFixed(2)} Cr`
  if (n >= 100000)   return `₹${(n/100000).toFixed(1)} L`
  return `₹${new Intl.NumberFormat('en-IN').format(n)}`
}

const wspv = leads
  .filter(l => l.stage !== 'lost')
  .reduce((sum, l) => sum + (l.value * (STAGE_WEIGHTS[l.stage] || 0)), 0)

const totalPipeline = leads
  .filter(l => l.stage !== 'lost')
  .reduce((sum, l) => sum + l.value, 0)

const wonDeals   = leads.filter(l => l.stage === 'po_received').length
const sentDeals  = leads.filter(l => ['proposal_sent','negotiation','verbal_win','po_received'].includes(l.stage)).length
const convRate   = sentDeals > 0 ? Math.round((wonDeals / sentDeals) * 100) : 0
const avgCycle   = Math.round(leads.filter(l=>l.stage!=='lost').reduce((s,l)=>s+l.salesCycleDays,0) / leads.filter(l=>l.stage!=='lost').length)
const hotLeads   = leads.filter(l => l.leadScore >= 70 && l.stage !== 'lost' && l.stage !== 'po_received').length

// ── Sub-components ────────────────────────────────────────

const StageBadge = ({ stage }) => {
  const map = {
    inquiry:       { label:'Inquiry',       cls:'bg-gray-100   text-gray-600   border-gray-200'   },
    site_visit:    { label:'Site Visit',    cls:'bg-blue-50    text-blue-600   border-blue-200'   },
    proposal_sent: { label:'Proposal Sent', cls:'bg-purple-50  text-purple-600 border-purple-200' },
    negotiation:   { label:'Negotiation',   cls:'bg-amber-50   text-amber-600  border-amber-200'  },
    verbal_win:    { label:'Verbal Win',    cls:'bg-indigo-50  text-indigo-600 border-indigo-200' },
    po_received:   { label:'PO Received',   cls:'bg-green-50   text-green-600  border-green-200'  },
    lost:          { label:'Lost',          cls:'bg-red-50     text-red-600    border-red-200'    },
  }
  const { label, cls } = map[stage] || map.inquiry
  return (
    <span className={`text-xs px-2.5 py-1 rounded-full border font-medium ${cls}`}>
      {label}
    </span>
  )
}

const LeadScoreBadge = ({ score }) => {
  const color = score >= 80 ? 'bg-red-500' : score >= 60 ? 'bg-amber-500' : score >= 40 ? 'bg-blue-500' : 'bg-gray-400'
  const label = score >= 80 ? '🔥 Hot' : score >= 60 ? '⚡ Warm' : score >= 40 ? '💧 Cool' : '❄️ Cold'
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full text-white font-semibold ${color}`}>
      {label}
    </span>
  )
}

const ClientStatusBadge = ({ status }) => {
  const map = {
    platinum: { label:'💎 Platinum', cls:'bg-purple-50 text-purple-700 border-purple-200' },
    gold:     { label:'🥇 Gold',     cls:'bg-amber-50  text-amber-700  border-amber-200'  },
    silver:   { label:'🥈 Silver',   cls:'bg-gray-50   text-gray-700   border-gray-200'   },
    new:      { label:'🌟 New',      cls:'bg-blue-50   text-blue-700   border-blue-200'   },
  }
  const { label, cls } = map[status] || map.new
  return <span className={`text-xs px-2.5 py-1 rounded-full border font-semibold ${cls}`}>{label}</span>
}

const ServiceTag = ({ service }) => {
  const colors = {
    Civil:      'bg-blue-50   text-blue-700',
    Interior:   'bg-purple-50 text-purple-700',
    MEP:        'bg-teal-50   text-teal-700',
    Renovation: 'bg-amber-50  text-amber-700',
    Structural: 'bg-orange-50 text-orange-700',
    Turnkey:    'bg-green-50  text-green-700',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium ${colors[service] || 'bg-gray-100 text-gray-600'}`}>
      {service}
    </span>
  )
}

const PriorityDot = ({ priority }) => {
  const colors = { high:'bg-red-500', medium:'bg-amber-500', low:'bg-green-500' }
  return <span className={`w-2 h-2 rounded-full shrink-0 ${colors[priority]}`}/>
}

// const StarRating = ({ rating }) => (
//   <div className="flex gap-0.5">
//     {[1,2,3,4,5].map(i => (
//       <Star key={i} size={11} className={i<=rating ? 'text-amber-400 fill-amber-400' : 'text-gray-200 fill-gray-200'}/>
//     ))}
//   </div>
// )

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs shadow-lg">
      <p className="text-gray-500 mb-1 font-medium">{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ color:p.color }} className="font-semibold">{p.name}: {p.value}</p>
      ))}
    </div>
  )
}

// ── Pipeline Kanban ───────────────────────────────────────
function PipelineKanban({ leads }) {
  const stages = ['inquiry','site_visit','proposal_sent','negotiation','verbal_win','po_received']

  return (
    <div className="overflow-x-auto pb-2">
      <div className="flex gap-3" style={{ minWidth:'1100px' }}>
        {stages.map(stage => {
          const stageLeads = leads.filter(l => l.stage === stage)
          const stageValue = stageLeads.reduce((s,l) => s + l.value, 0)
          const prob       = STAGE_WEIGHTS[stage]

          return (
            <div key={stage} className="flex-1 min-w-[170px]">
              {/* Column Header */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl px-3 py-2.5 mb-2">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-xs font-bold text-gray-700">{STAGE_LABELS[stage]}</span>
                  <span className="text-xs bg-gray-200 text-gray-600 px-1.5 py-0.5 rounded-full font-bold">
                    {stageLeads.length}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">{formatINR(stageValue)}</span>
                  <span className="text-xs text-blue-600 font-semibold">{Math.round(prob*100)}%</span>
                </div>
                <div className="h-1 bg-gray-200 rounded-full mt-2 overflow-hidden">
                  <div className="h-full bg-blue-500 rounded-full" style={{ width:`${prob*100}%` }}/>
                </div>
              </div>

              {/* Cards */}
              <div className="space-y-2">
                {stageLeads.map(lead => (
                  <div
                    key={lead.id}
                    className="bg-white border border-gray-200 rounded-xl p-3 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all duration-200 group"
                  >
                    <div className="flex items-start justify-between mb-1.5">
                      <p className="text-xs font-bold text-gray-900 leading-tight group-hover:text-blue-600 transition">
                        {lead.name}
                      </p>
                      <PriorityDot priority={lead.priority}/>
                    </div>
                    <p className="text-xs text-gray-400 mb-2">{lead.contact}</p>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-bold text-gray-800">{formatINR(lead.value)}</span>
                      <LeadScoreBadge score={lead.leadScore}/>
                    </div>
                    <ServiceTag service={lead.service}/>
                    <div className="flex items-center gap-1 mt-2 pt-2 border-t border-gray-100">
                      <Clock size={10} className="text-gray-400"/>
                      <span className="text-xs text-gray-400">
                        {lead.daysSinceLastActivity === 0 ? 'Today' : `${lead.daysSinceLastActivity}d ago`}
                      </span>
                      {lead.daysSinceLastActivity >= 7 && (
                        <span className="ml-auto text-xs text-red-500 font-semibold flex items-center gap-0.5">
                          <AlertTriangle size={10}/> Stalled
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}

// ── Client 360 Modal ──────────────────────────────────────
function Client360Modal({ client, onClose }) {
  if (!client) return null
  return (
    <div
      className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-white/20 flex items-center justify-center text-white font-bold text-xl">
                {client.name.charAt(0)}
              </div>
              <div>
                <h2 className="text-lg font-bold">{client.name}</h2>
                <p className="text-blue-100 text-sm">{client.contact}</p>
                <div className="flex items-center gap-2 mt-1">
                  <ClientStatusBadge status={client.status}/>
                </div>
              </div>
            </div>
            <button onClick={onClose} className="text-white/60 hover:text-white text-xl font-bold">×</button>
          </div>
        </div>

        <div className="p-6 space-y-5">

          {/* Contact Info */}
          <div className="grid grid-cols-2 gap-3">
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Phone size={14} className="text-blue-500"/> {client.phone}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Mail size={14} className="text-blue-500"/> {client.email}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <MapPin size={14} className="text-blue-500"/> {client.location}
            </div>
            <div className="flex items-center gap-2 text-sm text-gray-600">
              <Calendar size={14} className="text-blue-500"/> Last: {client.lastProject}
            </div>
          </div>

          {/* CLV & Stats */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label:'Total Projects',   value:client.projects,               color:'text-blue-600'   },
              { label:'Total Value',       value:formatINR(client.totalValue),  color:'text-green-600'  },
              { label:'Lifetime Value',    value:formatINR(client.clv),         color:'text-purple-600' },
            ].map((s,i) => (
              <div key={i} className="bg-gray-50 rounded-xl p-3 text-center border border-gray-100">
                <p className={`text-lg font-black ${s.color}`}>{s.value}</p>
                <p className="text-xs text-gray-500 mt-0.5">{s.label}</p>
              </div>
            ))}
          </div>

          {/* Tags */}
          <div>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">Tags</p>
            <div className="flex gap-2 flex-wrap">
              {client.tags.map(tag => (
                <span key={tag} className="bg-blue-50 text-blue-600 border border-blue-100 text-xs px-2.5 py-1 rounded-full font-medium">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* AI Insight */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 border border-indigo-100 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={14} className="text-indigo-500"/>
              <span className="text-xs font-bold text-indigo-700">AI Insight</span>
            </div>
            <p className="text-xs text-indigo-700 leading-relaxed">
              {client.nextOpportunity} — Based on project history, this client typically awards follow-on work within 6 months of completion. Schedule relationship call this week.
            </p>
          </div>

          {/* Actions */}
          <div className="grid grid-cols-3 gap-2">
            <button className="flex items-center justify-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs py-2.5 rounded-xl font-medium transition">
              <Phone size={13}/> Call
            </button>
            <button className="flex items-center justify-center gap-1.5 bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 text-xs py-2.5 rounded-xl font-medium transition">
              <FileText size={13}/> Quote
            </button>
            <button className="flex items-center justify-center gap-1.5 bg-white border-2 border-gray-200 hover:border-blue-300 text-gray-700 text-xs py-2.5 rounded-xl font-medium transition">
              <MessageSquare size={13}/> WhatsApp
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ────────────────────────────────────────
export default function CRMPage() {
  const [activeTab,      setActiveTab]      = useState('pipeline')
  const [searchQuery,    setSearchQuery]    = useState('')
  const [stageFilter,    setStageFilter]    = useState('all')
  const [serviceFilter,  setServiceFilter]  = useState('all')
  const [selectedClient, setSelectedClient] = useState(null)

  const filteredLeads = leads.filter(l => {
    const matchSearch  = l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         l.contact.toLowerCase().includes(searchQuery.toLowerCase())
    const matchStage   = stageFilter   === 'all' || l.stage   === stageFilter
    const matchService = serviceFilter === 'all' || l.service === serviceFilter
    return matchSearch && matchStage && matchService
  })

  const tabs = [
    { id:'pipeline',   label:'Pipeline'   },
    { id:'leads',      label:'All Leads'  },
    { id:'clients',    label:'Clients 360'},
    { id:'analytics',  label:'Analytics'  },
    { id:'followups',  label:'Follow-ups' },
    { id:'warnings',   label:'⚠️ Alerts'  },
  ]

  return (
    <div className="space-y-5 bg-gray-50 min-h-screen -m-6 p-6">

      {/* ── Header ── */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-xl font-black text-gray-900">CRM & Sales</h1>
          <p className="text-gray-500 text-sm mt-0.5">Pipeline · Leads · Clients · Analytics</p>
        </div>
        <div className="flex items-center gap-2">
          <button className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-xl hover:border-gray-300 transition shadow-sm">
            <Filter size={13}/> Filter
          </button>
          <button className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition shadow-sm">
            <Plus size={14}/> Add Lead
          </button>
        </div>
      </div>

      {/* ── KPI Cards ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          {
            label:'Weighted Pipeline',
            value: formatINR(wspv),
            sub:`${formatINR(totalPipeline)} gross pipeline`,
            icon:Activity,
            color:'bg-blue-600',
            trend:'+18%',
            up:true,
          },
          {
            label:'Conversion Rate',
            value:`${convRate}%`,
            sub:`${wonDeals} won of ${sentDeals} proposals`,
            icon:TrendingUp,
            color:'bg-green-600',
            trend:'+5%',
            up:true,
          },
          {
            label:'Avg Sales Cycle',
            value:`${avgCycle} days`,
            sub:'Target: 45 days (Interior)',
            icon:Clock,
            color:'bg-amber-500',
            trend:'-3 days',
            up:true,
          },
          {
            label:'Hot Leads',
            value:hotLeads,
            sub:'Score ≥ 70, active stage',
            icon:Flame,
            color:'bg-red-500',
            trend:'+2 this week',
            up:true,
          },
        ].map((k,i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-xl ${k.color} flex items-center justify-center shadow-sm`}>
                <k.icon size={18} className="text-white"/>
              </div>
              <span className={`flex items-center gap-1 text-xs font-semibold ${k.up ? 'text-green-600' : 'text-red-600'}`}>
                {k.up ? '▲' : '▼'} {k.trend}
              </span>
            </div>
            <p className="text-2xl font-black text-gray-900">{k.value}</p>
            <p className="text-sm text-gray-500 mt-0.5 font-medium">{k.label}</p>
            <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Secondary KPIs ── */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label:'Order Book to Billing Gap',  value:formatINR(totalPipeline * 0.6), sub:'Trapped cash — invoice pending', color:'text-red-600',    bg:'bg-red-50   border-red-100'    },
          { label:'Revenue Leakage Index',      value:formatINR(4200000),             sub:'Unbilled + unapproved variations', color:'text-amber-600', bg:'bg-amber-50 border-amber-100'  },
          { label:'Collection Efficiency Today',value:'82%',                          sub:'₹14.5L of ₹17.7L expected',       color:'text-green-600', bg:'bg-green-50 border-green-100'  },
          { label:'Pipeline Coverage Ratio',    value:'2.4x',                         sub:'Target: >1.5x (Healthy)',         color:'text-blue-600',  bg:'bg-blue-50  border-blue-100'   },
        ].map((k,i) => (
          <div key={i} className={`rounded-xl border px-4 py-3 ${k.bg}`}>
            <p className={`text-lg font-black ${k.color}`}>{k.value}</p>
            <p className="text-xs font-semibold text-gray-700 mt-0.5">{k.label}</p>
            <p className="text-xs text-gray-500 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-white border border-gray-200 rounded-2xl p-1 w-fit shadow-sm overflow-x-auto">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-blue-600 text-white shadow-sm'
                : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ══ PIPELINE TAB ══ */}
      {activeTab === 'pipeline' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Sales Pipeline</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                Weighted Value: <span className="font-bold text-blue-600">{formatINR(wspv)}</span>
                &nbsp;·&nbsp; Gross: <span className="font-semibold text-gray-700">{formatINR(totalPipeline)}</span>
                &nbsp;·&nbsp; {leads.filter(l=>l.stage!=='lost').length} active deals
              </p>
            </div>
            <div className="flex items-center gap-2">
              <select
                value={serviceFilter}
                onChange={e => setServiceFilter(e.target.value)}
                className="text-xs bg-white border border-gray-200 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400"
              >
                <option value="all">All Services</option>
                {['Civil','Interior','MEP','Renovation','Structural','Turnkey'].map(s =>
                  <option key={s} value={s}>{s}</option>
                )}
              </select>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm">
            <PipelineKanban leads={filteredLeads}/>
          </div>
        </div>
      )}

      {/* ══ ALL LEADS TAB ══ */}
      {activeTab === 'leads' && (
        <div className="space-y-4">
          {/* Search + Filters */}
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-xl px-3 py-2 flex-1 max-w-sm shadow-sm">
              <Search size={14} className="text-gray-400"/>
              <input
                value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder="Search leads..."
                className="bg-transparent text-sm text-gray-800 placeholder-gray-400 outline-none w-full"
              />
            </div>
            <select
              value={stageFilter}
              onChange={e => setStageFilter(e.target.value)}
              className="text-xs bg-white border border-gray-200 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400 shadow-sm"
            >
              <option value="all">All Stages</option>
              {Object.entries(STAGE_LABELS).map(([k,v]) => <option key={k} value={k}>{v}</option>)}
            </select>
            <select
              value={serviceFilter}
              onChange={e => setServiceFilter(e.target.value)}
              className="text-xs bg-white border border-gray-200 text-gray-600 rounded-xl px-3 py-2 focus:outline-none focus:border-blue-400 shadow-sm"
            >
              <option value="all">All Services</option>
              {['Civil','Interior','MEP','Renovation','Structural','Turnkey'].map(s =>
                <option key={s} value={s}>{s}</option>
              )}
            </select>
          </div>

          {/* Leads Table */}
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ minWidth:'900px' }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-200">
                    {['Lead','Contact','Service','Value','Stage','Score','Source','Follow-up','Actions'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredLeads.map(lead => (
                    <tr key={lead.id} className="hover:bg-blue-50/30 transition cursor-pointer">
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <PriorityDot priority={lead.priority}/>
                          <div>
                            <p className="font-bold text-gray-900 text-sm">{lead.name}</p>
                            <div className="flex items-center gap-1 mt-0.5">
                              <MapPin size={10} className="text-gray-400"/>
                              <p className="text-xs text-gray-400">{lead.location}</p>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <p className="text-xs font-semibold text-gray-700">{lead.contact}</p>
                        <div className="flex items-center gap-2 mt-1">
                          <button className="flex items-center gap-0.5 text-xs text-blue-500 hover:text-blue-700 transition">
                            <Phone size={10}/> Call
                          </button>
                          <button className="flex items-center gap-0.5 text-xs text-blue-500 hover:text-blue-700 transition">
                            <Mail size={10}/> Mail
                          </button>
                        </div>
                      </td>
                      <td className="px-4 py-3"><ServiceTag service={lead.service}/></td>
                      <td className="px-4 py-3">
                        <p className="font-bold text-gray-900">{formatINR(lead.value)}</p>
                        <p className="text-xs text-gray-400">Weighted: {formatINR(lead.value * STAGE_WEIGHTS[lead.stage])}</p>
                      </td>
                      <td className="px-4 py-3"><StageBadge stage={lead.stage}/></td>
                      <td className="px-4 py-3">
                        <div className="flex flex-col gap-1">
                          <LeadScoreBadge score={lead.leadScore}/>
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full ${lead.leadScore>=70?'bg-red-500':lead.leadScore>=40?'bg-amber-500':'bg-blue-400'}`}
                              style={{ width:`${lead.leadScore}%` }}
                            />
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3">
                        <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">{lead.source}</span>
                      </td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-semibold ${
                          lead.nextFollow === 'Today' ? 'text-red-600' :
                          lead.nextFollow === 'Tomorrow' ? 'text-amber-600' : 'text-gray-500'
                        }`}>
                          {lead.nextFollow}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-1.5">
                          <button className="p-1.5 rounded-lg bg-blue-50 text-blue-600 hover:bg-blue-100 transition">
                            <Eye size={13}/>
                          </button>
                          <button className="p-1.5 rounded-lg bg-green-50 text-green-600 hover:bg-green-100 transition">
                            <PhoneCall size={13}/>
                          </button>
                          <button className="p-1.5 rounded-lg bg-gray-50 text-gray-500 hover:bg-gray-100 transition">
                            <MoreVertical size={13}/>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ══ CLIENTS 360 TAB ══ */}
      {activeTab === 'clients' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Client 360° View</h2>
            <button className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl font-semibold transition">
              <Plus size={13}/> Add Client
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {clients.map(c => (
              <div
                key={c.id}
                onClick={() => setSelectedClient(c)}
                className="bg-white border border-gray-200 rounded-2xl p-5 hover:shadow-lg hover:border-blue-300 transition-all cursor-pointer group shadow-sm"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-sm">
                      {c.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-black text-gray-900 group-hover:text-blue-600 transition">{c.name}</p>
                      <p className="text-xs text-gray-400">{c.contact}</p>
                      <ClientStatusBadge status={c.status}/>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-gray-400">Lifetime Value</p>
                    <p className="text-lg font-black text-purple-600">{formatINR(c.clv)}</p>
                  </div>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-4">
                  <div className="bg-blue-50 rounded-xl p-3 text-center border border-blue-100">
                    <p className="text-xl font-black text-blue-600">{c.projects}</p>
                    <p className="text-xs text-blue-500">Projects</p>
                  </div>
                  <div className="bg-green-50 rounded-xl p-3 text-center border border-green-100">
                    <p className="text-sm font-black text-green-600">{formatINR(c.totalValue)}</p>
                    <p className="text-xs text-green-500">Total Value</p>
                  </div>
                  <div className="bg-amber-50 rounded-xl p-3 text-center border border-amber-100">
                    <p className="text-xl font-black text-amber-600">{c.activeProjects}</p>
                    <p className="text-xs text-amber-500">Active</p>
                  </div>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-3">
                  {c.tags.map(tag => (
                    <span key={tag} className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Next Opportunity */}
                <div className="bg-indigo-50 border border-indigo-100 rounded-xl p-2.5 flex items-center gap-2">
                  <Zap size={13} className="text-indigo-500 shrink-0"/>
                  <p className="text-xs text-indigo-700 font-medium">{c.nextOpportunity}</p>
                </div>

                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex gap-3">
                    <button
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition"
                    >
                      <Phone size={11}/> Call
                    </button>
                    <button
                      onClick={e => e.stopPropagation()}
                      className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600 transition"
                    >
                      <Mail size={11}/> Email
                    </button>
                  </div>
                  <span className="text-xs text-blue-500 group-hover:text-blue-700 flex items-center gap-1 font-semibold">
                    View 360° <ChevronRight size={12}/>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══ ANALYTICS TAB ══ */}
      {activeTab === 'analytics' && (
        <div className="space-y-4">

          {/* Conversion + Service Line Row */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Conversion Chart */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Lead Conversion Trend</h3>
              <p className="text-xs text-gray-400 mb-4">Leads vs Won deals per month</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={conversionData} margin={{ top:5, right:5, left:-20, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                  <XAxis dataKey="month" tick={{ fill:'#94a3b8', fontSize:11 }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fill:'#94a3b8', fontSize:11 }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="leads" name="Leads" fill="#e2e8f0" radius={[4,4,0,0]}/>
                  <Bar dataKey="won"   name="Won"   fill="#2563eb" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            {/* Service Line Health */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-1">Service Line Health</h3>
              <p className="text-xs text-gray-400 mb-3">Margin % vs Pipeline Value</p>
              <div className="space-y-2.5">
                {serviceLineData.sort((a,b) => b.margin - a.margin).map(s => (
                  <div key={s.service}>
                    <div className="flex items-center justify-between text-xs mb-1">
                      <div className="flex items-center gap-2">
                        <span
                          className="w-2.5 h-2.5 rounded-full"
                          style={{ background:s.color }}
                        />
                        <span className="font-semibold text-gray-700">{s.service}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-gray-400">{formatINR(s.pipeline)}</span>
                        <span className="font-bold text-gray-800">{s.margin}% margin</span>
                        <span className={`font-semibold ${s.growth >= 20 ? 'text-green-500' : 'text-amber-500'}`}>
                          +{s.growth}%↑
                        </span>
                      </div>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{ width:`${s.margin}%`, background:s.color }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Lead Source ROI Table */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="text-sm font-bold text-gray-900">Lead Source ROI Pivot</h3>
              <p className="text-xs text-gray-400 mt-0.5">CAC, Deal Size, Conversion Rate, LTV, ROI Index</p>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ minWidth:'750px' }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['Source','CAC','Avg Deal Size','Conversion %','Lifetime Value','ROI Index'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {sourceROIData.sort((a,b) => b.roi - a.roi).map((s,i) => (
                    <tr key={i} className="hover:bg-blue-50/30 transition">
                      <td className="px-4 py-3">
                        <span className="font-semibold text-gray-800 text-xs">{s.source}</span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-600">₹{s.cac.toLocaleString('en-IN')}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-800">{formatINR(s.avgDeal)}</td>
                      <td className="px-4 py-3">
                        <div className="flex items-center gap-2">
                          <div className="w-16 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className="h-full bg-blue-500 rounded-full"
                              style={{ width:`${s.conversion}%` }}
                            />
                          </div>
                          <span className="text-xs font-semibold text-gray-700">{s.conversion}%</span>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-purple-600">{formatINR(s.ltv)}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-black px-2.5 py-1 rounded-full ${
                          s.roi >= 200 ? 'bg-green-100 text-green-700' :
                          s.roi >= 100 ? 'bg-blue-100 text-blue-700' :
                          s.roi >= 50  ? 'bg-amber-100 text-amber-700' :
                                         'bg-red-100 text-red-700'
                        }`}>
                          {s.roi}x
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Win/Loss Summary */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Win / Loss Summary</h3>
              <div className="grid grid-cols-2 gap-3 mb-4">
                <div className="bg-green-50 border border-green-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-green-600">
                    {leads.filter(l=>l.stage==='po_received').length}
                  </p>
                  <p className="text-xs text-green-600 font-semibold mt-0.5">Deals Won</p>
                  <p className="text-xs text-green-500 mt-0.5">
                    {formatINR(leads.filter(l=>l.stage==='po_received').reduce((s,l)=>s+l.value,0))}
                  </p>
                </div>
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center">
                  <p className="text-2xl font-black text-red-600">
                    {leads.filter(l=>l.stage==='lost').length}
                  </p>
                  <p className="text-xs text-red-600 font-semibold mt-0.5">Deals Lost</p>
                  <p className="text-xs text-red-400 mt-0.5">
                    {formatINR(leads.filter(l=>l.stage==='lost').reduce((s,l)=>s+l.value,0))}
                  </p>
                </div>
              </div>
              <div className="space-y-2">
                {[
                  { label:'Win Rate',        value:`${convRate}%`    },
                  { label:'Avg Deal Size',   value:formatINR(Math.round(leads.reduce((s,l)=>s+l.value,0)/leads.length)) },
                  { label:'Avg Sales Cycle', value:`${avgCycle} days`},
                  { label:'Hot Lead Count',  value:`${hotLeads} leads`},
                ].map((r,i) => (
                  <div key={i} className="flex justify-between text-xs py-1.5 border-b border-gray-100 last:border-0">
                    <span className="text-gray-500">{r.label}</span>
                    <span className="font-bold text-gray-800">{r.value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="text-sm font-bold text-gray-900 mb-4">Leads by Service Type</h3>
              <div className="space-y-3">
                {['Civil','Interior','MEP','Renovation','Structural','Turnkey'].map(service => {
                  const count  = leads.filter(l=>l.service===service).length
                  const value  = leads.filter(l=>l.service===service).reduce((s,l)=>s+l.value,0)
                  const pct    = Math.round((count/leads.length)*100)
                  const colors = {
                    Civil:'bg-blue-500', Interior:'bg-purple-500', MEP:'bg-teal-500',
                    Renovation:'bg-amber-500', Structural:'bg-orange-500', Turnkey:'bg-green-500'
                  }
                  return (
                    <div key={service}>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="font-semibold text-gray-700">{service}</span>
                        <div className="flex items-center gap-3">
                          <span className="text-gray-400">{count} leads</span>
                          <span className="font-bold text-gray-800">{formatINR(value)}</span>
                          <span className="text-gray-400">{pct}%</span>
                        </div>
                      </div>
                      <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${colors[service]}`}
                          style={{ width:`${pct * 3}%` }}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══ FOLLOW-UPS TAB ══ */}
      {activeTab === 'followups' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold text-gray-900">Upcoming Follow-ups</h2>
            <button className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl font-semibold transition">
              <Plus size={13}/> Schedule
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {followUps.map((f,i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-4 shadow-sm hover:shadow-md transition">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    f.type === 'Call'       ? 'bg-blue-100'   :
                    f.type === 'Meeting'    ? 'bg-purple-100' :
                    f.type === 'Site Visit' ? 'bg-teal-100'   : 'bg-gray-100'
                  }`}>
                    {f.type === 'Call'       ? <Phone    size={16} className="text-blue-600"/>   :
                     f.type === 'Meeting'    ? <Users    size={16} className="text-purple-600"/> :
                     f.type === 'Site Visit' ? <MapPin   size={16} className="text-teal-600"/>   :
                                               <Calendar size={16} className="text-gray-600"/>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <p className="text-sm font-bold text-gray-900">{f.lead}</p>
                      <span className={`text-xs px-2 py-0.5 rounded-full font-semibold ${
                        f.priority === 'high'
                          ? 'bg-red-100 text-red-600'
                          : 'bg-amber-100 text-amber-600'
                      }`}>
                        {f.priority}
                      </span>
                    </div>
                    <p className="text-xs text-gray-500">{f.contact} · {f.type}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-xs font-bold ${
                      f.time.includes('Today') ? 'text-red-600' :
                      f.time.includes('Tomorrow') ? 'text-amber-600' : 'text-gray-600'
                    }`}>{f.time}</p>
                    <div className="flex gap-1.5 mt-1.5">
                      <button className="text-xs bg-blue-600 text-white px-2 py-1 rounded-lg font-semibold hover:bg-blue-700 transition">
                        {f.type === 'Call' ? 'Call Now' : 'Open'}
                      </button>
                      <button className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded-lg font-semibold hover:bg-gray-200 transition">
                        Done
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Smart Follow-up Sequencer Info */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={16} className="text-blue-600"/>
              <h3 className="text-sm font-bold text-blue-800">Smart Follow-up Sequencer</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
              {[
                { day:'Day 1',  action:'WhatsApp — Proposal review check',       status:'active'   },
                { day:'Day 3',  action:'Email — Case study with before/after',   status:'pending'  },
                { day:'Day 5',  action:'CRM task — Salesperson call',            status:'pending'  },
                { day:'Day 7',  action:'Auto-downgrade to 20% if no response',  status:'pending'  },
              ].map((step,i) => (
                <div key={i} className={`bg-white border rounded-xl p-3 ${
                  step.status === 'active' ? 'border-blue-300' : 'border-gray-200'
                }`}>
                  <span className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                    step.status === 'active' ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-500'
                  }`}>{step.day}</span>
                  <p className="text-xs text-gray-600 mt-2 leading-relaxed">{step.action}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══ EARLY WARNINGS TAB ══ */}
      {activeTab === 'warnings' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-sm font-bold text-gray-900">Early Warning Console</h2>
              <p className="text-xs text-gray-500 mt-0.5">
                {earlyWarnings.filter(w=>w.severity==='high').length} high priority alerts
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {earlyWarnings.map((w,i) => (
              <div key={i} className={`bg-white border-l-4 rounded-2xl p-4 shadow-sm flex items-start gap-4 ${
                w.severity === 'high'   ? 'border-l-red-500'  :
                w.severity === 'medium' ? 'border-l-amber-500': 'border-l-blue-500'
              }`}>
                <span className="text-2xl shrink-0">{w.icon}</span>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-0.5">
                    <p className="text-sm font-bold text-gray-900">{w.title}</p>
                    <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${
                      w.severity === 'high' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'
                    }`}>
                      {w.severity.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-gray-500">{w.desc}</p>
                </div>
                <button className={`shrink-0 text-xs font-bold px-3 py-2 rounded-xl transition ${
                  w.severity === 'high'
                    ? 'bg-red-600 hover:bg-red-700 text-white'
                    : 'bg-amber-500 hover:bg-amber-600 text-white'
                }`}>
                  {w.action}
                </button>
              </div>
            ))}
          </div>

          {/* What-If Simulator */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <Target size={16} className="text-blue-600"/>
              <h3 className="text-sm font-bold text-gray-900">What-If Revenue Simulator</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label:'If conversion +5%',  impact:`+${formatINR(totalPipeline * 0.05)}`, color:'text-green-600', bg:'bg-green-50 border-green-100' },
                { label:'If avg deal +10L',   impact:`+${formatINR(leads.length * 1000000)}`,color:'text-blue-600',  bg:'bg-blue-50  border-blue-100'  },
                { label:'If cycle -15 days',  impact:'2.1x faster closure',                  color:'text-purple-600',bg:'bg-purple-50 border-purple-100'},
              ].map((sim,i) => (
                <div key={i} className={`border rounded-xl p-4 text-center ${sim.bg}`}>
                  <p className={`text-xl font-black ${sim.color}`}>{sim.impact}</p>
                  <p className="text-xs text-gray-600 mt-1 font-medium">{sim.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── Client 360 Modal ── */}
      <Client360Modal client={selectedClient} onClose={() => setSelectedClient(null)}/>

    </div>
  )
}
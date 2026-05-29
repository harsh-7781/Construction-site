import { useState } from 'react'
import {
  IndianRupee, Users, Star, Shield, CheckCircle2,
  RefreshCw, X, Activity, TrendingUp, TrendingDown, 
  Briefcase, CreditCard,
  AlertTriangle, Gauge, Wallet, 
  Receipt,Globe, Cpu,
} from 'lucide-react'
import {
  Area, BarChart, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  ComposedChart, Legend, 
} from 'recharts'

// ======================= MOCK DATA =======================
// Existing data (from original)
const revenueCashData = [
  { month:'Jul', actual:38, budget:37, cashFlow:8  },
  { month:'Aug', actual:41, budget:39, cashFlow:9  },
  { month:'Sep', actual:39, budget:38, cashFlow:7  },
  { month:'Oct', actual:43, budget:40, cashFlow:11 },
  { month:'Nov', actual:40, budget:39, cashFlow:6  },
  { month:'Dec', actual:45, budget:41, cashFlow:13 },
  { month:'Jan', actual:37, budget:38, cashFlow:5  },
  { month:'Feb', actual:42, budget:40, cashFlow:10 },
  { month:'Mar', actual:44, budget:41, cashFlow:12 },
  { month:'Apr', actual:41, budget:40, cashFlow:8  },
  { month:'May', actual:42.8,budget:39,cashFlow:10.5},
  { month:'Jun', actual:null,budget:42, cashFlow:null},
]

const arAgingData = [
  { name:'0-30 Days',   value:820, color:'#10b981' },
  { name:'31-60 Days',  value:450, color:'#f59e0b' },
  { name:'61-90 Days',  value:310, color:'#f97316' },
  { name:'>90 Days',    value:240, color:'#ef4444' },
]

const salesFunnelData = [
  { stage:'Leads',          value:124, pct:100, color:'#3b82f6' },
  { stage:'Qualified',      value:87,  pct:82,  color:'#6366f1' },
  { stage:'Proposal Sent',  value:51,  pct:64,  color:'#8b5cf6' },
  { stage:'Negotiation',    value:28,  pct:46,  color:'#a855f7' },
  { stage:'Won',            value:19,  pct:30,  color:'#10b981' },
]

const evmData = [
  { project:'Oberoi Tower',   cpi:0.82, spi:0.88 },
  { project:'Marina Res.',    cpi:1.02, spi:1.01 },
  { project:'Tech Park MEP',  cpi:0.95, spi:0.92 },
  { project:'Palm Villa',     cpi:1.05, spi:1.03 },
  { project:'Kohinoor Mall',  cpi:0.88, spi:0.85 },
  { project:'Lodha Fitout',   cpi:0.98, spi:0.96 },
  { project:'Villa Bandra',   cpi:0.91, spi:0.89 },
]

const projectHealthData = [
  { name:'Oberoi Residency Tower',  service:'Civil Works',    complete:68, cpi:0.82, spi:0.88, budgetVar:-18.2, schedVar:22,  health:'red',    pm:'Sneha Desai',   client:'Oberoi Group',   value:'₹2.4 Cr' },
  { name:'Kohinoor Mall Interior',  service:'Interior',       complete:42, cpi:0.95, spi:0.92, budgetVar:-5.4,  schedVar:12,  health:'yellow', pm:'Sneha Desai',   client:'Kohinoor Infra', value:'₹85 L'   },
  { name:'Tech Park MEP Works',     service:'MEP Services',   complete:81, cpi:1.02, spi:1.01, budgetVar:2.1,   schedVar:-3,  health:'green',  pm:'Sneha Desai',   client:'Raheja Corp',    value:'₹1.1 Cr' },
  { name:'Villa Renovation Bandra', service:'Renovation',     complete:25, cpi:0.88, spi:0.85, budgetVar:-12.5, schedVar:18,  health:'red',    pm:'Sneha Desai',   client:'Private Client', value:'₹38 L'   },
  { name:'Lodha Commercial Fitout', service:'Interior',       complete:55, cpi:0.98, spi:0.96, budgetVar:-2.8,  schedVar:7,   health:'yellow', pm:'Sneha Desai',   client:'Lodha Group',    value:'₹1.8 Cr' },
  { name:'Structural Audit SEEPZ',  service:'Structural',     complete:100,cpi:1.05, spi:1.03, budgetVar:4.8,   schedVar:-5,  health:'green',  pm:'Sneha Desai',   client:'MIDC',           value:'₹62 L'   },
]

const strategicInitiatives = [
  { name:'Expand to Pune & Bangalore',         progress:68, color:'#3b82f6' },
  { name:'Digital Transformation — BIM Level 3',progress:45, color:'#f59e0b' },
  { name:'Achieve ISO 9001 Certification',      progress:82, color:'#10b981' },
  { name:'Reduce Project Delays by 30%',        progress:55, color:'#0891b2' },
  { name:'Launch Client Portal App',            progress:90, color:'#10b981' },
]

const complaintData = [
  { category:'Delay',         count:34, cum:33  },
  { category:'Quality',       count:26, cum:59  },
  { category:'Communication', count:18, cum:76  },
  { category:'Cost',          count:12, cum:88  },
  { category:'Safety',        count:5,  cum:93  },
  { category:'Other',         count:8,  cum:100 },
]

const drillDownData = {
  revenue: { title: 'Revenue Detail — MTD Breakdown', content: [ { label:'Total Revenue MTD', value:'₹4.82 Cr', highlight:true }, { label:'Target', value:'₹4.20 Cr' }, { label:'Variance', value:'+₹62 L (+14.7%)', up:true }, { label:'Civil Works', value:'₹1.52 Cr (31.5%)' }, { label:'Interior', value:'₹1.18 Cr (24.5%)' }, { label:'MEP Services', value:'₹0.95 Cr (19.7%)' }, { label:'Renovation', value:'₹0.62 Cr (12.8%)' }, { label:'Structural', value:'₹0.55 Cr (11.4%)' } ] },
  cash: { title: 'Cash Position Detail', content: [ { label:'Current Cash Balance', value:'₹2.15 Cr', highlight:true }, { label:'30-Day Forecast', value:'₹1.92–2.38 Cr' }, { label:'Operating Cash Flow', value:'+₹1.05 Cr (MTD)' }, { label:'Payroll (12 days)', value:'₹68 L' }, { label:'Supplier Payments', value:'₹42 L' }, { label:'Subcontractor Bills', value:'₹31 L' }, { label:'Equipment Lease', value:'₹4.5 L' }, { label:'Status', value:'✅ Healthy — No borrowing needed', up:true } ] },
  delivery: { title: 'On-Time Delivery Detail', content: [ { label:'On-Time Rate', value:'87.3%', highlight:true }, { label:'vs Last Month', value:'↑ 2.1%', up:true }, { label:'Projects on Time', value:'8 of 9 this month' }, { label:'Oberoi Tower Delay', value:'+22 days (permit delay)', down:true }, { label:'Villa Bandra Delay', value:'+18 days (approval)', down:true }, { label:'Kohinoor Mall Delay', value:'+12 days (material)', down:true } ] },
  nps: { title: 'NPS Detail — Q3 Survey Results', content: [ { label:'Net Promoter Score', value:'54', highlight:true }, { label:'vs Last Quarter', value:'↑ 6 pts', up:true }, { label:'Surveys Completed', value:'47' }, { label:'Promoters (9-10)', value:'29 responses (62%)', up:true }, { label:'Passives (7-8)', value:'14 responses (30%)' }, { label:'Detractors (0-6)', value:'4 responses (8%)', down:true }, { label:'Top Theme', value:'Quality of finishing' } ] },
  utilization: { title: 'Resource Utilisation Detail', content: [ { label:'Overall Billable Rate', value:'88.5%', highlight:true }, { label:'Target', value:'85%' }, { label:'Structural Team', value:'92.1% ⚠️ High', down:true }, { label:'MEP Services', value:'90.3%' }, { label:'Civil Execution', value:'87.8%' }, { label:'Interior Design', value:'84.2%' }, { label:'Renovation', value:'89.7%' } ] },
  safety: { title: 'Safety Dashboard Detail', content: [ { label:'LTIR (Lost Time Injury)', value:'0.0', highlight:true }, { label:'Days Since Last Incident', value:'187 days', up:true }, { label:'Near-Misses MTD', value:'2 (both closed)' }, { label:'Toolbox Talks', value:'142 this month' }, { label:'Safety Observations', value:'86 logged' }, { label:'PPE Compliance', value:'99.2%', up:true }, { label:'ISO 45001 Status', value:'✅ All sites compliant', up:true } ] },
}

// New mock data for MD additions
const vitalSignsData = {
  cashRunway: { days: 43, status: 'yellow', sub: '₹2.15Cr cash + ₹1.2Cr undrawn', trend: '+2 days vs last week' },
  ebitdaDev: { value: -1.87, percent: -2.3, sub: '₹1.87Cr unfavourable', trend: 'worsening' },
  wipSanity: { index: 8.2, ageOldest: 45, status: 'yellow', sub: '₹2.1Cr unbilled, 45 days oldest' },
  milestoneAlerts: { count: 4, highRisk: ['Oberoi Tower', 'Villa Bandra'], sub: '2 projects >7 days delay' },
  clientConcentration: { top3Share: 58, client1: 'Oberoi Group (28%)', client2: 'Raheja Corp (18%)', client3: 'Lodha Group (12%)', status: 'yellow' }
}

const balanceSheet = {
  currentRatio: 1.8, dso: 58, dpo: 42, inventoryDays: 15,
  workingCapitalCycle: 31, debtEquity: 0.68, interestCoverage: 4.2
}

const gstHealth = {
  outputLiability: 58.2, inputCreditAvailable: 48.5,
  pendingReconciliation: 24, riskCredit: 12.5, rcmPending: 8.2
}

const weightedFunnel = [
  { stage: 'Leads', count: 124, value: 32.4, pct: 100 },
  { stage: 'Qualified', count: 87, value: 24.6, pct: 82 },
  { stage: 'Proposal Sent', count: 51, value: 18.2, pct: 64 },
  { stage: 'Negotiation', count: 28, value: 12.1, pct: 46 },
  { stage: 'Won', count: 19, value: 9.8, pct: 30 },
]

const orderBookCover = { backlog: 32.4, monthlyRunRate: 4.8, coverMonths: 6.75 }
const cacLtv = { cac: 1.2, ltv: 6.8, ratio: 5.67, paybackMonths: 8 }
const estimationAccuracy = { avgVariance: -4.2, topEstimator: 'Sneha Desai', worstProject: 'Oberoi Tower' }

const talentRisk = { attritionRate: 12, criticalRoles: ['Project Manager', 'Senior Architect'], successionCoverage: 68 }
const complianceCalendar = [
  { item: 'RERA Quarterly Filing - Oberoi Tower', due: '5 days', risk: 'High', penalty: '₹2L/day' },
  { item: 'PF/ESI Payment', due: '2 days', risk: 'Medium', penalty: '18% interest' },
  { item: 'Labour License Renewal - Pune Site', due: '12 days', risk: 'Low', penalty: 'Stop work' }
]
const designProductivity = { clashResolution: 82, drawingCycleDays: 4.5, rfiTurnaround: 1.2, rev0Rate: 68 }

const commodityIndices = [
  { name: 'TMT Steel', price: 58500, change: '+3.2%', impact: -14.2, unit: 'per MT' },
  { name: 'Cement', price: 375, change: '+2.7%', impact: -3.8, unit: 'per bag' },
  { name: 'Copper', price: 820, change: '-1.2%', impact: +2.1, unit: 'per kg' }
]
const macroIndicators = { repoRate: 6.5, gSecYield: 7.2, iipConstruction: 4.8, cityAbsorption: 'Mumbai +12%' }
const competitorWatch = [
  { name: 'L&T Construction', recentWin: 'Metro Line Phase 2', value: 450, strategy: 'Aggressive pricing' },
  { name: 'Shapoorji Pallonji', recentWin: 'SEZ Park Pune', value: 280, strategy: 'Fast-track execution' }
]

const innovationMetrics = {
  automationIndex: 68,
  leanWasteScore: { reworkHours: 1240, idleEquipmentCost: 2.4, materialWastage: 4.1 },
  digitalTwinActive: false,
  iotSensors: 12
}

const earlyWarningSignals = [
  { name: 'Margin Slippage', active: true, projects: ['Oberoi Tower', 'Villa Bandra'], autoAction: 'Procurement locked' },
  { name: 'Collection Zombie', active: true, client: 'Oberoi Group', age: 67, autoAction: 'Legal notice drafted' },
  { name: 'Bill Shock', active: false, subcon: null },
  { name: 'Guarantee Exposure', active: true, exposure: 74, limit: 100, autoAction: 'Tender freeze' },
  { name: 'Idle Resource', active: false, resource: null },
  { name: 'Cash Flow Paradox', active: true, months: 2, autoAction: 'Source & Use report sent' }
]

// ======================= COMPONENTS =======================
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-gray-500 mb-1 font-medium">{label}</p>
      {payload.map((p, i) => p.value != null && (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: {typeof p.value === 'number' ? `₹${p.value}L` : p.value}
        </p>
      ))}
    </div>
  )
}

const EVMTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-gray-500 mb-1 font-medium">{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color }} className="font-medium">
          {p.name}: {p.value?.toFixed(2)}
        </p>
      ))}
    </div>
  )
}

function DrillDownModal({ data, onClose }) {
  if (!data) return null
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-md shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-sm font-bold text-gray-800">{data.title}</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
        </div>
        <div className="space-y-2.5">
          {data.content.map((row, i) => (
            <div key={i} className={`flex items-center justify-between py-2 ${i < data.content.length - 1 ? 'border-b border-gray-100' : ''}`}>
              <span className="text-gray-500 text-xs">{row.label}</span>
              <span className={`text-xs font-semibold ${row.highlight ? 'text-blue-600 text-base' : row.up ? 'text-green-600' : row.down ? 'text-red-600' : 'text-gray-800'}`}>{row.value}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose} className="mt-5 w-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 text-xs py-2 rounded-lg transition">Close</button>
      </div>
    </div>
  )
}

function ProjectDrillModal({ project, onClose }) {
  if (!project) return null
  const healthColor = project.health === 'green' ? 'text-green-600' : project.health === 'yellow' ? 'text-amber-600' : 'text-red-600'
  const healthLabel = project.health === 'green' ? 'On Track' : project.health === 'yellow' ? 'At Risk' : 'Critical'
  return (
    <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-50 flex items-center justify-center p-4" onClick={onClose}>
      <div className="bg-white border border-gray-200 rounded-2xl p-6 w-full max-w-lg shadow-xl" onClick={e => e.stopPropagation()}>
        <div className="flex items-center justify-between mb-4">
          <div><h3 className="text-sm font-bold text-gray-800">{project.name}</h3><p className="text-xs text-gray-500 mt-0.5">{project.client} · {project.service}</p></div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600"><X size={18}/></button>
        </div>
        <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-4 ${project.health === 'green' ? 'bg-green-50 border border-green-200' : project.health === 'yellow' ? 'bg-amber-50 border border-amber-200' : 'bg-red-50 border border-red-200'}`}>
          <span className={`text-xs font-bold ${healthColor}`}>● {healthLabel}</span>
          <span className="text-xs text-gray-500 ml-auto">{project.complete}% Complete</span>
        </div>
        <div className="mb-4"><div className="h-2 bg-gray-200 rounded-full overflow-hidden"><div className={`h-full rounded-full ${project.health === 'red' ? 'bg-red-500' : project.health === 'yellow' ? 'bg-amber-500' : 'bg-green-500'}`} style={{ width:`${project.complete}%` }}/></div></div>
        <div className="grid grid-cols-2 gap-3 mb-4">
          {[
            { label:'Contract Value', value:project.value },
            { label:'Project Manager', value:project.pm },
            { label:'CPI', value:project.cpi.toFixed(2), color: project.cpi >= 1 ? 'text-green-600' : project.cpi >= 0.9 ? 'text-amber-600' : 'text-red-600' },
            { label:'SPI', value:project.spi.toFixed(2), color: project.spi >= 1 ? 'text-green-600' : project.spi >= 0.9 ? 'text-amber-600' : 'text-red-600' },
            { label:'Budget Variance', value:`${project.budgetVar >= 0 ? '+' : ''}${project.budgetVar.toFixed(1)}%`, color: project.budgetVar >= 0 ? 'text-green-600' : 'text-red-600' },
            { label:'Schedule Variance', value:`${project.schedVar > 0 ? '+' : ''}${project.schedVar} days`, color: project.schedVar <= 0 ? 'text-green-600' : 'text-red-600' },
          ].map((row,i) => (
            <div key={i} className="bg-gray-50 rounded-lg p-3 border border-gray-100"><p className="text-xs text-gray-500">{row.label}</p><p className={`text-sm font-bold mt-0.5 ${row.color || 'text-gray-800'}`}>{row.value}</p></div>
          ))}
        </div>
        <button onClick={onClose} className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-200 text-gray-600 text-xs py-2 rounded-lg transition">Close</button>
      </div>
    </div>
  )
}

function NPSGauge({ score }) {
  const angle = (score / 100) * 180
  const rad   = ((180 - angle) * Math.PI) / 180
  const cx = 100, cy = 100, r = 70
  const nx = cx + r * Math.cos(rad)
  const ny = cy - r * Math.sin(rad)
  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 200 110" className="w-52">
        <path d="M 30 100 A 70 70 0 0 1 100 30" fill="none" stroke="#10b981" strokeWidth="12" strokeLinecap="round"/>
        <path d="M 100 30 A 70 70 0 0 1 140 44" fill="none" stroke="#f59e0b" strokeWidth="12" strokeLinecap="round"/>
        <path d="M 140 44 A 70 70 0 0 1 170 100" fill="none" stroke="#ef4444" strokeWidth="12" strokeLinecap="round"/>
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#1e293b" strokeWidth="3" strokeLinecap="round"/>
        <circle cx={cx} cy={cy} r={5} fill="#1e293b"/>
        <text x={cx} y={cy + 22} textAnchor="middle" fill="#1e293b" fontSize="26" fontWeight="800">{score}</text>
      </svg>
      <p className="text-xs text-gray-500 mt-1">Net Promoter Score</p>
      <p className="text-xs text-gray-400 mt-1">Promoters: 62% · Passives: 30% · Detractors: 8%</p>
      <p className="text-xs text-gray-400 mt-0.5">Based on 47 surveys this quarter</p>
    </div>
  )
}

function VitalSignCard({ title, value, sub, status, trend, icon: Icon, onClick }) {
  const statusColor = status === 'green' ? 'border-l-green-500' : status === 'red' ? 'border-l-red-500' : 'border-l-amber-500'
  const trendIcon = trend?.includes('+') ? <TrendingUp size={12} /> : trend?.includes('-') ? <TrendingDown size={12} /> : null
  return (
    <div onClick={onClick} className={`bg-white border border-gray-200 border-l-4 ${statusColor} rounded-xl p-4 cursor-pointer hover:shadow-md transition-all`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-2"><Icon size={16} className="text-gray-500" /><span className="text-xs font-semibold text-gray-500 uppercase tracking-wider">{title}</span></div>
        {trend && <span className="text-xs text-gray-500 flex items-center gap-0.5">{trendIcon}{trend}</span>}
      </div>
      <p className="text-2xl font-bold text-gray-800 mt-2">{value}</p>
      <p className="text-xs text-gray-500 mt-1">{sub}</p>
    </div>
  )
}

// ======================= MAIN DASHBOARD =======================
export default function CEODashboard() {
  const [drillModal, setDrillModal] = useState(null)
  const [projectModal, setProjectModal] = useState(null)
  const [filterPeriod, setFilterPeriod] = useState('mtd')
  const [filterService, setFilterService] = useState('all')
  const [filterRegion, setFilterRegion] = useState('all')
  const [refreshing, setRefreshing] = useState(false)
  const [showAlerts, setShowAlerts] = useState(false)
  const [showRiskHeatmap, setShowRiskHeatmap] = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  const openDrill = (key) => setDrillModal(drillDownData[key])

  const kpiCards = [
    { key:'revenue', label:'Revenue MTD', value:'₹4.82 Cr', sub:'▲ 14.7% vs Target', up:true, icon:IndianRupee, borderColor:'border-l-blue-500' },
    { key:'cash', label:'Cash Position', value:'₹2.15 Cr', sub:'▲ 30-day forecast OK', up:true, icon:Activity, borderColor:'border-l-green-500' },
    { key:'delivery', label:'On-Time Delivery', value:'87.3%', sub:'▲ 2.1% vs Last Month', up:true, icon:CheckCircle2, borderColor:'border-l-green-500' },
    { key:'nps', label:'Net Promoter Score', value:'54', sub:'▲ 6 pts vs Q3', up:true, icon:Star, borderColor:'border-l-green-500' },
    { key:'utilization', label:'Utilisation Rate', value:'88.5%', sub:'▲ Target: 85%', up:true, icon:Users, borderColor:'border-l-blue-500' },
    { key:'safety', label:'Safety (LTIR)', value:'0.0', sub:'Zero Incidents — 187 days', up:true, icon:Shield, borderColor:'border-l-green-500' },
  ]

  const alerts = [
    { icon:'⚠️', title:'Oberoi Tower — Budget Alert', desc:'CPI dropped to 0.82 — 18% over budget', time:'2 hours ago' },
    { icon:'💳', title:'Invoice Payment Overdue', desc:'₹48.5L from Oberoi Group — 67 days overdue', time:'1 day ago' },
    { icon:'🛑', title:'Safety Incident — Villa Bandra', desc:'Near-miss reported; investigation pending', time:'3 hours ago' },
  ]

  return (
    <div className="space-y-5 p-4 bg-gray-50 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between flex-wrap gap-3 bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"/>
            <span className="text-xs text-green-600 font-semibold tracking-wider">LIVE DATA</span>
          </div>
          <h1 className="text-lg font-bold text-gray-800">CEO Harsh Devadkar</h1>
        </div>
        <div className="flex items-center gap-2 flex-wrap">
          <select value={filterPeriod} onChange={e=>setFilterPeriod(e.target.value)} className="bg-white border border-gray-300 text-gray-700 text-xs rounded-lg px-3 py-2">
            <option value="mtd">Month to Date</option><option value="qtd">Quarter to Date</option><option value="ytd">Year to Date</option><option value="today">Today</option>
          </select>
          <select value={filterService} onChange={e=>setFilterService(e.target.value)} className="bg-white border border-gray-300 text-gray-700 text-xs rounded-lg px-3 py-2">
            <option value="all">All Service Lines</option><option value="civil">Civil Works</option><option value="interior">Interior</option><option value="mep">MEP Services</option><option value="structural">Structural</option><option value="renovation">Renovation</option>
          </select>
          <select value={filterRegion} onChange={e=>setFilterRegion(e.target.value)} className="bg-white border border-gray-300 text-gray-700 text-xs rounded-lg px-3 py-2">
            <option value="all">All Regions</option><option value="mumbai">Mumbai</option><option value="pune">Pune</option><option value="delhi">Delhi</option>
          </select>
          <div className="relative">
            <button onClick={()=>setShowAlerts(!showAlerts)} className="relative p-2 bg-white border border-gray-300 rounded-lg text-gray-600 hover:text-gray-800 hover:bg-gray-50 transition">
              🔔<span className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center font-bold">{alerts.length}</span>
            </button>
            {showAlerts && (
              <div className="absolute right-0 top-10 w-80 bg-white border border-gray-200 rounded-xl shadow-xl z-50">
                <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100"><span className="text-sm font-bold text-gray-800">🔴 Active Alerts</span><button onClick={()=>setShowAlerts(false)} className="text-gray-400 hover:text-gray-600"><X size={14}/></button></div>
                {alerts.map((a,i)=>(
                  <div key={i} className="flex items-start gap-3 px-4 py-3 border-b border-gray-100 hover:bg-gray-50 cursor-pointer transition last:border-0">
                    <span className="text-lg shrink-0">{a.icon}</span><div><p className="text-xs font-semibold text-gray-800">{a.title}</p><p className="text-xs text-gray-500 mt-0.5">{a.desc}</p><p className="text-xs text-gray-400 mt-0.5">{a.time}</p></div>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleRefresh} className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-2 rounded-lg transition"><RefreshCw size={13} className={refreshing ? 'animate-spin' : ''}/> Refresh</button>
        </div>
      </div>

      {/* 5 Vital Signs */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
        <VitalSignCard title="Cash Runway / Liquidity" value={`${vitalSignsData.cashRunway.days} days`} sub={vitalSignsData.cashRunway.sub} status={vitalSignsData.cashRunway.status} trend={vitalSignsData.cashRunway.trend} icon={Wallet} onClick={()=>openDrill('cash')} />
        <VitalSignCard title="EBITDA Margin Deviation" value={`${vitalSignsData.ebitdaDev.percent}%`} sub={`₹${Math.abs(vitalSignsData.ebitdaDev.value)}Cr unfavourable`} status="red" trend={vitalSignsData.ebitdaDev.trend} icon={TrendingDown} />
        <VitalSignCard title="WIP Sanity Index" value={vitalSignsData.wipSanity.index} sub={vitalSignsData.wipSanity.sub} status={vitalSignsData.wipSanity.status} icon={Gauge} />
        <VitalSignCard title="Critical Milestone Alerts" value={vitalSignsData.milestoneAlerts.count} sub={vitalSignsData.milestoneAlerts.sub} status="red" icon={AlertTriangle} />
        <VitalSignCard title="Client Concentration Risk" value={`${vitalSignsData.clientConcentration.top3Share}%`} sub={`Top 3: ${vitalSignsData.clientConcentration.client1}`} status={vitalSignsData.clientConcentration.status} icon={Users} />
      </div>

      {/* Existing KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-3">
        {kpiCards.map(k => (
          <div key={k.key} onClick={()=>openDrill(k.key)} className={`bg-white border border-gray-200 border-l-4 ${k.borderColor} rounded-xl p-4 cursor-pointer hover:shadow-md hover:-translate-y-0.5 transition-all relative overflow-hidden`}>
            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">{k.label}</p>
            <p className="text-2xl font-black text-gray-800 tracking-tight leading-none mb-1">{k.value}</p>
            <p className={`text-xs font-medium flex items-center gap-1 ${k.up ? 'text-green-600' : 'text-red-600'}`}>{k.up ? '▲' : '▼'} {k.sub}</p>
            <div className="absolute bottom-3 right-3 opacity-10"><k.icon size={28} className="text-gray-400"/></div>
          </div>
        ))}
      </div>

      {/* Revenue Chart + AR Aging */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">📈 Revenue & Cash Flow — Actual vs Budget (12-Month Trend)</h4>
          <ResponsiveContainer width="100%" height={240}>
            <ComposedChart data={revenueCashData} margin={{ top:5, right:10, left:-15, bottom:0 }}>
              <defs><linearGradient id="actualGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3b82f6" stopOpacity={0.15}/><stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/></linearGradient><linearGradient id="cashGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.1}/><stop offset="95%" stopColor="#10b981" stopOpacity={0}/></linearGradient></defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
              <XAxis dataKey="month" tick={{ fill:'#6b7280', fontSize:11 }} axisLine={false} tickLine={false}/>
              <YAxis tick={{ fill:'#6b7280', fontSize:11 }} axisLine={false} tickLine={false}/>
              <Tooltip content={<CustomTooltip/>}/>
              <Legend wrapperStyle={{ fontSize:'11px', paddingTop:'12px' }} formatter={(value) => <span style={{ color:'#4b5563' }}>{value}</span>}/>
              <Area type="monotone" dataKey="actual" name="Revenue Actual (₹L)" stroke="#3b82f6" strokeWidth={2.5} fill="url(#actualGrad)" connectNulls={false} dot={{ fill:'#3b82f6', r:3 }}/>
              <Line type="monotone" dataKey="budget" name="Revenue Budget (₹L)" stroke="#9ca3af" strokeWidth={2} strokeDasharray="6 3" dot={false}/>
              <Area type="monotone" dataKey="cashFlow" name="Cash Flow (₹L)" stroke="#10b981" strokeWidth={2} fill="url(#cashGrad)" connectNulls={false} dot={{ fill:'#10b981', r:3 }}/>
            </ComposedChart>
          </ResponsiveContainer>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">🧾 AR Aging Breakdown</h4>
          <ResponsiveContainer width="100%" height={180}>
            <PieChart><Pie data={arAgingData} cx="50%" cy="50%" innerRadius={50} outerRadius={75} paddingAngle={3} dataKey="value">{arAgingData.map((e,i)=><Cell key={i} fill={e.color}/>)}</Pie><Tooltip contentStyle={{ background:'#ffffff', border:'1px solid #e5e7eb', borderRadius:8, fontSize:11 }}/></PieChart>
          </ResponsiveContainer>
          <div className="space-y-1.5 mt-1">{arAgingData.map((d,i)=><div key={i} className="flex items-center justify-between text-xs"><div className="flex items-center gap-2"><span className="w-2.5 h-2.5 rounded-full shrink-0" style={{ background:d.color }}/><span className="text-gray-500">{d.name}</span></div><span className="text-gray-800 font-medium">${d.value}K</span></div>)}</div>
          <div className="text-center mt-3 pt-3 border-t border-gray-100"><p className="text-xs text-gray-500">Total Outstanding</p><p className="text-lg font-bold text-red-500">$1.82M</p></div>
        </div>
      </div>

      {/* Financial Observatory */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2"><CreditCard size={14}/> Balance Sheet 2.0</h4><div className="grid grid-cols-2 gap-3"><div><p className="text-xs text-gray-500">Current Ratio</p><p className="text-lg font-bold text-gray-800">{balanceSheet.currentRatio}</p></div><div><p className="text-xs text-gray-500">DSO (Days)</p><p className="text-lg font-bold text-amber-600">{balanceSheet.dso}</p></div><div><p className="text-xs text-gray-500">DPO (Days)</p><p className="text-lg font-bold text-gray-800">{balanceSheet.dpo}</p></div><div><p className="text-xs text-gray-500">Working Capital Cycle</p><p className="text-lg font-bold text-gray-800">{balanceSheet.workingCapitalCycle} days</p></div><div><p className="text-xs text-gray-500">Debt/Equity</p><p className="text-lg font-bold text-gray-800">{balanceSheet.debtEquity}</p></div><div><p className="text-xs text-gray-500">Interest Coverage</p><p className="text-lg font-bold text-green-600">{balanceSheet.interestCoverage}x</p></div></div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2"><Receipt size={14}/> GST Health Dashboard</h4><div className="space-y-2"><div className="flex justify-between"><span className="text-xs text-gray-500">Output Liability (₹L)</span><span className="text-sm font-bold">{gstHealth.outputLiability}</span></div><div className="flex justify-between"><span className="text-xs text-gray-500">Input Credit Available</span><span className="text-sm font-bold">{gstHealth.inputCreditAvailable}</span></div><div className="flex justify-between"><span className="text-xs text-gray-500">Pending Reconciliation</span><span className="text-sm font-bold text-amber-600">{gstHealth.pendingReconciliation} invoices</span></div><div className="flex justify-between"><span className="text-xs text-gray-500">At-risk Input Credit (₹L)</span><span className="text-sm font-bold text-red-600">{gstHealth.riskCredit}</span></div><div className="flex justify-between"><span className="text-xs text-gray-500">RCM Liability Pending (₹L)</span><span className="text-sm font-bold text-red-600">{gstHealth.rcmPending}</span></div></div></div>
      </div>

      {/* Sales Funnel + EVM */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">📊 Sales Pipeline Funnel (By Stage)</h4><div className="flex flex-col items-center gap-2 py-2">{salesFunnelData.map((s,i)=>(<div key={i} className="w-full flex flex-col items-center"><div className="flex items-center justify-center text-white font-semibold text-xs py-2.5 rounded-md cursor-pointer transition-all hover:brightness-110 hover:scale-105" style={{ width:`${s.pct}%`, maxWidth:'100%', background:s.color, minWidth:'60%' }}>{s.stage}<span className="ml-2 opacity-80 font-normal">({s.value})</span></div>{i < salesFunnelData.length-1 && <div className="flex items-center justify-center w-full mt-1"><span className="text-xs text-gray-400">↓ {Math.round((salesFunnelData[i+1].value / s.value) * 100)}% conversion</span></div>}</div>))}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">📐 Earned Value — Portfolio CPI & SPI</h4><ResponsiveContainer width="100%" height={220}><BarChart data={evmData} margin={{ top:5, right:5, left:-20, bottom:0 }}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/><XAxis dataKey="project" tick={{ fill:'#6b7280', fontSize:9 }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" height={50}/><YAxis domain={[0.6,1.2]} tick={{ fill:'#6b7280', fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>v.toFixed(2)}/><Tooltip content={<EVMTooltip/>}/><Legend wrapperStyle={{ fontSize:'11px', paddingTop:'8px' }} formatter={(value)=><span style={{ color:'#4b5563' }}>{value}</span>}/><Bar dataKey="cpi" name="CPI" radius={[4,4,0,0]}>{evmData.map((entry,i)=><Cell key={i} fill={entry.cpi>=1?'#10b981':entry.cpi>=0.9?'#f59e0b':'#ef4444'}/>)}</Bar><Bar dataKey="spi" name="SPI" radius={[4,4,0,0]}>{evmData.map((entry,i)=><Cell key={i} fill={entry.spi>=1?'#6ee7b7':entry.spi>=0.9?'#fcd34d':'#fca5a5'}/>)}</Bar></BarChart></ResponsiveContainer><div className="flex justify-around text-xs font-semibold mt-2 pt-2 border-t border-gray-100"><span>Portfolio CPI: <span className="text-amber-600">0.94</span></span><span>Portfolio SPI: <span className="text-green-600">0.97</span></span></div></div>
      </div>

      {/* Project Health Table + NPS */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
          <div className="px-5 py-4 border-b border-gray-100"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider">🏗️ Active Projects — Health Dashboard</h4></div>
          <div className="overflow-x-auto max-h-72 overflow-y-auto"><table className="w-full text-xs" style={{ minWidth:'650px' }}><thead className="sticky top-0"><tr className="bg-gray-50 text-gray-500 border-b border-gray-200"><th className="text-left px-4 py-3 font-semibold uppercase tracking-wider">Project</th><th className="text-left px-4 py-3 font-semibold uppercase tracking-wider">Service</th><th className="text-left px-4 py-3 font-semibold uppercase tracking-wider">% Done</th><th className="text-left px-4 py-3 font-semibold uppercase tracking-wider">CPI</th><th className="text-left px-4 py-3 font-semibold uppercase tracking-wider">SPI</th><th className="text-left px-4 py-3 font-semibold uppercase tracking-wider">Budget</th><th className="text-left px-4 py-3 font-semibold uppercase tracking-wider">Schedule</th><th className="text-left px-4 py-3 font-semibold uppercase tracking-wider">Health</th></tr></thead><tbody className="divide-y divide-gray-100">{projectHealthData.map((p,i)=><tr key={i} onClick={()=>setProjectModal(p)} className="hover:bg-gray-50 transition cursor-pointer"><td className="px-4 py-3"><p className="font-semibold text-gray-800">{p.name}</p><p className="text-gray-400">{p.pm}</p></td><td className="px-4 py-3 text-gray-500">{p.service}</td><td className="px-4 py-3 text-gray-800 font-medium">{p.complete}%</td><td className={`px-4 py-3 font-bold ${p.cpi>=1?'text-green-600':p.cpi>=0.9?'text-amber-600':'text-red-600'}`}>{p.cpi.toFixed(2)}</td><td className={`px-4 py-3 font-bold ${p.spi>=1?'text-green-600':p.spi>=0.9?'text-amber-600':'text-red-600'}`}>{p.spi.toFixed(2)}</td><td className={`px-4 py-3 font-medium ${p.budgetVar>=0?'text-green-600':'text-red-600'}`}>{p.budgetVar>=0?'+':''}{p.budgetVar.toFixed(1)}%</td><td className={`px-4 py-3 font-medium ${p.schedVar<=0?'text-green-600':'text-red-600'}`}>{p.schedVar>0?'+':''}{p.schedVar} days</td><td className="px-4 py-3"><span className={`px-2 py-0.5 rounded-full text-xs font-bold ${p.health==='green'?'bg-green-100 text-green-700':p.health==='yellow'?'bg-amber-100 text-amber-700':'bg-red-100 text-red-700'}`}>{p.health==='green'?'On Track':p.health==='yellow'?'At Risk':'Critical'}</span></td></tr>)}</tbody></table></div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 flex flex-col items-center justify-center shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 text-center">⭐ NPS Gauge</h4><NPSGauge score={54}/></div>
      </div>

      {/* Sales & Growth Engine */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">💰 Weighted Sales Funnel (₹ Cr)</h4><div className="space-y-2">{weightedFunnel.map((s,i)=><div key={i}><div className="flex justify-between text-xs"><span>{s.stage}</span><span>₹{s.value} Cr · {s.count} deals</span></div><div className="h-2 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width: `${s.pct}%` }}/></div></div>)}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">📦 Order Book & Customer Economics</h4><div className="grid grid-cols-2 gap-3 mb-3"><div className="bg-gray-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">Order Book Cover</p><p className="text-xl font-bold">{orderBookCover.coverMonths}x</p><p className="text-[10px] text-gray-500">Backlog ₹{orderBookCover.backlog}Cr · Monthly ₹{orderBookCover.monthlyRunRate}Cr</p></div><div className="bg-gray-50 p-3 rounded-lg text-center"><p className="text-xs text-gray-500">CAC / LTV Ratio</p><p className="text-xl font-bold">{cacLtv.ratio}x</p><p className="text-[10px] text-gray-500">Payback {cacLtv.paybackMonths} months</p></div></div><div className="border-t border-gray-100 pt-3"><div className="flex justify-between text-xs"><span>Estimation Accuracy Score</span><span className={`font-bold ${estimationAccuracy.avgVariance<0?'text-red-600':'text-green-600'}`}>{estimationAccuracy.avgVariance}% vs budget</span></div><p className="text-[10px] text-gray-500 mt-1">Top estimator: {estimationAccuracy.topEstimator} · Worst: {estimationAccuracy.worstProject}</p></div></div>
      </div>

      {/* Team & Compliance + Design Productivity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2"><Users size={14}/> Key Talent Risk</h4><div className="flex justify-between mb-2"><span>Attrition Rate (6M)</span><span className="font-bold text-red-600">{talentRisk.attritionRate}%</span></div><div className="flex justify-between mb-2"><span>Succession Coverage</span><span className="font-bold text-amber-600">{talentRisk.successionCoverage}%</span></div><div><span className="text-xs text-gray-500">Critical roles open:</span> <span className="text-xs font-medium">{talentRisk.criticalRoles.join(', ')}</span></div><div className="mt-3 pt-3 border-t border-gray-100"><h5 className="text-xs font-bold text-gray-600">Compliance Calendar</h5>{complianceCalendar.map((c,i)=><div key={i} className="flex justify-between text-xs py-1"><span>{c.item}</span><span className={`${c.risk==='High'?'text-red-600':'text-amber-600'}`}>Due: {c.due}</span></div>)}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2"><Briefcase size={14}/> Design Productivity</h4><div className="grid grid-cols-2 gap-2"><div><p className="text-xs text-gray-500">Clash Resolution</p><p className="text-lg font-bold">{designProductivity.clashResolution}%</p></div><div><p className="text-xs text-gray-500">Drawing Cycle (days)</p><p className="text-lg font-bold">{designProductivity.drawingCycleDays}</p></div><div><p className="text-xs text-gray-500">RFI Turnaround (days)</p><p className="text-lg font-bold">{designProductivity.rfiTurnaround}</p></div><div><p className="text-xs text-gray-500">Rev‑0 First Review</p><p className="text-lg font-bold">{designProductivity.rev0Rate}%</p></div></div></div>
      </div>

      {/* Market Intelligence + Innovation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2"><Globe size={14}/> Market Intelligence</h4><div className="space-y-2">{commodityIndices.map(c=><div key={c.name} className="flex justify-between text-xs border-b border-gray-100 pb-1"><span>{c.name} <span className="text-gray-400">({c.unit})</span></span><span className="font-bold">₹{c.price} <span className={c.change.includes('+')?'text-red-600':'text-green-600'}>{c.change}</span></span><span className="text-gray-500">Margin impact: {c.impact}L</span></div>)}<div className="pt-2"><p className="text-xs font-semibold">Macro: Repo {macroIndicators.repoRate}% · 10Y G-Sec {macroIndicators.gSecYield}% · IIP Construction {macroIndicators.iipConstruction}%</p></div><div><p className="text-xs font-semibold">Competitor Watch:</p>{competitorWatch.map(c=><p key={c.name} className="text-xs">• {c.name} won ₹{c.value}Cr {c.recentWin} – {c.strategy}</p>)}</div></div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4 flex items-center gap-2"><Cpu size={14}/> Innovation & Automation</h4><div className="space-y-2"><div className="flex justify-between"><span>Automation Index</span><span className="font-bold text-blue-600">{innovationMetrics.automationIndex}%</span></div><div className="flex justify-between"><span>Lean Waste Score</span><span className="font-bold text-amber-600">Rework {innovationMetrics.leanWasteScore.reworkHours}h · Idle Eq ₹{innovationMetrics.leanWasteScore.idleEquipmentCost}L</span></div><div className="flex justify-between"><span>Digital Twin / IoT</span><span className="font-bold">{innovationMetrics.digitalTwinActive ? 'Active' : 'Pilot mode'} · {innovationMetrics.iotSensors} sensors deployed</span></div><div className="pt-2"><span className="text-xs text-gray-500">Material wastage: {innovationMetrics.leanWasteScore.materialWastage}% (target {'<'}3%)</span></div></div></div>
      </div>

      {/* Risk Heatmap */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-3"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2"><AlertTriangle size={14}/> Early Warning System — Active Signals</h4><button onClick={()=>setShowRiskHeatmap(!showRiskHeatmap)} className="text-xs text-blue-600">Toggle Details</button></div>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2">{earlyWarningSignals.map(signal=><div key={signal.name} className={`p-2 rounded-lg text-center ${signal.active?'bg-red-50 border border-red-200':'bg-gray-50 border border-gray-200'}`}><div className={`text-xs font-bold ${signal.active?'text-red-700':'text-gray-500'}`}>{signal.name}</div><div className="text-lg font-bold">{signal.active?'🔴 Active':'🟢 Inactive'}</div>{showRiskHeatmap && signal.active && <div className="text-[10px] text-gray-600 mt-1">{signal.autoAction?.substring(0,30)}</div>}</div>)}</div>
      </div>

      {/* Strategic Initiatives + Pareto */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-5">🎯 Strategic Initiative Progress</h4><div className="space-y-4">{strategicInitiatives.map((item,i)=><div key={i} className="flex items-center gap-3"><span className="text-xs font-semibold text-gray-700 w-44 shrink-0 leading-tight">{item.name}</span><div className="flex-1 bg-gray-200 rounded-full h-5 overflow-hidden"><div className="h-full rounded-full flex items-center justify-end pr-2 transition-all duration-1000" style={{ width:`${item.progress}%`, background:item.color }}><span className="text-white text-xs font-bold">{item.progress}%</span></div></div></div>)}</div></div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h4 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-4">📋 Quality — Complaint Categories (Pareto)</h4><ResponsiveContainer width="100%" height={220}><ComposedChart data={complaintData} margin={{ top:5, right:30, left:-15, bottom:0 }}><CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/><XAxis dataKey="category" tick={{ fill:'#6b7280', fontSize:10 }} axisLine={false} tickLine={false}/><YAxis yAxisId="left" tick={{ fill:'#6b7280', fontSize:11 }} axisLine={false} tickLine={false}/><YAxis yAxisId="right" orientation="right" domain={[0,100]} tick={{ fill:'#6b7280', fontSize:11 }} axisLine={false} tickLine={false} tickFormatter={v=>`${v}%`}/><Tooltip contentStyle={{ background:'#ffffff', border:'1px solid #e5e7eb', borderRadius:8, fontSize:11 }}/><Legend wrapperStyle={{ fontSize:'11px', paddingTop:'8px' }} formatter={(value)=><span style={{ color:'#4b5563' }}>{value}</span>}/><Bar yAxisId="left" dataKey="count" name="Complaint Count" fill="#3b82f6" radius={[4,4,0,0]}/><Line yAxisId="right" type="monotone" dataKey="cum" name="Cumulative %" stroke="#ef4444" strokeWidth={2.5} dot={{ fill:'#ef4444', r:4 }}/></ComposedChart></ResponsiveContainer></div>
      </div>

      {/* Modals */}
      <DrillDownModal data={drillModal} onClose={()=>setDrillModal(null)} />
      <ProjectDrillModal project={projectModal} onClose={()=>setProjectModal(null)} />
    </div>
  )
}
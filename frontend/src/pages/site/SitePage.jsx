import { useState } from 'react'
import {
  HardHat, AlertTriangle, CheckCircle2, XCircle,
  TrendingUp, Clock, Users, Package,
  IndianRupee, Shield, Wrench, Camera, FileText,
  CloudRain, Sun, Zap, Activity, AlertCircle, Plus,  MapPin, 
  Truck, RefreshCw, 
  CheckSquare, 
  BookOpen,
} from 'lucide-react'
import {
  BarChart, Bar,  Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, 
  RadarChart, Radar, PolarGrid, PolarAngleAxis,
  ComposedChart, Legend, ReferenceLine
} from 'recharts'

// ── MOCK DATA ──────────────────────────────────────────────

const projects = [
  { id:'PRJ-001', name:'Oberoi Residency Tower', site:'Worli, Mumbai',    progress:68, health:72 },
  { id:'PRJ-003', name:'Tech Park MEP Works',    site:'Powai, Mumbai',    progress:81, health:88 },
  { id:'PRJ-004', name:'Villa Renovation Bandra',site:'Bandra, Mumbai',   progress:25, health:41 },
]

const spiCpiHistory = [
  { week:'W1 Jun', spi:0.96, cpi:0.98, planned:15, actual:14 },
  { week:'W2 Jun', spi:0.94, cpi:0.95, planned:18, actual:17 },
  { week:'W3 Jun', spi:0.91, cpi:0.92, planned:20, actual:18 },
  { week:'W4 Jun', spi:0.88, cpi:0.90, planned:22, actual:19 },
  { week:'W1 Jul', spi:0.86, cpi:0.88, planned:24, actual:20 },
  { week:'W2 Jul', spi:0.84, cpi:0.85, planned:22, actual:18 },
  { week:'W3 Jul', spi:0.82, cpi:0.84, planned:20, actual:16 },
  { week:'W4 Jul', spi:0.80, cpi:0.82, planned:18, actual:14 },
]

const labourData = [
  { trade:'Mason',       planned:8,  present:7,  absent:1,  productivity:82, contractor:'Raj Builders'   },
  { trade:'Steel Fixer', planned:6,  present:6,  absent:0,  productivity:91, contractor:'Steel Works Co' },
  { trade:'Carpenter',   planned:4,  present:3,  absent:1,  productivity:75, contractor:'Wood Masters'   },
  { trade:'Helper',      planned:12, present:10, absent:2,  productivity:68, contractor:'Raj Builders'   },
  { trade:'Electrician', planned:3,  present:3,  absent:0,  productivity:88, contractor:'Spark Elec'    },
  { trade:'Plumber',     planned:2,  present:1,  absent:1,  productivity:50, contractor:'Flow Pipe Co'   },
  { trade:'Painter',     planned:4,  present:4,  absent:0,  productivity:79, contractor:'Color Works'    },
  { trade:'Welder',      planned:2,  present:2,  absent:0,  productivity:93, contractor:'Metal Fab Co'   },
]

const attendanceWeek = [
  { day:'Mon', planned:41, present:38 },
  { day:'Tue', planned:41, present:40 },
  { day:'Wed', planned:41, present:35 },
  { day:'Thu', planned:41, present:39 },
  { day:'Fri', planned:41, present:36 },
  { day:'Sat', planned:35, present:32 },
]

const materials = [
  { name:'TMT Steel Fe500D', unit:'MT',   stock:12.5, required:18.0, ordered:10.0, consumed:5.5,  budget:850,  actual:880,  status:'low',    wastage:2.1, category:'Structure' },
  { name:'OPC 53 Cement',   unit:'Bags', stock:180,  required:350,  ordered:200,  consumed:85,   budget:350,  actual:365,  status:'low',    wastage:3.4, category:'Structure' },
  { name:'RMC M25',         unit:'M³',   stock:45,   required:45,   ordered:0,    consumed:22,   budget:5200, actual:5180, status:'ok',     wastage:1.2, category:'Structure' },
  { name:'Bricks (Red)',    unit:'Nos',  stock:8200, required:5000, ordered:0,    consumed:3400, budget:8.5,  actual:8.5,  status:'ok',     wastage:4.5, category:'Masonry'   },
  { name:'River Sand',      unit:'MT',   stock:8.5,  required:12,   ordered:5,    consumed:4.2,  budget:1200, actual:1280, status:'low',    wastage:5.2, category:'Masonry'   },
  { name:'Plywood 18mm',    unit:'Nos',  stock:0,    required:40,   ordered:40,   consumed:0,    budget:1800, actual:0,    status:'out',    wastage:0,   category:'Shuttering'},
  { name:'Binding Wire',    unit:'Kg',   stock:85,   required:60,   ordered:0,    consumed:42,   budget:85,   actual:82,   status:'ok',     wastage:1.8, category:'Structure' },
  { name:'Waterproofing Compound',unit:'Ltr',stock:80,required:120,  ordered:50,   consumed:35,   budget:280,  actual:295,  status:'low',    wastage:2.8, category:'Finishes'  },
]

const materialConsumption = [
  { week:'W1', steel:1.2, cement:45, concrete:8 },
  { week:'W2', steel:1.8, cement:62, concrete:12 },
  { week:'W3', steel:2.1, cement:58, concrete:10 },
  { week:'W4', steel:1.5, cement:48, concrete:14 },
]

const safetyData = {
  ltir: 0.0,
  daysSinceIncident: 187,
  nearMisses: 2,
  ppeCompliance: 94.2,
  toolboxTalks: 142,
  observations: 86,
  incidents: [],
  nearMissList: [
    { id:'NM-12', desc:'Worker nearly fell from scaffold — Floor 14 (no handrail)',  date:'28 Jul', severity:'high',   status:'investigating', reporter:'Vikram S.' },
    { id:'NM-11', desc:'Falling object — wrench dropped from Floor 12 formwork',     date:'24 Jul', severity:'medium', status:'closed',        reporter:'Ram S.'    },
  ],
  inspections: [
    { area:'Scaffolding Floor 14',  date:'29 Jul', status:'pass',    inspector:'Vikram Singh',  remarks:'Handrail missing — fixed' },
    { area:'Electrical Panel Room', date:'27 Jul', status:'pass',    inspector:'Nitin Desai',   remarks:'All clear'                },
    { area:'Material Storage',      date:'25 Jul', status:'fail',    inspector:'Ram Shinde',    remarks:'No fire extinguisher nearby' },
    { area:'Labour Camp',           date:'22 Jul', status:'pass',    inspector:'Ganesh More',   remarks:'Sanitation satisfactory'  },
  ],
  ppeByTrade: [
    { trade:'Mason',       helmet:true,  boots:true,  gloves:false, vest:true  },
    { trade:'Steel Fixer', helmet:true,  boots:true,  gloves:true,  vest:true  },
    { trade:'Carpenter',   helmet:true,  boots:false, gloves:true,  vest:true  },
    { trade:'Helper',      helmet:true,  boots:true,  gloves:false, vest:false },
    { trade:'Electrician', helmet:true,  boots:true,  gloves:true,  vest:true  },
  ],
}

const financialData = {
  contractValue:  24000000,
  billedToDate:   9600000,
  receivedToDate: 7200000,
  retentionHeld:  960000,
  unbilledWork:   4200000,
  openRA:         2,
  cashBalance:    1850000,
  projectedOutflow7d: 680000,
  contingencyUsed: 42,
  forecastCompletion: 26800000,
  raHistory: [
    { ra:'RA-01', amount:2400000, submitted:'15 Mar', certified:'28 Mar', received:'10 Apr', status:'paid',    retention:240000 },
    { ra:'RA-02', amount:3200000, submitted:'15 Apr', certified:'30 Apr', received:'18 May', status:'paid',    retention:320000 },
    { ra:'RA-03', amount:2800000, submitted:'15 May', certified:'31 May', received:'22 Jun', status:'paid',    retention:280000 },
    { ra:'RA-04', amount:2400000, submitted:'15 Jun', certified:'30 Jun', received:'15 Jul', status:'paid',    retention:240000 },
    { ra:'RA-05', amount:1850000, submitted:'15 Jul', certified:null,     received:null,     status:'pending', retention:185000 },
    { ra:'RA-06', amount:2800000, submitted:null,     certified:null,     received:null,     status:'upcoming',retention:280000 },
  ],
}

const cashFlowHistory = [
  { month:'Mar', inflow:24, outflow:18, net:6  },
  { month:'Apr', inflow:32, outflow:24, net:8  },
  { month:'May', inflow:28, outflow:22, net:6  },
  { month:'Jun', inflow:24, outflow:20, net:4  },
  { month:'Jul', inflow:18, outflow:16, net:2  },
]

const qualityData = {
  ncrOpen:    3,
  ncrClosed:  12,
  ncrTotal:   15,
  ncrs: [
    { id:'NCR-15', area:'Slab Floor 13',   desc:'Honeycombing in concrete — 0.3m² area',  raised:'28 Jul', severity:'major',  status:'open',     responsible:'Ram S.',    age:2  },
    { id:'NCR-14', area:'Column Grid C5',  desc:'Deviation from plumb >10mm',              raised:'25 Jul', severity:'major',  status:'open',     responsible:'Sunil K.',  age:5  },
    { id:'NCR-13', area:'Waterproofing B2',desc:'Pinhole voids in membrane — patch needed', raised:'20 Jul', severity:'minor',  status:'open',     responsible:'Anil P.',   age:10 },
    { id:'NCR-12', area:'Brickwork L9',    desc:'Wrong mortar mix used (1:8 vs 1:6)',       raised:'18 Jul', severity:'minor',  status:'closed',   responsible:'Ram S.',    age:12 },
    { id:'NCR-11', area:'RCC Column F4',   desc:'Cover block missing — 4 locations',        raised:'14 Jul', severity:'major',  status:'closed',   responsible:'Vikram S.', age:16 },
  ],
  checklistItems: [
    { activity:'Bar bending schedule check',    status:'done',    date:'29 Jul' },
    { activity:'Formwork alignment check',      status:'done',    date:'29 Jul' },
    { activity:'Cover blocks placement',        status:'pending', date:'30 Jul' },
    { activity:'Slump test before pour',        status:'pending', date:'30 Jul' },
    { activity:'Cube samples taken',            status:'pending', date:'30 Jul' },
    { activity:'Curing started',               status:'na',      date:'31 Jul' },
  ],
}

const equipmentData = [
  { name:'Tower Crane TC-01',  type:'Crane',    status:'running',  utilization:72, hours:8,  idle:3,  issue:null,               operator:'Ramesh D.',   cost:45000 },
  { name:'Concrete Pump CP-01',type:'Pump',     status:'idle',     utilization:35, hours:3.5,idle:6.5,issue:'Waiting for RMC',  operator:'Suresh P.',   cost:18000 },
  { name:'JCB 3CX EX-01',      type:'Excavator',status:'running',  utilization:65, hours:6.5,idle:3.5,issue:null,               operator:'Anil K.',     cost:12000 },
  { name:'Transit Mixer TM-01',type:'Mixer',    status:'breakdown',utilization:0,  hours:0,  idle:10, issue:'Engine failure — mechanic called',operator:'Raju S.',cost:8000},
  { name:'Bar Bending BB-01',  type:'Machine',  status:'running',  utilization:88, hours:8.8,idle:1.2,issue:null,               operator:'Ganesh M.',   cost:3500  },
  { name:'Concrete Vibrator V1',type:'Tool',    status:'running',  utilization:80, hours:8,  idle:2,  issue:null,               operator:'Sunil K.',    cost:800   },
]

const subcontractors = [
  { name:'Raj Builders',    trade:'Civil/Mason',   rating:'A', score:88, schedule:90, quality:85, safety:92, claims:75, projects:3, activeSince:'2022', status:'preferred' },
  { name:'Steel Works Co',  trade:'Steel Fixing',  rating:'A', score:92, schedule:95, quality:90, safety:95, claims:88, projects:5, activeSince:'2021', status:'preferred' },
  { name:'Wood Masters',    trade:'Shuttering',    rating:'B', score:72, schedule:70, quality:75, safety:68, claims:80, projects:2, activeSince:'2023', status:'active'    },
  { name:'Spark Elec',      trade:'Electrical',    rating:'A', score:85, schedule:88, quality:82, safety:90, claims:80, projects:2, activeSince:'2022', status:'active'    },
  { name:'Flow Pipe Co',    trade:'Plumbing',      rating:'C', score:58, schedule:55, quality:60, safety:52, claims:65, projects:1, activeSince:'2024', status:'review'    },
  { name:'Color Works',     trade:'Painting',      rating:'B', score:76, schedule:78, quality:80, safety:72, claims:74, projects:2, activeSince:'2023', status:'active'    },
]

const subRadarData = (sub) => [
  { metric:'Schedule', value:sub.schedule },
  { metric:'Quality',  value:sub.quality  },
  { metric:'Safety',   value:sub.safety   },
  { metric:'Claims',   value:sub.claims   },
  { metric:'Overall',  value:sub.score    },
]

const complianceItems = [
  { item:'Labour Licence (Form III)',      expiry:'15 Sep 2025', daysLeft:47, status:'ok',      issuer:'Labour Dept'       },
  { item:'RERA Registration',              expiry:'31 Dec 2025', daysLeft:154,status:'ok',      issuer:'MahaRERA'          },
  { item:'Building Permit (CC)',           expiry:'28 Feb 2026', daysLeft:213,status:'ok',      issuer:'MCGM'              },
  { item:'Fire NOC',                       expiry:'30 Aug 2025', daysLeft:31, status:'warning', issuer:'Fire Brigade'      },
  { item:'Environmental Clearance',        expiry:'30 Jun 2025', daysLeft:-30,status:'expired', issuer:'SEIAA'             },
  { item:'Workmen Compensation Insurance', expiry:'01 Oct 2025', daysLeft:63, status:'ok',      issuer:'New India Assurance'},
  { item:'Professional Tax (Enrolment)',   expiry:'31 Mar 2026', daysLeft:244,status:'ok',      issuer:'Profession Tax Dept'},
  { item:'Site Hoarding Board (BMC)',      expiry:'30 Sep 2025', daysLeft:62, status:'ok',      issuer:'BMC'               },
]

const earlyWarnings = [
  { severity:'critical', icon:'🚨', type:'Cash',      title:'Unbilled Work Gap Critical',       desc:'₹42L work done but not billed — RA-05 pending 15 days',           action:'Submit RA Now',   module:'financial' },
  { severity:'critical', icon:'⚡', type:'Schedule',  title:'SPI at 0.82 — Red Zone',           desc:'2 weeks consecutive SPI below 0.85 — escalate to PM',             action:'Recovery Plan',   module:'schedule'  },
  { severity:'high',     icon:'🔴', type:'Material',  title:'Plywood Stock-out',                desc:'40 Nos required. Zero in stock. Order placed but unconfirmed',     action:'Chase Vendor',    module:'material'  },
  { severity:'high',     icon:'⚠️', type:'Safety',    title:'PPE Non-Compliance 5.8%',          desc:'4 workers without full PPE. Repeat violation (2nd time this week)', action:'Stop Work Order', module:'safety'    },
  { severity:'high',     icon:'🔧', type:'Equipment', title:'Transit Mixer Breakdown',          desc:'TM-01 engine failure. No RMC delivery possible today',             action:'Call Mechanic',   module:'equipment' },
  { severity:'medium',   icon:'💳', type:'Financial', title:'Fire NOC Expiring in 31 Days',    desc:'Renewal application not yet submitted to Fire Brigade',            action:'Apply Now',       module:'compliance'},
  { severity:'medium',   icon:'🌧️', type:'Weather',  title:'Monsoon Warning — Heavy Rain',     desc:'IMD: Red alert Mumbai 30-31 Jul. External work to be halted',       action:'Monsoon Prep',    module:'weather'   },
  { severity:'medium',   icon:'📉', type:'Labour',    title:'Plumber Absenteeism 50%',         desc:'Only 1 of 2 plumbers present for 3 consecutive days',              action:'Call Contractor', module:'labour'    },
  { severity:'low',      icon:'🏗️', type:'NCR',       title:'2 Major NCRs Overdue >5 days',    desc:'NCR-14 (Column plumb) and NCR-15 (Honeycombing) unresolved',       action:'Review NCRs',     module:'quality'   },
  { severity:'low',      icon:'📋', type:'Compliance',title:'Env. Clearance Expired 30 Days',  desc:'Environmental Clearance expired — risk of stop-work notice',       action:'Renew Urgently',  module:'compliance'},
]

const dprHistory = [
  { date:'29 Jul', work:'Slab casting Floor 14 — 240 M³ poured',    workers:22, issues:2, weather:'Partly Cloudy', submitted:'06:45 PM', rainfall:0   },
  { date:'28 Jul', work:'Column shuttering Floor 15 — 8 columns',    workers:24, issues:1, weather:'Clear',         submitted:'06:30 PM', rainfall:0   },
  { date:'27 Jul', work:'Rebar tying Floor 14 east wing',            workers:23, issues:0, weather:'Clear',         submitted:'06:15 PM', rainfall:0   },
  { date:'26 Jul', work:'Waterproofing Basement 2 — 450 M²',        workers:21, issues:1, weather:'Overcast',      submitted:'06:55 PM', rainfall:0   },
  { date:'25 Jul', work:'No work — Heavy rainfall halt',             workers:0,  issues:0, weather:'Heavy Rain',    submitted:'07:00 AM', rainfall:58.4},
  { date:'24 Jul', work:'External scaffolding inspection + repair',  workers:18, issues:0, weather:'Clear',         submitted:'06:40 PM', rainfall:0   },
]

const weatherForecast = [
  { day:'Today',  temp:32, condition:'Partly Cloudy', rain:20, wind:18, risk:'low'    },
  { day:'30 Jul', temp:30, condition:'Heavy Rain',    rain:90, wind:32, risk:'high'   },
  { day:'31 Jul', temp:29, condition:'Heavy Rain',    rain:85, wind:28, risk:'high'   },
  { day:'01 Aug', temp:31, condition:'Overcast',      rain:40, wind:20, risk:'medium' },
  { day:'02 Aug', temp:33, condition:'Clear',         rain:10, wind:14, risk:'low'    },
]

const milestones = [
  { title:'Foundation Complete',        date:'01 Mar 2025', done:true,  spi:1.02 },
  { title:'Plinth Level',               date:'01 Apr 2025', done:true,  spi:0.98 },
  { title:'Floor 10 Slab',             date:'15 Jun 2025', done:true,  spi:0.94 },
  { title:'Floor 14 Slab ← Current',  date:'15 Aug 2025', done:false, spi:0.82 },
  { title:'Floor 18 Slab',             date:'20 Sep 2025', done:false, spi:null },
  { title:'Brick & Plaster Complete',   date:'30 Oct 2025', done:false, spi:null },
  { title:'Finishing & Handover',       date:'15 Dec 2025', done:false, spi:null },
]

// ── HELPERS ───────────────────────────────────────────────
const formatINR = (n) => {
  if (!n) return '₹0'
  if (n >= 10000000) return `₹${(n/10000000).toFixed(2)} Cr`
  if (n >= 100000)   return `₹${(n/100000).toFixed(1)} L`
  return `₹${new Intl.NumberFormat('en-IN').format(n)}`
}

const totalPresent    = labourData.reduce((s,l) => s + l.present, 0)
const totalPlanned    = labourData.reduce((s,l) => s + l.planned, 0)
const avgProductivity = Math.round(labourData.reduce((s,l) => s + l.productivity, 0) / labourData.length)
const attendancePct   = Math.round((totalPresent / totalPlanned) * 100)

// Project Health Score computation
const computeHealthScore = () => {
  const spi   = 0.82
  const cpi   = 0.84
  const safety= 97
  const quality= Math.round(((qualityData.ncrTotal - qualityData.ncrOpen) / qualityData.ncrTotal) * 100)
  const labour = attendancePct
  return Math.round((spi*25 + cpi*25 + (safety/100)*20 + (quality/100)*15 + (labour/100)*15) * 1.0)
}
const healthScore = computeHealthScore()

// ── SUB-COMPONENTS ────────────────────────────────────────

const SeverityBadge = ({ severity }) => {
  const map = {
    critical: 'bg-red-100    text-red-700    border-red-200',
    high:     'bg-orange-100 text-orange-700 border-orange-200',
    medium:   'bg-amber-100  text-amber-700  border-amber-200',
    low:      'bg-blue-100   text-blue-700   border-blue-200',
    major:    'bg-red-100    text-red-700    border-red-200',
    minor:    'bg-amber-100  text-amber-700  border-amber-200',
  }
  return (
    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold capitalize ${map[severity] || map.low}`}>
      {severity}
    </span>
  )
}

const StatusPill = ({ status }) => {
  const map = {
    ok:          'bg-green-100  text-green-700  border-green-200',
    low:         'bg-amber-100  text-amber-700  border-amber-200',
    out:         'bg-red-100    text-red-700    border-red-200',
    pass:        'bg-green-100  text-green-700  border-green-200',
    fail:        'bg-red-100    text-red-700    border-red-200',
    open:        'bg-red-100    text-red-700    border-red-200',
    closed:      'bg-green-100  text-green-700  border-green-200',
    paid:        'bg-green-100  text-green-700  border-green-200',
    pending:     'bg-amber-100  text-amber-700  border-amber-200',
    upcoming:    'bg-blue-100   text-blue-700   border-blue-200',
    running:     'bg-green-100  text-green-700  border-green-200',
    idle:        'bg-amber-100  text-amber-700  border-amber-200',
    breakdown:   'bg-red-100    text-red-700    border-red-200',
    warning:     'bg-amber-100  text-amber-700  border-amber-200',
    expired:     'bg-red-100    text-red-700    border-red-200',
    preferred:   'bg-purple-100 text-purple-700 border-purple-200',
    active:      'bg-blue-100   text-blue-700   border-blue-200',
    review:      'bg-red-100    text-red-700    border-red-200',
    done:        'bg-green-100  text-green-700  border-green-200',
    'na':        'bg-gray-100   text-gray-500   border-gray-200',
    investigating:'bg-orange-100 text-orange-700 border-orange-200',
  }
  const labels = {
    ok:'OK', low:'Low Stock', out:'Out of Stock', pass:'Pass', fail:'Fail',
    open:'Open', closed:'Closed', paid:'Paid', pending:'Pending', upcoming:'Upcoming',
    running:'Running', idle:'Idle', breakdown:'Breakdown', warning:'Expiring Soon',
    expired:'Expired', preferred:'⭐ Preferred', active:'Active', review:'Under Review',
    done:'Done', na:'N/A', investigating:'Investigating',
  }
  return (
    <span className={`text-xs px-2.5 py-0.5 rounded-full border font-semibold ${map[status] || map.pending}`}>
      {labels[status] || status}
    </span>
  )
}

const RatingBadge = ({ rating }) => {
  const map = {
    A: 'bg-green-600  text-white',
    B: 'bg-blue-600   text-white',
    C: 'bg-amber-500  text-white',
    D: 'bg-red-600    text-white',
  }
  return (
    <span className={`text-xs w-7 h-7 rounded-full flex items-center justify-center font-black shadow-sm ${map[rating] || 'bg-gray-400 text-white'}`}>
      {rating}
    </span>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-xl px-3 py-2 text-xs shadow-xl">
      <p className="text-gray-500 mb-1 font-semibold">{label}</p>
      {payload.map((p,i) => (
        <p key={i} style={{ color:p.color }} className="font-semibold">{p.name}: {p.value}</p>
      ))}
    </div>
  )
}

// ── PROJECT HEALTH GAUGE ──────────────────────────────────
function HealthGauge({ score }) {
  const color = score >= 75 ? '#10b981' : score >= 55 ? '#f59e0b' : '#ef4444'
  const label = score >= 75 ? 'HEALTHY' : score >= 55 ? 'AT RISK' : 'CRITICAL'
  const rotation = (score / 100) * 180
  const rad = ((180 - rotation) * Math.PI) / 180
  const cx = 110, cy = 100, r = 80
  const nx = cx + r * Math.cos(rad)
  const ny = cy - r * Math.sin(rad)

  return (
    <div className="flex flex-col items-center">
      <svg viewBox="0 0 220 115" className="w-56">
        <defs>
          <linearGradient id="gaugeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%"   stopColor="#ef4444"/>
            <stop offset="40%"  stopColor="#f59e0b"/>
            <stop offset="70%"  stopColor="#22c55e"/>
            <stop offset="100%" stopColor="#10b981"/>
          </linearGradient>
        </defs>
        {/* Track */}
        <path d={`M 30 100 A 80 80 0 0 1 190 100`} fill="none" stroke="#e2e8f0" strokeWidth="14" strokeLinecap="round"/>
        {/* Fill */}
        <path d={`M 30 100 A 80 80 0 0 1 190 100`} fill="none" stroke="url(#gaugeGrad)"
          strokeWidth="14" strokeLinecap="round"
          strokeDasharray={`${(score/100)*251.2} 251.2`}
        />
        {/* Tick marks */}
        {[0,25,50,75,100].map((v,i) => {
          const a = ((180 - (v/100*180)) * Math.PI)/180
          const x1 = cx + 70 * Math.cos(a), y1 = cy - 70 * Math.sin(a)
          const x2 = cx + 85 * Math.cos(a), y2 = cy - 85 * Math.sin(a)
          return <line key={i} x1={x1} y1={y1} x2={x2} y2={y2} stroke="#cbd5e1" strokeWidth="2"/>
        })}
        {/* Needle */}
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke="#1e293b" strokeWidth="3" strokeLinecap="round"/>
        <circle cx={cx} cy={cy} r={6} fill="#1e293b"/>
        <circle cx={cx} cy={cy} r={3} fill="white"/>
        {/* Score */}
        <text x={cx} y={cy+22} textAnchor="middle" fill="#1e293b" fontSize="28" fontWeight="900">{score}</text>
        <text x={cx} y={cy+34} textAnchor="middle" fill={color} fontSize="9" fontWeight="700" letterSpacing="1">{label}</text>
      </svg>
      <p className="text-xs text-gray-400 -mt-1">Project Health Score / 100</p>
    </div>
  )
}

// ── DPR MODAL ─────────────────────────────────────────────
function DPRModal({ onClose }) {
  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    date: new Date().toISOString().split('T')[0],
    weather: 'Clear', rainfall: '0', maxTemp: '32',
    workDone: '', floor: '14', quantity: '', unit: 'M³',
    workers: '', issues: '', photos: [],
    materials: '',
  })
  const update = (k,v) => setForm(f => ({...f,[k]:v}))
  const steps = ['Site Info','Work Done','Labour','Materials','Issues','Submit']

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">

        {/* Header */}
        <div className="bg-gradient-to-r from-blue-600 to-indigo-700 px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-white font-black text-base">Daily Progress Report</h2>
            <p className="text-blue-100 text-xs">{form.date} · Oberoi Residency Tower</p>
          </div>
          <button onClick={onClose} className="text-white/70 hover:text-white text-xl font-bold">×</button>
        </div>

        {/* Step indicator */}
        <div className="flex bg-gray-50 border-b border-gray-100">
          {steps.map((s,i) => (
            <button
              key={i}
              onClick={() => setStep(i+1)}
              className={`flex-1 text-center py-2 text-xs font-semibold transition ${
                step === i+1
                  ? 'text-blue-600 border-b-2 border-blue-600 bg-white'
                  : step > i+1
                  ? 'text-green-600'
                  : 'text-gray-400'
              }`}
            >
              {step > i+1 ? '✓' : i+1} {s}
            </button>
          ))}
        </div>

        <div className="flex-1 overflow-y-auto p-6">

          {/* Step 1: Site Info */}
          {step === 1 && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800">Site & Weather Conditions</h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Report Date</label>
                  <input type="date" value={form.date} onChange={e=>update('date',e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-gray-50"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Floor / Zone</label>
                  <input value={form.floor} onChange={e=>update('floor',e.target.value)}
                    placeholder="e.g. Floor 14, Basement 2"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-gray-50"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Weather</label>
                  <select value={form.weather} onChange={e=>update('weather',e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-gray-50">
                    {['Clear','Partly Cloudy','Overcast','Light Rain','Heavy Rain','Storm'].map(w=>
                      <option key={w}>{w}</option>
                    )}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Rainfall (mm)</label>
                  <input type="number" value={form.rainfall} onChange={e=>update('rainfall',e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-gray-50"/>
                </div>
              </div>

              {/* Weather risk alert */}
              {parseFloat(form.rainfall) > 20 && (
                <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 flex items-center gap-2">
                  <AlertTriangle size={16} className="text-amber-600 shrink-0"/>
                  <p className="text-xs text-amber-700 font-medium">
                    Heavy rainfall expected — external works should be halted. Protect exposed steel and concrete.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Step 2: Work Done */}
          {step === 2 && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800">Work Done Today</h3>
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Work Description</label>
                <textarea
                  value={form.workDone}
                  onChange={e=>update('workDone',e.target.value)}
                  rows={3}
                  placeholder="e.g. Slab casting Floor 14 — 240 M³ poured. Column shuttering Floor 15 started..."
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-gray-50 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Quantity Achieved</label>
                  <input type="number" value={form.quantity} onChange={e=>update('quantity',e.target.value)}
                    placeholder="0"
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-gray-50"/>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-gray-500 mb-1.5">Unit</label>
                  <select value={form.unit} onChange={e=>update('unit',e.target.value)}
                    className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-gray-50">
                    {['M³','M²','RFT','MT','Bags','Nos','Points'].map(u=><option key={u}>{u}</option>)}
                  </select>
                </div>
              </div>

              {/* Photo Upload Placeholder */}
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1.5">Site Photos</label>
                <div className="border-2 border-dashed border-gray-200 rounded-xl p-6 text-center hover:border-blue-300 transition cursor-pointer bg-gray-50">
                  <Camera size={24} className="text-gray-400 mx-auto mb-2"/>
                  <p className="text-sm text-gray-500 font-medium">Click to upload photos</p>
                  <p className="text-xs text-gray-400 mt-0.5">Progress photos, material deliveries, issues</p>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Labour */}
          {step === 3 && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800">Labour Attendance</h3>
              <div className="space-y-2">
                {labourData.map((l,i) => (
                  <div key={i} className="flex items-center gap-3 bg-gray-50 rounded-xl px-3 py-2.5 border border-gray-100">
                    <span className="text-xs font-bold text-gray-700 w-24">{l.trade}</span>
                    <div className="flex items-center gap-2 ml-auto">
                      <span className="text-xs text-gray-400">Present:</span>
                      <input
                        type="number"
                        defaultValue={l.present}
                        className="w-14 border border-gray-200 rounded-lg px-2 py-1 text-xs text-center focus:outline-none focus:border-blue-400"
                      />
                      <span className="text-xs text-gray-400">/ {l.planned}</span>
                      {l.present < l.planned && (
                        <span className="text-xs text-red-500 font-semibold">
                          -{l.planned - l.present}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-blue-50 border border-blue-100 rounded-xl p-3">
                <p className="text-xs text-blue-700 font-semibold">
                  Today: {totalPresent} present / {totalPlanned} planned ({attendancePct}% attendance)
                </p>
              </div>
            </div>
          )}

          {/* Step 4: Materials */}
          {step === 4 && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800">Material Receipts & Consumption</h3>
              <textarea
                value={form.materials}
                onChange={e=>update('materials',e.target.value)}
                rows={5}
                placeholder={`Enter material receipts:\nTMT Steel Fe500D — 8 MT received — Supplier: Tata Steel\nOPC Cement — 150 bags received — Supplier: UltraTech\n\nEnter consumption:\nCement used today — 48 bags\nSand used — 1.2 MT`}
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-gray-50 resize-none"
              />
              <div className="grid grid-cols-2 gap-3">
                {materials.filter(m => m.status === 'low' || m.status === 'out').map((m,i) => (
                  <div key={i} className={`border rounded-xl p-3 text-xs ${
                    m.status === 'out' ? 'bg-red-50 border-red-200' : 'bg-amber-50 border-amber-200'
                  }`}>
                    <p className={`font-bold ${m.status === 'out' ? 'text-red-700' : 'text-amber-700'}`}>
                      ⚠ {m.name}
                    </p>
                    <p className={m.status === 'out' ? 'text-red-600' : 'text-amber-600'}>
                      Stock: {m.stock} {m.unit} (Need: {m.required} {m.unit})
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Issues */}
          {step === 5 && (
            <div className="space-y-4">
              <h3 className="font-bold text-gray-800">Issues, Safety & Observations</h3>
              <textarea
                value={form.issues}
                onChange={e=>update('issues',e.target.value)}
                rows={4}
                placeholder="Report any issues, near-misses, safety observations, quality defects, design queries..."
                className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-400 bg-gray-50 resize-none"
              />
              <div className="grid grid-cols-3 gap-3">
                {[
                  { label:'Any Safety Incident?',   options:['No','Yes - Minor','Yes - Major'] },
                  { label:'Quality Issue Found?',    options:['No','Yes - Minor','Yes - Major'] },
                  { label:'Design Query Raised?',    options:['No','Yes - Verbal','Yes - Written'] },
                ].map((q,i) => (
                  <div key={i}>
                    <label className="block text-xs font-semibold text-gray-500 mb-1.5">{q.label}</label>
                    <select className="w-full border border-gray-200 rounded-xl px-3 py-2 text-xs focus:outline-none focus:border-blue-400 bg-gray-50">
                      {q.options.map(o=><option key={o}>{o}</option>)}
                    </select>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 6: Submit */}
          {step === 6 && (
            <div className="space-y-4">
              <div className="text-center py-4">
                <div className="w-16 h-16 rounded-full bg-green-100 border-2 border-green-300 flex items-center justify-center mx-auto mb-3">
                  <CheckCircle2 size={32} className="text-green-600"/>
                </div>
                <h3 className="font-black text-gray-900 text-lg">Ready to Submit DPR</h3>
                <p className="text-gray-500 text-sm mt-1">Report will be auto-emailed to PM and CEO</p>
              </div>
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-4 space-y-2">
                {[
                  ['Date',        form.date           ],
                  ['Floor/Zone',  form.floor          ],
                  ['Weather',     form.weather        ],
                  ['Rainfall',    `${form.rainfall}mm`],
                  ['Workers',     `${totalPresent}/${totalPlanned}`],
                  ['Attendance',  `${attendancePct}%` ],
                ].map(([k,v],i) => (
                  <div key={i} className="flex justify-between text-xs">
                    <span className="text-gray-500">{k}</span>
                    <span className="font-semibold text-gray-800">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="flex gap-3 p-4 border-t border-gray-100 bg-gray-50">
          {step > 1 && (
            <button onClick={() => setStep(s => s-1)}
              className="flex-1 bg-white border border-gray-200 text-gray-600 text-sm font-semibold py-2.5 rounded-xl hover:bg-gray-50 transition">
              ← Back
            </button>
          )}
          {step < 6 ? (
            <button onClick={() => setStep(s => s+1)}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2.5 rounded-xl transition">
              Next →
            </button>
          ) : (
            <button onClick={onClose}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white text-sm font-bold py-2.5 rounded-xl transition flex items-center justify-center gap-2">
              <CheckCircle2 size={16}/> Submit DPR
            </button>
          )}
        </div>
      </div>
    </div>
  )
}

// ── MAIN COMPONENT ────────────────────────────────────────
export default function SitePage() {
  const [activeTab,    setActiveTab]    = useState('command')
  const [activeProject,setActiveProject]= useState(projects[0])
  const [showDPR,      setShowDPR]      = useState(false)
  const [selectedSub,  setSelectedSub]  = useState(null)
  const [refreshing,   setRefreshing]   = useState(false)

  const handleRefresh = () => {
    setRefreshing(true)
    setTimeout(() => setRefreshing(false), 1500)
  }

  const tabs = [
    { id:'command',    label:'🎯 Command'   },
    { id:'dpr',        label:'📋 DPR Log'   },
    { id:'labour',     label:'👷 Labour'    },
    { id:'material',   label:'📦 Materials' },
    { id:'safety',     label:'🦺 Safety'    },
    { id:'financial',  label:'💰 Finance'   },
    { id:'quality',    label:'✅ Quality'   },
    { id:'equipment',  label:'🔧 Equipment' },
    { id:'subcon',     label:'🤝 Sub-Con'   },
    { id:'compliance', label:'📜 Compliance'},
    { id:'warnings',   label:'⚡ Alerts'    },
  ]

  const criticalAlerts = earlyWarnings.filter(w => w.severity === 'critical').length
  const highAlerts     = earlyWarnings.filter(w => w.severity === 'high').length

  return (
    <div className="space-y-5 bg-gray-50 min-h-screen -m-6 p-6">

      {/* ── HEADER COMMAND BAR ── */}
      <div className="bg-gradient-to-r from-slate-800 via-slate-900 to-indigo-900 rounded-2xl p-5 shadow-xl">
        <div className="flex items-start justify-between flex-wrap gap-4">

          {/* Left: Project Info */}
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/10 border border-white/20 flex items-center justify-center">
              <HardHat size={24} className="text-white"/>
            </div>
            <div>
              <div className="flex items-center gap-2 mb-0.5">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse"/>
                <span className="text-green-400 text-xs font-bold tracking-wider">LIVE</span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-white/60 text-xs">SITE COMMAND CENTRE</span>
              </div>
              <select
                value={activeProject.id}
                onChange={e => setActiveProject(projects.find(p => p.id === e.target.value))}
                className="bg-transparent text-white font-black text-lg border-none outline-none cursor-pointer"
                style={{ WebkitAppearance:'none' }}
              >
                {projects.map(p => <option key={p.id} value={p.id} style={{ color:'#1e293b' }}>{p.name}</option>)}
              </select>
              <div className="flex items-center gap-2 mt-0.5">
                <MapPin size={12} className="text-white/50"/>
                <span className="text-white/60 text-xs">{activeProject.site}</span>
                <span className="text-white/40 text-xs">·</span>
                <span className="text-white/60 text-xs">{activeProject.progress}% Complete</span>
              </div>
            </div>
          </div>

          {/* Right: Actions + Weather */}
          <div className="flex items-center gap-3 flex-wrap">

            {/* Weather Widget */}
            <div className={`flex items-center gap-2 px-3 py-2 rounded-xl border ${
              weatherForecast[0].risk === 'high'
                ? 'bg-red-900/30 border-red-500/40'
                : 'bg-white/10 border-white/20'
            }`}>
              {weatherForecast[0].condition.includes('Rain')
                ? <CloudRain size={18} className="text-blue-300"/>
                : <Sun size={18} className="text-amber-300"/>
              }
              <div>
                <p className="text-white text-xs font-bold">{weatherForecast[0].temp}°C · {weatherForecast[0].condition}</p>
                <p className="text-white/50 text-xs">Rain: {weatherForecast[0].rain}% · Wind: {weatherForecast[0].wind}km/h</p>
              </div>
            </div>

            {/* Alert counts */}
            <div className="flex items-center gap-2">
              {criticalAlerts > 0 && (
                <div className="flex items-center gap-1.5 bg-red-600 text-white text-xs px-3 py-2 rounded-xl font-bold animate-pulse">
                  <AlertCircle size={14}/>
                  {criticalAlerts} Critical
                </div>
              )}
              {highAlerts > 0 && (
                <div className="flex items-center gap-1.5 bg-orange-500 text-white text-xs px-3 py-2 rounded-xl font-bold">
                  <AlertTriangle size={14}/>
                  {highAlerts} High
                </div>
              )}
            </div>

            <button onClick={handleRefresh}
              className="flex items-center gap-1.5 bg-white/10 hover:bg-white/20 text-white text-xs px-3 py-2 rounded-xl border border-white/20 transition font-semibold">
              <RefreshCw size={13} className={refreshing ? 'animate-spin' : ''}/>
              Refresh
            </button>

            <button
              onClick={() => setShowDPR(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-blue-500 to-indigo-600 text-white text-sm font-bold px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition">
              <Plus size={15}/> Submit DPR
            </button>
          </div>
        </div>

        {/* Quick stats bar */}
        <div className="grid grid-cols-4 sm:grid-cols-6 lg:grid-cols-8 gap-3 mt-4 pt-4 border-t border-white/10">
          {[
            { label:'SPI',          value:'0.82', color: '#ef4444',  icon:'📉' },
            { label:'CPI',          value:'0.84', color: '#ef4444',  icon:'💸' },
            { label:'Workers Today',value:`${totalPresent}/${totalPlanned}`, color:'#f59e0b', icon:'👷' },
            { label:'Health Score', value:`${healthScore}/100`, color:healthScore>=75?'#10b981':healthScore>=55?'#f59e0b':'#ef4444', icon:'🏥' },
            { label:'Open NCRs',    value:qualityData.ncrOpen, color:'#f59e0b', icon:'⚠️' },
            { label:'Safety Days',  value:`${safetyData.daysSinceIncident}d`, color:'#10b981', icon:'🛡️' },
            { label:'Cash Balance', value:formatINR(financialData.cashBalance), color:'#10b981', icon:'💰' },
            { label:'Unbilled',     value:formatINR(financialData.unbilledWork), color:'#ef4444', icon:'📄' },
          ].map((s,i) => (
            <div key={i} className="text-center">
              <p className="text-lg">{s.icon}</p>
              <p className="font-black text-sm" style={{ color:s.color }}>{s.value}</p>
              <p className="text-white/40 text-xs">{s.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── TABS ── */}
      <div className="bg-white border border-gray-200 rounded-2xl p-1 overflow-x-auto shadow-sm">
        <div className="flex gap-1" style={{ minWidth:'max-content' }}>
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-xl text-xs font-semibold transition whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-slate-800 text-white shadow-sm'
                  : 'text-gray-500 hover:text-gray-800 hover:bg-gray-50'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════
          TAB: COMMAND CENTER
      ══════════════════════════════════════ */}
      {activeTab === 'command' && (
        <div className="space-y-5">

          {/* Health Gauge + KPI Row */}
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-5">

            {/* Health Score */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm flex flex-col items-center justify-center">
              <HealthGauge score={healthScore}/>
              <div className="grid grid-cols-2 gap-2 mt-3 w-full">
                {[
                  { label:'SPI', value:'0.82', ok:false },
                  { label:'CPI', value:'0.84', ok:false },
                  { label:'Safety', value:'97%', ok:true  },
                  { label:'Quality', value:'80%', ok:true  },
                ].map((m,i) => (
                  <div key={i} className={`text-center rounded-xl p-2 border ${m.ok ? 'bg-green-50 border-green-100' : 'bg-red-50 border-red-100'}`}>
                    <p className={`text-sm font-black ${m.ok ? 'text-green-700' : 'text-red-700'}`}>{m.value}</p>
                    <p className="text-xs text-gray-500">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* KPI Cards 3-col */}
            <div className="lg:col-span-3 grid grid-cols-2 sm:grid-cols-3 gap-4">
              {[
                { label:'Workers Present', value:`${totalPresent}/${totalPlanned}`, sub:`${attendancePct}% attendance`, icon:Users,        color:'bg-blue-600',   border:'border-l-blue-500'  },
                { label:'Avg Productivity',value:`${avgProductivity}%`,             sub:'Target: >80%',                 icon:Activity,     color:'bg-purple-600', border:'border-l-purple-500'},
                { label:'Materials Low',   value:materials.filter(m=>m.status!=='ok').length, sub:'Items need ordering', icon:Package,  color:'bg-amber-500',  border:'border-l-amber-500' },
                { label:'Safety (LTIR)',   value:safetyData.ltir.toFixed(1),        sub:`${safetyData.daysSinceIncident} zero-incident days`,icon:Shield,  color:'bg-green-600', border:'border-l-green-500'},
                { label:'Open NCRs',       value:qualityData.ncrOpen,              sub:`${qualityData.ncrTotal} total raised`, icon:AlertCircle, color:'bg-red-600', border:'border-l-red-500'},
                { label:'Equipment Down',  value:equipmentData.filter(e=>e.status==='breakdown').length, sub:'Units in breakdown', icon:Wrench, color:'bg-orange-600', border:'border-l-orange-500'},
              ].map((k,i) => (
                <div key={i} className={`bg-white border border-gray-200 border-l-4 ${k.border} rounded-2xl p-4 shadow-sm hover:shadow-md transition`}>
                  <div className="flex items-start justify-between mb-2">
                    <div className={`w-9 h-9 rounded-xl ${k.color} flex items-center justify-center shadow-sm`}>
                      <k.icon size={16} className="text-white"/>
                    </div>
                  </div>
                  <p className="text-2xl font-black text-gray-900">{k.value}</p>
                  <p className="text-xs font-bold text-gray-600 mt-0.5">{k.label}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{k.sub}</p>
                </div>
              ))}
            </div>
          </div>

          {/* SPI/CPI Chart + Milestones */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h3 className="font-black text-gray-900">Schedule & Cost Performance</h3>
                  <p className="text-xs text-gray-400 mt-0.5">SPI & CPI weekly trend — target: ≥ 0.95</p>
                </div>
                <div className="flex items-center gap-3 text-xs">
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-blue-500 inline-block"/> SPI</span>
                  <span className="flex items-center gap-1"><span className="w-3 h-0.5 bg-orange-500 inline-block"/> CPI</span>
                </div>
              </div>
              <ResponsiveContainer width="100%" height={220}>
                <ComposedChart data={spiCpiHistory} margin={{ top:5, right:5, left:-25, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                  <XAxis dataKey="week" tick={{ fill:'#94a3b8', fontSize:9 }} axisLine={false} tickLine={false}/>
                  <YAxis domain={[0.7, 1.1]} tick={{ fill:'#94a3b8', fontSize:10 }} axisLine={false} tickLine={false} tickFormatter={v=>v.toFixed(2)}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <ReferenceLine y={0.95} stroke="#10b981" strokeDasharray="4 2" strokeWidth={1.5} label={{ value:'Target 0.95', fontSize:9, fill:'#10b981', position:'right' }}/>
                  <ReferenceLine y={0.85} stroke="#ef4444" strokeDasharray="4 2" strokeWidth={1.5} label={{ value:'Red Zone', fontSize:9, fill:'#ef4444', position:'right' }}/>
                  <Line type="monotone" dataKey="spi" name="SPI" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill:'#3b82f6', r:4 }}/>
                  <Line type="monotone" dataKey="cpi" name="CPI" stroke="#f97316" strokeWidth={2.5} dot={{ fill:'#f97316', r:4 }}/>
                </ComposedChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4">Milestone Tracker</h3>
              <div className="relative">
                <div className="absolute left-4 top-0 bottom-0 w-0.5 bg-gray-200"/>
                <div className="space-y-3">
                  {milestones.map((m,i) => (
                    <div key={i} className="flex items-center gap-3 relative pl-10">
                      <div className={`absolute left-2.5 w-3 h-3 rounded-full border-2 flex items-center justify-center ${
                        m.done ? 'border-green-500 bg-green-500' : 'border-gray-300 bg-white'
                      }`}>
                        {m.done && <span className="text-white text-xs font-bold" style={{ fontSize:'7px' }}>✓</span>}
                      </div>
                      <div className={`flex-1 flex items-center justify-between px-3 py-2 rounded-xl text-xs ${
                        m.done
                          ? 'bg-green-50 border border-green-100'
                          : m.title.includes('Current')
                          ? 'bg-blue-50 border border-blue-200 font-semibold'
                          : 'bg-gray-50 border border-gray-100'
                      }`}>
                        <span className={m.done ? 'text-green-700' : m.title.includes('Current') ? 'text-blue-700' : 'text-gray-600'}>
                          {m.title}
                        </span>
                        <div className="flex items-center gap-2">
                          {m.spi && (
                            <span className={`font-bold px-1.5 py-0.5 rounded text-xs ${m.spi >= 0.95 ? 'text-green-600 bg-green-100' : m.spi >= 0.85 ? 'text-amber-600 bg-amber-100' : 'text-red-600 bg-red-100'}`}>
                              {m.spi}
                            </span>
                          )}
                          <span className="text-gray-400">{m.date}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Planned vs Actual + Weather Forecast */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">

            <div className="lg:col-span-2 bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-black text-gray-900 mb-1">Planned vs Actual Progress (Weekly)</h3>
              <p className="text-xs text-gray-400 mb-4">Work quantities in M³ / Floor equivalents</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={spiCpiHistory} margin={{ top:5, right:5, left:-20, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                  <XAxis dataKey="week" tick={{ fill:'#94a3b8', fontSize:10 }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fill:'#94a3b8', fontSize:10 }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Legend wrapperStyle={{ fontSize:'11px' }} formatter={v => <span style={{ color:'#64748b' }}>{v}</span>}/>
                  <Bar dataKey="planned" name="Planned" fill="#e2e8f0" radius={[4,4,0,0]}/>
                  <Bar dataKey="actual"  name="Actual"  fill="#3b82f6" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>

            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-black text-gray-900 mb-1">5-Day Weather Forecast</h3>
              <p className="text-xs text-gray-400 mb-3">IMD · Mumbai Region</p>
              <div className="space-y-2">
                {weatherForecast.map((w,i) => (
                  <div key={i} className={`flex items-center gap-3 p-2.5 rounded-xl border text-xs ${
                    w.risk === 'high'   ? 'bg-red-50   border-red-200'   :
                    w.risk === 'medium' ? 'bg-amber-50 border-amber-200' : 'bg-green-50 border-green-100'
                  }`}>
                    <span className="text-lg">
                      {w.condition.includes('Rain') ? '🌧️' : w.condition.includes('Cloud') ? '⛅' : '☀️'}
                    </span>
                    <div className="flex-1">
                      <p className="font-bold text-gray-800">{w.day}</p>
                      <p className="text-gray-500">{w.condition}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-gray-700">{w.temp}°C</p>
                      <p className="text-gray-400">{w.rain}%💧</p>
                    </div>
                    {w.risk === 'high' && (
                      <span className="text-red-600 font-bold text-xs bg-red-100 px-1.5 py-0.5 rounded">HALT</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB: DPR LOG
      ══════════════════════════════════════ */}
      {activeTab === 'dpr' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-black text-gray-900">Daily Progress Report Log</h2>
              <p className="text-xs text-gray-400 mt-0.5">{dprHistory.length} reports this month</p>
            </div>
            <button onClick={() => setShowDPR(true)}
              className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-xl transition">
              <Plus size={15}/> New DPR
            </button>
          </div>

          <div className="space-y-3">
            {dprHistory.map((dpr,i) => (
              <div key={i} className={`bg-white border rounded-2xl p-5 shadow-sm hover:shadow-md transition ${
                dpr.workers === 0 ? 'border-red-200 bg-red-50/30' : 'border-gray-200'
              }`}>
                <div className="flex items-start justify-between flex-wrap gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg ${
                      dpr.workers === 0 ? 'bg-red-100 text-red-600' : 'bg-blue-100 text-blue-600'
                    }`}>
                      {new Date(dpr.date).getDate()}
                    </div>
                    <div>
                      <p className="font-black text-gray-900">{dpr.date}</p>
                      <p className="text-xs text-gray-500 mt-0.5">{dpr.work}</p>
                    </div>
                  </div>

                  <div className="flex items-center gap-3 flex-wrap">
                    <div className="flex items-center gap-1.5 bg-gray-50 border border-gray-100 rounded-xl px-3 py-1.5">
                      <span className="text-lg">{dpr.weather.includes('Rain') ? '🌧️' : '☀️'}</span>
                      <span className="text-xs font-semibold text-gray-600">{dpr.weather}</span>
                      {dpr.rainfall > 0 && <span className="text-xs text-blue-500 font-bold">{dpr.rainfall}mm</span>}
                    </div>
                    {dpr.workers > 0 ? (
                      <div className="flex items-center gap-1 bg-blue-50 border border-blue-100 rounded-xl px-3 py-1.5">
                        <Users size={13} className="text-blue-600"/>
                        <span className="text-xs font-bold text-blue-700">{dpr.workers} workers</span>
                      </div>
                    ) : (
                      <span className="bg-red-100 text-red-700 border border-red-200 text-xs font-bold px-3 py-1.5 rounded-xl">⚠️ Work Halted</span>
                    )}
                    {dpr.issues > 0 && (
                      <div className="flex items-center gap-1 bg-amber-50 border border-amber-100 rounded-xl px-3 py-1.5">
                        <AlertTriangle size={13} className="text-amber-600"/>
                        <span className="text-xs font-bold text-amber-700">{dpr.issues} issues</span>
                      </div>
                    )}
                    <span className="text-xs text-gray-400">Submitted {dpr.submitted}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB: LABOUR
      ══════════════════════════════════════ */}
      {activeTab === 'labour' && (
        <div className="space-y-5">

          {/* Labour KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'Total Present',     value:`${totalPresent}/${totalPlanned}`, sub:`${attendancePct}% attendance`,    color:'bg-blue-600'   },
              { label:'Avg Productivity',  value:`${avgProductivity}%`,             sub:'Manpower Productivity Index',      color:'bg-green-600'  },
              { label:'Absenteeism Rate',  value:`${100 - attendancePct}%`,         sub:`${totalPlanned - totalPresent} workers absent`, color:'bg-amber-500'},
              { label:'Labour Cost/sqm',   value:'₹185',                            sub:'Budget: ₹168 (+10.1%)',           color:'bg-red-500'    },
            ].map((k,i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className={`w-9 h-9 rounded-xl ${k.color} flex items-center justify-center mb-3 shadow-sm`}>
                  <Users size={16} className="text-white"/>
                </div>
                <p className="text-2xl font-black text-gray-900">{k.value}</p>
                <p className="text-xs font-bold text-gray-600 mt-0.5">{k.label}</p>
                <p className="text-xs text-gray-400">{k.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Trade-wise Breakdown */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-black text-gray-900">Trade-wise Attendance & Productivity</h3>
              </div>
              <div className="divide-y divide-gray-100">
                {labourData.map((l,i) => (
                  <div key={i} className="px-5 py-3 hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-xl bg-blue-100 flex items-center justify-center">
                          <span className="text-blue-700 text-xs font-black">{l.trade.charAt(0)}</span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-gray-800">{l.trade}</p>
                          <p className="text-xs text-gray-400">{l.contractor}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className={`text-sm font-black ${l.present >= l.planned ? 'text-green-600' : 'text-red-600'}`}>
                          {l.present}/{l.planned}
                        </p>
                        <p className="text-xs text-gray-400">present</p>
                      </div>
                    </div>
                    <div>
                      <div className="flex items-center justify-between text-xs mb-1">
                        <span className="text-gray-400">Productivity Index</span>
                        <span className={`font-bold ${l.productivity>=80?'text-green-600':l.productivity>=65?'text-amber-600':'text-red-600'}`}>
                          {l.productivity}%
                        </span>
                      </div>
                      <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                        <div
                          className={`h-full rounded-full ${l.productivity>=80?'bg-green-500':l.productivity>=65?'bg-amber-500':'bg-red-500'}`}
                          style={{ width:`${l.productivity}%` }}
                        />
                      </div>
                    </div>
                    {l.absent > 0 && (
                      <p className="text-xs text-red-500 font-semibold mt-1">
                        ⚠ {l.absent} absent — {Math.round((l.absent/l.planned)*100)}% absenteeism
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Attendance Trend */}
            <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-black text-gray-900 mb-1">Weekly Attendance Trend</h3>
              <p className="text-xs text-gray-400 mb-4">Planned vs actual headcount</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={attendanceWeek} margin={{ top:5, right:5, left:-20, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                  <XAxis dataKey="day" tick={{ fill:'#94a3b8', fontSize:11 }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fill:'#94a3b8', fontSize:11 }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="planned" name="Planned" fill="#e2e8f0" radius={[4,4,0,0]}/>
                  <Bar dataKey="present" name="Present" fill="#3b82f6" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>

              {/* Festival Calendar */}
              <div className="mt-4 pt-4 border-t border-gray-100">
                <p className="text-xs font-bold text-gray-600 mb-2">🗓️ Upcoming Absenteeism Risk</p>
                <div className="space-y-1.5">
                  {[
                    { event:'Raksha Bandhan', date:'09 Aug', impact:'Medium (-15%)', color:'text-amber-600' },
                    { event:'Independence Day',date:'15 Aug', impact:'High (-40%)',   color:'text-red-600'   },
                    { event:'Janmashtami',     date:'16 Aug', impact:'High (-35%)',   color:'text-red-600'   },
                  ].map((f,i) => (
                    <div key={i} className="flex items-center justify-between text-xs bg-gray-50 rounded-lg px-3 py-2 border border-gray-100">
                      <span className="font-semibold text-gray-700">🎉 {f.event} — {f.date}</span>
                      <span className={`font-bold ${f.color}`}>{f.impact}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB: MATERIALS
      ══════════════════════════════════════ */}
      {activeTab === 'material' && (
        <div className="space-y-5">

          {/* Material KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'Materials Low/Out',  value:materials.filter(m=>m.status!=='ok').length, sub:'Need immediate action', color:'bg-red-500'    },
              { label:'Avg Wastage Rate',   value:`${(materials.reduce((s,m)=>s+m.wastage,0)/materials.length).toFixed(1)}%`, sub:'Budget norm: <2%', color:'bg-amber-500'},
              { label:'Pending Orders',     value:materials.filter(m=>m.ordered>0).length, sub:'Orders placed', color:'bg-blue-600' },
              { label:'Cost Variance',      value:'+3.8%',                                    sub:'Materials over budget', color:'bg-orange-600' },
            ].map((k,i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className={`w-9 h-9 rounded-xl ${k.color} flex items-center justify-center mb-3`}>
                  <Package size={16} className="text-white"/>
                </div>
                <p className="text-2xl font-black text-gray-900">{k.value}</p>
                <p className="text-xs font-bold text-gray-600 mt-0.5">{k.label}</p>
                <p className="text-xs text-gray-400">{k.sub}</p>
              </div>
            ))}
          </div>

          {/* Material Table */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <h3 className="font-black text-gray-900">Material Inventory & Consumption</h3>
              <button className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl font-semibold transition">
                <Plus size={13}/> Material Receipt
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ minWidth:'850px' }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['Material','Category','Stock','Required','Ordered','Consumed','Wastage %','Budget Rate','Actual Rate','Status','Action'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase tracking-wider">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {materials.map((m,i) => (
                    <tr key={i} className={`hover:bg-gray-50 transition ${m.status === 'out' ? 'bg-red-50/30' : m.status === 'low' ? 'bg-amber-50/20' : ''}`}>
                      <td className="px-4 py-3 font-bold text-gray-900 text-xs">{m.name}</td>
                      <td className="px-4 py-3">
                        <span className="bg-gray-100 text-gray-600 text-xs px-2 py-0.5 rounded-full">{m.category}</span>
                      </td>
                      <td className="px-4 py-3 text-xs font-semibold text-gray-700">{m.stock} {m.unit}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{m.required} {m.unit}</td>
                      <td className="px-4 py-3 text-xs text-blue-600 font-semibold">{m.ordered > 0 ? `${m.ordered} ${m.unit}` : '—'}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{m.consumed} {m.unit}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold ${m.wastage > 4 ? 'text-red-600' : m.wastage > 2 ? 'text-amber-600' : 'text-green-600'}`}>
                          {m.wastage}%
                        </span>
                      </td>
                      <td className="px-4 py-3 text-xs text-gray-500">₹{m.budget}/{m.unit}</td>
                      <td className="px-4 py-3">
                        <span className={`text-xs font-bold ${m.actual > m.budget ? 'text-red-600' : 'text-green-600'}`}>
                          ₹{m.actual}/{m.unit}
                        </span>
                      </td>
                      <td className="px-4 py-3"><StatusPill status={m.status}/></td>
                      <td className="px-4 py-3">
                        {m.status !== 'ok' && (
                          <button className={`text-xs font-bold px-2.5 py-1.5 rounded-xl transition ${
                            m.status === 'out' ? 'bg-red-600 text-white hover:bg-red-700' : 'bg-amber-500 text-white hover:bg-amber-600'
                          }`}>
                            {m.status === 'out' ? 'Order Now' : 'Reorder'}
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Consumption Chart */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-black text-gray-900 mb-1">Weekly Material Consumption</h3>
            <p className="text-xs text-gray-400 mb-4">Steel (MT) · Cement (Bags/10) · Concrete (M³)</p>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={materialConsumption} margin={{ top:5, right:5, left:-20, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                <XAxis dataKey="week" tick={{ fill:'#94a3b8', fontSize:11 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill:'#94a3b8', fontSize:11 }} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Legend wrapperStyle={{ fontSize:'11px' }} formatter={v => <span style={{ color:'#64748b' }}>{v}</span>}/>
                <Bar dataKey="steel"    name="Steel (MT)"      fill="#3b82f6" radius={[4,4,0,0]}/>
                <Bar dataKey="cement"   name="Cement (bags/10)"fill="#8b5cf6" radius={[4,4,0,0]}/>
                <Bar dataKey="concrete" name="Concrete (M³)"   fill="#10b981" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB: SAFETY
      ══════════════════════════════════════ */}
      {activeTab === 'safety' && (
        <div className="space-y-5">

          {/* Safety KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'LTIR',                value:safetyData.ltir.toFixed(1),   sub:'Lost Time Injury Rate',              color:'bg-green-600',  good:true  },
              { label:'Zero Incident Days',  value:safetyData.daysSinceIncident, sub:'Consecutive safe days',              color:'bg-green-600',  good:true  },
              { label:'PPE Compliance',      value:`${safetyData.ppeCompliance}%`,sub:`${(100-safetyData.ppeCompliance).toFixed(1)}% non-compliant`,color:'bg-amber-500',good:false},
              { label:'Near-Misses MTD',     value:safetyData.nearMisses,        sub:'All investigated',                   color:'bg-blue-600',   good:null  },
            ].map((k,i) => (
              <div key={i} className={`bg-white border-l-4 border border-gray-200 rounded-2xl p-5 shadow-sm ${
                k.good === true ? 'border-l-green-500' : k.good === false ? 'border-l-amber-500' : 'border-l-blue-500'
              }`}>
                <div className={`w-9 h-9 rounded-xl ${k.color} flex items-center justify-center mb-3`}>
                  <Shield size={16} className="text-white"/>
                </div>
                <p className="text-2xl font-black text-gray-900">{k.value}</p>
                <p className="text-xs font-bold text-gray-600 mt-0.5">{k.label}</p>
                <p className="text-xs text-gray-400">{k.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* Near Misses */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-black text-gray-900">Near-Miss Log</h3>
                <button className="flex items-center gap-1.5 text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl font-semibold transition">
                  <Plus size={13}/> Report Near-Miss
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {safetyData.nearMissList.map((nm,i) => (
                  <div key={i} className="px-5 py-4 hover:bg-gray-50 transition">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-bold text-gray-500">{nm.id}</span>
                          <SeverityBadge severity={nm.severity}/>
                          <StatusPill status={nm.status}/>
                        </div>
                        <p className="text-sm font-semibold text-gray-800">{nm.desc}</p>
                        <p className="text-xs text-gray-400 mt-1">Reported by {nm.reporter} · {nm.date}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Safety Inspections */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-black text-gray-900">Safety Inspections</h3>
                <button className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl font-semibold transition">
                  <Plus size={13}/> New Inspection
                </button>
              </div>
              <div className="divide-y divide-gray-100">
                {safetyData.inspections.map((ins,i) => (
                  <div key={i} className="px-5 py-3 hover:bg-gray-50 transition">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="text-sm font-bold text-gray-800">{ins.area}</p>
                        <p className="text-xs text-gray-400">{ins.inspector} · {ins.date}</p>
                        <p className="text-xs text-gray-500 mt-0.5 italic">"{ins.remarks}"</p>
                      </div>
                      <StatusPill status={ins.status}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* PPE Compliance by Trade */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-black text-gray-900">PPE Compliance by Trade</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ minWidth:'500px' }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['Trade','Helmet','Safety Boots','Gloves','Safety Vest','Score'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {safetyData.ppeByTrade.map((p,i) => {
                    const score = [p.helmet, p.boots, p.gloves, p.vest].filter(Boolean).length
                    const scoreColor = score === 4 ? 'text-green-600' : score >= 3 ? 'text-amber-600' : 'text-red-600'
                    return (
                      <tr key={i} className="hover:bg-gray-50 transition">
                        <td className="px-4 py-3 font-bold text-gray-800 text-xs">{p.trade}</td>
                        {[p.helmet, p.boots, p.gloves, p.vest].map((ok,j) => (
                          <td key={j} className="px-4 py-3">
                            {ok
                              ? <CheckCircle2 size={18} className="text-green-500"/>
                              : <XCircle      size={18} className="text-red-500"/>
                            }
                          </td>
                        ))}
                        <td className="px-4 py-3">
                          <span className={`text-sm font-black ${scoreColor}`}>{score}/4</span>
                        </td>
                      </tr>
                    )
                  })}
                </tbody>
              </table>
            </div>
          </div>

          {/* Safety Stats Row */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label:'Toolbox Talks MTD',    value:safetyData.toolboxTalks, target:120, unit:'talks',  color:'green' },
              { label:'Safety Observations',  value:safetyData.observations, target:80,  unit:'logged', color:'blue'  },
              { label:'Training Compliance',  value:92,                      target:100, unit:'%',      color:'amber' },
            ].map((s,i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center">
                <p className={`text-3xl font-black ${
                  s.color==='green'?'text-green-600':s.color==='blue'?'text-blue-600':'text-amber-600'
                }`}>{s.value}</p>
                <p className="text-xs font-bold text-gray-600 mt-1">{s.label}</p>
                <p className="text-xs text-gray-400">Target: {s.target} {s.unit}</p>
                <div className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className={`h-full rounded-full ${s.color==='green'?'bg-green-500':s.color==='blue'?'bg-blue-500':'bg-amber-500'}`}
                    style={{ width:`${Math.min((s.value/s.target)*100,100)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB: FINANCIAL
      ══════════════════════════════════════ */}
      {activeTab === 'financial' && (
        <div className="space-y-5">

          {/* Financial KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'Contract Value',    value:formatINR(financialData.contractValue),    sub:'Total project worth',         color:'bg-blue-600',   border:'border-l-blue-500'   },
              { label:'Billed to Date',    value:formatINR(financialData.billedToDate),     sub:`${Math.round((financialData.billedToDate/financialData.contractValue)*100)}% of contract`, color:'bg-purple-600', border:'border-l-purple-500'},
              { label:'Amount Received',   value:formatINR(financialData.receivedToDate),   sub:`${Math.round((financialData.receivedToDate/financialData.contractValue)*100)}% collected`, color:'bg-green-600',  border:'border-l-green-500'  },
              { label:'Retention Held',    value:formatINR(financialData.retentionHeld),    sub:'By client — DLP release',     color:'bg-amber-500',  border:'border-l-amber-500'  },
            ].map((k,i) => (
              <div key={i} className={`bg-white border border-l-4 ${k.border} border-gray-200 rounded-2xl p-5 shadow-sm`}>
                <div className={`w-9 h-9 rounded-xl ${k.color} flex items-center justify-center mb-3`}>
                  <IndianRupee size={16} className="text-white"/>
                </div>
                <p className="text-xl font-black text-gray-900">{k.value}</p>
                <p className="text-xs font-bold text-gray-600 mt-0.5">{k.label}</p>
                <p className="text-xs text-gray-400">{k.sub}</p>
              </div>
            ))}
          </div>

          {/* Critical Financial Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="bg-red-50 border border-red-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle size={16} className="text-red-600"/>
                <span className="text-sm font-black text-red-800">Unbilled Work Gap</span>
              </div>
              <p className="text-3xl font-black text-red-700">{formatINR(financialData.unbilledWork)}</p>
              <p className="text-xs text-red-600 mt-1">Work executed but not invoiced. Submit RA-05 immediately.</p>
            </div>
            <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <Clock size={16} className="text-amber-600"/>
                <span className="text-sm font-black text-amber-800">Cash Balance</span>
              </div>
              <p className="text-3xl font-black text-amber-700">{formatINR(financialData.cashBalance)}</p>
              <p className="text-xs text-amber-600 mt-1">7-day projected outflow: {formatINR(financialData.projectedOutflow7d)}</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-blue-600"/>
                <span className="text-sm font-black text-blue-800">EAC vs BAC</span>
              </div>
              <p className="text-3xl font-black text-blue-700">{formatINR(financialData.forecastCompletion)}</p>
              <p className="text-xs text-blue-600 mt-1">+{formatINR(financialData.forecastCompletion - financialData.contractValue)} over contract value (EAC)</p>
            </div>
          </div>

          {/* RA Bill History */}
          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
              <div>
                <h3 className="font-black text-gray-900">Running Account Bill Register</h3>
                <p className="text-xs text-gray-400 mt-0.5">Retention: {formatINR(financialData.retentionHeld)} held — released at DLP expiry</p>
              </div>
              <button className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl font-semibold transition">
                <Plus size={13}/> New RA Bill
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ minWidth:'750px' }}>
                <thead>
                  <tr className="bg-gray-50 border-b border-gray-100">
                    {['RA No.','Amount','Submitted','Certified','Received','Retention','Status','Action'].map(h => (
                      <th key={h} className="text-left px-4 py-3 text-xs font-bold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {financialData.raHistory.map((ra,i) => (
                    <tr key={i} className={`hover:bg-gray-50 transition ${ra.status === 'pending' ? 'bg-amber-50/30' : ra.status === 'upcoming' ? 'bg-blue-50/30' : ''}`}>
                      <td className="px-4 py-3 font-black text-blue-600 text-xs">{ra.ra}</td>
                      <td className="px-4 py-3 font-bold text-gray-900 text-xs">{formatINR(ra.amount)}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{ra.submitted || '—'}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{ra.certified || '—'}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{ra.received || '—'}</td>
                      <td className="px-4 py-3 text-xs font-semibold text-amber-600">{formatINR(ra.retention)}</td>
                      <td className="px-4 py-3"><StatusPill status={ra.status}/></td>
                      <td className="px-4 py-3">
                        {ra.status === 'pending' && (
                          <button className="text-xs bg-amber-500 text-white px-2.5 py-1.5 rounded-xl font-bold hover:bg-amber-600 transition">
                            Chase Payment
                          </button>
                        )}
                        {ra.status === 'upcoming' && (
                          <button className="text-xs bg-blue-600 text-white px-2.5 py-1.5 rounded-xl font-bold hover:bg-blue-700 transition">
                            Prepare Bill
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Cash Flow Chart */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <h3 className="font-black text-gray-900 mb-1">Monthly Cash Flow</h3>
            <p className="text-xs text-gray-400 mb-4">Inflow vs Outflow vs Net (₹ Lakhs)</p>
            <ResponsiveContainer width="100%" height={200}>
              <ComposedChart data={cashFlowHistory} margin={{ top:5, right:5, left:-20, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9"/>
                <XAxis dataKey="month" tick={{ fill:'#94a3b8', fontSize:11 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill:'#94a3b8', fontSize:11 }} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Legend wrapperStyle={{ fontSize:'11px' }} formatter={v => <span style={{ color:'#64748b' }}>{v}</span>}/>
                <Bar dataKey="inflow"  name="Inflow (₹L)"  fill="#10b981" radius={[4,4,0,0]}/>
                <Bar dataKey="outflow" name="Outflow (₹L)" fill="#ef4444" radius={[4,4,0,0]}/>
                <Line type="monotone" dataKey="net" name="Net (₹L)" stroke="#3b82f6" strokeWidth={2.5} dot={{ fill:'#3b82f6', r:4 }}/>
              </ComposedChart>
            </ResponsiveContainer>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB: QUALITY
      ══════════════════════════════════════ */}
      {activeTab === 'quality' && (
        <div className="space-y-5">

          {/* Quality KPIs */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'Open NCRs',    value:qualityData.ncrOpen,   sub:`${qualityData.ncrTotal} total raised`,  color:'bg-red-500'   },
              { label:'Closed NCRs',  value:qualityData.ncrClosed, sub:'Resolved successfully',                 color:'bg-green-600' },
              { label:'NCR Close Rate',value:`${Math.round((qualityData.ncrClosed/qualityData.ncrTotal)*100)}%`,sub:'Target: >85%',  color:'bg-blue-600'  },
              { label:'Rework Cost',  value:'₹2.8L',               sub:'Estimated rework + material',          color:'bg-orange-500'},
            ].map((k,i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
                <div className={`w-9 h-9 rounded-xl ${k.color} flex items-center justify-center mb-3`}>
                  <CheckSquare size={16} className="text-white"/>
                </div>
                <p className="text-2xl font-black text-gray-900">{k.value}</p>
                <p className="text-xs font-bold text-gray-600 mt-0.5">{k.label}</p>
                <p className="text-xs text-gray-400">{k.sub}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">

            {/* NCR Register */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100 flex items-center justify-between">
                <h3 className="font-black text-gray-900">NCR Register</h3>
                <button className="flex items-center gap-1.5 text-xs bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-xl font-semibold transition">
                  <Plus size={13}/> Raise NCR
                </button>
              </div>
              <div className="divide-y divide-gray-100 max-h-80 overflow-y-auto">
                {qualityData.ncrs.map((ncr,i) => (
                  <div key={i} className={`px-5 py-4 hover:bg-gray-50 transition ${ncr.status==='open'?'bg-red-50/20':''}`}>
                    <div className="flex items-start justify-between gap-3 mb-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-gray-400">{ncr.id}</span>
                        <SeverityBadge severity={ncr.severity}/>
                        <StatusPill status={ncr.status}/>
                      </div>
                      {ncr.status === 'open' && (
                        <span className={`text-xs font-bold ${ncr.age > 7 ? 'text-red-600' : 'text-amber-600'}`}>
                          {ncr.age} days old
                        </span>
                      )}
                    </div>
                    <p className="text-sm font-semibold text-gray-800">{ncr.desc}</p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="text-xs text-gray-400">{ncr.area}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-gray-400">{ncr.raised}</span>
                      <span className="text-xs text-gray-400">·</span>
                      <span className="text-xs text-blue-600 font-semibold">{ncr.responsible}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pre-Pour Checklist */}
            <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
              <div className="px-5 py-4 border-b border-gray-100">
                <h3 className="font-black text-gray-900">Pre-Pour Quality Checklist</h3>
                <p className="text-xs text-gray-400 mt-0.5">Floor 14 Slab — Next pour: 30 Jul 2025</p>
              </div>
              <div className="divide-y divide-gray-100">
                {qualityData.checklistItems.map((item,i) => (
                  <div key={i} className="flex items-center gap-3 px-5 py-3 hover:bg-gray-50 transition">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      item.status === 'done' ? 'border-green-500 bg-green-500' :
                      item.status === 'na'   ? 'border-gray-200 bg-gray-100'   :
                                               'border-amber-300 bg-amber-50'
                    }`}>
                      {item.status === 'done' && <span className="text-white text-xs font-bold">✓</span>}
                      {item.status === 'na'   && <span className="text-gray-400 text-xs">—</span>}
                    </div>
                    <p className={`text-sm flex-1 ${
                      item.status === 'done' ? 'text-green-700 line-through' :
                      item.status === 'na'   ? 'text-gray-400'              :
                                               'text-gray-800 font-semibold'
                    }`}>
                      {item.activity}
                    </p>
                    <StatusPill status={item.status}/>
                    <span className="text-xs text-gray-400 shrink-0">{item.date}</span>
                  </div>
                ))}
              </div>
              <div className="px-5 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-500">
                  {qualityData.checklistItems.filter(c=>c.status==='done').length}/{qualityData.checklistItems.length} items complete
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB: EQUIPMENT
      ══════════════════════════════════════ */}
      {activeTab === 'equipment' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'Running',   value:equipmentData.filter(e=>e.status==='running').length,   color:'bg-green-600' },
              { label:'Idle',      value:equipmentData.filter(e=>e.status==='idle').length,      color:'bg-amber-500' },
              { label:'Breakdown', value:equipmentData.filter(e=>e.status==='breakdown').length, color:'bg-red-600'   },
              { label:'Avg Utilization', value:`${Math.round(equipmentData.filter(e=>e.status!=='breakdown').reduce((s,e)=>s+e.utilization,0)/equipmentData.filter(e=>e.status!=='breakdown').length)}%`, color:'bg-blue-600'},
            ].map((k,i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center">
                <div className={`w-10 h-10 rounded-xl ${k.color} flex items-center justify-center mx-auto mb-3`}>
                  <Wrench size={18} className="text-white"/>
                </div>
                <p className="text-3xl font-black text-gray-900">{k.value}</p>
                <p className="text-xs font-bold text-gray-600 mt-1">{k.label}</p>
              </div>
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {equipmentData.map((eq,i) => (
              <div key={i} className={`bg-white border rounded-2xl p-5 shadow-sm ${
                eq.status === 'breakdown' ? 'border-red-200 bg-red-50/20' :
                eq.status === 'idle'      ? 'border-amber-200'            : 'border-gray-200'
              }`}>
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      eq.status === 'breakdown' ? 'bg-red-100' :
                      eq.status === 'idle'      ? 'bg-amber-100' : 'bg-green-100'
                    }`}>
                      <Truck size={18} className={
                        eq.status === 'breakdown' ? 'text-red-600' :
                        eq.status === 'idle'      ? 'text-amber-600' : 'text-green-600'
                      }/>
                    </div>
                    <div>
                      <p className="font-black text-gray-900 text-sm">{eq.name}</p>
                      <p className="text-xs text-gray-400">{eq.type} · {eq.operator}</p>
                    </div>
                  </div>
                  <StatusPill status={eq.status}/>
                </div>

                {eq.issue && (
                  <div className="bg-red-50 border border-red-200 rounded-xl p-2.5 mb-3 flex items-center gap-2">
                    <AlertTriangle size={13} className="text-red-600 shrink-0"/>
                    <p className="text-xs text-red-700 font-semibold">{eq.issue}</p>
                  </div>
                )}

                {eq.status !== 'breakdown' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-gray-400">Utilization</span>
                      <span className={`font-bold ${eq.utilization >= 70 ? 'text-green-600' : eq.utilization >= 50 ? 'text-amber-600' : 'text-red-600'}`}>
                        {eq.utilization}%
                      </span>
                    </div>
                    <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className={`h-full rounded-full ${eq.utilization >= 70 ? 'bg-green-500' : eq.utilization >= 50 ? 'bg-amber-500' : 'bg-red-500'}`}
                        style={{ width:`${eq.utilization}%` }}
                      />
                    </div>
                  </div>
                )}

                <div className="grid grid-cols-3 gap-2 text-center">
                  <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                    <p className="text-sm font-black text-gray-800">{eq.hours}h</p>
                    <p className="text-xs text-gray-400">Active</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                    <p className="text-sm font-black text-amber-600">{eq.idle}h</p>
                    <p className="text-xs text-gray-400">Idle</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-2 border border-gray-100">
                    <p className="text-sm font-black text-gray-800">₹{eq.cost.toLocaleString()}</p>
                    <p className="text-xs text-gray-400">Cost/day</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB: SUBCONTRACTORS
      ══════════════════════════════════════ */}
      {activeTab === 'subcon' && (
        <div className="space-y-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-black text-gray-900">Subcontractor Performance</h2>
              <p className="text-xs text-gray-400 mt-0.5">Dynamic rating — Schedule · Quality · Safety · Claims</p>
            </div>
            <button className="flex items-center gap-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-2 rounded-xl font-semibold transition">
              <Plus size={13}/> Add Subcontractor
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {subcontractors.map((sub,i) => (
              <div
                key={i}
                className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm hover:shadow-md transition cursor-pointer"
                onClick={() => setSelectedSub(selectedSub?.name === sub.name ? null : sub)}
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <RatingBadge rating={sub.rating}/>
                    <div>
                      <p className="font-black text-gray-900">{sub.name}</p>
                      <p className="text-xs text-gray-400">{sub.trade} · Since {sub.activeSince}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className={`text-2xl font-black ${sub.score>=80?'text-green-600':sub.score>=65?'text-amber-600':'text-red-600'}`}>
                      {sub.score}
                    </p>
                    <p className="text-xs text-gray-400">/ 100</p>
                    <StatusPill status={sub.status}/>
                  </div>
                </div>

                <div className="grid grid-cols-4 gap-2">
                  {[
                    { label:'Schedule', value:sub.schedule, color:sub.schedule>=85?'text-green-600':sub.schedule>=70?'text-amber-600':'text-red-600' },
                    { label:'Quality',  value:sub.quality,  color:sub.quality>=85?'text-green-600':sub.quality>=70?'text-amber-600':'text-red-600'   },
                    { label:'Safety',   value:sub.safety,   color:sub.safety>=85?'text-green-600':sub.safety>=70?'text-amber-600':'text-red-600'     },
                    { label:'Claims',   value:sub.claims,   color:sub.claims>=85?'text-green-600':sub.claims>=70?'text-amber-600':'text-red-600'     },
                  ].map((metric,j) => (
                    <div key={j} className="text-center bg-gray-50 rounded-xl p-2 border border-gray-100">
                      <p className={`text-lg font-black ${metric.color}`}>{metric.value}</p>
                      <p className="text-xs text-gray-400">{metric.label}</p>
                    </div>
                  ))}
                </div>

                {sub.rating === 'C' && (
                  <div className="mt-3 bg-red-50 border border-red-200 rounded-xl p-2.5 flex items-center gap-2">
                    <AlertTriangle size={13} className="text-red-600 shrink-0"/>
                    <p className="text-xs text-red-700 font-semibold">Under performance review — consider replacement for next project</p>
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Radar Chart for selected sub */}
          {selectedSub && (
            <div className="bg-white border border-blue-200 rounded-2xl p-5 shadow-sm">
              <h3 className="font-black text-gray-900 mb-4">
                Performance Radar — {selectedSub.name}
                <span className="text-sm text-gray-400 font-normal ml-2">(Click card to deselect)</span>
              </h3>
              <ResponsiveContainer width="100%" height={280}>
                <RadarChart data={subRadarData(selectedSub)} cx="50%" cy="50%" outerRadius={100}>
                  <PolarGrid stroke="#e2e8f0"/>
                  <PolarAngleAxis dataKey="metric" tick={{ fill:'#64748b', fontSize:12, fontWeight:600 }}/>
                  <Radar name={selectedSub.name} dataKey="value" stroke="#3b82f6" fill="#3b82f6" fillOpacity={0.2} strokeWidth={2}/>
                  <Tooltip contentStyle={{ background:'white', border:'1px solid #e2e8f0', borderRadius:12, fontSize:12 }}/>
                </RadarChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB: COMPLIANCE
      ══════════════════════════════════════ */}
      {activeTab === 'compliance' && (
        <div className="space-y-5">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'All Clear',      value:complianceItems.filter(c=>c.status==='ok').length,      color:'bg-green-600', sub:'Permits valid' },
              { label:'Expiring Soon',  value:complianceItems.filter(c=>c.status==='warning').length, color:'bg-amber-500', sub:'Within 45 days'},
              { label:'Expired',        value:complianceItems.filter(c=>c.status==='expired').length, color:'bg-red-600',   sub:'Immediate action'},
              { label:'Total Permits',  value:complianceItems.length,                                 color:'bg-blue-600',  sub:'All categories'},
            ].map((k,i) => (
              <div key={i} className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm text-center">
                <div className={`w-10 h-10 rounded-xl ${k.color} flex items-center justify-center mx-auto mb-3`}>
                  <FileText size={18} className="text-white"/>
                </div>
                <p className="text-3xl font-black text-gray-900">{k.value}</p>
                <p className="text-xs font-bold text-gray-600 mt-1">{k.label}</p>
                <p className="text-xs text-gray-400">{k.sub}</p>
              </div>
            ))}
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden">
            <div className="px-5 py-4 border-b border-gray-100">
              <h3 className="font-black text-gray-900">Permit & Compliance Tracker</h3>
              <p className="text-xs text-gray-400 mt-0.5">Auto-alerts 60 days before expiry · RERA, Labour, Fire, Environment</p>
            </div>
            <div className="divide-y divide-gray-100">
              {complianceItems.sort((a,b) => a.daysLeft - b.daysLeft).map((item,i) => (
                <div key={i} className={`flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition ${
                  item.status === 'expired' ? 'bg-red-50/30' : item.status === 'warning' ? 'bg-amber-50/20' : ''
                }`}>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    item.status === 'ok'      ? 'bg-green-100' :
                    item.status === 'warning' ? 'bg-amber-100' : 'bg-red-100'
                  }`}>
                    {item.status === 'ok'      ? <CheckCircle2 size={18} className="text-green-600"/> :
                     item.status === 'warning' ? <AlertTriangle size={18} className="text-amber-600"/> :
                                                 <XCircle      size={18} className="text-red-600"/>
                    }
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-bold text-gray-900 text-sm">{item.item}</p>
                    <p className="text-xs text-gray-400">{item.issuer} · Expires: {item.expiry}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className={`text-sm font-black ${
                      item.daysLeft < 0    ? 'text-red-600'   :
                      item.daysLeft <= 45  ? 'text-amber-600' : 'text-green-600'
                    }`}>
                      {item.daysLeft < 0 ? `${Math.abs(item.daysLeft)}d EXPIRED` : `${item.daysLeft}d left`}
                    </p>
                    <StatusPill status={item.status}/>
                  </div>
                  {(item.status === 'expired' || item.status === 'warning') && (
                    <button className={`text-xs font-bold px-3 py-2 rounded-xl transition shrink-0 ${
                      item.status === 'expired'
                        ? 'bg-red-600 text-white hover:bg-red-700'
                        : 'bg-amber-500 text-white hover:bg-amber-600'
                    }`}>
                      {item.status === 'expired' ? 'Renew Now' : 'Apply Now'}
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* RERA Progress */}
          <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5">
            <div className="flex items-center gap-2 mb-4">
              <BookOpen size={18} className="text-blue-600"/>
              <h3 className="font-black text-blue-900">RERA Compliance Tracker</h3>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { label:'RERA Declared Progress', value:'65%', actual:'68%', status:'Ahead', color:'text-green-600' },
                { label:'Next RERA Report Due',    value:'15 Aug 2025', actual:'Quarterly Form', status:'12 days', color:'text-amber-600' },
                { label:'Cost Incurred vs Declared',value:'₹9.6 Cr', actual:'₹10.2 Cr declared',status:'+6.25%', color:'text-blue-600' },
              ].map((r,i) => (
                <div key={i} className="bg-white border border-blue-100 rounded-xl p-4">
                  <p className={`text-xl font-black ${r.color}`}>{r.value}</p>
                  <p className="text-xs font-bold text-gray-700 mt-0.5">{r.label}</p>
                  <p className="text-xs text-gray-400">{r.actual}</p>
                  <p className={`text-xs font-semibold mt-1 ${r.color}`}>{r.status}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TAB: EARLY WARNINGS
      ══════════════════════════════════════ */}
      {activeTab === 'warnings' && (
        <div className="space-y-5">

          {/* Alert Summary */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { label:'Critical',  value:earlyWarnings.filter(w=>w.severity==='critical').length, color:'bg-red-600',    text:'text-red-700',    bg:'bg-red-50    border-red-200'   },
              { label:'High',      value:earlyWarnings.filter(w=>w.severity==='high').length,     color:'bg-orange-500', text:'text-orange-700', bg:'bg-orange-50 border-orange-200'},
              { label:'Medium',    value:earlyWarnings.filter(w=>w.severity==='medium').length,   color:'bg-amber-500',  text:'text-amber-700',  bg:'bg-amber-50  border-amber-200' },
              { label:'Low',       value:earlyWarnings.filter(w=>w.severity==='low').length,      color:'bg-blue-600',   text:'text-blue-700',   bg:'bg-blue-50   border-blue-200'  },
            ].map((k,i) => (
              <div key={i} className={`border rounded-2xl p-5 shadow-sm text-center ${k.bg}`}>
                <p className={`text-4xl font-black ${k.text}`}>{k.value}</p>
                <p className={`text-sm font-bold mt-1 ${k.text}`}>{k.label} Alerts</p>
              </div>
            ))}
          </div>

          {/* OODA Loop Banner */}
          <div className="bg-gradient-to-r from-slate-800 to-indigo-900 rounded-2xl p-5 text-white">
            <div className="flex items-center gap-2 mb-3">
              <Zap size={18} className="text-yellow-400"/>
              <span className="font-black text-lg">OODA Loop — Command Mode</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {[
                { step:'OBSERVE',  desc:`${earlyWarnings.length} active signals detected`, icon:'👁️',  color:'from-blue-700 to-blue-600'   },
                { step:'ORIENT',   desc:'2 critical, 3 high priority threats',             icon:'🧭',  color:'from-purple-700 to-purple-600'},
                { step:'DECIDE',   desc:'Recovery actions queued for approval',           icon:'🎯',  color:'from-amber-700 to-amber-600'  },
                { step:'ACT',      desc:'Submit DPR + chase RA + order Plywood',          icon:'⚡',  color:'from-green-700 to-green-600'  },
              ].map((s,i) => (
                <div key={i} className={`bg-gradient-to-br ${s.color} rounded-xl p-3`}>
                  <div className="text-2xl mb-1">{s.icon}</div>
                  <p className="text-xs font-black text-white/90 tracking-wider">{s.step}</p>
                  <p className="text-xs text-white/60 mt-0.5">{s.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Warnings List */}
          <div className="space-y-3">
            <h3 className="font-black text-gray-900">All Active Warnings</h3>
            {['critical','high','medium','low'].map(sev => {
              const items = earlyWarnings.filter(w => w.severity === sev)
              if (!items.length) return null
              return (
                <div key={sev} className="space-y-2">
                  <p className={`text-xs font-black uppercase tracking-wider px-1 ${
                    sev==='critical'?'text-red-600':sev==='high'?'text-orange-600':sev==='medium'?'text-amber-600':'text-blue-600'
                  }`}>
                    {sev} priority
                  </p>
                  {items.map((w,i) => (
                    <div key={i} className={`bg-white border-l-4 rounded-2xl p-4 shadow-sm flex items-start gap-4 ${
                      w.severity==='critical' ? 'border-l-red-600'    :
                      w.severity==='high'     ? 'border-l-orange-500' :
                      w.severity==='medium'   ? 'border-l-amber-500'  : 'border-l-blue-500'
                    }`}>
                      <span className="text-2xl shrink-0 mt-0.5">{w.icon}</span>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-0.5">
                          <p className="text-sm font-black text-gray-900">{w.title}</p>
                          <span className="text-xs bg-gray-100 text-gray-500 px-2 py-0.5 rounded-full">{w.type}</span>
                        </div>
                        <p className="text-xs text-gray-500 leading-relaxed">{w.desc}</p>
                      </div>
                      <button className={`shrink-0 text-xs font-bold px-3 py-2 rounded-xl transition whitespace-nowrap ${
                        w.severity === 'critical' ? 'bg-red-600 text-white hover:bg-red-700'   :
                        w.severity === 'high'     ? 'bg-orange-500 text-white hover:bg-orange-600' :
                        w.severity === 'medium'   ? 'bg-amber-500 text-white hover:bg-amber-600' :
                                                    'bg-blue-600 text-white hover:bg-blue-700'
                      }`}>
                        {w.action}
                      </button>
                    </div>
                  ))}
                </div>
              )
            })}
          </div>

          {/* Price Escalation Tracker */}
          <div className="bg-white border border-gray-200 rounded-2xl p-5 shadow-sm">
            <div className="flex items-center gap-2 mb-4">
              <TrendingUp size={16} className="text-blue-600"/>
              <h3 className="font-black text-gray-900">Material Price Escalation Index</h3>
              <span className="text-xs bg-green-100 text-green-700 px-2 py-0.5 rounded-full font-semibold ml-auto">
                ₹2.8L recoverable — Raise with Commercial
              </span>
            </div>
            <div className="grid grid-cols-3 gap-4">
              {[
                { material:'TMT Steel',  base:58000, current:64500, change:'+11.2%', wpi:'WPI Steel Index',    color:'text-red-600',   bg:'bg-red-50   border-red-100'   },
                { material:'Cement OPC', base:350,   current:375,   change:'+7.1%',  wpi:'WPI Cement Index',   color:'text-amber-600', bg:'bg-amber-50 border-amber-100' },
                { material:'River Sand', base:1100,  current:1280,  change:'+16.4%', wpi:'State Mineral Dept', color:'text-red-600',   bg:'bg-red-50   border-red-100'   },
              ].map((p,i) => (
                <div key={i} className={`border rounded-xl p-4 ${p.bg}`}>
                  <p className="text-xs font-bold text-gray-600 uppercase tracking-wider">{p.material}</p>
                  <p className={`text-xl font-black mt-1 ${p.color}`}>{p.change}</p>
                  <p className="text-xs text-gray-500">Base: ₹{p.base.toLocaleString()} → ₹{p.current.toLocaleString()}</p>
                  <p className="text-xs text-gray-400 mt-0.5">{p.wpi}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── DPR Modal ── */}
      {showDPR && <DPRModal onClose={() => setShowDPR(false)}/>}
    </div>
  )
}
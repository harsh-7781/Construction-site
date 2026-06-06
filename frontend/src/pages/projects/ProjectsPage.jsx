import { useState } from 'react'
import {
  Plus, Search, MapPin,
  Calendar, Users, ChevronRight,
  CheckSquare, AlertTriangle, TrendingUp,
  Building2, Camera, Flag,
  Edit3, ArrowLeft, Phone, Mail, Download,
  LayoutGrid, List, Kanban,
  ZoomIn, X, ChevronLeft,
  IndianRupee, Wrench,
  CloudRain, Sun,
  CheckCircle2,
  Upload, Maximize2
} from 'lucide-react'

// ======================= LIGHT NEON DESIGN TOKENS =======================
const T = {
  bg: '#F0F4F8',
  surface: 'rgba(255, 255, 255, 0.85)',
  surfaceAlt: 'rgba(240, 248, 255, 0.6)',
  border: 'rgba(0, 150, 255, 0.3)',
  borderStrong: 'rgba(0, 150, 255, 0.5)',
  text: '#1E293B',
  textMid: '#334155',
  textMuted: '#5B6B8C',
  primary: '#0EA5E9',
  primaryLight: 'rgba(14, 165, 233, 0.1)',
  accent: '#D946EF',
  accentLight: 'rgba(217, 70, 239, 0.1)',
  positive: '#10B981',
  positiveLight: 'rgba(16, 185, 129, 0.1)',
  warning: '#F59E0B',
  warningLight: 'rgba(245, 158, 11, 0.1)',
  danger: '#EF4444',
  dangerLight: 'rgba(239, 68, 68, 0.1)',
}

const card = {
  background: T.surface,
  backdropFilter: 'blur(12px)',
  borderRadius: '24px',
  border: `1px solid ${T.border}`,
  boxShadow: '0 8px 20px rgba(0, 0, 0, 0.05), 0 0 0 1px rgba(14, 165, 233, 0.2) inset, 0 0 12px rgba(14, 165, 233, 0.15)',
  transition: 'all 0.3s cubic-bezier(0.2, 0.9, 0.4, 1.1)',
}

// ── Site Photos Mock Data ──────────────────────────────────
const sitePhotos = {
  'PRJ-001': [
    { id:1,  url:'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80', caption:'Foundation work — March 2025',        date:'15 Mar 2025', category:'Foundation', uploader:'Vikram Singh'  },
    { id:2,  url:'https://images.unsplash.com/photo-1541888946425-d81bb19240f5?w=800&q=80', caption:'Column casting — Floor 8',            date:'20 Apr 2025', category:'Structure',  uploader:'Vikram Singh'  },
    { id:3,  url:'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=800&q=80', caption:'Slab work in progress — Floor 12',    date:'10 Jun 2025', category:'Structure',  uploader:'Ram Shinde'    },
    { id:4,  url:'https://images.unsplash.com/photo-1590725140246-20acddc1ec6d?w=800&q=80', caption:'Site overview — aerial view',         date:'01 Jul 2025', category:'Overview',   uploader:'Sneha Desai'   },
    { id:5,  url:'https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=800&q=80', caption:'Steel reinforcement — Floor 14',       date:'20 Jul 2025', category:'Structure',  uploader:'Vikram Singh'  },
    { id:6,  url:'https://images.unsplash.com/photo-1567521464027-f127ff144326?w=800&q=80', caption:'Workers on Floor 14 slab',            date:'25 Jul 2025', category:'Workers',    uploader:'Vikram Singh'  },
    { id:7,  url:'https://images.unsplash.com/photo-1429497419816-9ca5cfb4571a?w=800&q=80', caption:'Tower crane operation',              date:'28 Jul 2025', category:'Equipment',  uploader:'Ganesh More'   },
    { id:8,  url:'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=800&q=80', caption:'Safety netting installation',         date:'29 Jul 2025', category:'Safety',     uploader:'Vikram Singh'  },
  ],
  'PRJ-002': [
    { id:1,  url:'https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80', caption:'False ceiling installation Level 1',  date:'15 May 2025', category:'Interior',   uploader:'Arjun Kumar'   },
    { id:2,  url:'https://images.unsplash.com/photo-1616486338812-3dadae4b4ace?w=800&q=80', caption:'Flooring work — food court',          date:'10 Jun 2025', category:'Flooring',   uploader:'Ravi Mehta'    },
    { id:3,  url:'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=800&q=80', caption:'Electrical conduit routing',            date:'25 Jun 2025', category:'MEP',        uploader:'Nitin Desai'   },
    { id:4,  url:'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=800&q=80', caption:'Retail zone — fit-out in progress',   date:'15 Jul 2025', category:'Interior',   uploader:'Arjun Kumar'   },
  ],
  'PRJ-003': [
    { id:1,  url:'https://images.unsplash.com/photo-1621905251189-08b45d6a269e?w=800&q=80', caption:'HVAC duct installation Floor 4',      date:'20 Feb 2025', category:'HVAC',       uploader:'Ravi Mehta'    },
    { id:2,  url:'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80', caption:'Electrical panel installation',         date:'15 Mar 2025', category:'Electrical', uploader:'Nitin Desai'   },
    { id:3,  url:'https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=800&q=80', caption:'Plumbing works — basement level',    date:'01 Apr 2025', category:'Plumbing',   uploader:'Suresh Patil'  },
    { id:4,  url:'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=800&q=80', caption:'Fire suppression system install',    date:'20 Jun 2025', category:'Fire',       uploader:'Ravi Mehta'    },
    { id:5,  url:'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80', caption:'Server room MEP coordination',        date:'10 Jul 2025', category:'MEP',        uploader:'Ravi Mehta'    },
  ],
}

// ── Projects Data ──────────────────────────────────────────
const projects = [
  {
    id: 'PRJ-001',
    name: 'Oberoi Residency Tower',
    client: 'Oberoi Group',
    clientContact: 'Vikas Oberoi',
    clientPhone: '+91 98200 11111',
    clientEmail: 'vikas@oberoi.com',
    type: 'Civil',
    value: 24000000,
    valueStr: '₹2.4 Cr',
    status: 'on-track',
    progress: 68,
    startDate: '01 Mar 2025',
    endDate: '15 Dec 2025',
    site: 'Worli, Mumbai',
    manager: 'Sneha Desai',
    supervisor: 'Vikram Singh',
    team: 24,
    description: 'G+18 residential tower with basement parking, amenity floor and rooftop garden. Total built-up area 45,000 sqft across 18 floors with luxury specifications.',
    floors: '18 + Basement',
    area: '45,000 sqft',
    stage: 'Structural',
    invoiced: 9600000,
    received: 7200000,
    expenses: 8400000,
    profit: 1200000,
    tasks: [
      { id:1, title:'Slab casting — Floor 14',         assignee:'Vikram S.', due:'Today',    status:'in-progress', priority:'high'   },
      { id:2, title:'Column shuttering — Floor 15',    assignee:'Ram S.',    due:'Tomorrow', status:'pending',     priority:'high'   },
      { id:3, title:'Waterproofing — Basement 2',      assignee:'Sunil K.',  due:'05 Aug',   status:'in-progress', priority:'medium' },
      { id:4, title:'Rebar tying — Floor 14 east',     assignee:'Ganesh M.', due:'03 Aug',   status:'done',        priority:'medium' },
      { id:5, title:'Plumbing rough-in — Floor 12-13', assignee:'Anil P.',   due:'08 Aug',   status:'pending',     priority:'low'    },
      { id:6, title:'External scaffolding check',      assignee:'Vikram S.', due:'04 Aug',   status:'done',        priority:'medium' },
    ],
    milestones: [
      { title:'Foundation Complete',  date:'Mar 2025', done:true  },
      { title:'Plinth Level',         date:'Apr 2025', done:true  },
      { title:'Floor 10 Slab',        date:'Jun 2025', done:true  },
      { title:'Floor 18 Slab',        date:'Sep 2025', done:false },
      { title:'Brick & Plaster',      date:'Oct 2025', done:false },
      { title:'Finishing & Handover', date:'Dec 2025', done:false },
    ],
    materials: [
      { name:'TMT Steel',    status:'low', qty:'12.5 MT',  required:'18 MT'    },
      { name:'Cement',       status:'low', qty:'180 bags', required:'350 bags' },
      { name:'RMC Concrete', status:'ok',  qty:'45 M³',    required:'45 M³'    },
      { name:'Plywood',      status:'out', qty:'0 nos',    required:'40 nos'   },
    ],
    team_members: [
      { name:'Vikram Singh', role:'Site Supervisor',  phone:'+91 98200 55001' },
      { name:'Ram Shinde',   role:'Mason Lead',       phone:'+91 98200 55002' },
      { name:'Sunil Kamble', role:'Steel Fixer',      phone:'+91 98200 55003' },
      { name:'Ganesh More',  role:'Carpenter',        phone:'+91 98200 55004' },
      { name:'Anil Pawar',   role:'Helper',           phone:'+91 98200 55005' },
    ],
    documents: [
      { name:'Architectural Drawings v3', type:'DWG', date:'20 Jun 2025', size:'14.2 MB' },
      { name:'Structural Drawing Set',    type:'PDF', date:'18 May 2025', size:'8.5 MB'  },
      { name:'BOQ — Civil Works',         type:'XLS', date:'01 Mar 2025', size:'2.1 MB'  },
      { name:'Site Photos — July',        type:'ZIP', date:'28 Jul 2025', size:'45 MB'   },
    ],
    issues: [
      { id:'ISS-12', desc:'Plywood shortage — shuttering halted',     priority:'high',   status:'open',     date:'29 Jul' },
      { id:'ISS-11', desc:'Crane breakdown — Floor 14 access delayed', priority:'high',   status:'open',     date:'28 Jul' },
      { id:'ISS-10', desc:'Safety harness missing — 3 workers',        priority:'medium', status:'resolved', date:'27 Jul' },
    ],
    dprs: [
      { date:'29 Jul 2025', work:'Slab casting Floor 14 — 60% complete', workers:22, issues:2, weather:'Clear' },
      { date:'28 Jul 2025', work:'Column shuttering Floor 15 started',    workers:24, issues:1, weather:'Cloudy'},
      { date:'27 Jul 2025', work:'Rebar tying Floor 14 east completed',   workers:23, issues:0, weather:'Clear' },
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
    value: 8500000,
    valueStr: '₹85 L',
    status: 'at-risk',
    progress: 42,
    startDate: '01 May 2025',
    endDate: '30 Sep 2025',
    site: 'Dadar, Mumbai',
    manager: 'Sneha Desai',
    supervisor: 'Arjun Kumar',
    team: 12,
    description: 'Complete interior fit-out of 3-floor mall including food court, retail zones and common areas. Premium specifications with imported materials.',
    floors: 'G+2',
    area: '22,000 sqft',
    stage: 'Fit-out',
    invoiced: 3400000,
    received: 2550000,
    expenses: 3100000,
    profit: 300000,
    tasks: [
      { id:1, title:'False ceiling — Food court',  assignee:'Arjun K.', due:'05 Aug', status:'pending',     priority:'medium' },
      { id:2, title:'Flooring — Level 2',          assignee:'Ravi M.',  due:'10 Aug', status:'in-progress', priority:'high'   },
      { id:3, title:'Electrical — Level 1',        assignee:'Nitin D.', due:'03 Aug', status:'blocked',     priority:'high'   },
    ],
    milestones: [
      { title:'Site Handover',    date:'May 2025', done:true  },
      { title:'Level 1 Complete', date:'Jul 2025', done:false },
      { title:'Level 2 Complete', date:'Aug 2025', done:false },
      { title:'Final Handover',   date:'Sep 2025', done:false },
    ],
    materials: [
      { name:'Gypsum Board',   status:'ok',  qty:'800 M²', required:'1200 M²' },
      { name:'Vitrified Tile', status:'low', qty:'200 M²', required:'500 M²'  },
    ],
    team_members: [
      { name:'Arjun Kumar',  role:'Interior Lead',   phone:'+91 98200 66001' },
      { name:'Ravi Mehta',   role:'MEP Engineer',    phone:'+91 98200 66002' },
      { name:'Nitin Desai',  role:'Electrician',     phone:'+91 98200 66003' },
    ],
    documents: [
      { name:'Interior Design Concept', type:'PDF', date:'01 May 2025', size:'22 MB'  },
      { name:'Material Schedule',       type:'XLS', date:'10 May 2025', size:'1.8 MB' },
    ],
    issues: [
      { id:'ISS-08', desc:'Material delivery delayed — vitrified tiles', priority:'high',   status:'open',     date:'28 Jul' },
      { id:'ISS-07', desc:'Electrical contractor dispute on scope',       priority:'medium', status:'open',     date:'25 Jul' },
    ],
    dprs: [
      { date:'29 Jul 2025', work:'Flooring Level 2 — 30% complete',   workers:10, issues:2, weather:'Clear'  },
      { date:'28 Jul 2025', work:'False ceiling Level 1 started',      workers:12, issues:1, weather:'Cloudy' },
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
    value: 11000000,
    valueStr: '₹1.1 Cr',
    status: 'on-track',
    progress: 81,
    startDate: '15 Jan 2025',
    endDate: '20 Aug 2025',
    site: 'Powai, Mumbai',
    manager: 'Sneha Desai',
    supervisor: 'Ravi Mehta',
    team: 18,
    description: 'Full MEP package for 8-floor tech park including HVAC, fire fighting, plumbing and electrical. Complete testing and commissioning included.',
    floors: 'G+7',
    area: '68,000 sqft',
    stage: 'Finishing MEP',
    invoiced: 8800000,
    received: 7700000,
    expenses: 7200000,
    profit: 1500000,
    tasks: [
      { id:1, title:'HVAC — Floor 7 & 8',       assignee:'Ravi M.',  due:'Today',  status:'in-progress', priority:'high' },
      { id:2, title:'Fire sprinkler — Floor 8', assignee:'Sunil K.', due:'05 Aug', status:'pending',     priority:'high' },
    ],
    milestones: [
      { title:'Electrical Floors 1-4', date:'Mar 2025', done:true  },
      { title:'Plumbing Complete',     date:'May 2025', done:true  },
      { title:'HVAC Floors 1-6',       date:'Jun 2025', done:true  },
      { title:'All MEP Complete',      date:'Aug 2025', done:false },
    ],
    materials: [
      { name:'GI Ducts',   status:'ok', qty:'450 M²',  required:'500 M²'  },
      { name:'CPVC Pipes', status:'ok', qty:'800 RFT', required:'900 RFT' },
    ],
    team_members: [
      { name:'Ravi Mehta',   role:'MEP Lead',     phone:'+91 98200 77001' },
      { name:'Sunil Kamble', role:'HVAC Tech',    phone:'+91 98200 77002' },
      { name:'Nitin Desai',  role:'Electrician',  phone:'+91 98200 77003' },
      { name:'Suresh Patil', role:'Plumber',      phone:'+91 98200 77004' },
    ],
    documents: [
      { name:'MEP Coordination Drawing', type:'DWG', date:'10 Jan 2025', size:'18 MB' },
      { name:'Testing Checklist',        type:'PDF', date:'01 Jul 2025', size:'2 MB'  },
    ],
    issues: [
      { id:'ISS-05', desc:'HVAC unit delivery delayed 1 week', priority:'medium', status:'open',     date:'27 Jul' },
    ],
    dprs: [
      { date:'29 Jul 2025', work:'HVAC Floor 7 — 70% complete',        workers:16, issues:1, weather:'Clear' },
      { date:'28 Jul 2025', work:'Fire sprinkler Floor 7 completed',    workers:18, issues:0, weather:'Clear' },
      { date:'27 Jul 2025', work:'Electrical testing floors 1-6 done',  workers:18, issues:0, weather:'Cloudy'},
    ],
  },
  {
    id: 'PRJ-004',
    name: 'Villa Renovation Bandra',
    client: 'Private Client',
    clientContact: 'Boman Irani',
    clientPhone: '+91 98200 44444',
    clientEmail: 'boman@email.com',
    type: 'Renovation',
    value: 3800000,
    valueStr: '₹38 L',
    status: 'delayed',
    progress: 25,
    startDate: '01 Jun 2025',
    endDate: '10 Oct 2025',
    site: 'Bandra, Mumbai',
    manager: 'Sneha Desai',
    supervisor: 'Suresh Patil',
    team: 8,
    description: 'Complete renovation of 4BHK luxury villa including structural repairs, new interiors, kitchen remodel and landscape.',
    floors: 'G+2',
    area: '5,200 sqft',
    stage: 'Demolition & Civil',
    invoiced: 1900000,
    received: 1140000,
    expenses: 1600000,
    profit: 300000,
    tasks: [
      { id:1, title:'Tile work — Master bedroom', assignee:'Suresh P.', due:'08 Aug', status:'pending',  priority:'low'    },
      { id:2, title:'Kitchen demolition',         assignee:'Ram S.',    due:'05 Aug', status:'blocked',  priority:'high'   },
    ],
    milestones: [
      { title:'Demolition Complete', date:'Jun 2025', done:true  },
      { title:'Civil Repairs',       date:'Jul 2025', done:false },
      { title:'Interior Works',      date:'Sep 2025', done:false },
      { title:'Final Handover',      date:'Oct 2025', done:false },
    ],
    materials: [
      { name:'Marble Flooring', status:'low', qty:'50 M²', required:'200 M²' },
      { name:'Plywood Boards',  status:'ok',  qty:'40 nos',required:'40 nos' },
    ],
    team_members: [
      { name:'Suresh Patil', role:'Supervisor', phone:'+91 98200 88001' },
      { name:'Ram Shinde',   role:'Mason',      phone:'+91 98200 88002' },
    ],
    documents: [
      { name:'Renovation Drawings', type:'PDF', date:'01 Jun 2025', size:'5 MB' },
    ],
    issues: [
      { id:'ISS-03', desc:'Client approval pending — kitchen design',  priority:'high',   status:'open', date:'28 Jul' },
      { id:'ISS-02', desc:'Structural crack found — east wall',         priority:'high',   status:'open', date:'25 Jul' },
    ],
    dprs: [
      { date:'29 Jul 2025', work:'Tile work bedroom 2 — started',  workers:6, issues:2, weather:'Clear' },
      { date:'28 Jul 2025', work:'Plumbing rough-in completed',     workers:8, issues:1, weather:'Rain'  },
    ],
  },
  {
    id: 'PRJ-005',
    name: 'Lodha Commercial Fit-out',
    client: 'Lodha Group',
    clientContact: 'Abhishek Lodha',
    clientPhone: '+91 98200 55555',
    clientEmail: 'abhishek@lodha.com',
    type: 'Interior',
    value: 18000000,
    valueStr: '₹1.8 Cr',
    status: 'on-track',
    progress: 55,
    startDate: '01 Apr 2025',
    endDate: '05 Nov 2025',
    site: 'Lower Parel, Mumbai',
    manager: 'Sneha Desai',
    supervisor: 'Arjun Kumar',
    team: 20,
    description: 'Premium commercial fit-out for 15,000 sqft office space across 3 floors with high-end specifications, conference rooms and collaborative spaces.',
    floors: '3 Floors',
    area: '15,000 sqft',
    stage: 'Interior',
    invoiced: 9000000,
    received: 7200000,
    expenses: 8000000,
    profit: 1000000,
    tasks: [
      { id:1, title:'Electrical wiring — Level 3', assignee:'Nitin D.', due:'03 Aug', status:'blocked',     priority:'high'   },
      { id:2, title:'Ceiling — Conference rooms',  assignee:'Arjun K.', due:'10 Aug', status:'in-progress', priority:'medium' },
      { id:3, title:'Flooring — Reception',        assignee:'Ravi M.',  due:'15 Aug', status:'pending',     priority:'medium' },
    ],
    milestones: [
      { title:'Site Setup',       date:'Apr 2025', done:true  },
      { title:'MEP Roughing',     date:'May 2025', done:true  },
      { title:'Ceiling & Walls',  date:'Aug 2025', done:false },
      { title:'Flooring',         date:'Sep 2025', done:false },
      { title:'Handover',         date:'Nov 2025', done:false },
    ],
    materials: [
      { name:'Engineered Wood', status:'ok',  qty:'500 M²', required:'600 M²' },
      { name:'Glass Partitions',status:'low', qty:'20 nos', required:'45 nos' },
    ],
    team_members: [
      { name:'Arjun Kumar', role:'Interior Lead',  phone:'+91 98200 99001' },
      { name:'Nitin Desai', role:'Electrician',    phone:'+91 98200 99002' },
      { name:'Ravi Mehta',  role:'MEP Engineer',   phone:'+91 98200 99003' },
    ],
    documents: [
      { name:'Interior Design v2', type:'PDF', date:'01 Apr 2025', size:'28 MB' },
      { name:'MEP Layout',         type:'DWG', date:'15 Apr 2025', size:'12 MB' },
    ],
    issues: [
      { id:'ISS-06', desc:'Glass partition lead time 3 weeks', priority:'medium', status:'open', date:'26 Jul' },
    ],
    dprs: [
      { date:'29 Jul 2025', work:'Conference ceiling — 50% done', workers:18, issues:1, weather:'Clear' },
      { date:'28 Jul 2025', work:'Electrical Level 2 completed',  workers:20, issues:0, weather:'Clear' },
    ],
  },
]

// ── Helpers ────────────────────────────────────────────────
const formatINR = (n) => {
  if (n >= 10000000) return `₹${(n/10000000).toFixed(2)} Cr`
  if (n >= 100000)   return `₹${(n/100000).toFixed(1)} L`
  return `₹${new Intl.NumberFormat('en-IN').format(n)}`
}

const StatusBadge = ({ status }) => {
  const map = {
    'on-track':    { label:'On Track',    color:T.positive, bg:T.positiveLight },
    'at-risk':     { label:'At Risk',     color:T.warning,  bg:T.warningLight },
    'delayed':     { label:'Delayed',     color:T.danger,   bg:T.dangerLight },
    'completed':   { label:'Completed',   color:T.primary,  bg:T.primaryLight },
    'in-progress': { label:'In Progress', color:T.primary,  bg:T.primaryLight },
    'pending':     { label:'Pending',     color:T.textMuted,bg:T.surfaceAlt },
    'blocked':     { label:'Blocked',     color:T.danger,   bg:T.dangerLight },
    'done':        { label:'Done',        color:T.positive, bg:T.positiveLight },
    'open':        { label:'Open',        color:T.danger,   bg:T.dangerLight },
    'resolved':    { label:'Resolved',    color:T.positive, bg:T.positiveLight },
  }
  const { label, color, bg } = map[status] || map['pending']
  return (
    <span style={{ fontSize:10, fontWeight:700, padding:'2px 10px', borderRadius:40, background:bg, color, border:`1px solid ${color}40` }}>
      {label}
    </span>
  )
}

const TypeBadge = ({ type }) => {
  const colors = {
    Civil:      { bg:T.primaryLight,      color:T.primary },
    Interior:   { bg:T.accentLight,       color:T.accent },
    MEP:        { bg: T.positiveLight,    color:T.positive },
    Renovation: { bg:T.warningLight,      color:T.warning },
    Structural: { bg: T.dangerLight,      color:T.danger },
  }
  const { bg, color } = colors[type] || { bg:T.surfaceAlt, color:T.textMuted }
  return (
    <span style={{ fontSize:10, fontWeight:600, padding:'2px 8px', borderRadius:8, background:bg, color }}>
      {type}
    </span>
  )
}

const PriorityDot = ({ priority }) => {
  const colors = { high:T.danger, medium:T.warning, low:T.positive }
  return <span style={{ width:8, height:8, borderRadius:'50%', background:colors[priority], display:'inline-block' }} />
}

// ── Photo Lightbox ─────────────────────────────────────────
function PhotoLightbox({ photos, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex)
  const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length)
  const next = () => setCurrent(i => (i + 1) % photos.length)
  const photo = photos[current]
  return (
    <div style={{ position:'fixed', inset:0, zIndex:50, background:'rgba(0,0,0,0.9)', backdropFilter:'blur(8px)', display:'flex', alignItems:'center', justifyContent:'center' }} onClick={onClose}>
      <div style={{ position:'relative', maxWidth:'90vw', maxHeight:'90vh' }} onClick={e => e.stopPropagation()}>
        <button onClick={onClose} style={{ position:'absolute', top:-40, right:0, background:'none', border:'none', color:'#fff', cursor:'pointer' }}><X size={24}/></button>
        <div style={{ borderRadius:24, overflow:'hidden', boxShadow:'0 0 30px rgba(0,150,255,0.5)' }}>
          <img src={photo.url} alt={photo.caption} style={{ width:'auto', maxHeight:'70vh', objectFit:'contain' }} />
          <div style={{ position:'absolute', bottom:0, left:0, right:0, background:'linear-gradient(to top, rgba(0,0,0,0.8), transparent)', padding:16 }}>
            <p style={{ color:'#fff', fontWeight:600, fontSize:14 }}>{photo.caption}</p>
            <div style={{ display:'flex', gap:12, marginTop:4, fontSize:11, color:'rgba(255,255,255,0.7)' }}>
              <span>{photo.date}</span><span>·</span><span>{photo.category}</span><span>·</span><span>{photo.uploader}</span>
            </div>
          </div>
        </div>
        <button onClick={prev} style={{ position:'absolute', left:-48, top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.5)', border:'none', borderRadius:'50%', width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#fff' }}><ChevronLeft size={20}/></button>
        <button onClick={next} style={{ position:'absolute', right:-48, top:'50%', transform:'translateY(-50%)', background:'rgba(0,0,0,0.5)', border:'none', borderRadius:'50%', width:40, height:40, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'#fff' }}><ChevronRight size={20}/></button>
        <div style={{ display:'flex', gap:8, marginTop:16, overflowX:'auto', justifyContent:'center', paddingBottom:8 }}>
          {photos.map((p, i) => (
            <button key={p.id} onClick={() => setCurrent(i)} style={{ width:64, height:48, borderRadius:8, overflow:'hidden', border: i===current ? `2px solid ${T.primary}` : '2px solid transparent', opacity: i===current ? 1 : 0.5 }}>
              <img src={p.url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover' }} />
            </button>
          ))}
        </div>
        <p style={{ textAlign:'center', color:'rgba(255,255,255,0.5)', fontSize:11, marginTop:8 }}>{current+1} / {photos.length}</p>
      </div>
    </div>
  )
}

// ── Photo Gallery Section ──────────────────────────────────
function PhotoGallery({ projectId }) {
  const [lightboxIndex, setLightboxIndex] = useState(null)
  const [activeCategory, setActiveCategory] = useState('All')
  const photos = sitePhotos[projectId] || []
  const categories = ['All', ...new Set(photos.map(p => p.category))]
  const filtered = activeCategory === 'All' ? photos : photos.filter(p => p.category === activeCategory)

  if (photos.length === 0) {
    return (
      <div style={{ ...card, padding:48, textAlign:'center' }}>
        <Camera size={40} style={{ color:T.textMuted, margin:'0 auto 12px auto' }} />
        <p style={{ fontWeight:600, color:T.textMuted }}>No photos yet</p>
        <p style={{ fontSize:12, color:T.textMuted, marginTop:4 }}>Site supervisor can upload photos</p>
        <button style={{ marginTop:16, background:T.primary, border:'none', borderRadius:40, padding:'6px 16px', color:'#fff', fontSize:12, fontWeight:600, cursor:'pointer' }}><Upload size={13} style={{ display:'inline', marginRight:6 }} /> Upload Photos</button>
      </div>
    )
  }

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:8 }}>
        <div style={{ display:'flex', gap:8, flexWrap:'wrap' }}>
          {categories.map(cat => (
            <button key={cat} onClick={() => setActiveCategory(cat)} style={{ padding:'4px 12px', borderRadius:40, fontSize:11, fontWeight:600, background: activeCategory===cat ? T.primary : T.surfaceAlt, color: activeCategory===cat ? '#fff' : T.textMid, border: `1px solid ${activeCategory===cat ? T.primary : T.border}`, cursor:'pointer' }}>
              {cat} ({cat==='All' ? photos.length : photos.filter(p=>p.category===cat).length})
            </button>
          ))}
        </div>
        <button style={{ background:T.primary, border:'none', borderRadius:40, padding:'4px 12px', color:'#fff', fontSize:11, fontWeight:600, cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}><Upload size={12}/> Upload</button>
      </div>

      {/* Featured large photo */}
      {filtered.length > 0 && (
        <div style={{ position:'relative', borderRadius:24, overflow:'hidden', cursor:'pointer', height:280 }} onClick={() => setLightboxIndex(photos.indexOf(filtered[0]))}>
          <img src={filtered[0].url} alt={filtered[0].caption} style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.3s' }} />
          <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.6), transparent)' }} />
          <div style={{ position:'absolute', bottom:16, left:16 }}>
            <p style={{ color:'#fff', fontWeight:600, marginBottom:4 }}>{filtered[0].caption}</p>
            <div style={{ display:'flex', gap:12, fontSize:11, color:'rgba(255,255,255,0.7)' }}>
              <span>{filtered[0].date}</span> <span>by {filtered[0].uploader}</span>
            </div>
          </div>
          <div style={{ position:'absolute', top:12, left:12 }}><span style={{ background:T.primary, borderRadius:40, padding:'2px 10px', fontSize:10, fontWeight:600, color:'#fff' }}>{filtered[0].category}</span></div>
          <div style={{ position:'absolute', top:12, right:12, background:'rgba(0,0,0,0.5)', borderRadius:'50%', padding:6 }}><Maximize2 size={14} color="#fff"/></div>
        </div>
      )}

      {/* Grid */}
      {filtered.length > 1 && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(140px,1fr))', gap:12 }}>
          {filtered.slice(1).map(photo => (
            <div key={photo.id} style={{ position:'relative', aspectRatio:'1/1', borderRadius:16, overflow:'hidden', cursor:'pointer' }} onClick={() => setLightboxIndex(photos.indexOf(photo))}>
              <img src={photo.url} alt="" style={{ width:'100%', height:'100%', objectFit:'cover', transition:'transform 0.3s' }} />
              <div style={{ position:'absolute', inset:0, background:'rgba(0,0,0,0.2)', display:'flex', alignItems:'center', justifyContent:'center', opacity:0, transition:'opacity 0.2s' }}><ZoomIn size={20} color="#fff"/></div>
              <div style={{ position:'absolute', top:6, left:6 }}><span style={{ background:'rgba(0,0,0,0.6)', borderRadius:40, padding:'2px 6px', fontSize:9, color:'#fff' }}>{photo.category}</span></div>
            </div>
          ))}
        </div>
      )}

      {lightboxIndex !== null && <PhotoLightbox photos={photos} initialIndex={lightboxIndex} onClose={() => setLightboxIndex(null)} />}
    </div>
  )
}

// ── Project Financial Summary ──────────────────────────────
function ProjectFinancials({ project }) {
  const collectionRate = Math.round((project.received / project.invoiced) * 100)
  const profitMargin   = Math.round((project.profit   / project.value)    * 100)
  const spentPct       = Math.round((project.expenses / project.value)    * 100)

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(150px,1fr))', gap:12 }}>
        {[
          { label:'Contract Value', value:formatINR(project.value), sub:'Total contract', icon:IndianRupee, color:T.primary },
          { label:'Invoiced',       value:formatINR(project.invoiced), sub:`${Math.round((project.invoiced/project.value)*100)}% of contract`, icon:IndianRupee, color:T.accent },
          { label:'Received',       value:formatINR(project.received), sub:`${collectionRate}% collected`, icon:IndianRupee, color:T.positive },
          { label:'Net Profit',     value:formatINR(project.profit), sub:`${profitMargin}% margin`, icon:IndianRupee, color:T.warning },
        ].map((k,i) => (
          <div key={i} style={{ ...card, padding:16 }}>
            <div style={{ width:32, height:32, borderRadius:12, background:`${k.color}20`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:12 }}><IndianRupee size={16} color={k.color} /></div>
            <p style={{ fontSize:20, fontWeight:800, color:T.text }}>{k.value}</p>
            <p style={{ fontSize:11, color:T.textMuted, marginTop:2 }}>{k.label}</p>
            <p style={{ fontSize:10, color:T.textMuted, marginTop:2 }}>{k.sub}</p>
          </div>
        ))}
      </div>

      <div style={{ ...card, padding:20 }}>
        <h3 style={{ fontSize:13, fontWeight:800, color:T.text, marginBottom:16 }}>Financial Progress</h3>
        <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
          {[
            { label:'Amount Invoiced',  value:project.invoiced, total:project.value, color:T.primary,   pct:Math.round((project.invoiced/project.value)*100) },
            { label:'Amount Received',  value:project.received, total:project.value, color:T.positive,  pct:Math.round((project.received/project.value)*100) },
            { label:'Amount Spent',     value:project.expenses, total:project.value, color:T.warning,   pct:spentPct },
          ].map((bar,i) => (
            <div key={i}>
              <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:6 }}>
                <span style={{ color:T.textMuted }}>{bar.label}</span>
                <span style={{ fontWeight:700, color:T.text }}>{formatINR(bar.value)} ({bar.pct}%)</span>
              </div>
              <div style={{ height:6, background:T.border, borderRadius:4, overflow:'hidden' }}>
                <div style={{ width:`${bar.pct}%`, height:'100%', background:bar.color, borderRadius:4, boxShadow:`0 0 4px ${bar.color}` }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

// ── Full Project Detail Page ───────────────────────────────
function ProjectDetail({ project, onBack }) {
  const [activeTab, setActiveTab] = useState('overview')
  const doneTasks      = project.tasks.filter(t => t.status === 'done').length
  const openIssues     = project.issues.filter(i => i.status === 'open').length
  const doneMilestones = project.milestones.filter(m => m.done).length

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24, animation:'fadeSlideUp 0.4s ease-out' }}>

      {/* Hero Banner */}
      <div style={{ position:'relative', borderRadius:28, overflow:'hidden' }}>
        {sitePhotos[project.id]?.[0] ? (
          <img src={sitePhotos[project.id][0].url} alt={project.name} style={{ width:'100%', height:240, objectFit:'cover' }} />
        ) : (
          <div style={{ width:'100%', height:240, background:`linear-gradient(135deg, ${T.primary}, ${T.accent})` }} />
        )}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }} />

        <button onClick={onBack} style={{ position:'absolute', top:16, left:16, background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)', border:'none', borderRadius:40, padding:'6px 14px', color:'#fff', fontSize:11, fontWeight:600, display:'flex', alignItems:'center', gap:6, cursor:'pointer' }}><ArrowLeft size={14}/> All Projects</button>

        <div style={{ position:'absolute', top:16, right:16, display:'flex', gap:8 }}>
          <button style={{ background:T.positive, border:'none', borderRadius:40, padding:'6px 12px', fontSize:11, fontWeight:600, color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}><Download size={13}/> Export PDF</button>
          <button style={{ background:'rgba(0,0,0,0.5)', backdropFilter:'blur(4px)', border:'none', borderRadius:40, padding:'6px 12px', fontSize:11, fontWeight:600, color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}><Edit3 size={13}/> Edit</button>
          <button style={{ background:T.primary, border:'none', borderRadius:40, padding:'6px 12px', fontSize:11, fontWeight:600, color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:6 }}><Camera size={13}/> DPR</button>
        </div>

        <div style={{ position:'absolute', bottom:16, left:16, right:16, display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:12 }}>
          <div>
            <div style={{ display:'flex', gap:8, marginBottom:8 }}>
              <TypeBadge type={project.type} />
              <StatusBadge status={project.status} />
            </div>
            <h1 style={{ fontSize:22, fontWeight:800, color:'#fff', marginBottom:4 }}>{project.name}</h1>
            <div style={{ display:'flex', gap:16, fontSize:11, color:'rgba(255,255,255,0.7)', flexWrap:'wrap' }}>
              <span style={{ display:'flex', alignItems:'center', gap:4 }}><Building2 size={12}/> {project.client}</span>
              <span><MapPin size={12} style={{ display:'inline', marginRight:4 }} />{project.site}</span>
              <span><Calendar size={12} style={{ display:'inline', marginRight:4 }} />{project.startDate} → {project.endDate}</span>
            </div>
          </div>
          <div style={{ textAlign:'right' }}>
            <p style={{ fontSize:24, fontWeight:800, color:'#fff' }}>{project.valueStr}</p>
            <p style={{ fontSize:11, color:'rgba(255,255,255,0.5)' }}>Contract Value</p>
          </div>
        </div>
      </div>

      {/* Quick Stats Row */}
      <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(120px,1fr))', gap:12 }}>
        {[
          { label:'Progress',    value:`${project.progress}%`,              icon:TrendingUp,    color:T.primary },
          { label:'Tasks Done',  value:`${doneTasks}/${project.tasks.length}`,icon:CheckSquare, color:T.positive },
          { label:'Milestones',  value:`${doneMilestones}/${project.milestones.length}`,icon:Flag, color:T.accent },
          { label:'Team',        value:`${project.team} workers`,            icon:Users,         color:T.warning },
          { label:'Open Issues', value:`${openIssues} issues`,               icon:AlertTriangle, color:T.danger },
          { label:'Stage',       value:project.stage,                        icon:Wrench,        color:T.textMid },
        ].map((s,i) => (
          <div key={i} style={{ ...card, padding:12, textAlign:'center' }}>
            <s.icon size={18} color={s.color} style={{ margin:'0 auto 6px auto' }} />
            <p style={{ fontSize:16, fontWeight:800, color:s.color }}>{s.value}</p>
            <p style={{ fontSize:10, color:T.textMuted }}>{s.label}</p>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div style={{ ...card, padding:16 }}>
        <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:6 }}>
          <span style={{ color:T.textMuted }}>Overall Progress</span>
          <span style={{ fontWeight:800, color:T.text }}>{project.progress}%</span>
        </div>
        <div style={{ height:8, background:T.border, borderRadius:6, overflow:'hidden' }}>
          <div style={{ width:`${project.progress}%`, height:'100%', background: project.status==='delayed' ? T.danger : project.status==='at-risk' ? T.warning : `linear-gradient(90deg, ${T.primary}, ${T.accent})`, borderRadius:6, boxShadow:'0 0 6px #0EA5E9' }} />
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display:'flex', gap:4, background:T.surface, backdropFilter:'blur(8px)', borderRadius:40, padding:4, border:`1px solid ${T.border}`, overflowX:'auto' }}>
        {[
          { id:'overview',   label:'Overview' },
          { id:'photos',     label:`Photos (${(sitePhotos[project.id]||[]).length})` },
          { id:'financials', label:'Financials' },
          { id:'tasks',      label:`Tasks (${project.tasks.length})` },
          { id:'milestones', label:'Milestones' },
          { id:'team',       label:'Team' },
          { id:'issues',     label:`Issues (${project.issues.length})` },
          { id:'dpr',        label:'DPR Log' },
          { id:'documents',  label:'Documents' },
        ].map(tab => (
          <button key={tab.id} onClick={() => setActiveTab(tab.id)} style={{ padding:'6px 16px', borderRadius:40, fontSize:11, fontWeight:600, whiteSpace:'nowrap', background: activeTab===tab.id ? T.primary : 'transparent', color: activeTab===tab.id ? '#fff' : T.textMid, border:'none', cursor:'pointer' }}>
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === 'overview' && (
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
          <div style={{ ...card, padding:20 }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:T.text, marginBottom:16 }}>Project Information</h2>
            <p style={{ fontSize:13, color:T.textMid, marginBottom:16, lineHeight:1.5 }}>{project.description}</p>
            <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
              {[
                { label:'Project ID',       value:project.id },
                { label:'Type',             value:project.type },
                { label:'Area',             value:project.area },
                { label:'Floors',           value:project.floors },
                { label:'Current Stage',    value:project.stage },
                { label:'Start Date',       value:project.startDate },
                { label:'End Date',         value:project.endDate },
                { label:'Site Location',    value:project.site },
                { label:'Project Manager',  value:project.manager },
                { label:'Site Supervisor',  value:project.supervisor },
              ].map((row,i) => (
                <div key={i} style={{ display:'flex', justifyContent:'space-between', padding:'6px 0', borderBottom: i<9 ? `1px solid ${T.border}` : 'none' }}>
                  <span style={{ fontSize:11, color:T.textMuted }}>{row.label}</span>
                  <span style={{ fontSize:11, fontWeight:600, color:T.text }}>{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
            <div style={{ ...card, padding:20 }}>
              <h2 style={{ fontSize:13, fontWeight:800, color:T.text, marginBottom:16 }}>Client Details</h2>
              <div style={{ display:'flex', alignItems:'center', gap:12, padding:12, background:T.surfaceAlt, borderRadius:16, marginBottom:16 }}>
                <div style={{ width:48, height:48, borderRadius:16, background:`${T.primary}20`, display:'flex', alignItems:'center', justifyContent:'center' }}><Building2 size={24} color={T.primary} /></div>
                <div><p style={{ fontWeight:700, color:T.text }}>{project.client}</p><p style={{ fontSize:11, color:T.textMuted }}>{project.clientContact}</p></div>
              </div>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}><Phone size={14} color={T.textMuted} /><span style={{ fontSize:12, color:T.textMid }}>{project.clientPhone}</span><button style={{ marginLeft:'auto', fontSize:10, color:T.primary, background:'none', border:'none', cursor:'pointer' }}>Call</button></div>
                <div style={{ display:'flex', alignItems:'center', gap:12 }}><Mail size={14} color={T.textMuted} /><span style={{ fontSize:12, color:T.textMid, flex:1 }}>{project.clientEmail}</span><button style={{ fontSize:10, color:T.primary, background:'none', border:'none', cursor:'pointer' }}>Email</button></div>
              </div>
            </div>
            {sitePhotos[project.id]?.length > 0 && (
              <div style={{ ...card, padding:20, cursor:'pointer' }} onClick={() => setActiveTab('photos')}>
                <img src={sitePhotos[project.id][sitePhotos[project.id].length-1].url} alt="latest" style={{ width:'100%', height:120, objectFit:'cover', borderRadius:16, marginBottom:12 }} />
                <p style={{ textAlign:'center', fontSize:11, color:T.primary, fontWeight:600 }}>View {sitePhotos[project.id].length} site photos →</p>
              </div>
            )}
            <div style={{ ...card, padding:20 }}>
              <h3 style={{ fontSize:12, fontWeight:800, color:T.text, marginBottom:12 }}>Milestone Progress</h3>
              <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                {project.milestones.map((m,i) => (
                  <div key={i} style={{ display:'flex', alignItems:'center', gap:8 }}>
                    <div style={{ width:18, height:18, borderRadius:'50%', border:`2px solid ${m.done ? T.positive : T.borderStrong}`, background:m.done ? T.positive : 'transparent', display:'flex', alignItems:'center', justifyContent:'center' }}>{m.done && <CheckCircle2 size={12} color="#fff" />}</div>
                    <span style={{ fontSize:11, flex:1, color:m.done ? T.textMuted : T.text, textDecoration:m.done ? 'line-through' : 'none' }}>{m.title}</span>
                    <span style={{ fontSize:10, color:T.textMuted }}>{m.date}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'photos' && <PhotoGallery projectId={project.id} />}
      {activeTab === 'financials' && <ProjectFinancials project={project} />}
      {activeTab === 'tasks' && (
        <div style={{ ...card, overflow:'hidden' }}>
          <div style={{ padding:'16px 20px', borderBottom:`1px solid ${T.border}`, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:T.text }}>Task List</h2>
            <button style={{ background:T.primaryLight, border:`1px solid ${T.primary}`, borderRadius:40, padding:'4px 12px', fontSize:10, fontWeight:600, color:T.primary, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}><Plus size={12}/> Add Task</button>
          </div>
          <div style={{ overflowX:'auto' }}>
            <table style={{ width:'100%', fontSize:12, minWidth:550, borderCollapse:'collapse' }}>
              <thead><tr style={{ borderBottom:`1px solid ${T.border}`, color:T.textMuted, fontSize:10 }}>
                <th style={{ textAlign:'left', padding:'10px 12px' }}>Task</th><th style={{ textAlign:'left', padding:'10px 12px' }}>Assignee</th><th style={{ textAlign:'left', padding:'10px 12px' }}>Priority</th><th style={{ textAlign:'left', padding:'10px 12px' }}>Due</th><th style={{ textAlign:'left', padding:'10px 12px' }}>Status</th>
              </tr></thead>
              <tbody>
                {project.tasks.map(t => (
                  <tr key={t.id} style={{ borderBottom:`1px solid ${T.border}` }}>
                    <td style={{ padding:'10px 12px' }}><div style={{ display:'flex', alignItems:'center', gap:6 }}><PriorityDot priority={t.priority}/><span style={{ color:T.text }}>{t.title}</span></div></td>
                    <td style={{ padding:'10px 12px', color:T.textMid }}>{t.assignee}</td>
                    <td style={{ padding:'10px 12px', color: t.priority==='high' ? T.danger : t.priority==='medium' ? T.warning : T.positive, fontWeight:600 }}>{t.priority}</td>
                    <td style={{ padding:'10px 12px', color:T.textMuted }}>{t.due}</td>
                    <td style={{ padding:'10px 12px' }}><StatusBadge status={t.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {activeTab === 'milestones' && (
        <div style={{ ...card, padding:20 }}>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:16 }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:T.text }}>Project Milestones</h2>
            <button style={{ background:T.primaryLight, border:`1px solid ${T.primary}`, borderRadius:40, padding:'4px 12px', fontSize:10, fontWeight:600, color:T.primary, cursor:'pointer' }}><Plus size={12}/> Add</button>
          </div>
          <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
            {project.milestones.map((m,i) => (
              <div key={i} style={{ display:'flex', gap:12, alignItems:'flex-start' }}>
                <div style={{ width:24, height:24, borderRadius:'50%', border:`2px solid ${m.done ? T.positive : T.borderStrong}`, background:m.done ? T.positive : T.surface, display:'flex', alignItems:'center', justifyContent:'center' }}>{m.done && <span style={{ color:'#fff', fontSize:12 }}>✓</span>}</div>
                <div style={{ flex:1, padding:12, borderRadius:16, background: m.done ? T.positiveLight : T.surfaceAlt, border:`1px solid ${m.done ? T.positive : T.border}` }}>
                  <div style={{ display:'flex', justifyContent:'space-between' }}><span style={{ fontWeight:700, color:m.done ? T.positive : T.text }}>{m.title}</span><span style={{ fontSize:10, color:T.textMuted }}><Calendar size={10} style={{ display:'inline', marginRight:4 }} />{m.date}</span></div>
                  <p style={{ fontSize:10, color:T.textMuted, marginTop:4 }}>{m.done ? '✓ Completed' : 'Upcoming'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'team' && (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:T.text }}>Team Members — {project.team} total workers</h2>
            <button style={{ background:T.primary, border:'none', borderRadius:40, padding:'4px 12px', fontSize:11, fontWeight:600, color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}><Plus size={12}/> Add Member</button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(250px,1fr))', gap:12 }}>
            {project.team_members.map(m => (
              <div key={m.name} style={{ ...card, padding:12, display:'flex', alignItems:'center', gap:12 }}>
                <div style={{ width:40, height:40, borderRadius:40, background:`${T.primary}20`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:800, color:T.primary }}>{m.name.charAt(0)}</div>
                <div style={{ flex:1 }}><p style={{ fontWeight:700, color:T.text }}>{m.name}</p><p style={{ fontSize:10, color:T.textMuted }}>{m.role}</p><p style={{ fontSize:10, color:T.textMuted }}>{m.phone}</p></div>
                <Phone size={14} color={T.textMuted} style={{ cursor:'pointer' }} />
              </div>
            ))}
          </div>
        </div>
      )}

      {activeTab === 'issues' && (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:T.text }}>Site Issues</h2>
            <button style={{ background:T.dangerLight, border:`1px solid ${T.danger}`, borderRadius:40, padding:'4px 12px', fontSize:11, fontWeight:600, color:T.danger, cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}><Plus size={12}/> Raise Issue</button>
          </div>
          {project.issues.map(iss => (
            <div key={iss.id} style={{ ...card, padding:16, marginBottom:12, display:'flex', alignItems:'flex-start', gap:12 }}>
              <div style={{ width:8, height:8, borderRadius:'50%', background: iss.priority==='high' ? T.danger : iss.priority==='medium' ? T.warning : T.textMuted, marginTop:6 }} />
              <div style={{ flex:1 }}><p style={{ fontWeight:700, color:T.text }}>{iss.desc}</p><p style={{ fontSize:10, color:T.textMuted }}>{iss.id} · Raised {iss.date}</p></div>
              <div style={{ display:'flex', gap:8, alignItems:'center' }}><span style={{ fontSize:11, fontWeight:600, color: iss.priority==='high' ? T.danger : iss.priority==='medium' ? T.warning : T.textMuted, textTransform:'capitalize' }}>{iss.priority}</span><StatusBadge status={iss.status}/></div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'dpr' && (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:T.text }}>Daily Progress Reports</h2>
            <button style={{ background:T.primary, border:'none', borderRadius:40, padding:'4px 12px', fontSize:11, fontWeight:600, color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}><Plus size={12}/> New DPR</button>
          </div>
          {project.dprs.map((dpr,i) => (
            <div key={i} style={{ ...card, padding:16, marginBottom:12 }}>
              <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
                <div><p style={{ fontWeight:700, color:T.text }}>{dpr.date}</p><p style={{ fontSize:11, color:T.textMid }}>{dpr.work}</p></div>
                <div style={{ display:'flex', alignItems:'center', gap:4, fontSize:11, color:T.textMuted }}>{dpr.weather==='Rain' ? <CloudRain size={14}/> : <Sun size={14}/>} {dpr.weather}</div>
              </div>
              <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr 1fr', gap:12 }}>
                <div style={{ textAlign:'center', background:T.surfaceAlt, borderRadius:12, padding:8 }}><p style={{ fontWeight:800, color:T.text }}>{dpr.workers}</p><p style={{ fontSize:9, color:T.textMuted }}>Workers</p></div>
                <div style={{ textAlign:'center', background:T.surfaceAlt, borderRadius:12, padding:8 }}><p style={{ fontWeight:800, color:dpr.issues>0 ? T.danger : T.positive }}>{dpr.issues}</p><p style={{ fontSize:9, color:T.textMuted }}>Issues</p></div>
                <div style={{ textAlign:'center', background:T.surfaceAlt, borderRadius:12, padding:8 }}><p style={{ fontWeight:800, color:T.primary }}>View</p><p style={{ fontSize:9, color:T.textMuted }}>Full DPR</p></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {activeTab === 'documents' && (
        <div>
          <div style={{ display:'flex', justifyContent:'space-between', marginBottom:12 }}>
            <h2 style={{ fontSize:13, fontWeight:800, color:T.text }}>Project Documents</h2>
            <button style={{ background:T.primary, border:'none', borderRadius:40, padding:'4px 12px', fontSize:11, fontWeight:600, color:'#fff', cursor:'pointer', display:'flex', alignItems:'center', gap:4 }}><Upload size={12}/> Upload</button>
          </div>
          <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(280px,1fr))', gap:12 }}>
            {project.documents.map(doc => {
              const typeColor = { PDF:T.danger, DWG:T.primary, XLS:T.positive, ZIP:T.warning }[doc.type] || T.textMuted
              return (
                <div key={doc.name} style={{ ...card, padding:12, display:'flex', alignItems:'center', gap:12, cursor:'pointer' }}>
                  <div style={{ width:40, height:40, borderRadius:12, background:`${typeColor}20`, display:'flex', alignItems:'center', justifyContent:'center', fontWeight:700, color:typeColor }}>{doc.type}</div>
                  <div style={{ flex:1 }}><p style={{ fontWeight:600, color:T.text, fontSize:12 }}>{doc.name}</p><p style={{ fontSize:9, color:T.textMuted }}>{doc.date} · {doc.size}</p></div>
                  <Download size={14} color={T.textMuted} />
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// ── All Projects Master View ───────────────────────────────
function AllProjectsView({ onSelectProject }) {
  const [viewMode,   setViewMode]   = useState('grid')
  const [search,     setSearch]     = useState('')
  const [typeFilter, setTypeFilter] = useState('All')
  const [statusFilter, setStatusFilter] = useState('All')
  const [sortBy,     setSortBy]     = useState('name')

  const types    = ['All','Civil','Interior','MEP','Renovation','Structural']
  const statuses = ['All','on-track','at-risk','delayed','completed']

  const filtered = projects
    .filter(p => (p.name.toLowerCase().includes(search.toLowerCase()) || p.client.toLowerCase().includes(search.toLowerCase())) && (typeFilter==='All' || p.type===typeFilter) && (statusFilter==='All' || p.status===statusFilter))
    .sort((a,b) => { if (sortBy==='name') return a.name.localeCompare(b.name); if (sortBy==='progress') return b.progress - a.progress; if (sortBy==='value') return b.value - a.value; return 0 })

  const totalValue   = projects.reduce((s,p) => s + p.value, 0)
  const onTrack      = projects.filter(p => p.status === 'on-track').length
  const atRisk       = projects.filter(p => p.status === 'at-risk').length
  const avgProgress  = Math.round(projects.reduce((s,p) => s + p.progress, 0) / projects.length)

  return (
    <div style={{ display:'flex', flexDirection:'column', gap:24 }}>

      <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
        <div><h1 style={{ fontSize:22, fontWeight:800, color:T.text }}>All Projects</h1><p style={{ fontSize:12, color:T.textMuted }}>{projects.length} projects · {formatINR(totalValue)} total value</p></div>
        <button style={{ background:T.primary, border:'none', borderRadius:40, padding:'6px 14px', fontSize:12, fontWeight:600, color:'#fff', display:'flex', alignItems:'center', gap:6, cursor:'pointer' }}><Plus size={14}/> New Project</button>
      </div>

      <div style={{ ...card, padding:20, background:`linear-gradient(135deg, ${T.primaryLight}, ${T.accentLight})`, border:`1px solid ${T.primary}` }}>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(100px,1fr))', gap:16, textAlign:'center' }}>
          {[
            { label:'Total Projects', value:projects.length, color:T.text },
            { label:'Total Value',    value:formatINR(totalValue), color:T.primary },
            { label:'On Track',       value:onTrack, color:T.positive },
            { label:'At Risk',        value:atRisk, color:T.warning },
            { label:'Avg Progress',   value:`${avgProgress}%`, color:T.accent },
          ].map(s => (
            <div key={s.label}><p style={{ fontSize:24, fontWeight:800, color:s.color }}>{s.value}</p><p style={{ fontSize:10, color:T.textMuted }}>{s.label}</p></div>
          ))}
        </div>
        <div style={{ marginTop:16 }}>
          <div style={{ display:'flex', justifyContent:'space-between', fontSize:11, marginBottom:4 }}><span style={{ color:T.textMuted }}>Portfolio Average Progress</span><span style={{ fontWeight:800, color:T.text }}>{avgProgress}%</span></div>
          <div style={{ height:6, background:T.border, borderRadius:4, overflow:'hidden' }}><div style={{ width:`${avgProgress}%`, height:'100%', background:`linear-gradient(90deg, ${T.primary}, ${T.accent})`, borderRadius:4, boxShadow:'0 0 6px #0EA5E9' }} /></div>
        </div>
      </div>

      <div style={{ display:'flex', flexWrap:'wrap', alignItems:'center', gap:12 }}>
        <div style={{ display:'flex', alignItems:'center', gap:8, background:T.surface, border:`1px solid ${T.border}`, borderRadius:40, padding:'4px 12px', flex:1, maxWidth:320 }}>
          <Search size={14} color={T.textMuted}/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search projects or clients..." style={{ background:'transparent', border:'none', outline:'none', color:T.text, fontSize:12, width:'100%' }} />
        </div>
        <div style={{ display:'flex', gap:6, flexWrap:'wrap' }}>{types.map(t => <button key={t} onClick={()=>setTypeFilter(t)} style={{ padding:'4px 12px', borderRadius:40, fontSize:11, fontWeight:600, background: typeFilter===t ? T.primary : T.surfaceAlt, color: typeFilter===t ? '#fff' : T.textMid, border:`1px solid ${typeFilter===t ? T.primary : T.border}`, cursor:'pointer' }}>{t}</button>)}</div>
        <select value={statusFilter} onChange={e=>setStatusFilter(e.target.value)} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:40, padding:'4px 12px', fontSize:11, color:T.textMid, outline:'none' }}><option value="All">All Status</option>{statuses.slice(1).map(s => <option key={s} value={s}>{s.replace('-',' ').replace(/\b\w/g,l=>l.toUpperCase())}</option>)}</select>
        <select value={sortBy} onChange={e=>setSortBy(e.target.value)} style={{ background:T.surface, border:`1px solid ${T.border}`, borderRadius:40, padding:'4px 12px', fontSize:11, color:T.textMid, outline:'none' }}><option value="name">Sort: Name</option><option value="progress">Sort: Progress</option><option value="value">Sort: Value</option></select>
        <div style={{ display:'flex', gap:4, background:T.surface, border:`1px solid ${T.border}`, borderRadius:40, padding:4 }}>{[{id:'grid',icon:LayoutGrid},{id:'list',icon:List},{id:'kanban',icon:Kanban}].map(v=><button key={v.id} onClick={()=>setViewMode(v.id)} style={{ padding:6, borderRadius:40, background: viewMode===v.id ? T.primary : 'transparent', color: viewMode===v.id ? '#fff' : T.textMuted, border:'none', cursor:'pointer' }}><v.icon size={14}/></button>)}</div>
      </div>

      {viewMode === 'grid' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fill, minmax(320px,1fr))', gap:16 }}>
          {filtered.map(p => (
            <div key={p.id} onClick={()=>onSelectProject(p)} style={{ ...card, overflow:'hidden', cursor:'pointer', transition:'transform 0.2s' }} onMouseEnter={e=>e.currentTarget.style.transform='translateY(-4px)'} onMouseLeave={e=>e.currentTarget.style.transform='none'}>
              <div style={{ position:'relative', height:140, overflow:'hidden' }}>
                {sitePhotos[p.id]?.[0] ? <img src={sitePhotos[p.id][0].url} alt={p.name} style={{ width:'100%', height:'100%', objectFit:'cover' }} /> : <div style={{ width:'100%', height:'100%', background:`linear-gradient(135deg, ${T.primary}, ${T.accent})` }} />}
                <div style={{ position:'absolute', top:8, left:8 }}><StatusBadge status={p.status}/></div>
                <div style={{ position:'absolute', top:8, right:8 }}><TypeBadge type={p.type}/></div>
                {sitePhotos[p.id]?.length > 0 && <div style={{ position:'absolute', bottom:8, right:8, background:'rgba(0,0,0,0.6)', borderRadius:40, padding:'2px 8px', fontSize:10, color:'#fff' }}><Camera size={10} style={{ display:'inline', marginRight:4 }} />{sitePhotos[p.id].length}</div>}
              </div>
              <div style={{ padding:16 }}>
                <h3 style={{ fontWeight:800, color:T.text, marginBottom:4 }}>{p.name}</h3>
                <p style={{ fontSize:11, color:T.textMuted, marginBottom:12 }}>{p.client}</p>
                <div style={{ marginBottom:12 }}><div style={{ display:'flex', justifyContent:'space-between', fontSize:10, marginBottom:4 }}><span>Progress</span><span>{p.progress}%</span></div><div style={{ height:4, background:T.border, borderRadius:2, overflow:'hidden' }}><div style={{ width:`${p.progress}%`, height:'100%', background: p.status==='delayed' ? T.danger : p.status==='at-risk' ? T.warning : `linear-gradient(90deg, ${T.primary}, ${T.accent})`, borderRadius:2 }} /></div></div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:8, fontSize:10, color:T.textMuted, marginBottom:12 }}><span><MapPin size={10} style={{ display:'inline', marginRight:4 }} />{p.site.split(',')[0]}</span><span><Calendar size={10} style={{ display:'inline', marginRight:4 }} />{p.endDate}</span><span><Users size={10} style={{ display:'inline', marginRight:4 }} />{p.team} workers</span><span><CheckSquare size={10} style={{ display:'inline', marginRight:4 }} />{p.tasks.filter(t=>t.status==='done').length}/{p.tasks.length} tasks</span></div>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingTop:12, borderTop:`1px solid ${T.border}` }}><span style={{ fontWeight:800, color:T.text }}>{p.valueStr}</span><ChevronRight size={14} color={T.primary} /></div>
              </div>
            </div>
          ))}
        </div>
      )}

      {viewMode === 'list' && (
        <div style={{ ...card, overflow:'auto' }}>
          <table style={{ width:'100%', fontSize:12, minWidth:800, borderCollapse:'collapse' }}>
            <thead><tr style={{ borderBottom:`1px solid ${T.border}`, background:T.surfaceAlt }}><th style={{ padding:'12px 16px', textAlign:'left', fontSize:10, fontWeight:600 }}>Project</th><th>Client</th><th>Type</th><th>Value</th><th>Progress</th><th>Team</th><th>Deadline</th><th>Status</th></tr></thead>
            <tbody>{filtered.map(p => (
              <tr key={p.id} onClick={()=>onSelectProject(p)} style={{ borderBottom:`1px solid ${T.border}`, cursor:'pointer' }} onMouseEnter={e=>e.currentTarget.style.background=T.primaryLight} onMouseLeave={e=>e.currentTarget.style.background='transparent'}>
                <td style={{ padding:'12px 16px' }}><div style={{ display:'flex', alignItems:'center', gap:8 }}>{sitePhotos[p.id]?.[0] ? <img src={sitePhotos[p.id][0].url} alt="" style={{ width:32, height:32, borderRadius:8, objectFit:'cover' }} /> : <Building2 size={20} color={T.textMuted} />}<div><p style={{ fontWeight:700, color:T.text }}>{p.name}</p><p style={{ fontSize:10, color:T.textMuted }}>{p.id}</p></div></div></td>
                <td style={{ padding:'12px 16px', color:T.textMid }}>{p.client}</td>
                <td style={{ padding:'12px 16px' }}><TypeBadge type={p.type}/></td>
                <td style={{ padding:'12px 16px', fontWeight:700, color:T.text }}>{p.valueStr}</td>
                <td style={{ padding:'12px 16px' }}><div style={{ display:'flex', alignItems:'center', gap:8 }}><div style={{ flex:1, height:4, background:T.border, borderRadius:2, overflow:'hidden' }}><div style={{ width:`${p.progress}%`, height:'100%', background: p.status==='delayed' ? T.danger : p.status==='at-risk' ? T.warning : T.primary, borderRadius:2 }} /></div><span style={{ fontSize:10, color:T.textMuted, width:32 }}>{p.progress}%</span></div></td>
                <td style={{ padding:'12px 16px', color:T.textMid }}>{p.team}</td>
                <td style={{ padding:'12px 16px', color:T.textMid }}>{p.endDate}</td>
                <td style={{ padding:'12px 16px' }}><StatusBadge status={p.status}/></td>
              </tr>
            ))}</tbody>
          </table>
        </div>
      )}

      {viewMode === 'kanban' && (
        <div style={{ display:'grid', gridTemplateColumns:'repeat(auto-fit, minmax(240px,1fr))', gap:16 }}>
          {[
            { status:'on-track', label:'On Track',  color:T.positive, bg:T.positiveLight },
            { status:'at-risk',  label:'At Risk',   color:T.warning,  bg:T.warningLight },
            { status:'delayed',  label:'Delayed',   color:T.danger,   bg:T.dangerLight },
            { status:'completed',label:'Completed', color:T.primary,  bg:T.primaryLight },
          ].map(col => {
            const colProjects = filtered.filter(p => p.status === col.status)
            return (
              <div key={col.status} style={{ background:col.bg, border:`1px solid ${col.color}40`, borderRadius:24, padding:12 }}>
                <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', marginBottom:12 }}><h3 style={{ fontSize:12, fontWeight:800, color:col.color }}>{col.label}</h3><span style={{ background:col.color, color:'#fff', fontSize:10, fontWeight:700, padding:'0px 6px', borderRadius:40 }}>{colProjects.length}</span></div>
                <div style={{ display:'flex', flexDirection:'column', gap:8 }}>
                  {colProjects.map(p => (
                    <div key={p.id} onClick={()=>onSelectProject(p)} style={{ ...card, padding:12, cursor:'pointer' }}>
                      {sitePhotos[p.id]?.[0] && <img src={sitePhotos[p.id][0].url} alt="" style={{ width:'100%', height:80, objectFit:'cover', borderRadius:12, marginBottom:8 }} />}
                      <p style={{ fontWeight:700, color:T.text, fontSize:12 }}>{p.name}</p>
                      <p style={{ fontSize:10, color:T.textMuted, marginBottom:8 }}>{p.client}</p>
                      <div style={{ display:'flex', justifyContent:'space-between', marginBottom:6 }}><TypeBadge type={p.type}/><span style={{ fontWeight:700, color:T.text }}>{p.valueStr}</span></div>
                      <div><div style={{ height:4, background:T.border, borderRadius:2, overflow:'hidden' }}><div style={{ width:`${p.progress}%`, height:'100%', background:T.primary, borderRadius:2 }} /></div><p style={{ fontSize:9, color:T.textMuted, marginTop:4, textAlign:'right' }}>{p.progress}%</p></div>
                    </div>
                  ))}
                  {colProjects.length===0 && <div style={{ textAlign:'center', padding:24, color:T.textMuted, fontSize:11 }}>No projects</div>}
                </div>
              </div>
            )
          })}
        </div>
      )}
    </div>
  )
}

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  if (selectedProject) return <ProjectDetail project={selectedProject} onBack={() => setSelectedProject(null)} />
  return <AllProjectsView onSelectProject={setSelectedProject} />
}
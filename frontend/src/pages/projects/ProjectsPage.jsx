import { useState } from 'react'
import {
   Plus, Search,  MapPin,
  Calendar, Users, ChevronRight,
  CheckSquare,  AlertTriangle, TrendingUp,
  Building2, Camera,  Flag,
  Edit3, ArrowLeft, Phone, Mail, Download,
  LayoutGrid, List, Kanban,
  ZoomIn, X, ChevronLeft, 
  IndianRupee,  Wrench, 
  CloudRain, Sun, 
  CheckCircle2, 
  Upload, Maximize2
} from 'lucide-react'
import { generateProjectReportPDF } from '../../utils/pdfExport'

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
    'on-track':    { label:'On Track',    cls:'bg-green-900/40 text-green-400 border-green-800' },
    'at-risk':     { label:'At Risk',     cls:'bg-amber-900/40 text-amber-400 border-amber-800' },
    'delayed':     { label:'Delayed',     cls:'bg-red-900/40   text-red-400   border-red-800'   },
    'completed':   { label:'Completed',   cls:'bg-blue-900/40  text-blue-400  border-blue-800'  },
    'in-progress': { label:'In Progress', cls:'bg-blue-900/40  text-blue-400  border-blue-800'  },
    'pending':     { label:'Pending',     cls:'bg-slate-800    text-slate-400 border-slate-700' },
    'blocked':     { label:'Blocked',     cls:'bg-red-900/40   text-red-400   border-red-800'   },
    'done':        { label:'Done',        cls:'bg-green-900/40 text-green-400 border-green-800' },
    'open':        { label:'Open',        cls:'bg-red-900/40   text-red-400   border-red-800'   },
    'resolved':    { label:'Resolved',    cls:'bg-green-900/40 text-green-400 border-green-800' },
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
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium ${colors[type] || 'bg-slate-800 text-slate-400'}`}>
      {type}
    </span>
  )
}

const PriorityDot = ({ priority }) => {
  const colors = { high:'bg-red-500', medium:'bg-amber-500', low:'bg-green-500' }
  return <span className={`w-2 h-2 rounded-full shrink-0 ${colors[priority]}`}/>
}

// const MaterialStatus = ({ status }) => {
//   const map = {
//     ok:  { label:'Sufficient',   cls:'bg-green-900/40 text-green-400 border-green-800' },
//     low: { label:'Low Stock',    cls:'bg-amber-900/40 text-amber-400 border-amber-800' },
//     out: { label:'Out of Stock', cls:'bg-red-900/40   text-red-400   border-red-800'   },
//   }
//   const { label, cls } = map[status] || map.ok
//   return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>{label}</span>
// }

// ── Photo Lightbox ─────────────────────────────────────────
function PhotoLightbox({ photos, initialIndex, onClose }) {
  const [current, setCurrent] = useState(initialIndex)

  const prev = () => setCurrent(i => (i - 1 + photos.length) % photos.length)
  const next = () => setCurrent(i => (i + 1) % photos.length)

  const photo = photos[current]

  return (
    <div
      className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
      onClick={onClose}
    >
      <div className="relative max-w-4xl w-full mx-4" onClick={e => e.stopPropagation()}>

        {/* Close */}
        <button
          onClick={onClose}
          className="absolute -top-12 right-0 text-white/60 hover:text-white transition"
        >
          <X size={24}/>
        </button>

        {/* Image */}
        <div className="relative rounded-2xl overflow-hidden bg-slate-900">
          <img
            src={photo.url}
            alt={photo.caption}
            className="w-full max-h-[70vh] object-cover"
          />

          {/* Caption overlay */}
          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4">
            <p className="text-white font-medium text-sm">{photo.caption}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-white/60 text-xs">{photo.date}</span>
              <span className="text-white/60 text-xs">·</span>
              <span className="text-white/60 text-xs">{photo.category}</span>
              <span className="text-white/60 text-xs">·</span>
              <span className="text-white/60 text-xs">by {photo.uploader}</span>
            </div>
          </div>

          {/* Nav arrows */}
          <button
            onClick={prev}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition"
          >
            <ChevronLeft size={20}/>
          </button>
          <button
            onClick={next}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 hover:bg-black/70 flex items-center justify-center text-white transition"
          >
            <ChevronRight size={20}/>
          </button>
        </div>

        {/* Thumbnails */}
        <div className="flex gap-2 mt-3 overflow-x-auto pb-1">
          {photos.map((p, i) => (
            <button
              key={p.id}
              onClick={() => setCurrent(i)}
              className={`shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition ${
                i === current ? 'border-blue-500' : 'border-transparent opacity-50 hover:opacity-80'
              }`}
            >
              <img src={p.url} alt="" className="w-full h-full object-cover"/>
            </button>
          ))}
        </div>

        {/* Counter */}
        <p className="text-center text-white/40 text-xs mt-2">
          {current + 1} / {photos.length}
        </p>
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
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-12 text-center">
        <Camera size={40} className="text-slate-600 mx-auto mb-3"/>
        <p className="text-slate-400 font-medium">No photos yet</p>
        <p className="text-slate-600 text-sm mt-1">Site supervisor can upload photos from the site module</p>
        <button className="mt-4 text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 mx-auto">
          <Upload size={13}/> Upload Photos
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-4">

      {/* Category Filter + Upload */}
      <div className="flex items-center justify-between flex-wrap gap-3">
        <div className="flex gap-2 flex-wrap">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                activeCategory === cat
                  ? 'bg-blue-600 text-white'
                  : 'bg-slate-800 text-slate-400 border border-slate-700 hover:text-white'
              }`}
            >
              {cat} {cat === 'All' ? `(${photos.length})` : `(${photos.filter(p=>p.category===cat).length})`}
            </button>
          ))}
        </div>
        <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
          <Upload size={13}/> Upload
        </button>
      </div>

      {/* Featured photo (large) */}
      {filtered.length > 0 && (
        <div
          className="relative rounded-2xl overflow-hidden cursor-pointer group h-72"
          onClick={() => setLightboxIndex(photos.indexOf(filtered[0]))}
        >
          <img
            src={filtered[0].url}
            alt={filtered[0].caption}
            className="w-full h-full object-cover transition duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent"/>
          <div className="absolute bottom-0 left-0 right-0 p-4">
            <p className="text-white font-semibold">{filtered[0].caption}</p>
            <div className="flex items-center gap-3 mt-1">
              <span className="text-white/60 text-xs">{filtered[0].date}</span>
              <span className="text-white/60 text-xs">by {filtered[0].uploader}</span>
            </div>
          </div>
          <div className="absolute top-3 right-3 bg-black/50 rounded-lg p-1.5 opacity-0 group-hover:opacity-100 transition">
            <Maximize2 size={16} className="text-white"/>
          </div>
          <div className="absolute top-3 left-3">
            <span className="bg-blue-600 text-white text-xs px-2 py-1 rounded-lg font-medium">
              {filtered[0].category}
            </span>
          </div>
        </div>
      )}

      {/* Grid */}
      {filtered.length > 1 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.slice(1).map((photo) => (
            <div
              key={photo.id}
              className="relative rounded-xl overflow-hidden cursor-pointer group aspect-square"
              onClick={() => setLightboxIndex(photos.indexOf(photo))}
            >
              <img
                src={photo.url}
                alt={photo.caption}
                className="w-full h-full object-cover transition duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition"/>
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition">
                <ZoomIn size={20} className="text-white"/>
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-2 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition">
                <p className="text-white text-xs truncate">{photo.caption}</p>
              </div>
              <div className="absolute top-2 left-2">
                <span className="bg-black/50 text-white text-xs px-1.5 py-0.5 rounded font-medium">
                  {photo.category}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <PhotoLightbox
          photos={photos}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </div>
  )
}

// ── Project Financial Summary ──────────────────────────────
function ProjectFinancials({ project }) {
  const collectionRate = Math.round((project.received / project.invoiced) * 100)
  const profitMargin   = Math.round((project.profit   / project.value)    * 100)
  const spentPct       = Math.round((project.expenses / project.value)    * 100)

  return (
    <div className="space-y-4">

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {[
          { label:'Contract Value', value:formatINR(project.value),    sub:'Total contract',          color:'bg-blue-600'   },
          { label:'Invoiced',       value:formatINR(project.invoiced), sub:`${Math.round((project.invoiced/project.value)*100)}% of contract`, color:'bg-purple-600' },
          { label:'Received',       value:formatINR(project.received), sub:`${collectionRate}% collected`, color:'bg-green-600' },
          { label:'Net Profit',     value:formatINR(project.profit),   sub:`${profitMargin}% margin`,     color:'bg-amber-600' },
        ].map((k,i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
            <div className={`w-8 h-8 rounded-lg ${k.color} flex items-center justify-center mb-2`}>
              <IndianRupee size={15} className="text-white"/>
            </div>
            <p className="text-lg font-bold text-white">{k.value}</p>
            <p className="text-xs text-slate-400 mt-0.5">{k.label}</p>
            <p className="text-xs text-slate-600 mt-0.5">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Progress Bars */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-sm font-semibold text-white mb-4">Financial Progress</h3>
        <div className="space-y-4">
          {[
            { label:'Amount Invoiced',  value:project.invoiced, total:project.value, color:'bg-blue-500',   pct:Math.round((project.invoiced/project.value)*100)   },
            { label:'Amount Received',  value:project.received, total:project.value, color:'bg-green-500',  pct:Math.round((project.received/project.value)*100)   },
            { label:'Amount Spent',     value:project.expenses, total:project.value, color:'bg-amber-500',  pct:spentPct                                           },
          ].map((bar,i) => (
            <div key={i}>
              <div className="flex justify-between text-xs mb-1.5">
                <span className="text-slate-400">{bar.label}</span>
                <span className="text-white font-medium">{formatINR(bar.value)} <span className="text-slate-500">({bar.pct}%)</span></span>
              </div>
              <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                <div className={`h-full rounded-full ${bar.color} transition-all`} style={{ width:`${bar.pct}%` }}/>
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
    <div className="space-y-6 animate-fade-in">

      {/* ── Hero Banner ── */}
      <div className="relative rounded-2xl overflow-hidden">
        {sitePhotos[project.id]?.[0] ? (
          <img
            src={sitePhotos[project.id][0].url}
            alt={project.name}
            className="w-full h-52 object-cover"
          />
        ) : (
          <div className="w-full h-52 bg-gradient-to-r from-blue-900 to-purple-900"/>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent"/>

        {/* Back button */}
        <button
          onClick={onBack}
          className="absolute top-4 left-4 flex items-center gap-1.5 bg-black/40 hover:bg-black/60 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm transition"
        >
          <ArrowLeft size={14}/> All Projects
        </button>

        {/* Action buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <button
            onClick={() => generateProjectReportPDF(project)}
            className="flex items-center gap-1.5 bg-green-600/80 hover:bg-green-600 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm transition"
          >
            <Download size={13}/> Export PDF
          </button>
          <button className="flex items-center gap-1.5 bg-black/40 hover:bg-black/60 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm transition">
            <Edit3 size={13}/> Edit
          </button>
          <button className="flex items-center gap-1.5 bg-blue-600/80 hover:bg-blue-600 text-white text-xs px-3 py-2 rounded-lg backdrop-blur-sm transition">
            <Camera size={13}/> DPR
          </button>
        </div>

        {/* Project title overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-5">
          <div className="flex items-end justify-between flex-wrap gap-3">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <TypeBadge type={project.type}/>
                <StatusBadge status={project.status}/>
              </div>
              <h1 className="text-2xl font-bold text-white">{project.name}</h1>
              <div className="flex items-center gap-4 mt-1 flex-wrap">
                <span className="text-white/60 text-xs flex items-center gap-1">
                  <Building2 size={11}/> {project.client}
                </span>
                <span className="text-white/60 text-xs flex items-center gap-1">
                  <MapPin size={11}/> {project.site}
                </span>
                <span className="text-white/60 text-xs flex items-center gap-1">
                  <Calendar size={11}/> {project.startDate} → {project.endDate}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-2xl font-bold text-white">{project.valueStr}</p>
              <p className="text-white/40 text-xs">Contract Value</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Quick Stats Row ── */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {[
          { label:'Progress',    value:`${project.progress}%`,              icon:TrendingUp,    color:'text-blue-400'   },
          { label:'Tasks Done',  value:`${doneTasks}/${project.tasks.length}`,icon:CheckSquare, color:'text-green-400'  },
          { label:'Milestones',  value:`${doneMilestones}/${project.milestones.length}`,icon:Flag, color:'text-purple-400'},
          { label:'Team',        value:`${project.team} workers`,            icon:Users,         color:'text-teal-400'   },
          { label:'Open Issues', value:`${openIssues} issues`,               icon:AlertTriangle, color:'text-red-400'    },
          { label:'Stage',       value:project.stage,                        icon:Wrench,        color:'text-amber-400'  },
        ].map((s,i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-3 text-center">
            <s.icon size={18} className={`${s.color} mx-auto mb-1`}/>
            <p className={`text-sm font-bold ${s.color}`}>{s.value}</p>
            <p className="text-xs text-slate-500 mt-0.5">{s.label}</p>
          </div>
        ))}
      </div>

      {/* Progress Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
        <div className="flex justify-between text-xs mb-2">
          <span className="text-slate-400">Overall Progress</span>
          <span className="text-white font-bold">{project.progress}%</span>
        </div>
        <div className="h-3 bg-slate-800 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all ${
              project.status === 'delayed'  ? 'bg-gradient-to-r from-red-600   to-red-400'   :
              project.status === 'at-risk'  ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                                              'bg-gradient-to-r from-blue-600  to-indigo-400'
            }`}
            style={{ width:`${project.progress}%` }}
          />
        </div>
      </div>

      {/* ── Tabs ── */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 overflow-x-auto">
        {[
          { id:'overview',   label:'Overview'   },
          { id:'photos',     label:`Photos (${(sitePhotos[project.id]||[]).length})` },
          { id:'financials', label:'Financials' },
          { id:'tasks',      label:`Tasks (${project.tasks.length})` },
          { id:'milestones', label:'Milestones' },
          { id:'team',       label:'Team'       },
          { id:'issues',     label:`Issues (${project.issues.length})` },
          { id:'dpr',        label:'DPR Log'    },
          { id:'documents',  label:'Documents'  },
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-3 py-2 rounded-lg text-xs font-medium transition whitespace-nowrap ${
              activeTab === tab.id ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          {/* Project Info */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Project Information</h2>
            <p className="text-sm text-slate-400 mb-4 leading-relaxed">{project.description}</p>
            <div className="space-y-2.5">
              {[
                { label:'Project ID',       value:project.id          },
                { label:'Type',             value:project.type        },
                { label:'Area',             value:project.area        },
                { label:'Floors',           value:project.floors      },
                { label:'Current Stage',    value:project.stage       },
                { label:'Start Date',       value:project.startDate   },
                { label:'End Date',         value:project.endDate     },
                { label:'Site Location',    value:project.site        },
                { label:'Project Manager',  value:project.manager     },
                { label:'Site Supervisor',  value:project.supervisor  },
              ].map((row,i) => (
                <div key={i} className="flex items-center justify-between text-sm py-1.5 border-b border-slate-800 last:border-0">
                  <span className="text-slate-500 text-xs">{row.label}</span>
                  <span className="text-white font-medium text-xs">{row.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Client + Latest Photo */}
          <div className="space-y-4">
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-white mb-4">Client Details</h2>
              <div className="flex items-center gap-3 mb-4 p-3 bg-slate-800/50 rounded-xl border border-slate-800">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 border border-blue-800 flex items-center justify-center">
                  <Building2 size={22} className="text-blue-400"/>
                </div>
                <div>
                  <p className="text-white font-semibold">{project.client}</p>
                  <p className="text-slate-400 text-xs">{project.clientContact}</p>
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Phone size={14} className="text-slate-600 shrink-0"/>
                  <span className="text-slate-300 text-sm flex-1">{project.clientPhone}</span>
                  <button className="text-xs text-blue-400 hover:text-blue-300">Call</button>
                </div>
                <div className="flex items-center gap-3">
                  <Mail size={14} className="text-slate-600 shrink-0"/>
                  <span className="text-slate-300 text-xs flex-1 truncate">{project.clientEmail}</span>
                  <button className="text-xs text-blue-400 hover:text-blue-300">Email</button>
                </div>
              </div>
            </div>

            {/* Latest site photo preview */}
            {sitePhotos[project.id]?.length > 0 && (
              <div
                className="relative rounded-xl overflow-hidden cursor-pointer group h-36"
                onClick={() => setActiveTab('photos')}
              >
                <img
                  src={sitePhotos[project.id][sitePhotos[project.id].length - 1].url}
                  alt="Latest site photo"
                  className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                />
                <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition"/>
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="text-center text-white">
                    <Camera size={24} className="mx-auto mb-1"/>
                    <p className="text-xs font-medium">View {sitePhotos[project.id].length} site photos</p>
                  </div>
                </div>
              </div>
            )}

            {/* Quick milestones */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <h3 className="text-xs font-semibold text-white mb-3">Milestone Progress</h3>
              <div className="space-y-2">
                {project.milestones.map((m,i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center shrink-0 ${
                      m.done ? 'border-green-500 bg-green-500' : 'border-slate-600'
                    }`}>
                      {m.done && <CheckCircle2 size={10} className="text-white"/>}
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

      {/* ── PHOTOS TAB ── */}
      {activeTab === 'photos' && (
        <PhotoGallery projectId={project.id}/>
      )}

      {/* ── FINANCIALS TAB ── */}
      {activeTab === 'financials' && (
        <ProjectFinancials project={project}/>
      )}

      {/* ── TASKS TAB ── */}
      {activeTab === 'tasks' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="flex items-center justify-between px-5 py-4 border-b border-slate-800">
            <h2 className="text-sm font-semibold text-white">Task List</h2>
            <button className="text-xs bg-blue-600/20 text-blue-400 border border-blue-800 px-2 py-1 rounded-lg flex items-center gap-1">
              <Plus size={12}/> Add Task
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth:'550px' }}>
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800">
                  <th className="text-left px-5 py-3 font-medium">Task</th>
                  <th className="text-left px-5 py-3 font-medium">Assignee</th>
                  <th className="text-left px-5 py-3 font-medium">Priority</th>
                  <th className="text-left px-5 py-3 font-medium">Due</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {project.tasks.map(t => (
                  <tr key={t.id} className="hover:bg-slate-800/50 transition">
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <PriorityDot priority={t.priority}/>
                        <span className="text-slate-300 font-medium text-xs">{t.title}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-full bg-slate-700 flex items-center justify-center text-white text-xs font-bold shrink-0">
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
                    <td className="px-5 py-3"><StatusBadge status={t.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── MILESTONES TAB ── */}
      {activeTab === 'milestones' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-sm font-semibold text-white">Project Milestones</h2>
            <button className="text-xs bg-blue-600/20 text-blue-400 border border-blue-800 px-2 py-1 rounded-lg flex items-center gap-1">
              <Plus size={12}/> Add
            </button>
          </div>
          <div className="relative">
            <div className="absolute left-5 top-0 bottom-0 w-0.5 bg-slate-800"/>
            <div className="space-y-4">
              {project.milestones.map((m,i) => (
                <div key={i} className="flex items-start gap-4 relative pl-12">
                  <div className={`absolute left-3 w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 ${
                    m.done ? 'border-green-500 bg-green-500' : 'border-slate-600 bg-slate-900'
                  }`}>
                    {m.done && <span className="text-white text-xs font-bold">✓</span>}
                  </div>
                  <div className={`flex-1 p-4 rounded-xl border ${
                    m.done ? 'border-green-900/40 bg-green-900/10' : 'border-slate-800 bg-slate-800/30'
                  }`}>
                    <div className="flex items-center justify-between">
                      <p className={`text-sm font-semibold ${m.done ? 'text-green-400' : 'text-white'}`}>
                        {m.title}
                      </p>
                      <span className="text-xs text-slate-500 flex items-center gap-1">
                        <Calendar size={11}/> {m.date}
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{m.done ? '✓ Completed' : 'Upcoming'}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ── TEAM TAB ── */}
      {activeTab === 'team' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">
              Team Members — {project.team} total workers
            </h2>
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus size={13}/> Add Member
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {project.team_members.map((m,i) => (
              <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-blue-600/20 border border-blue-800 flex items-center justify-center text-blue-400 font-bold shrink-0">
                  {m.name.charAt(0)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-white truncate">{m.name}</p>
                  <p className="text-xs text-slate-500">{m.role}</p>
                  <p className="text-xs text-slate-600 mt-0.5">{m.phone}</p>
                </div>
                <button className="text-slate-500 hover:text-blue-400 transition shrink-0">
                  <Phone size={14}/>
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ISSUES TAB ── */}
      {activeTab === 'issues' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Site Issues</h2>
            <button className="text-xs bg-red-600/20 text-red-400 border border-red-800 px-2 py-1 rounded-lg flex items-center gap-1">
              <Plus size={12}/> Raise Issue
            </button>
          </div>
          {project.issues.map(iss => (
            <div key={iss.id} className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex items-start gap-3">
              <div className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                iss.priority === 'high' ? 'bg-red-500' : iss.priority === 'medium' ? 'bg-amber-500' : 'bg-slate-500'
              }`}/>
              <div className="flex-1">
                <p className="text-sm text-white font-medium">{iss.desc}</p>
                <p className="text-xs text-slate-500 mt-0.5">{iss.id} · Raised {iss.date}</p>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                <span className={`text-xs font-medium capitalize ${
                  iss.priority === 'high' ? 'text-red-400' : iss.priority === 'medium' ? 'text-amber-400' : 'text-slate-400'
                }`}>{iss.priority}</span>
                <StatusBadge status={iss.status}/>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── DPR LOG TAB ── */}
      {activeTab === 'dpr' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Daily Progress Reports</h2>
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus size={13}/> New DPR
            </button>
          </div>
          {project.dprs.map((dpr,i) => (
            <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-4">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <p className="text-sm font-semibold text-white">{dpr.date}</p>
                  <p className="text-xs text-slate-400 mt-0.5">{dpr.work}</p>
                </div>
                <div className="flex items-center gap-1.5 text-xs text-slate-500">
                  {dpr.weather === 'Rain' ? <CloudRain size={13}/> : <Sun size={13}/>}
                  {dpr.weather}
                </div>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                  <p className="text-sm font-bold text-white">{dpr.workers}</p>
                  <p className="text-xs text-slate-500">Workers</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                  <p className={`text-sm font-bold ${dpr.issues > 0 ? 'text-red-400' : 'text-green-400'}`}>
                    {dpr.issues}
                  </p>
                  <p className="text-xs text-slate-500">Issues</p>
                </div>
                <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                  <p className="text-sm font-bold text-blue-400">View</p>
                  <p className="text-xs text-slate-500">Full DPR</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── DOCUMENTS TAB ── */}
      {activeTab === 'documents' && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Project Documents</h2>
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Upload size={13}/> Upload
            </button>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
            {project.documents.map((doc,i) => {
              const typeColors = {
                PDF:'text-red-400   bg-red-900/30',
                DWG:'text-blue-400  bg-blue-900/30',
                XLS:'text-green-400 bg-green-900/30',
                ZIP:'text-amber-400 bg-amber-900/30',
              }
              return (
                <div key={i} className="flex items-center gap-4 p-4 bg-slate-900 border border-slate-800 rounded-xl hover:border-slate-700 transition cursor-pointer">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${typeColors[doc.type] || 'text-slate-400 bg-slate-800'}`}>
                    {doc.type}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{doc.name}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{doc.date} · {doc.size}</p>
                  </div>
                  <button className="text-slate-500 hover:text-blue-400 transition shrink-0">
                    <Download size={16}/>
                  </button>
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
    .filter(p => {
      const matchSearch = p.name.toLowerCase().includes(search.toLowerCase()) ||
                          p.client.toLowerCase().includes(search.toLowerCase())
      const matchType   = typeFilter   === 'All' || p.type   === typeFilter
      const matchStatus = statusFilter === 'All' || p.status === statusFilter
      return matchSearch && matchType && matchStatus
    })
    .sort((a,b) => {
      if (sortBy === 'name')     return a.name.localeCompare(b.name)
      if (sortBy === 'progress') return b.progress - a.progress
      if (sortBy === 'value')    return b.value - a.value
      return 0
    })

  // Summary stats
  const totalValue   = projects.reduce((s,p) => s + p.value, 0)
  const onTrack      = projects.filter(p => p.status === 'on-track').length
  const atRisk       = projects.filter(p => p.status === 'at-risk').length
  // const delayed      = projects.filter(p => p.status === 'delayed').length
  const avgProgress  = Math.round(projects.reduce((s,p) => s + p.progress, 0) / projects.length)

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">All Projects</h1>
          <p className="text-slate-400 text-sm mt-0.5">{projects.length} projects · {formatINR(totalValue)} total value</p>
        </div>
        <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
          <Plus size={14}/> New Project
        </button>
      </div>

      {/* Summary Banner */}
      <div className="bg-gradient-to-r from-blue-900/40 via-purple-900/30 to-slate-900/40 border border-blue-800/40 rounded-2xl p-5">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {[
            { label:'Total Projects', value:projects.length,        color:'text-white'        },
            { label:'Total Value',    value:formatINR(totalValue),   color:'text-blue-300'     },
            { label:'On Track',       value:onTrack,                 color:'text-green-400'    },
            { label:'At Risk',        value:atRisk,                  color:'text-amber-400'    },
            { label:'Avg Progress',   value:`${avgProgress}%`,       color:'text-purple-400'   },
          ].map((s,i) => (
            <div key={i} className="text-center">
              <p className={`text-2xl font-bold ${s.color}`}>{s.value}</p>
              <p className="text-xs text-slate-400 mt-0.5">{s.label}</p>
            </div>
          ))}
        </div>

        {/* Overall progress bar */}
        <div className="mt-4">
          <div className="flex justify-between text-xs mb-1.5">
            <span className="text-slate-400">Portfolio Average Progress</span>
            <span className="text-white font-bold">{avgProgress}%</span>
          </div>
          <div className="h-2 bg-slate-800/60 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-500 transition-all"
              style={{ width:`${avgProgress}%` }}
            />
          </div>
        </div>
      </div>

      {/* Filters + View Toggle */}
      <div className="flex flex-wrap items-center gap-3">

        {/* Search */}
        <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 flex-1 min-w-[200px] max-w-sm">
          <Search size={14} className="text-slate-500 shrink-0"/>
          <input
            value={search}
            onChange={e => setSearch(e.target.value)}
            placeholder="Search projects or clients..."
            className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"
          />
        </div>

        {/* Type Filter */}
        <div className="flex gap-1.5 flex-wrap">
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

        {/* Status Filter */}
        <select
          value={statusFilter}
          onChange={e => setStatusFilter(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-slate-400 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500"
        >
          {statuses.map(s => (
            <option key={s} value={s}>{s === 'All' ? 'All Status' : s.replace('-',' ').replace(/\b\w/g, l => l.toUpperCase())}</option>
          ))}
        </select>

        {/* Sort */}
        <select
          value={sortBy}
          onChange={e => setSortBy(e.target.value)}
          className="bg-slate-900 border border-slate-800 text-slate-400 rounded-lg px-3 py-1.5 text-xs focus:outline-none focus:border-blue-500"
        >
          <option value="name">Sort: Name</option>
          <option value="progress">Sort: Progress</option>
          <option value="value">Sort: Value</option>
        </select>

        {/* View Mode */}
        <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-lg p-1 ml-auto">
          {[
            { id:'grid', icon:LayoutGrid },
            { id:'list', icon:List       },
            { id:'kanban', icon:Kanban   },
          ].map(v => (
            <button
              key={v.id}
              onClick={() => setViewMode(v.id)}
              className={`p-1.5 rounded transition ${
                viewMode === v.id ? 'bg-blue-600 text-white' : 'text-slate-500 hover:text-white'
              }`}
            >
              <v.icon size={15}/>
            </button>
          ))}
        </div>
      </div>

      {/* ── GRID VIEW ── */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
          {filtered.map(p => (
            <div
              key={p.id}
              onClick={() => onSelectProject(p)}
              className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-slate-600 transition cursor-pointer group"
            >
              {/* Photo thumbnail */}
              <div className="relative h-36 overflow-hidden">
                {sitePhotos[p.id]?.[0] ? (
                  <img
                    src={sitePhotos[p.id][0].url}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
                  />
                ) : (
                  <div className="w-full h-full bg-gradient-to-br from-blue-900 to-purple-900 flex items-center justify-center">
                    <Building2 size={32} className="text-white/30"/>
                  </div>
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent"/>

                {/* Status badge on photo */}
                <div className="absolute top-3 left-3">
                  <StatusBadge status={p.status}/>
                </div>
                <div className="absolute top-3 right-3">
                  <TypeBadge type={p.type}/>
                </div>

                {/* Photo count */}
                {sitePhotos[p.id]?.length > 0 && (
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 bg-black/50 text-white text-xs px-2 py-0.5 rounded-full">
                    <Camera size={10}/> {sitePhotos[p.id].length}
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="text-sm font-semibold text-white group-hover:text-blue-400 transition mb-0.5 truncate">
                  {p.name}
                </h3>
                <p className="text-xs text-slate-500 mb-3">{p.client}</p>

                {/* Progress */}
                <div className="mb-3">
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-500">Progress</span>
                    <span className="text-white font-medium">{p.progress}%</span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${
                        p.status === 'delayed'  ? 'bg-gradient-to-r from-red-600   to-red-400'   :
                        p.status === 'at-risk'  ? 'bg-gradient-to-r from-amber-600 to-amber-400' :
                                                  'bg-gradient-to-r from-blue-600  to-indigo-400'
                      }`}
                      style={{ width:`${p.progress}%` }}
                    />
                  </div>
                </div>

                {/* Meta */}
                <div className="grid grid-cols-2 gap-y-1.5 mb-3">
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <MapPin size={10} className="text-slate-600"/> {p.site.split(',')[0]}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Calendar size={10} className="text-slate-600"/> {p.endDate}
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <Users size={10} className="text-slate-600"/> {p.team} workers
                  </span>
                  <span className="text-xs text-slate-500 flex items-center gap-1">
                    <CheckSquare size={10} className="text-slate-600"/>
                    {p.tasks.filter(t => t.status==='done').length}/{p.tasks.length} tasks
                  </span>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <span className="text-sm font-bold text-white">{p.valueStr}</span>
                  <ChevronRight size={16} className="text-slate-600 group-hover:text-blue-400 transition"/>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* ── LIST VIEW ── */}
      {viewMode === 'list' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm" style={{ minWidth:'800px' }}>
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800 bg-slate-900/50">
                  <th className="text-left px-5 py-3 font-medium">Project</th>
                  <th className="text-left px-5 py-3 font-medium">Client</th>
                  <th className="text-left px-5 py-3 font-medium">Type</th>
                  <th className="text-left px-5 py-3 font-medium">Value</th>
                  <th className="text-left px-5 py-3 font-medium">Progress</th>
                  <th className="text-left px-5 py-3 font-medium">Team</th>
                  <th className="text-left px-5 py-3 font-medium">Deadline</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filtered.map(p => (
                  <tr
                    key={p.id}
                    onClick={() => onSelectProject(p)}
                    className="hover:bg-slate-800/50 transition cursor-pointer"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        {sitePhotos[p.id]?.[0] ? (
                          <img
                            src={sitePhotos[p.id][0].url}
                            alt=""
                            className="w-9 h-9 rounded-lg object-cover shrink-0"
                          />
                        ) : (
                          <div className="w-9 h-9 rounded-lg bg-slate-800 flex items-center justify-center shrink-0">
                            <Building2 size={16} className="text-slate-500"/>
                          </div>
                        )}
                        <div>
                          <p className="text-sm font-medium text-white">{p.name}</p>
                          <p className="text-xs text-slate-500">{p.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{p.client}</td>
                    <td className="px-5 py-3"><TypeBadge type={p.type}/></td>
                    <td className="px-5 py-3 text-white font-medium">{p.valueStr}</td>
                    <td className="px-5 py-3 w-36">
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className={`h-full rounded-full ${
                              p.status === 'delayed' ? 'bg-red-500' : p.status === 'at-risk' ? 'bg-amber-500' : 'bg-blue-500'
                            }`}
                            style={{ width:`${p.progress}%` }}
                          />
                        </div>
                        <span className="text-xs text-slate-500 w-8 shrink-0">{p.progress}%</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{p.team}</td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{p.endDate}</td>
                    <td className="px-5 py-3"><StatusBadge status={p.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── KANBAN VIEW ── */}
      {viewMode === 'kanban' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { status:'on-track', label:'On Track',  color:'text-green-400', bg:'bg-green-900/10 border-green-900/30' },
            { status:'at-risk',  label:'At Risk',   color:'text-amber-400', bg:'bg-amber-900/10 border-amber-900/30' },
            { status:'delayed',  label:'Delayed',   color:'text-red-400',   bg:'bg-red-900/10   border-red-900/30'   },
            { status:'completed',label:'Completed', color:'text-blue-400',  bg:'bg-blue-900/10  border-blue-900/30'  },
          ].map(col => {
            const colProjects = filtered.filter(p => p.status === col.status)
            return (
              <div key={col.status} className={`border rounded-2xl p-3 ${col.bg}`}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className={`text-xs font-semibold ${col.color}`}>{col.label}</h3>
                  <span className={`text-xs px-2 py-0.5 rounded-full font-bold ${col.color} bg-current/10`}>
                    {colProjects.length}
                  </span>
                </div>
                <div className="space-y-2">
                  {colProjects.map(p => (
                    <div
                      key={p.id}
                      onClick={() => onSelectProject(p)}
                      className="bg-slate-900 border border-slate-800 rounded-xl p-3 cursor-pointer hover:border-slate-600 transition"
                    >
                      {sitePhotos[p.id]?.[0] && (
                        <img
                          src={sitePhotos[p.id][0].url}
                          alt=""
                          className="w-full h-20 object-cover rounded-lg mb-2"
                        />
                      )}
                      <p className="text-xs font-semibold text-white mb-1">{p.name}</p>
                      <p className="text-xs text-slate-500 mb-2">{p.client}</p>
                      <div className="flex items-center justify-between">
                        <TypeBadge type={p.type}/>
                        <span className="text-xs text-white font-medium">{p.valueStr}</span>
                      </div>
                      <div className="mt-2">
                        <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-blue-500"
                            style={{ width:`${p.progress}%` }}
                          />
                        </div>
                        <p className="text-xs text-slate-600 mt-1 text-right">{p.progress}%</p>
                      </div>
                    </div>
                  ))}
                  {colProjects.length === 0 && (
                    <div className="text-center py-6 text-slate-600 text-xs">
                      No projects
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>
      )}

    </div>
  )
}

// ── Main Export ────────────────────────────────────────────
export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState(null)
  // const [view,            setView]            = useState('all')

  if (selectedProject) {
    return (
      <ProjectDetail
        project={selectedProject}
        onBack={() => setSelectedProject(null)}
      />
    )
  }

  return (
    <AllProjectsView onSelectProject={setSelectedProject}/>
  )
}
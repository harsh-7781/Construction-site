import { useState } from 'react'
import {
  FileSignature, Plus, Search, Filter, Download,
  Eye, Edit3, Send, Copy,  CheckCircle2,
  AlertCircle, XCircle, ArrowLeft, Save,
  Building2, User, Calendar, Hash, Shield,
  ChevronRight, FileText, Pen, Check,
  IndianRupee, MapPin, 
  BookOpen, Lock, Unlock
} from 'lucide-react'

// ── Mock Data ──────────────────────────────────────────────
const contracts = [
  {
    id: 'CON-1021',
    title: 'Civil Construction Agreement',
    client: 'Oberoi Group',
    clientContact: 'Vikas Oberoi',
    project: 'Oberoi Residency Tower',
    type: 'Turnkey',
    value: '₹2.4 Cr',
    startDate: '01 Mar 2025',
    endDate: '15 Dec 2025',
    signedDate: '25 Feb 2025',
    status: 'active',
    signed: true,
    service: 'Civil',
    paymentTerms: '30-40-30',
    clauses: 18,
    site: 'Worli, Mumbai',
  },
  {
    id: 'CON-1020',
    title: 'Interior Fit-out Contract',
    client: 'Kohinoor Infra',
    clientContact: 'Suresh Kohinoor',
    project: 'Kohinoor Mall Interior',
    type: 'Labour + Material',
    value: '₹85 L',
    startDate: '01 May 2025',
    endDate: '30 Sep 2025',
    signedDate: '28 Apr 2025',
    status: 'active',
    signed: true,
    service: 'Interior',
    paymentTerms: '40-30-30',
    clauses: 14,
    site: 'Dadar, Mumbai',
  },
  {
    id: 'CON-1019',
    title: 'MEP Works Agreement',
    client: 'Raheja Corp',
    clientContact: 'Rahul Raheja',
    project: 'Tech Park MEP Works',
    type: 'Labour Only',
    value: '₹1.1 Cr',
    startDate: '15 Jan 2025',
    endDate: '20 Aug 2025',
    signedDate: '10 Jan 2025',
    status: 'expiring',
    signed: true,
    service: 'MEP',
    paymentTerms: '20-40-40',
    clauses: 16,
    site: 'Powai, Mumbai',
  },
  {
    id: 'CON-1018',
    title: 'Commercial Fit-out Contract',
    client: 'Lodha Group',
    clientContact: 'Abhishek Lodha',
    project: 'Lodha Commercial Fit-out',
    type: 'Turnkey',
    value: '₹1.8 Cr',
    startDate: '01 Aug 2025',
    endDate: '28 Feb 2026',
    signedDate: null,
    status: 'draft',
    signed: false,
    service: 'Interior',
    paymentTerms: '30-40-30',
    clauses: 15,
    site: 'Lower Parel, Mumbai',
  },
  {
    id: 'CON-1017',
    title: 'Renovation Agreement',
    client: 'Private Client',
    clientContact: 'Boman Irani',
    project: 'Villa Renovation Bandra',
    type: 'Labour + Material',
    value: '₹38 L',
    startDate: '01 Jun 2025',
    endDate: '10 Oct 2025',
    signedDate: '28 May 2025',
    status: 'active',
    signed: true,
    service: 'Renovation',
    paymentTerms: '50-30-20',
    clauses: 12,
    site: 'Bandra, Mumbai',
  },
  {
    id: 'CON-1016',
    title: 'Structural Audit Contract',
    client: 'MIDC',
    clientContact: 'Govt. Officer',
    project: 'Structural Audit SEEPZ',
    type: 'Consultancy',
    value: '₹62 L',
    startDate: '01 Feb 2025',
    endDate: '30 Jun 2025',
    signedDate: '28 Jan 2025',
    status: 'completed',
    signed: true,
    service: 'Structural',
    paymentTerms: '50-50',
    clauses: 10,
    site: 'SEEPZ, Mumbai',
  },
]

const contractTemplates = [
  {
    id: 'TPL-01',
    name: 'Turnkey Construction Agreement',
    service: 'Civil',
    clauses: 20,
    desc: 'Complete design to delivery contract with milestone-based payments and penalty clauses.',
    lastUsed: '28 Jul 2025',
    uses: 12,
  },
  {
    id: 'TPL-02',
    name: 'Interior Fit-out Contract',
    service: 'Interior',
    clauses: 15,
    desc: 'Labour + material contract for interior works with quality standards and defect liability.',
    lastUsed: '20 Jul 2025',
    uses: 8,
  },
  {
    id: 'TPL-03',
    name: 'MEP Works Agreement',
    service: 'MEP',
    clauses: 18,
    desc: 'Mechanical, electrical and plumbing works contract with testing & commissioning clauses.',
    lastUsed: '10 Jan 2025',
    uses: 5,
  },
  {
    id: 'TPL-04',
    name: 'Labour Only Contract',
    service: 'General',
    clauses: 10,
    desc: 'Simple labour contract with attendance, wages and safety compliance terms.',
    lastUsed: '15 Jul 2025',
    uses: 18,
  },
  {
    id: 'TPL-05',
    name: 'Consultancy Agreement',
    service: 'Structural',
    clauses: 12,
    desc: 'Design and advisory services contract with deliverables and IP ownership clauses.',
    lastUsed: '28 Jan 2025',
    uses: 4,
  },
  {
    id: 'TPL-06',
    name: 'Renovation Contract',
    service: 'Renovation',
    clauses: 14,
    desc: 'Residential or commercial renovation with scope definition and change order management.',
    lastUsed: '28 May 2025',
    uses: 7,
  },
]

const standardClauses = [
  { id:1,  category:'Scope',      title:'Scope of Work',              required:true,  included:true  },
  { id:2,  category:'Payment',    title:'Payment Terms & Schedule',    required:true,  included:true  },
  { id:3,  category:'Timeline',   title:'Project Timeline & Milestones',required:true, included:true  },
  { id:4,  category:'Quality',    title:'Quality Standards & Testing', required:true,  included:true  },
  { id:5,  category:'Safety',     title:'Health & Safety Compliance',  required:true,  included:true  },
  { id:6,  category:'Material',   title:'Material Supply Responsibility',required:false,included:true  },
  { id:7,  category:'Changes',    title:'Variation & Change Orders',   required:false, included:true  },
  { id:8,  category:'Penalty',    title:'Delay Penalty Clause',        required:false, included:true  },
  { id:9,  category:'Defect',     title:'Defect Liability Period',     required:false, included:true  },
  { id:10, category:'Insurance',  title:'Insurance & Indemnity',       required:false, included:false },
  { id:11, category:'Dispute',    title:'Dispute Resolution',          required:false, included:false },
  { id:12, category:'Termination',title:'Termination Conditions',      required:false, included:false },
]

const clients = [
  'Oberoi Group','Raheja Corp','Lodha Group',
  'Godrej Properties','Kohinoor Infra','Kalpataru Ltd','MIDC'
]

// ── Helpers ────────────────────────────────────────────────
const StatusBadge = ({ status }) => {
  const map = {
    active:    { label:'Active',    cls:'bg-green-900/40 text-green-400 border-green-800', icon:<CheckCircle2 size={11}/> },
    draft:     { label:'Draft',     cls:'bg-slate-800    text-slate-400 border-slate-700', icon:<Edit3        size={11}/> },
    expiring:  { label:'Expiring',  cls:'bg-amber-900/40 text-amber-400 border-amber-800', icon:<AlertCircle  size={11}/> },
    completed: { label:'Completed', cls:'bg-blue-900/40  text-blue-400  border-blue-800',  icon:<CheckCircle2 size={11}/> },
    terminated:{ label:'Terminated',cls:'bg-red-900/40   text-red-400   border-red-800',   icon:<XCircle      size={11}/> },
  }
  const { label, cls, icon } = map[status] || map.draft
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 w-fit ${cls}`}>
      {icon}{label}
    </span>
  )
}

const ServiceTag = ({ service }) => {
  const colors = {
    Civil:      'bg-blue-900/40   text-blue-400',
    Interior:   'bg-purple-900/40 text-purple-400',
    MEP:        'bg-teal-900/40   text-teal-400',
    Renovation: 'bg-amber-900/40  text-amber-400',
    Structural: 'bg-orange-900/40 text-orange-400',
    General:    'bg-slate-800     text-slate-400',
  }
  return (
    <span className={`text-xs px-2 py-0.5 rounded font-medium ${colors[service] || 'bg-slate-800 text-slate-400'}`}>
      {service}
    </span>
  )
}

// ── Contract Builder ───────────────────────────────────────
function ContractBuilder({ template, onBack }) {
  const [step,         setStep]         = useState(1)
  const [client,       setClient]       = useState('Lodha Group')
  const [project,      setProject]      = useState('')
  const [contractType, setContractType] = useState(template?.service || 'Turnkey')
  const [value,        setValue]        = useState('')
  const [startDate,    setStartDate]    = useState('')
  const [endDate,      setEndDate]      = useState('')
  const [payTerms,     setPayTerms]     = useState('30-40-30')
  const [penalty,      setPenalty]      = useState('0.5')
  const [dpl,          setDpl]          = useState('12')
  const [clauses,      setClauses]      = useState(standardClauses)
  const [signed,       setSigned]       = useState(false)

  const toggleClause = (id) => {
    setClauses(clauses.map(c =>
      c.id === id && !c.required ? { ...c, included: !c.included } : c
    ))
  }

  const includedClauses = clauses.filter(c => c.included)

  const steps = [
    { n:1, label:'Parties'   },
    { n:2, label:'Terms'     },
    { n:3, label:'Clauses'   },
    { n:4, label:'Review'    },
    { n:5, label:'Signature' },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <button onClick={onBack} className="text-xs text-slate-500 hover:text-slate-300 mb-2 flex items-center gap-1">
            <ArrowLeft size={12}/> Back to contracts
          </button>
          <h1 className="text-xl font-bold text-white">
            {template ? `New Contract — ${template.name}` : 'New Contract'}
          </h1>
        </div>
        <div className="flex gap-2">
          <button className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1">
            <Save size={13}/> Save Draft
          </button>
          <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
            <Download size={13}/> Download PDF
          </button>
        </div>
      </div>

      {/* Step Indicator */}
      <div className="flex items-center gap-0">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center flex-1">
            <button
              onClick={() => setStep(s.n)}
              className="flex flex-col items-center gap-1 flex-1"
            >
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${
                step === s.n
                  ? 'bg-blue-600 text-white'
                  : step > s.n
                  ? 'bg-green-600 text-white'
                  : 'bg-slate-800 text-slate-500 border border-slate-700'
              }`}>
                {step > s.n ? <Check size={14}/> : s.n}
              </div>
              <span className={`text-xs ${step === s.n ? 'text-blue-400' : 'text-slate-500'}`}>
                {s.label}
              </span>
            </button>
            {i < steps.length - 1 && (
              <div className={`h-0.5 flex-1 mx-1 mb-5 ${step > s.n ? 'bg-green-600' : 'bg-slate-800'}`}/>
            )}
          </div>
        ))}
      </div>

      {/* ── STEP 1: PARTIES ── */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Our Company */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Building2 size={15} className="text-blue-400"/> Party A — Our Company
            </h2>
            <div className="space-y-3">
              {[
                { label:'Company Name', value:'ConstructOS Pvt Ltd',           readOnly:true  },
                { label:'GSTIN',        value:'27AABCU9603R1ZX',               readOnly:true  },
                { label:'Address',      value:'Office 402, BKC, Mumbai 400051',readOnly:true  },
                { label:'Represented By',value:'Rajesh Mehta (CEO)',           readOnly:true  },
              ].map((f,i) => (
                <div key={i}>
                  <label className="block text-xs text-slate-500 mb-1">{f.label}</label>
                  <p className="text-sm text-slate-300 bg-slate-800/50 px-3 py-2 rounded-lg border border-slate-800">
                    {f.value}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Client */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <User size={15} className="text-purple-400"/> Party B — Client
            </h2>
            <div className="space-y-3">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Client Name</label>
                <select value={client} onChange={e=>setClient(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  {clients.map(c=><option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Contact Person</label>
                <input placeholder="Full name"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Client Address</label>
                <textarea rows={2} placeholder="Registered office address"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"/>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Client GSTIN</label>
                <input placeholder="GSTIN number"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
            </div>
          </div>

          {/* Project Details */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 lg:col-span-2">
            <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
              <Hash size={15} className="text-teal-400"/> Project Details
            </h2>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="lg:col-span-2">
                <label className="block text-xs text-slate-400 mb-1.5">Project Name</label>
                <input value={project} onChange={e=>setProject(e.target.value)}
                  placeholder="Project name"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Contract Type</label>
                <select value={contractType} onChange={e=>setContractType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  {['Turnkey','Labour + Material','Labour Only','Consultancy','Design Only'].map(t=>
                    <option key={t}>{t}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Contract Value (₹)</label>
                <input type="number" value={value} onChange={e=>setValue(e.target.value)}
                  placeholder="0"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Start Date</label>
                <input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">End Date</label>
                <input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Site Location</label>
                <input placeholder="Site address"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Service Type</label>
                <select className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  {['Civil','Interior','MEP','Renovation','Structural','Architecture'].map(s=>
                    <option key={s}>{s}</option>)}
                </select>
              </div>
            </div>
          </div>

          <div className="lg:col-span-2 flex justify-end">
            <button onClick={() => setStep(2)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2.5 rounded-lg flex items-center gap-2">
              Next — Terms <ChevronRight size={14}/>
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 2: TERMS ── */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Payment Terms */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <IndianRupee size={15} className="text-green-400"/> Payment Terms
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-2">Payment Structure</label>
                  <div className="grid grid-cols-2 gap-2">
                    {['30-40-30','40-30-30','50-30-20','20-40-40','50-50','100% on completion'].map(t => (
                      <button key={t} onClick={() => setPayTerms(t)}
                        className={`px-3 py-2 rounded-lg text-xs font-medium border transition ${
                          payTerms === t
                            ? 'border-blue-500 bg-blue-600/10 text-blue-400'
                            : 'border-slate-700 bg-slate-800/50 text-slate-400 hover:border-slate-600'
                        }`}>
                        {t}
                      </button>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Payment Method</label>
                  <select className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                    {['Bank Transfer (NEFT/RTGS)','Cheque','Online Payment','Cash (up to ₹2L)'].map(m=>
                      <option key={m}>{m}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Payment Due (days after invoice)</label>
                  <select className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                    {['7 days','15 days','30 days','45 days','60 days'].map(d=>
                      <option key={d}>{d}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Late Payment Interest (%/month)</label>
                  <input type="number" placeholder="1.5" defaultValue="1.5"
                    className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
                </div>
              </div>
            </div>

            {/* Penalty & Liability */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Shield size={15} className="text-red-400"/> Penalty & Liability
              </h2>
              <div className="space-y-3">
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Delay Penalty (% of contract value per week)</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={penalty} onChange={e=>setPenalty(e.target.value)}
                      className="w-24 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
                    <span className="text-slate-400 text-sm">% per week</span>
                  </div>
                  <p className="text-xs text-slate-600 mt-1">Max cap: 10% of contract value</p>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Defect Liability Period (months)</label>
                  <div className="flex items-center gap-2">
                    <input type="number" value={dpl} onChange={e=>setDpl(e.target.value)}
                      className="w-24 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
                    <span className="text-slate-400 text-sm">months</span>
                  </div>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Performance Security (%)</label>
                  <select className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                    {['None','2.5%','5%','10%'].map(p=><option key={p}>{p}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-slate-400 mb-1.5">Retention Amount (%)</label>
                  <select className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                    {['None','2.5%','5%','10%'].map(r=><option key={r}>{r}</option>)}
                  </select>
                </div>
              </div>
            </div>

            {/* Special Conditions */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 lg:col-span-2">
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <BookOpen size={15} className="text-amber-400"/> Special Conditions
              </h2>
              <textarea rows={5}
                placeholder={`Enter any special conditions, exclusions or additional terms...\n\nExample:\n- All electrical work to comply with IS 732 standards\n- Client to provide unobstructed site access\n- Force majeure clause applicable for acts of God`}
                className="w-full bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"/>
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(1)}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm px-6 py-2.5 rounded-lg">
              ← Back
            </button>
            <button onClick={() => setStep(3)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2.5 rounded-lg flex items-center gap-2">
              Next — Clauses <ChevronRight size={14}/>
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 3: CLAUSES ── */}
      {step === 3 && (
        <div className="space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <div className="px-5 py-4 border-b border-slate-800">
              <h2 className="text-sm font-semibold text-white">Contract Clauses</h2>
              <p className="text-xs text-slate-500 mt-0.5">
                {includedClauses.length} of {clauses.length} clauses included · Required clauses cannot be removed
              </p>
            </div>
            <div className="divide-y divide-slate-800">
              {clauses.map(c => (
                <div key={c.id} className={`flex items-center justify-between px-5 py-4 ${
                  c.included ? '' : 'opacity-50'
                }`}>
                  <div className="flex items-center gap-3">
                    <div className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${
                      c.included ? 'bg-blue-600/20 text-blue-400 border border-blue-800' : 'bg-slate-800 text-slate-600 border border-slate-700'
                    }`}>
                      {c.id}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium text-white">{c.title}</p>
                        {c.required && (
                          <span className="text-xs bg-red-900/30 text-red-400 border border-red-900 px-1.5 py-0.5 rounded">
                            Required
                          </span>
                        )}
                      </div>
                      <span className="text-xs text-slate-500">{c.category}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => toggleClause(c.id)}
                    disabled={c.required}
                    className={`w-8 h-8 rounded-lg flex items-center justify-center transition ${
                      c.required
                        ? 'cursor-not-allowed opacity-50'
                        : 'cursor-pointer hover:scale-110'
                    } ${
                      c.included
                        ? 'bg-green-600/20 border border-green-800 text-green-400'
                        : 'bg-slate-800 border border-slate-700 text-slate-600'
                    }`}
                  >
                    {c.included ? <Check size={14}/> : <Plus size={14}/>}
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(2)}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm px-6 py-2.5 rounded-lg">
              ← Back
            </button>
            <button onClick={() => setStep(4)}
              className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2.5 rounded-lg flex items-center gap-2">
              Next — Review <ChevronRight size={14}/>
            </button>
          </div>
        </div>
      )}

      {/* ── STEP 4: REVIEW ── */}
      {step === 4 && (
        <div className="space-y-4">

          {/* Contract Preview */}
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6">
            {/* Contract Header */}
            <div className="text-center mb-6 pb-6 border-b border-slate-700">
              <div className="w-12 h-12 rounded-xl bg-blue-600 flex items-center justify-center mx-auto mb-3">
                <Building2 size={22} className="text-white"/>
              </div>
              <h2 className="text-lg font-bold text-white">Construction Agreement</h2>
              <p className="text-slate-400 text-sm mt-1">ConstructOS Pvt Ltd</p>
              <p className="text-slate-500 text-xs mt-0.5">Draft · Generated {new Date().toLocaleDateString('en-IN')}</p>
            </div>

            {/* Parties */}
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Party A (Contractor)</p>
                <p className="text-sm font-semibold text-white">ConstructOS Pvt Ltd</p>
                <p className="text-xs text-slate-400 mt-1">Office 402, BKC, Mumbai 400051</p>
                <p className="text-xs text-slate-500 mt-1">GSTIN: 27AABCU9603R1ZX</p>
              </div>
              <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-800">
                <p className="text-xs text-slate-500 mb-2 uppercase tracking-wider">Party B (Client)</p>
                <p className="text-sm font-semibold text-white">{client}</p>
                <p className="text-xs text-slate-400 mt-1">As per provided address</p>
              </div>
            </div>

            {/* Key Terms Summary */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
              {[
                { label:'Contract Type',   value: contractType         },
                { label:'Contract Value',  value: value ? `₹${Number(value).toLocaleString('en-IN')}` : 'TBD' },
                { label:'Payment Terms',   value: payTerms             },
                { label:'Delay Penalty',   value: `${penalty}% / week` },
                { label:'Start Date',      value: startDate || 'TBD'   },
                { label:'End Date',        value: endDate   || 'TBD'   },
                { label:'DLP Period',      value: `${dpl} months`      },
                { label:'Clauses',         value: `${includedClauses.length} included` },
              ].map((t,i) => (
                <div key={i} className="bg-slate-800/50 rounded-lg p-3 border border-slate-800">
                  <p className="text-xs text-slate-500">{t.label}</p>
                  <p className="text-sm font-medium text-white mt-0.5">{t.value}</p>
                </div>
              ))}
            </div>

            {/* Clauses List */}
            <div className="border-t border-slate-700 pt-4">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-3">
                Included Clauses
              </p>
              <div className="grid grid-cols-2 gap-2">
                {includedClauses.map((c,i) => (
                  <div key={c.id} className="flex items-center gap-2 text-xs text-slate-400">
                    <span className="w-5 h-5 rounded bg-blue-600/20 text-blue-400 flex items-center justify-center text-xs font-bold shrink-0">
                      {i+1}
                    </span>
                    {c.title}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="flex justify-between">
            <button onClick={() => setStep(3)}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm px-6 py-2.5 rounded-lg">
              ← Back
            </button>
            <div className="flex gap-2">
              <button className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm px-4 py-2.5 rounded-lg flex items-center gap-2">
                <Download size={14}/> Download PDF
              </button>
              <button onClick={() => setStep(5)}
                className="bg-blue-600 hover:bg-blue-700 text-white text-sm px-6 py-2.5 rounded-lg flex items-center gap-2">
                Proceed to Sign <ChevronRight size={14}/>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ── STEP 5: SIGNATURE ── */}
      {step === 5 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Our Signature */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Pen size={15} className="text-blue-400"/> Party A Signature
              </h2>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center mb-4 min-h-[120px] flex flex-col items-center justify-center">
                {signed ? (
                  <>
                    <p className="text-2xl text-blue-400 font-semibold italic" style={{ fontFamily:'cursive' }}>
                      Rajesh Mehta
                    </p>
                    <p className="text-xs text-slate-500 mt-2">Digitally signed · {new Date().toLocaleDateString('en-IN')}</p>
                  </>
                ) : (
                  <p className="text-slate-600 text-sm">Click below to sign</p>
                )}
              </div>
              <button
                onClick={() => setSigned(true)}
                className={`w-full text-sm py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 transition ${
                  signed
                    ? 'bg-green-900/40 border border-green-800 text-green-400 cursor-default'
                    : 'bg-blue-600 hover:bg-blue-700 text-white'
                }`}
              >
                {signed ? <><CheckCircle2 size={15}/> Signed</> : <><Pen size={15}/> Sign as Rajesh Mehta</>}
              </button>
              <p className="text-xs text-slate-500 text-center mt-2">
                By signing you agree to all terms and conditions
              </p>
            </div>

            {/* Client Signature */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-white mb-4 flex items-center gap-2">
                <Pen size={15} className="text-purple-400"/> Party B Signature
              </h2>
              <div className="bg-slate-800/50 border border-slate-700 rounded-xl p-6 text-center mb-4 min-h-[120px] flex flex-col items-center justify-center">
                <p className="text-slate-600 text-sm">Awaiting client signature</p>
                <p className="text-xs text-slate-600 mt-1">Signature request will be sent via email</p>
              </div>
              <button className="w-full bg-purple-600/20 hover:bg-purple-600/30 border border-purple-800 text-purple-400 text-sm py-2.5 rounded-lg flex items-center justify-center gap-2 transition">
                <Send size={15}/> Send Signature Request
              </button>
              <p className="text-xs text-slate-500 text-center mt-2">
                Client will receive an email link to sign
              </p>
            </div>
          </div>

          {/* Finalize */}
          {signed && (
            <div className="bg-green-900/20 border border-green-900 rounded-xl p-5 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <CheckCircle2 size={20} className="text-green-400"/>
                <div>
                  <p className="text-sm font-semibold text-white">Contract is ready</p>
                  <p className="text-xs text-slate-400">Party A has signed. Send to client for final signature.</p>
                </div>
              </div>
              <div className="flex gap-2">
                <button className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-3 py-2 rounded-lg flex items-center gap-1 hover:bg-slate-700 transition">
                  <Download size={13}/> Download
                </button>
                <button className="text-xs bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex items-center gap-1">
                  <Send size={13}/> Send to Client
                </button>
              </div>
            </div>
          )}

          <div className="flex justify-between">
            <button onClick={() => setStep(4)}
              className="bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm px-6 py-2.5 rounded-lg">
              ← Back
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────
export default function ContractsPage() {
  const [view,          setView]          = useState('list')
  const [activeTab,     setActiveTab]     = useState('contracts')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [search,        setSearch]        = useState('')

  if (view === 'builder') {
    return <ContractBuilder template={selectedTemplate} onBack={() => setView('list')} />
  }

  const filtered = contracts.filter(c =>
    c.client.toLowerCase().includes(search.toLowerCase()) ||
    c.title.toLowerCase().includes(search.toLowerCase()) ||
    c.project.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Contracts</h1>
          <p className="text-slate-400 text-sm mt-0.5">Contract management & e-signatures</p>
        </div>
        <button onClick={() => { setSelectedTemplate(null); setView('builder') }}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
          <Plus size={14}/> New Contract
        </button>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Active Contracts',  value:'4',       sub:'All signed & running',  color:'bg-green-600'  },
          { label:'Draft Contracts',   value:'1',       sub:'Pending signature',      color:'bg-slate-600'  },
          { label:'Expiring Soon',     value:'1',       sub:'Within 30 days',         color:'bg-amber-600'  },
          { label:'Total Value',       value:'₹6.4 Cr', sub:'All active contracts',   color:'bg-blue-600'   },
        ].map((k,i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className={`w-2 h-2 rounded-full ${k.color} mb-3`}/>
            <p className="text-2xl font-bold text-white">{k.value}</p>
            <p className="text-sm text-slate-400 mt-0.5">{k.label}</p>
            <p className="text-xs text-slate-600 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 w-fit">
        {['contracts','templates'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition capitalize ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── CONTRACTS TAB ── */}
      {activeTab === 'contracts' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 flex-1 max-w-sm">
              <Search size={14} className="text-slate-500"/>
              <input value={search} onChange={e => setSearch(e.target.value)}
                placeholder="Search contracts..."
                className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"/>
            </div>
            <button className="flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-2 rounded-lg">
              <Filter size={13}/> Filter
            </button>
          </div>

          {/* Contract Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {filtered.map(c => (
              <div key={c.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition cursor-pointer">

                {/* Top Row */}
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1 min-w-0 mr-2">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs text-blue-400 font-medium">{c.id}</span>
                      <ServiceTag service={c.service}/>
                    </div>
                    <p className="text-sm font-semibold text-white">{c.title}</p>
                    <p className="text-xs text-slate-500 mt-0.5">{c.client} · {c.project}</p>
                  </div>
                  <StatusBadge status={c.status}/>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <IndianRupee size={11} className="text-slate-600"/> {c.value}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <MapPin size={11} className="text-slate-600"/> {c.site}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <Calendar size={11} className="text-slate-600"/> {c.startDate} → {c.endDate}
                  </div>
                  <div className="flex items-center gap-1.5 text-xs text-slate-400">
                    <FileText size={11} className="text-slate-600"/> {c.clauses} clauses · {c.type}
                  </div>
                </div>

                {/* Signature Status */}
                <div className={`flex items-center gap-2 px-3 py-2 rounded-lg mb-3 ${
                  c.signed
                    ? 'bg-green-900/20 border border-green-900/40'
                    : 'bg-amber-900/20 border border-amber-900/40'
                }`}>
                  {c.signed
                    ? <><Lock size={13} className="text-green-400"/><span className="text-xs text-green-400">Fully signed · {c.signedDate}</span></>
                    : <><Unlock size={13} className="text-amber-400"/><span className="text-xs text-amber-400">Awaiting signatures</span></>
                  }
                </div>

                {/* Actions */}
                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <span className="text-xs text-slate-500">Payment: {c.paymentTerms}</span>
                  <div className="flex items-center gap-2">
                    <button className="text-slate-500 hover:text-blue-400 transition"><Eye      size={14}/></button>
                    <button className="text-slate-500 hover:text-blue-400 transition"><Edit3    size={14}/></button>
                    <button className="text-slate-500 hover:text-blue-400 transition"><Download size={14}/></button>
                    <button className="text-slate-500 hover:text-blue-400 transition"><Copy     size={14}/></button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── TEMPLATES TAB ── */}
      {activeTab === 'templates' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-slate-500">{contractTemplates.length} templates available</p>
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus size={13}/> Create Template
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {contractTemplates.map(t => (
              <div key={t.id}
                className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-600 transition cursor-pointer group">

                <div className="flex items-start justify-between mb-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-800 flex items-center justify-center shrink-0">
                    <FileSignature size={18} className="text-blue-400"/>
                  </div>
                  <ServiceTag service={t.service}/>
                </div>

                <h3 className="text-sm font-semibold text-white mb-1 group-hover:text-blue-400 transition">
                  {t.name}
                </h3>
                <p className="text-xs text-slate-500 mb-4 leading-relaxed">{t.desc}</p>

                <div className="grid grid-cols-2 gap-2 mb-4">
                  <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                    <p className="text-sm font-bold text-white">{t.clauses}</p>
                    <p className="text-xs text-slate-500">Clauses</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                    <p className="text-sm font-bold text-white">{t.uses}×</p>
                    <p className="text-xs text-slate-500">Used</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <span className="text-xs text-slate-600">Last used {t.lastUsed}</span>
                  <button
                    onClick={() => { setSelectedTemplate(t); setView('builder') }}
                    className="text-xs bg-blue-600/20 hover:bg-blue-600/30 text-blue-400 border border-blue-800 px-3 py-1 rounded-lg flex items-center gap-1 transition"
                  >
                    Use Template <ChevronRight size={11}/>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
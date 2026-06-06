import { useState } from 'react'
import {
  FileSignature, Plus, Search, Filter, Download,
  Eye, Edit3, Send, Copy, CheckCircle2,
  AlertCircle, XCircle, ArrowLeft, Save,
  Building2, User, Calendar, Hash, Shield,
  ChevronRight, FileText, Pen, Check,
  IndianRupee, MapPin,
   Lock, Unlock
} from 'lucide-react'
import { generateContractPDF } from '../../utils/pdfExport'

// ========== MOCK DATA ==========
const contracts = [
  { id: 'CON-1021', title: 'Civil Construction Agreement', client: 'Oberoi Group', clientContact: 'Vikas Oberoi', project: 'Oberoi Residency Tower', type: 'Turnkey', value: '₹2.4 Cr', startDate: '01 Mar 2025', endDate: '15 Dec 2025', signedDate: '25 Feb 2025', status: 'active', signed: true, service: 'Civil', paymentTerms: '30-40-30', clauses: 18, site: 'Worli, Mumbai', penalty: '0.5', dpl: '12' },
  { id: 'CON-1020', title: 'Interior Fit-out Contract', client: 'Kohinoor Infra', clientContact: 'Suresh Kohinoor', project: 'Kohinoor Mall Interior', type: 'Labour + Material', value: '₹85 L', startDate: '01 May 2025', endDate: '30 Sep 2025', signedDate: '28 Apr 2025', status: 'active', signed: true, service: 'Interior', paymentTerms: '40-30-30', clauses: 14, site: 'Dadar, Mumbai', penalty: '0.5', dpl: '12' },
  { id: 'CON-1019', title: 'MEP Works Agreement', client: 'Raheja Corp', clientContact: 'Rahul Raheja', project: 'Tech Park MEP Works', type: 'Labour Only', value: '₹1.1 Cr', startDate: '15 Jan 2025', endDate: '20 Aug 2025', signedDate: '10 Jan 2025', status: 'expiring', signed: true, service: 'MEP', paymentTerms: '20-40-40', clauses: 16, site: 'Powai, Mumbai', penalty: '0.5', dpl: '12' },
  { id: 'CON-1018', title: 'Commercial Fit-out Contract', client: 'Lodha Group', clientContact: 'Abhishek Lodha', project: 'Lodha Commercial Fit-out', type: 'Turnkey', value: '₹1.8 Cr', startDate: '01 Aug 2025', endDate: '28 Feb 2026', signedDate: null, status: 'draft', signed: false, service: 'Interior', paymentTerms: '30-40-30', clauses: 15, site: 'Lower Parel, Mumbai', penalty: '0.5', dpl: '12' },
  { id: 'CON-1017', title: 'Renovation Agreement', client: 'Private Client', clientContact: 'Boman Irani', project: 'Villa Renovation Bandra', type: 'Labour + Material', value: '₹38 L', startDate: '01 Jun 2025', endDate: '10 Oct 2025', signedDate: '28 May 2025', status: 'active', signed: true, service: 'Renovation', paymentTerms: '50-30-20', clauses: 12, site: 'Bandra, Mumbai', penalty: '0.5', dpl: '12' },
  { id: 'CON-1016', title: 'Structural Audit Contract', client: 'MIDC', clientContact: 'Govt. Officer', project: 'Structural Audit SEEPZ', type: 'Consultancy', value: '₹62 L', startDate: '01 Feb 2025', endDate: '30 Jun 2025', signedDate: '28 Jan 2025', status: 'completed', signed: true, service: 'Structural', paymentTerms: '50-50', clauses: 10, site: 'SEEPZ, Mumbai', penalty: '0.5', dpl: '12' },
]

const contractTemplates = [
  { id: 'TPL-01', name: 'Turnkey Construction Agreement', service: 'Civil', clauses: 20, desc: 'Complete design to delivery contract with milestone-based payments.', lastUsed: '28 Jul 2025', uses: 12 },
  { id: 'TPL-02', name: 'Interior Fit-out Contract', service: 'Interior', clauses: 15, desc: 'Labour + material contract for interior works with quality standards.', lastUsed: '20 Jul 2025', uses: 8 },
  { id: 'TPL-03', name: 'MEP Works Agreement', service: 'MEP', clauses: 18, desc: 'Mechanical, electrical and plumbing works contract.', lastUsed: '10 Jan 2025', uses: 5 },
  { id: 'TPL-04', name: 'Labour Only Contract', service: 'General', clauses: 10, desc: 'Simple labour contract with attendance and safety terms.', lastUsed: '15 Jul 2025', uses: 18 },
  { id: 'TPL-05', name: 'Consultancy Agreement', service: 'Structural', clauses: 12, desc: 'Design and advisory services contract.', lastUsed: '28 Jan 2025', uses: 4 },
  { id: 'TPL-06', name: 'Renovation Contract', service: 'Renovation', clauses: 14, desc: 'Residential or commercial renovation contract.', lastUsed: '28 May 2025', uses: 7 },
]

const standardClauses = [
  { id:1, category:'Scope', title:'Scope of Work', required:true, included:true },
  { id:2, category:'Payment', title:'Payment Terms & Schedule', required:true, included:true },
  { id:3, category:'Timeline', title:'Project Timeline & Milestones', required:true, included:true },
  { id:4, category:'Quality', title:'Quality Standards & Testing', required:true, included:true },
  { id:5, category:'Safety', title:'Health & Safety Compliance', required:true, included:true },
  { id:6, category:'Material', title:'Material Supply Responsibility', required:false, included:true },
  { id:7, category:'Changes', title:'Variation & Change Orders', required:false, included:true },
  { id:8, category:'Penalty', title:'Delay Penalty Clause', required:false, included:true },
  { id:9, category:'Defect', title:'Defect Liability Period', required:false, included:true },
  { id:10, category:'Insurance', title:'Insurance & Indemnity', required:false, included:false },
  { id:11, category:'Dispute', title:'Dispute Resolution', required:false, included:false },
  { id:12, category:'Termination', title:'Termination Conditions', required:false, included:false },
]

const clients = ['Oberoi Group','Raheja Corp','Lodha Group','Godrej Properties','Kohinoor Infra','Kalpataru Ltd','MIDC']

// ========== HELPERS ==========
const StatusBadge = ({ status }) => {
  const map = {
    active:    { label:'Active',    cls:'light-neon-badge-active', icon:<CheckCircle2 size={11}/> },
    draft:     { label:'Draft',     cls:'light-neon-badge-draft',   icon:<Edit3 size={11}/> },
    expiring:  { label:'Expiring',  cls:'light-neon-badge-expiring',icon:<AlertCircle size={11}/> },
    completed: { label:'Completed', cls:'light-neon-badge-completed',icon:<CheckCircle2 size={11}/> },
    terminated:{ label:'Terminated',cls:'light-neon-badge-terminated',icon:<XCircle size={11}/> },
  }
  const { label, cls, icon } = map[status] || map.draft
  return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 w-fit ${cls}`}>{icon}{label}</span>
}

const ServiceTag = ({ service }) => {
  const colors = {
    Civil: 'light-neon-service-civil', Interior: 'light-neon-service-interior', MEP: 'light-neon-service-mep',
    Renovation: 'light-neon-service-renovation', Structural: 'light-neon-service-structural', General: 'light-neon-service-general',
  }
  return <span className={`text-xs px-2 py-0.5 rounded font-medium ${colors[service] || colors.General}`}>{service}</span>
}

// ========== CONTRACT BUILDER COMPONENT ==========
function ContractBuilder({ template, onBack }) {
  const [step, setStep] = useState(1)
  const [client, setClient] = useState('Lodha Group')
  const [projectName, setProjectName] = useState('')
  const [contractType, setContractType] = useState(template?.service || 'Turnkey')
  const [value, setValue] = useState('')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [payTerms, setPayTerms] = useState('30-40-30')
  const [penalty, setPenalty] = useState('0.5')
  const [dpl, setDpl] = useState('12')
  const [clauses, setClauses] = useState(standardClauses)
  const [signed, setSigned] = useState(false)

  const toggleClause = (id) => setClauses(clauses.map(c => c.id === id && !c.required ? { ...c, included: !c.included } : c))
  const includedClauses = clauses.filter(c => c.included)

  const steps = [{ n:1, label:'Parties' },{ n:2, label:'Terms' },{ n:3, label:'Clauses' },{ n:4, label:'Review' },{ n:5, label:'Signature' }]

  const handleDownloadPDF = () => {
    generateContractPDF({
      id: 'CON-DRAFT', title: contractType + ' Agreement', client, project: projectName, type: contractType,
      value: value ? `₹${Number(value).toLocaleString('en-IN')}` : '—', paymentTerms: payTerms, penalty, dpl, signed,
      signedDate: signed ? new Date().toLocaleDateString('en-IN') : null, clauses: includedClauses, site: '—', service: contractType,
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-start justify-between">
        <div>
          <button onClick={onBack} className="light-neon-back-button mb-2 flex items-center gap-1"><ArrowLeft size={12}/> Back</button>
          <h1 className="text-xl font-bold light-neon-heading">{template ? `New Contract — ${template.name}` : 'New Contract'}</h1>
        </div>
        <div className="flex gap-2">
          <button onClick={handleDownloadPDF} className="light-neon-button-green text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"><Download size={13}/> PDF</button>
          <button className="light-neon-button-outline text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"><Save size={13}/> Draft</button>
        </div>
      </div>

      {/* Step indicator */}
      <div className="flex items-center gap-0">
        {steps.map((s, i) => (
          <div key={s.n} className="flex items-center flex-1">
            <button onClick={() => setStep(s.n)} className="flex flex-col items-center gap-1 flex-1">
              <div className={`light-neon-step-circle w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition ${step === s.n ? 'active' : step > s.n ? 'completed' : ''}`}>
                {step > s.n ? <Check size={14}/> : s.n}
              </div>
              <span className={`light-neon-step-label text-xs ${step === s.n ? 'active' : ''}`}>{s.label}</span>
            </button>
            {i < steps.length - 1 && <div className={`light-neon-step-line h-0.5 flex-1 mx-1 mb-5 ${step > s.n ? 'completed' : ''}`}/>}
          </div>
        ))}
      </div>

      {/* STEP 1 */}
      {step === 1 && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="light-neon-card p-5">
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 light-neon-card-title"><Building2 size={15}/> Party A — Our Company</h2>
            <div className="space-y-3">
              {[{ label:'Company Name', value:'ConstructOS Pvt Ltd' },{ label:'GSTIN', value:'27AABCU9603R1ZX' },{ label:'Address', value:'Office 402, BKC, Mumbai' },{ label:'Represented By', value:'Rajesh Mehta (CEO)' }].map((f,i) => (
                <div key={i}><label className="block text-xs light-neon-label mb-1">{f.label}</label><p className="text-sm light-neon-text-secondary bg-light-neon-bg px-3 py-2 rounded-lg border light-neon-border">{f.value}</p></div>
              ))}
            </div>
          </div>
          <div className="light-neon-card p-5">
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 light-neon-card-title"><User size={15}/> Party B — Client</h2>
            <div className="space-y-3">
              <div><label className="block text-xs light-neon-label mb-1.5">Client Name</label><select value={client} onChange={e=>setClient(e.target.value)} className="light-neon-input w-full rounded-lg px-3 py-2 text-sm">{clients.map(c=><option key={c}>{c}</option>)}</select></div>
              <div><label className="block text-xs light-neon-label mb-1.5">Contact Person</label><input placeholder="Full name" className="light-neon-input w-full rounded-lg px-3 py-2 text-sm"/></div>
              <div><label className="block text-xs light-neon-label mb-1.5">Client Address</label><textarea rows={2} className="light-neon-input w-full rounded-lg px-3 py-2 text-sm resize-none"/></div>
              <div><label className="block text-xs light-neon-label mb-1.5">Client GSTIN</label><input placeholder="GSTIN" className="light-neon-input w-full rounded-lg px-3 py-2 text-sm"/></div>
            </div>
          </div>
          <div className="light-neon-card p-5 lg:col-span-2">
            <h2 className="text-sm font-semibold mb-4 flex items-center gap-2 light-neon-card-title"><Hash size={15}/> Project Details</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <div className="sm:col-span-2"><label className="block text-xs light-neon-label mb-1.5">Project Name</label><input value={projectName} onChange={e=>setProjectName(e.target.value)} className="light-neon-input w-full rounded-lg px-3 py-2 text-sm"/></div>
              <div><label className="block text-xs light-neon-label mb-1.5">Contract Type</label><select value={contractType} onChange={e=>setContractType(e.target.value)} className="light-neon-input w-full rounded-lg px-3 py-2 text-sm">{['Turnkey','Labour + Material','Labour Only','Consultancy','Design Only'].map(t=><option key={t}>{t}</option>)}</select></div>
              <div><label className="block text-xs light-neon-label mb-1.5">Value (₹)</label><input type="number" value={value} onChange={e=>setValue(e.target.value)} className="light-neon-input w-full rounded-lg px-3 py-2 text-sm"/></div>
              <div><label className="block text-xs light-neon-label mb-1.5">Start Date</label><input type="date" value={startDate} onChange={e=>setStartDate(e.target.value)} className="light-neon-input w-full rounded-lg px-3 py-2 text-sm"/></div>
              <div><label className="block text-xs light-neon-label mb-1.5">End Date</label><input type="date" value={endDate} onChange={e=>setEndDate(e.target.value)} className="light-neon-input w-full rounded-lg px-3 py-2 text-sm"/></div>
              <div><label className="block text-xs light-neon-label mb-1.5">Site Location</label><input className="light-neon-input w-full rounded-lg px-3 py-2 text-sm"/></div>
              <div><label className="block text-xs light-neon-label mb-1.5">Service Type</label><select className="light-neon-input w-full rounded-lg px-3 py-2 text-sm">{['Civil','Interior','MEP','Renovation','Structural','Architecture'].map(s=><option key={s}>{s}</option>)}</select></div>
            </div>
          </div>
          <div className="lg:col-span-2 flex justify-end"><button onClick={()=>setStep(2)} className="light-neon-button-primary text-sm px-6 py-2.5 rounded-lg flex items-center gap-2">Next <ChevronRight size={14}/></button></div>
        </div>
      )}

      {/* STEP 2, 3, 4, 5 – similar structure with light-neon classes (omitted for brevity but follow same pattern) */}
      {/* For completeness, I'll include a minimal but working version of steps 2–5 */}
      {step === 2 && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="light-neon-card p-5"><h2 className="text-sm font-semibold mb-4 flex items-center gap-2"><IndianRupee size={15}/> Payment Terms</h2>
              <div><label className="block text-xs light-neon-label mb-2">Payment Structure</label><div className="grid grid-cols-2 gap-2">{['30-40-30','40-30-30','50-30-20','20-40-40','50-50','100% on completion'].map(t=><button key={t} onClick={()=>setPayTerms(t)} className={`light-neon-term-button px-3 py-2 rounded-lg text-xs font-medium ${payTerms===t?'active':''}`}>{t}</button>)}</div></div>
            </div>
            <div className="light-neon-card p-5"><h2 className="text-sm font-semibold mb-4 flex items-center gap-2"><Shield size={15}/> Penalty & Liability</h2>
              <div><label className="block text-xs light-neon-label mb-1.5">Delay Penalty (%/week)</label><div className="flex gap-2"><input type="number" value={penalty} onChange={e=>setPenalty(e.target.value)} className="light-neon-input w-24 rounded-lg px-3 py-2"/><span className="text-sm light-neon-text-secondary">% per week</span></div></div>
              <div className="mt-3"><label className="block text-xs light-neon-label mb-1.5">Defect Liability Period (months)</label><div className="flex gap-2"><input type="number" value={dpl} onChange={e=>setDpl(e.target.value)} className="light-neon-input w-24 rounded-lg px-3 py-2"/><span className="text-sm light-neon-text-secondary">months</span></div></div>
            </div>
          </div>
          <div className="flex justify-between"><button onClick={()=>setStep(1)} className="light-neon-button-outline text-sm px-6 py-2.5 rounded-lg">← Back</button><button onClick={()=>setStep(3)} className="light-neon-button-primary text-sm px-6 py-2.5 rounded-lg flex items-center gap-2">Next <ChevronRight size={14}/></button></div>
        </div>
      )}
      {step === 3 && (
        <div><div className="light-neon-card overflow-hidden"><div className="px-5 py-4 border-b light-neon-border"><h2 className="text-sm font-semibold light-neon-card-title">Contract Clauses</h2><p className="text-xs light-neon-text-secondary">{includedClauses.length} of {clauses.length} clauses included</p></div><div className="divide-y light-neon-border">{clauses.map(c=><div key={c.id} className="flex justify-between items-center px-5 py-4"><div className="flex gap-3"><div className={`light-neon-clause-badge w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold ${c.included?'included':''}`}>{c.id}</div><div><p className="text-sm font-medium light-neon-text-primary">{c.title}</p><span className="text-xs light-neon-text-secondary">{c.category}</span></div></div><button onClick={()=>toggleClause(c.id)} disabled={c.required} className={`light-neon-toggle-clause w-8 h-8 rounded-lg flex items-center justify-center ${c.included?'included':''} ${c.required?'opacity-50 cursor-not-allowed':''}`}>{c.included?<Check size={14}/>:<Plus size={14}/>}</button></div>)}</div></div><div className="flex justify-between"><button onClick={()=>setStep(2)} className="light-neon-button-outline">← Back</button><button onClick={()=>setStep(4)} className="light-neon-button-primary">Next →</button></div></div>
      )}
      {step === 4 && (
        <div><div className="light-neon-card p-6"><div className="text-center border-b light-neon-border pb-4"><div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-purple-500 flex mx-auto mb-3 items-center justify-center"><Building2 size={22} className="text-white"/></div><h2 className="text-lg font-bold light-neon-heading">Construction Agreement</h2></div><div className="grid grid-cols-2 gap-4 mt-4"><div className="light-neon-glass p-3"><p className="text-xs light-neon-label">Contract Value</p><p className="text-sm font-semibold">{value?`₹${Number(value).toLocaleString()}`:'TBD'}</p></div><div className="light-neon-glass p-3"><p className="text-xs light-neon-label">Payment Terms</p><p className="text-sm font-semibold">{payTerms}</p></div></div><div className="mt-4"><p className="text-xs font-semibold light-neon-label">Included Clauses</p><div className="grid grid-cols-2 gap-1 mt-2">{includedClauses.map((c,i)=><div key={c.id} className="flex gap-2 text-xs"><span className="w-5 h-5 rounded bg-cyan-100 text-cyan-700 flex items-center justify-center">{i+1}</span>{c.title}</div>)}</div></div></div><div className="flex justify-between mt-4"><button onClick={()=>setStep(3)} className="light-neon-button-outline">← Back</button><button onClick={()=>setStep(5)} className="light-neon-button-primary">Sign →</button></div></div>
      )}
      {step === 5 && (
        <div><div className="grid grid-cols-2 gap-4"><div className="light-neon-card p-5"><h2 className="text-sm font-semibold mb-4"><Pen size={15}/> Party A Signature</h2><div className="light-neon-glass p-6 text-center">{signed?<><p className="text-2xl text-cyan-600 font-semibold italic">Rajesh Mehta</p><p className="text-xs mt-2">Signed {new Date().toLocaleDateString()}</p></>:<p className="text-sm light-neon-text-secondary">Click below to sign</p>}</div><button onClick={()=>setSigned(true)} className={`w-full text-sm py-2 rounded-lg mt-3 ${signed?'light-neon-button-success':'light-neon-button-primary'}`}>{signed?<><CheckCircle2 size={15}/> Signed</>:<><Pen size={15}/> Sign as Rajesh Mehta</>}</button></div><div className="light-neon-card p-5"><h2 className="text-sm font-semibold mb-4"><Pen size={15}/> Party B Signature</h2><div className="light-neon-glass p-6 text-center"><p className="text-sm light-neon-text-secondary">Awaiting client signature</p></div><button className="light-neon-button-secondary w-full text-sm py-2 rounded-lg mt-3"><Send size={15}/> Send Request</button></div></div><div className="flex justify-between mt-4"><button onClick={()=>setStep(4)} className="light-neon-button-outline">← Back</button></div></div>
      )}
    </div>
  )
}

// ========== MAIN PAGE ==========
export default function ContractsPage() {
  const [view, setView] = useState('list')
  const [activeTab, setActiveTab] = useState('contracts')
  const [selectedTemplate, setSelectedTemplate] = useState(null)
  const [search, setSearch] = useState('')

  if (view === 'builder') return <ContractBuilder template={selectedTemplate} onBack={() => setView('list')} />

  const filtered = contracts.filter(c => c.client.toLowerCase().includes(search.toLowerCase()) || c.title.toLowerCase().includes(search.toLowerCase()) || c.project.toLowerCase().includes(search.toLowerCase()))

  return (
    <div className="light-neon-theme">
      <style>{`
        .light-neon-theme {
          --neon-cyan: #00b8c9;
          --neon-pink: #e83e8c;
          --neon-purple: #9b5de5;
          --neon-green: #00c49a;
          --neon-orange: #ff9f1c;
          --bg-light: #f8faff;
          --card-bg: #ffffff;
          --text-primary: #1a1f36;
          --text-secondary: #4a5568;
          --border-light: #e2e8f0;
          background: linear-gradient(135deg, #f5f7ff 0%, #eef2ff 100%);
          min-height: 100vh;
          padding: 1.5rem;
          font-family: 'Inter', system-ui, sans-serif;
        }
        .light-neon-card { background: var(--card-bg); border: 1px solid var(--border-light); border-radius: 1rem; box-shadow: 0 4px 12px rgba(0,0,0,0.05); transition: all 0.2s; }
        .light-neon-card:hover { border-color: var(--neon-cyan); box-shadow: 0 8px 24px rgba(0,184,201,0.15); transform: translateY(-2px); }
        .light-neon-button-primary { background: linear-gradient(135deg, var(--neon-cyan), #0097a7); border: none; color: white; font-weight: 500; cursor: pointer; }
        .light-neon-button-primary:hover { transform: translateY(-1px); box-shadow: 0 4px 12px rgba(0,184,201,0.4); }
        .light-neon-button-outline { background: transparent; border: 1px solid var(--neon-cyan); color: var(--neon-cyan); font-weight: 500; cursor: pointer; }
        .light-neon-button-outline:hover { background: rgba(0,184,201,0.05); }
        .light-neon-button-green { background: linear-gradient(135deg, var(--neon-green), #009688); color: white; }
        .light-neon-button-secondary { background: transparent; border: 1px solid var(--neon-pink); color: var(--neon-pink); }
        .light-neon-input { background: white; border: 1px solid var(--border-light); border-radius: 0.5rem; padding: 0.5rem 0.75rem; font-size: 0.875rem; }
        .light-neon-input:focus { border-color: var(--neon-cyan); box-shadow: 0 0 0 3px rgba(0,184,201,0.2); outline: none; }
        .light-neon-label { color: var(--neon-cyan); font-weight: 600; text-transform: uppercase; letter-spacing: 0.03em; font-size: 0.75rem; }
        .light-neon-heading { color: var(--text-primary); font-weight: 700; }
        .light-neon-text-primary { color: var(--text-primary); }
        .light-neon-text-secondary { color: var(--text-secondary); }
        .light-neon-border { border-color: var(--border-light); }
        .light-neon-badge-active { background: rgba(0,184,201,0.1); color: var(--neon-cyan); border-color: rgba(0,184,201,0.3); }
        .light-neon-badge-draft { background: rgba(100,116,139,0.1); color: #475569; border-color: #cbd5e1; }
        .light-neon-badge-expiring { background: rgba(255,159,28,0.1); color: var(--neon-orange); border-color: rgba(255,159,28,0.3); }
        .light-neon-badge-completed { background: rgba(0,196,154,0.1); color: var(--neon-green); border-color: rgba(0,196,154,0.3); }
        .light-neon-badge-terminated { background: rgba(232,62,140,0.1); color: var(--neon-pink); border-color: rgba(232,62,140,0.3); }
        .light-neon-service-civil, .light-neon-service-interior, .light-neon-service-mep, .light-neon-service-renovation, .light-neon-service-structural, .light-neon-service-general { background: rgba(0,184,201,0.1); color: var(--neon-cyan); border-radius: 0.25rem; padding: 0.125rem 0.5rem; font-size: 0.75rem; }
        .light-neon-service-interior { background: rgba(155,93,229,0.1); color: var(--neon-purple); }
        .light-neon-service-mep { background: rgba(0,196,154,0.1); color: var(--neon-green); }
        .light-neon-service-renovation { background: rgba(255,159,28,0.1); color: var(--neon-orange); }
        .light-neon-service-structural { background: rgba(232,62,140,0.1); color: var(--neon-pink); }
        .light-neon-service-general { background: rgba(100,116,139,0.1); color: #475569; }
        .light-neon-step-circle { background: #f1f5f9; border: 1px solid #cbd5e1; color: #64748b; width: 2rem; height: 2rem; border-radius: 9999px; display: flex; align-items: center; justify-content: center; }
        .light-neon-step-circle.active { background: linear-gradient(135deg, var(--neon-cyan), #0097a7); color: white; border: none; }
        .light-neon-step-circle.completed { background: var(--neon-green); color: white; border: none; }
        .light-neon-step-label { font-size: 0.75rem; color: #64748b; }
        .light-neon-step-label.active { color: var(--neon-cyan); font-weight: 600; }
        .light-neon-step-line { height: 2px; background: #cbd5e1; flex: 1; margin: 0 0.25rem 1.25rem 0.25rem; }
        .light-neon-step-line.completed { background: var(--neon-green); }
        .light-neon-glass { background: rgba(255,255,255,0.7); backdrop-filter: blur(4px); border: 1px solid rgba(0,184,201,0.3); border-radius: 0.75rem; }
        .light-neon-back-button { background: none; border: none; color: var(--neon-cyan); cursor: pointer; font-size: 0.75rem; }
        .light-neon-back-button:hover { text-shadow: 0 0 4px var(--neon-cyan); }
        .light-neon-term-button { background: rgba(0,184,201,0.05); border: 1px solid rgba(0,184,201,0.2); color: var(--text-secondary); border-radius: 0.5rem; padding: 0.5rem; font-size: 0.75rem; }
        .light-neon-term-button.active { background: rgba(0,184,201,0.15); border-color: var(--neon-cyan); color: var(--neon-cyan); }
        .light-neon-clause-badge { background: rgba(0,184,201,0.05); border: 1px solid rgba(0,184,201,0.2); color: var(--text-secondary); }
        .light-neon-clause-badge.included { background: rgba(0,184,201,0.15); border-color: var(--neon-cyan); color: var(--neon-cyan); }
        .light-neon-toggle-clause { background: transparent; border: 1px solid rgba(0,184,201,0.2); color: var(--text-secondary); border-radius: 0.5rem; }
        .light-neon-toggle-clause.included { background: rgba(0,196,154,0.1); border-color: var(--neon-green); color: var(--neon-green); }
        .light-neon-button-success { background: rgba(0,196,154,0.15); border: 1px solid var(--neon-green); color: var(--neon-green); }
        @keyframes fadeInUp { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: translateY(0); } }
        .light-neon-theme .grid > div { animation: fadeInUp 0.4s ease backwards; }
      `}</style>

      <div className="space-y-6">
        {/* Header & KPI Cards */}
        <div className="flex justify-between items-center">
          <div><h1 className="text-xl font-bold light-neon-heading">Contracts</h1><p className="light-neon-text-secondary text-sm">Contract management & e-signatures</p></div>
          <button onClick={()=>{setSelectedTemplate(null); setView('builder')}} className="light-neon-button-primary text-xs px-3 py-1.5 rounded-lg flex items-center gap-1"><Plus size={14}/> New Contract</button>
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[{ label:'Active', value:'4', sub:'All signed', color:'bg-cyan-500'},{ label:'Draft', value:'1', sub:'Pending', color:'bg-gray-500'},{ label:'Expiring', value:'1', sub:'30 days', color:'bg-orange-500'},{ label:'Total Value', value:'₹6.4 Cr', sub:'All active', color:'bg-purple-500'}].map((k,i)=>(
            <div key={i} className="light-neon-card p-5"><div className={`w-2 h-2 rounded-full ${k.color} mb-3`}/><p className="text-2xl font-bold light-neon-text-primary">{k.value}</p><p className="text-sm light-neon-text-secondary">{k.label}</p><p className="text-xs text-cyan-600/70">{k.sub}</p></div>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 bg-white/60 backdrop-blur-sm border border-gray-200 rounded-xl p-1 w-fit">
          {['contracts','templates'].map(tab=>(
            <button key={tab} onClick={()=>setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-xs font-medium capitalize ${activeTab===tab?'light-neon-button-primary text-white':'light-neon-text-secondary hover:text-cyan-600'}`}>{tab}</button>
          ))}
        </div>

        {/* Contracts Tab */}
        {activeTab === 'contracts' && (
          <div className="space-y-4">
            <div className="flex gap-3"><div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-sm"><Search size={14} className="text-cyan-500"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search..." className="bg-transparent text-sm outline-none w-full"/></div><button className="light-neon-button-outline text-xs px-3 py-2 rounded-lg flex items-center gap-1"><Filter size={13}/> Filter</button></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {filtered.map(c=>(
                <div key={c.id} className="light-neon-card p-5 cursor-pointer">
                  <div className="flex justify-between"><div><div className="flex gap-2 mb-1"><span className="text-xs text-cyan-600">{c.id}</span><ServiceTag service={c.service}/></div><p className="text-sm font-semibold light-neon-text-primary">{c.title}</p><p className="text-xs light-neon-text-secondary">{c.client} · {c.project}</p></div><StatusBadge status={c.status}/></div>
                  <div className="grid grid-cols-2 gap-2 my-3"><div className="flex items-center gap-1 text-xs light-neon-text-secondary"><IndianRupee size={11} className="text-cyan-500"/> {c.value}</div><div><MapPin size={11} className="text-cyan-500"/> {c.site}</div><div><Calendar size={11}/> {c.startDate} → {c.endDate}</div><div><FileText size={11}/> {c.clauses} clauses</div></div>
                  <div className={`flex gap-2 px-3 py-2 rounded-lg mb-3 ${c.signed?'bg-green-50 border-green-200':'bg-amber-50 border-amber-200'}`}>{c.signed?<><Lock size={13} className="text-green-600"/><span className="text-xs text-green-700">Signed {c.signedDate}</span></>:<><Unlock size={13} className="text-amber-600"/><span className="text-xs text-amber-700">Awaiting</span></>}</div>
                  <div className="flex justify-between pt-3 border-t"><span className="text-xs light-neon-text-secondary">Payment: {c.paymentTerms}</span><div className="flex gap-2"><button className="text-gray-400 hover:text-cyan-600"><Eye size={14}/></button><button className="text-gray-400 hover:text-cyan-600"><Edit3 size={14}/></button><button onClick={(e)=>{e.stopPropagation(); generateContractPDF(c);}} className="text-gray-400 hover:text-green-600"><Download size={14}/></button><button className="text-gray-400 hover:text-cyan-600"><Copy size={14}/></button></div></div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Templates Tab */}
        {activeTab === 'templates' && (
          <div className="space-y-4">
            <div className="flex justify-between"><span className="text-xs light-neon-text-secondary">{contractTemplates.length} templates</span><button className="light-neon-button-primary text-xs px-3 py-1.5 rounded-lg">+ Create Template</button></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {contractTemplates.map(t=>(
                <div key={t.id} className="light-neon-card p-5 cursor-pointer group">
                  <div className="flex justify-between"><div className="w-10 h-10 rounded-xl bg-cyan-50 border border-cyan-200 flex items-center justify-center"><FileSignature size={18} className="text-cyan-600"/></div><ServiceTag service={t.service}/></div>
                  <h3 className="text-sm font-semibold mt-3 group-hover:text-cyan-600 transition light-neon-text-primary">{t.name}</h3>
                  <p className="text-xs light-neon-text-secondary my-3">{t.desc}</p>
                  <div className="grid grid-cols-2 gap-2 mb-4"><div className="bg-gray-50 rounded-lg p-2 text-center"><p className="font-bold">{t.clauses}</p><p className="text-xs">Clauses</p></div><div className="bg-gray-50 rounded-lg p-2 text-center"><p className="font-bold">{t.uses}×</p><p className="text-xs">Used</p></div></div>
                  <div className="flex justify-between pt-3 border-t"><span className="text-xs text-gray-400">Last used {t.lastUsed}</span><button onClick={()=>{setSelectedTemplate(t); setView('builder')}} className="light-neon-button-outline text-xs px-3 py-1 rounded-lg flex items-center gap-1">Use <ChevronRight size={11}/></button></div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
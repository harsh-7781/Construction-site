import { useState } from 'react'
import {
  Home, Activity, TrendingUp, DollarSign, Users,
  Package, AlertTriangle, CheckCircle2, Mic, Send, Download, Plus, Sun,
  BarChart3, FileText, Bell, Menu, X, Clock,
  Shield, Zap, MessagesSquare
} from 'lucide-react'
import {
  LineChart, Line, BarChart, Bar, ComposedChart,
  XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  ResponsiveContainer
} from 'recharts'

// ---------- MOCK DATA ----------
const projectHealth = {
  score: 78, spi: 0.92, cpi: 0.88, netMargin: 12.4,
  cashBalance: 1840000, safetyScore: 86
}

const progressData = [
  { week: 'W1', planned: 12, actual: 10, catchup: 2 },
  { week: 'W2', planned: 18, actual: 16, catchup: 2 },
  { week: 'W3', planned: 25, actual: 22, catchup: 3 },
  { week: 'W4', planned: 32, actual: 28, catchup: 4 },
  { week: 'W5', planned: 38, actual: 33, catchup: 5 },
  { week: 'W6', planned: 44, actual: 39, catchup: 5 }
]

const alerts = [
  { id:1, icon:'⚠️', title:'Steel wastage at Tower B', desc:'5.2% vs target 3% – cost ₹18,000', time:'2h ago', priority:'high' },
  { id:2, icon:'🔴', title:'Labour shortage – Plastering', desc:'Only 6 of 12 masons present', time:'4h ago', priority:'critical' },
  { id:3, icon:'📄', title:'RA Bill #7 pending', desc:'₹12.4L uncertified for 15 days', time:'1d ago', priority:'medium' },
  { id:4, icon:'⚠️', title:'Cement stock low', desc:'Only 120 bags left (2 days cover)', time:'1d ago', priority:'high' }
]

const financialData = {
  billed: 18500000, certified: 16800000, received: 14200000,
  retention: 1680000, unbilled: 3200000,
  cashFlow: [
    { month:'Jan', inflow:28, outflow:22 }, { month:'Feb', inflow:32, outflow:28 },
    { month:'Mar', inflow:35, outflow:30 }, { month:'Apr', inflow:30, outflow:32 },
    { month:'May', inflow:38, outflow:35 }, { month:'Jun', inflow:42, outflow:38 }
  ]
}

const materials = [
  { name:'Cement', stock:120, unit:'bags', dailyUse:60, coverDays:2, status:'low', wastage:5.2 },
  { name:'TMT Steel', stock:8.5, unit:'MT', dailyUse:2.2, coverDays:3.9, status:'medium', wastage:3.1 },
  { name:'Aggregates', stock:45, unit:'M³', dailyUse:15, coverDays:3, status:'medium', wastage:6.8 },
  { name:'Plywood', stock:25, unit:'sheets', dailyUse:6, coverDays:4.2, status:'ok', wastage:2.5 }
]

const labourData = {
  today: { masons:8, helpers:16, carpenters:4, electricians:3, plumbers:2, total:33 },
  required: { masons:12, helpers:20, carpenters:6, electricians:4, plumbers:3, total:45 },
  productivity: [
    { trade:'Masonry', actual:0.42, target:0.55, unit:'m³/man-day' },
    { trade:'Plastering', actual:28, target:35, unit:'m²/man-day' },
    { trade:'Tile Laying', actual:12, target:18, unit:'m²/man-day' }
  ]
}

const qualityData = { ncrOpen: 4, firstPassRate: 86, snags: [
  { id:'SNG-01', desc:'Crack in plaster', location:'Floor 8', due:'05 Aug', status:'open' }
] }

const riskMatrix = [
  { risk:'Schedule delay', likelihood:4, impact:4, score:16, owner:'PM', mitigation:'Add extra shift' },
  { risk:'Client payment delay', likelihood:4, impact:5, score:20, owner:'Commercial', mitigation:'Advance billing' }
]

const documents = [
  { name:'Architectural Drawing', type:'PDF', date:'20 Jul', version:'4.0', status:'current' }
]

const weather = {
  today: { temp:32, condition:'Partly Cloudy', humidity:68, wind:12, rainProb:20 },
  forecast: [
    { day:'Tomorrow', temp:34, condition:'Sunny', rainProb:10 },
    { day:'Day 2', temp:33, condition:'Cloudy', rainProb:30 }
  ]
}

const milestones = [
  { title:'Foundation Complete', date:'Mar 2025', done:true },
  { title:'Top Floor Slab', due:'15 Aug', status:'on-track' }
]

const formatINR = (n) => {
  if (n >= 10000000) return `₹${(n/10000000).toFixed(2)} Cr`
  if (n >= 100000) return `₹${(n/100000).toFixed(1)} L`
  return `₹${n.toLocaleString('en-IN')}`
}

const StatusBadge = ({ status }) => {
  const map = {
    'on-track': 'bg-green-100 text-green-700 border-green-200',
    'at-risk': 'bg-amber-100 text-amber-700 border-amber-200',
    'low': 'bg-amber-100 text-amber-700 border-amber-200',
    'medium': 'bg-blue-100 text-blue-700 border-blue-200',
    'ok': 'bg-green-100 text-green-700 border-green-200',
    'open': 'bg-red-100 text-red-700 border-red-200',
    'closed': 'bg-green-100 text-green-700 border-green-200',
    'current': 'bg-green-100 text-green-700 border-green-200'
  }
  const cls = map[status] || 'bg-gray-100 text-gray-600 border-gray-200'
  return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>{status}</span>
}

const PriorityBadge = ({ priority }) => {
  const colors = {
    critical: 'bg-red-100 text-red-700 border-red-200',
    high: 'bg-orange-100 text-orange-700 border-orange-200',
    medium: 'bg-amber-100 text-amber-700 border-amber-200',
    low: 'bg-blue-100 text-blue-700 border-blue-200'
  }
  return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${colors[priority] || colors.medium}`}>{priority}</span>
}

export default function SiteSupervisorDashboard() {
  const [activeTab, setActiveTab] = useState('overview')
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [showAssistant, setShowAssistant] = useState(false)

  // const HealthGauge = ({ score }) => {
  //   const color = score >= 75 ? '#10b981' : score >= 50 ? '#f59e0b' : '#ef4444'
  //   return (
  //     <div className="flex flex-col items-center">
  //       <div className="relative w-24 h-24">
  //         <svg viewBox="0 0 100 100" className="w-full h-full">
  //           <circle cx="50" cy="50" r="42" fill="none" stroke="#e5e7eb" strokeWidth="8"/>
  //           <circle
  //             cx="50" cy="50" r="42" fill="none"
  //             stroke={color} strokeWidth="8"
  //             strokeDasharray={`${(score/100)*2*Math.PI*42} ${2*Math.PI*42}`}
  //             strokeDashoffset="0"
  //             transform="rotate(-90 50 50)"
  //           />
  //           <text x="50" y="55" textAnchor="middle" fill="#1f2937" fontSize="20" fontWeight="800">{score}</text>
  //         </svg>
  //       </div>
  //       <p className="text-xs text-gray-500 mt-1">Health Score</p>
  //     </div>
  //   )
  // }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile overlay */}
      {sidebarOpen && <div className="fixed inset-0 bg-black/30 z-40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 z-50 h-full w-64 bg-white border-r border-gray-200 transform transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}>
        <div className="flex items-center justify-between p-4 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center"><Activity size={16} className="text-white"/></div>
            <span className="font-bold text-gray-800">SiteOps</span>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="lg:hidden text-gray-500"><X size={20}/></button>
        </div>
        <nav className="p-3 space-y-1">
          {[
            { icon: Home, label: 'Dashboard', id: 'overview' },
            { icon: BarChart3, label: 'Progress', id: 'progress' },
            { icon: DollarSign, label: 'Financials', id: 'financials' },
            { icon: Package, label: 'Materials', id: 'materials' },
            { icon: Users, label: 'Labour & Safety', id: 'labour' },
            { icon: AlertTriangle, label: 'Quality', id: 'quality' },
            { icon: AlertTriangle, label: 'Risk', id: 'risk' },
            { icon: FileText, label: 'Documents', id: 'documents' }
          ].map(item => (
            <button key={item.id} onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
              className={`flex items-center gap-3 w-full px-3 py-2 rounded-lg text-sm transition ${
                activeTab === item.id ? 'bg-blue-50 text-blue-700 font-medium' : 'text-gray-600 hover:bg-gray-100'
              }`}
            ><item.icon size={18} /><span>{item.label}</span></button>
          ))}
        </nav>
        <div className="absolute bottom-0 w-full p-4 border-t border-gray-200">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-700 font-bold">VS</div>
            <div><p className="text-sm font-medium text-gray-800">Vikram Singh</p><p className="text-xs text-gray-500">Site Supervisor</p></div>
          </div>
        </div>
      </aside>

      {/* Main content */}
      <div className="lg:ml-64">
        <header className="bg-white border-b border-gray-200 sticky top-0 z-30">
          <div className="flex items-center justify-between px-4 py-3">
            <div className="flex items-center gap-3">
              <button onClick={() => setSidebarOpen(true)} className="lg:hidden text-gray-600"><Menu size={22}/></button>
              <div><h1 className="text-lg font-semibold text-gray-800">Site Supervision Command Center</h1><p className="text-xs text-gray-500">Oberoi Tower · Mumbai</p></div>
            </div>
            <div className="flex items-center gap-2">
              <button onClick={() => setShowAssistant(!showAssistant)} className="p-2 bg-blue-50 text-blue-600 rounded-full"><MessagesSquare size={18}/></button>
              <button className="p-2 relative text-gray-600"><Bell size={18}/><span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span></button>
            </div>
          </div>
        </header>

        <div className="p-4 space-y-6">
          {/* AI Co-Pilot */}
          {showAssistant && (
            <div className="bg-white border border-gray-200 rounded-xl shadow-lg p-4">
              <div className="flex justify-between mb-3"><h3 className="font-semibold flex gap-2"><Zap size={16} className="text-blue-600"/> AI Co-Pilot</h3><button onClick={() => setShowAssistant(false)}><X size={16}/></button></div>
              <div className="bg-gray-50 rounded-lg p-3 mb-3 text-sm">⚡ <strong>Insight:</strong> Cement wastage 5.2% vs budget 2% – cost ₹45,000 extra. 2 RA bills pending 45 days, blocking ₹12 Lakh cash.<br/>💡 Suggestion: Conduct joint measurement, issue reconciliation report.</div>
              <div className="flex gap-2"><input type="text" placeholder="Ask me anything..." className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm"/><button className="bg-blue-600 text-white px-4 rounded-lg flex gap-1"><Send size={14}/> Ask</button><button className="bg-gray-100 px-3 rounded-lg"><Mic size={16}/></button></div>
            </div>
          )}

          {/* Top metrics */}
          <div className="grid grid-cols-2 lg:grid-cols-6 gap-3">
            {/* <div className="col-span-2 bg-white rounded-xl border border-gray-200 p-3 flex justify-between shadow-sm">
              <HealthGauge score={projectHealth.score} />
              <div className="text-right"><p className="text-xs text-gray-500">SPI</p><p className="text-xl font-bold text-amber-600">{projectHealth.spi}</p><p className="text-xs text-gray-500 mt-1">CPI</p><p className="text-xl font-bold text-red-600">{projectHealth.cpi}</p></div>
            </div> */}
            {[
              { label:'Net Margin', value:`${projectHealth.netMargin}%`, icon:TrendingUp, color:'text-green-600' },
              { label:'Cash Balance', value:formatINR(projectHealth.cashBalance), icon:DollarSign, color:'text-blue-600' },
              { label:'Safety Score', value:`${projectHealth.safetyScore}/100`, icon:Shield, color:'text-teal-600' },
              { label:'Unbilled Revenue', value:formatINR(financialData.unbilled), icon:AlertTriangle, color:'text-red-600' }
            ].map((k,i) => (
              <div key={i} className="bg-white rounded-xl border border-gray-200 p-3 shadow-sm">
                <div className="flex justify-between"><k.icon size={18} className={k.color}/><span className="text-xs text-gray-400">{k.label}</span></div>
                <p className="text-xl font-bold text-gray-800 mt-1">{k.value}</p>
              </div>
            ))}
          </div>

          {/* S-Curve + Alerts */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2 bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold mb-2">Progress S-Curve</h3>
              <ResponsiveContainer width="100%" height={200}>
                <LineChart data={progressData}>
                  <CartesianGrid stroke="#f1f5f9"/>
                  <XAxis dataKey="week"/>
                  <YAxis unit="%"/>
                  <Tooltip/>
                  <Legend/>
                  <Line type="monotone" dataKey="planned" name="Planned %" stroke="#3b82f6" strokeWidth={2}/>
                  <Line type="monotone" dataKey="actual" name="Actual %" stroke="#ef4444" strokeWidth={2}/>
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold mb-2">Alert Feed</h3>
              <div className="space-y-2 max-h-64 overflow-y-auto">
                {alerts.map(a => (
                  <div key={a.id} className="border-b border-gray-100 pb-2">
                    <div className="flex gap-2"><span className="text-base">{a.icon}</span><div><p className="text-xs font-semibold">{a.title}</p><p className="text-xs text-gray-500">{a.desc}</p><div className="flex justify-between mt-1"><span className="text-xs text-gray-400">{a.time}</span><PriorityBadge priority={a.priority}/></div></div></div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex flex-wrap gap-2 bg-white p-3 rounded-xl border border-gray-200 shadow-sm">
            {['Log Progress', 'Approve Indent', 'Raise NCR', 'Record Manpower', 'Take Photo'].map(action => (
              <button key={action} className="flex items-center gap-1 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 rounded-lg text-xs text-gray-700 border border-gray-200">{action}</button>
            ))}
            <button className="flex items-center gap-1 ml-auto text-blue-600 bg-blue-50 px-3 py-1.5 rounded-lg text-xs"><Mic size={12}/> Voice Command</button>
          </div>

          {/* Weather & Milestones */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <div className="flex gap-2 mb-3"><Sun className="text-amber-500"/><h3 className="text-sm font-semibold">Weather & Impact</h3></div>
              <div className="flex justify-between"><div><p className="text-2xl font-bold">{weather.today.temp}°C</p><p className="text-xs text-gray-500">{weather.today.condition}</p></div><div><p className="text-sm font-medium text-amber-600">Rain Prob: {weather.today.rainProb}%</p><p className="text-xs text-gray-500">Monsoon alert: Prepare covers</p></div></div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                {weather.forecast.map((d,i) => (<div key={i} className="text-center text-xs"><p className="text-gray-500">{d.day}</p><p className="font-medium">{d.temp}°</p><p className="text-gray-400">{d.rainProb}%</p></div>))}
              </div>
            </div>
            <div className="bg-white rounded-xl border border-gray-200 p-4 shadow-sm">
              <h3 className="text-sm font-semibold mb-3">Upcoming Milestones</h3>
              {milestones.map((m,i) => (
                <div key={i} className="flex justify-between border-b pb-2 mb-2"><div className="flex gap-2">{m.done ? <CheckCircle2 size={14} className="text-green-500"/> : <Clock size={14} className="text-amber-500"/>}<span>{m.title}</span></div><div><span className="text-xs text-gray-500">{m.due || m.date}</span>{m.status && <StatusBadge status={m.status}/>}</div></div>
              ))}
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="border-b border-gray-200 px-4 py-2 flex gap-1 overflow-x-auto">
              {['overview','progress','financials','materials','labour','quality','risk','documents'].map(tab => (
                <button key={tab} onClick={() => setActiveTab(tab)} className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize ${activeTab===tab ? 'bg-blue-600 text-white' : 'text-gray-600 hover:bg-gray-100'}`}>{tab}</button>
              ))}
            </div>
            <div className="p-4">
              {activeTab === 'overview' && (
                <div className="grid md:grid-cols-2 gap-4">
                  <div><h3 className="font-semibold">Key Metrics</h3><div className="space-y-2 mt-2"><div className="flex justify-between"><span>SPI</span><span className="font-bold text-amber-600">{projectHealth.spi}</span></div><div className="flex justify-between"><span>CPI</span><span className="font-bold text-red-600">{projectHealth.cpi}</span></div><div className="flex justify-between"><span>Unbilled Revenue</span><span className="font-bold text-red-600">{formatINR(financialData.unbilled)}</span></div></div></div>
                  <div><h3 className="font-semibold">Today's Actions</h3><ul className="mt-2 space-y-1 text-sm"><li>✓ Verify steel reinforcement</li><li>⚠️ Follow up RA bill #7</li><li>👷 Arrange 2 masons for plastering</li></ul></div>
                </div>
              )}
              {activeTab === 'progress' && (
                <div><ResponsiveContainer width="100%" height={250}><ComposedChart data={progressData}><CartesianGrid/><XAxis dataKey="week"/><YAxis/><Tooltip/><Legend/><Bar dataKey="planned" name="Planned" fill="#93c5fd"/><Bar dataKey="actual" name="Actual" fill="#f87171"/><Line type="monotone" dataKey="catchup" name="Catch-up" stroke="#f59e0b"/></ComposedChart></ResponsiveContainer><div className="bg-amber-50 p-3 rounded-lg mt-3 text-sm">⚠️ Recovery Suggestion: Deploy 2 extra masons for 5 days – cost ₹18k, recover 3 days.</div></div>
              )}
              {activeTab === 'financials' && (
                <div><div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-4"><div><p className="text-xs text-gray-500">Billed</p><p className="font-bold">{formatINR(financialData.billed)}</p></div><div><p className="text-xs text-gray-500">Certified</p><p className="font-bold text-green-600">{formatINR(financialData.certified)}</p></div><div><p className="text-xs text-gray-500">Received</p><p className="font-bold">{formatINR(financialData.received)}</p></div><div><p className="text-xs text-gray-500">Retention</p><p className="font-bold text-amber-600">{formatINR(financialData.retention)}</p></div></div><h3 className="text-sm font-semibold">Cash Flow</h3><ResponsiveContainer width="100%" height={200}><BarChart data={financialData.cashFlow}><CartesianGrid/><XAxis dataKey="month"/><YAxis/><Tooltip/><Legend/><Bar dataKey="inflow" fill="#10b981"/><Bar dataKey="outflow" fill="#ef4444"/></BarChart></ResponsiveContainer></div>
              )}
              {activeTab === 'materials' && (
                <div className="grid md:grid-cols-2 gap-3">{materials.map(m => (<div key={m.name} className="border rounded-lg p-3"><div className="flex justify-between"><span className="font-medium">{m.name}</span><StatusBadge status={m.status}/></div><div className="grid grid-cols-2 gap-1 text-xs mt-2"><div>Stock: {m.stock} {m.unit}</div><div>Daily: {m.dailyUse}</div><div>Cover: {m.coverDays} days</div><div>Wastage: {m.wastage}%</div></div>{m.status==='low' && <p className="text-xs text-red-600 mt-2">Reorder point reached – auto indent generated</p>}</div>))}</div>
              )}
              {activeTab === 'labour' && (
                <div><div className="bg-red-50 p-3 rounded-lg"><p className="text-red-700 font-medium">Labour Shortage Alert</p><p>Today: {labourData.today.total} / {labourData.required.total} required</p><div className="grid grid-cols-2 gap-1 mt-2 text-xs">{Object.entries(labourData.today).filter(([k])=>k!=='total').map(([trade,val])=><div key={trade}>{trade}: {val} / {labourData.required[trade]||val}</div>)}</div><button className="mt-2 text-xs bg-blue-600 text-white px-3 py-1 rounded">Notify Contractor</button></div><div className="mt-4"><h3 className="font-semibold">Productivity</h3>{labourData.productivity.map(p=><div key={p.trade} className="mb-2"><div className="flex justify-between text-xs"><span>{p.trade}</span><span>{p.actual} / {p.target} {p.unit}</span></div><div className="h-1.5 bg-gray-200 rounded-full"><div className="h-full bg-blue-500 rounded-full" style={{width:`${(p.actual/p.target)*100}%`}}/></div></div>)}</div></div>
              )}
              {activeTab === 'quality' && (
                <div><div className="grid grid-cols-2 gap-3 mb-4"><div className="border p-3 rounded-lg text-center"><p className="text-2xl font-bold text-red-600">{qualityData.ncrOpen}</p><p className="text-xs">Open NCRs</p></div><div className="border p-3 rounded-lg text-center"><p className="text-2xl font-bold text-green-600">{qualityData.firstPassRate}%</p><p className="text-xs">First-time Pass</p></div></div><h3 className="font-semibold">Open Snags</h3>{qualityData.snags.map(s=><div key={s.id} className="flex justify-between border-b pb-2"><div><p>{s.desc}</p><p className="text-xs text-gray-400">{s.location}</p></div><div><StatusBadge status={s.status}/><span className="text-xs text-gray-400 ml-2">Due {s.due}</span></div></div>)}</div>
              )}
              {activeTab === 'risk' && (
                <div><div className="grid md:grid-cols-2 gap-3">{riskMatrix.map(r=><div key={r.risk} className="border rounded-lg p-3"><p className="font-medium">{r.risk}</p><div className="flex justify-between text-xs mt-1"><span>Likelihood: {r.likelihood}/5</span><span>Impact: {r.impact}/5</span><span className="font-bold">Score: {r.score}</span></div><p className="text-xs text-gray-500">Owner: {r.owner} · {r.mitigation}</p></div>)}</div><div className="bg-amber-50 p-3 rounded-lg mt-3 text-sm">⚠️ Early Warning: Client payment overdue {">"}30 days – escalate to commercial team.</div></div>
              )}
              {activeTab === 'documents' && (
                <div>{documents.map(doc=><div key={doc.name} className="flex justify-between border-b pb-2"><div className="flex gap-2"><FileText size={16} className="text-blue-600"/><div><p>{doc.name}</p><p className="text-xs text-gray-400">{doc.date} · v{doc.version}</p></div></div><div><StatusBadge status={doc.status}/><button className="text-blue-600 ml-2"><Download size={14}/></button></div></div>)}<button className="mt-2 text-sm bg-gray-100 px-3 py-1 rounded-lg flex items-center gap-1"><Plus size={14}/> Upload</button></div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
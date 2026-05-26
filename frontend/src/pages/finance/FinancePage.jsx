import { useState } from 'react'
import {
  Plus, Search, Filter, Download,
  ArrowDownLeft, ArrowUpRight, TrendingUp, TrendingDown,
  FileText, CheckCircle2, Clock, AlertCircle,  PiggyBank, Receipt,
  Eye, Send,
} from 'lucide-react'
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer,
} from 'recharts'

// ── Mock Data ──────────────────────────────────────────────
const monthlyData = [
  { month: 'Feb', income: 80,  expense: 55, profit: 25 },
  { month: 'Mar', income: 55,  expense: 48, profit: 7  },
  { month: 'Apr', income: 92,  expense: 61, profit: 31 },
  { month: 'May', income: 74,  expense: 52, profit: 22 },
  { month: 'Jun', income: 110, expense: 68, profit: 42 },
  { month: 'Jul', income: 125, expense: 74, profit: 51 },
]

const invoices = [
  { id: 'INV-324', project: 'Oberoi Residency Tower',   client: 'Oberoi Group',    amount: 4850000,  raised: '01 Jul 2025', due: '31 Jul 2025', status: 'overdue',  type: 'progress' },
  { id: 'INV-323', project: 'Tech Park MEP Works',      client: 'Raheja Corp',     amount: 2200000,  raised: '10 Jul 2025', due: '09 Aug 2025', status: 'pending',  type: 'progress' },
  { id: 'INV-322', project: 'Kohinoor Mall Interior',   client: 'Kohinoor Infra',  amount: 1550000,  raised: '15 Jul 2025', due: '14 Aug 2025', status: 'pending',  type: 'progress' },
  { id: 'INV-321', project: 'Structural Audit SEEPZ',   client: 'MIDC',            amount: 1200000,  raised: '01 Jul 2025', due: '31 Jul 2025', status: 'paid',     type: 'final'    },
  { id: 'INV-320', project: 'Villa Renovation Bandra',  client: 'Private Client',  amount: 850000,   raised: '20 Jun 2025', due: '20 Jul 2025', status: 'paid',     type: 'advance'  },
  { id: 'INV-319', project: 'Lodha Commercial Fit-out', client: 'Lodha Group',     amount: 3100000,  raised: '25 Jun 2025', due: '25 Jul 2025', status: 'overdue',  type: 'progress' },
  { id: 'INV-318', project: 'Tech Park MEP Works',      client: 'Raheja Corp',     amount: 1450000,  raised: '01 Jun 2025', due: '01 Jul 2025', status: 'paid',     type: 'advance'  },
]

const expenses = [
  { id: 'EXP-201', category: 'Materials',  desc: 'TMT Steel — 15 MT',           project: 'Oberoi Tower',   amount: 840000,  date: '28 Jul 2025', status: 'approved', vendor: 'Tata Steel Ltd'      },
  { id: 'EXP-200', category: 'Labour',     desc: 'July wages — Oberoi site',     project: 'Oberoi Tower',   amount: 420000,  date: '27 Jul 2025', status: 'approved', vendor: 'Internal'            },
  { id: 'EXP-199', category: 'Machinery',  desc: 'JCB rental — 3 months',        project: 'Kohinoor Mall',  amount: 360000,  date: '25 Jul 2025', status: 'pending',  vendor: 'Ramesh Machinery'    },
  { id: 'EXP-198', category: 'Materials',  desc: 'Cement — 500 bags',            project: 'Oberoi Tower',   amount: 175000,  date: '22 Jul 2025', status: 'approved', vendor: 'UltraTech Cement'    },
  { id: 'EXP-197', category: 'Overheads',  desc: 'Site office rent — July',      project: 'Tech Park MEP',  amount: 45000,   date: '01 Jul 2025', status: 'approved', vendor: 'Property Owner'      },
  { id: 'EXP-196', category: 'Materials',  desc: 'Plumbing fittings — CPVC',     project: 'Tech Park MEP',  amount: 128000,  date: '18 Jul 2025', status: 'pending',  vendor: 'Supreme Industries'  },
]

const transactions = [
  { desc: 'Payment received — Raheja Corp',      amount: 2200000,  date: 'Today 11:24 AM',  type: 'credit', ref: 'NEFT/REF-2841' },
  { desc: 'Vendor payment — Tata Steel',         amount: -840000,  date: 'Today 09:10 AM',  type: 'debit',  ref: 'NEFT/REF-2840' },
  { desc: 'Advance received — Lodha Group',      amount: 1500000,  date: 'Yesterday',        type: 'credit', ref: 'RTGS/REF-2839' },
  { desc: 'Labour wages — July batch',           amount: -420000,  date: 'Yesterday',        type: 'debit',  ref: 'CASH/PAY-182'  },
  { desc: 'Equipment rental — JCB',              amount: -360000,  date: '28 Jul',           type: 'debit',  ref: 'CHQ/REF-2835'  },
  { desc: 'Payment received — MIDC',             amount: 1200000,  date: '27 Jul',           type: 'credit', ref: 'NEFT/REF-2834' },
  { desc: 'Cement purchase — UltraTech',         amount: -175000,  date: '25 Jul',           type: 'debit',  ref: 'NEFT/REF-2833' },
  { desc: 'Site office rent payment',            amount: -45000,   date: '01 Jul',           type: 'debit',  ref: 'NEFT/REF-2820' },
]

const expenseCategories = [
  { name: 'Materials',  amount: 1143000, pct: 38, color: 'bg-blue-500'   },
  { name: 'Labour',     amount: 780000,  pct: 26, color: 'bg-purple-500' },
  { name: 'Machinery',  amount: 450000,  pct: 15, color: 'bg-teal-500'   },
  { name: 'Overheads',  amount: 360000,  pct: 12, color: 'bg-amber-500'  },
  { name: 'Misc',       amount: 267000,  pct: 9,  color: 'bg-slate-500'  },
]

// ── Helpers ────────────────────────────────────────────────
const formatINR = (n) => {
  const abs = Math.abs(n)
  if (abs >= 10000000) return `₹${(abs/10000000).toFixed(2)} Cr`
  if (abs >= 100000)   return `₹${(abs/100000).toFixed(1)} L`
  return `₹${new Intl.NumberFormat('en-IN').format(abs)}`
}

const InvoiceStatusBadge = ({ status }) => {
  const map = {
    paid:    { label: 'Paid',    cls: 'bg-green-900/40 text-green-400 border-green-800', icon: <CheckCircle2 size={11}/> },
    pending: { label: 'Pending', cls: 'bg-amber-900/40 text-amber-400 border-amber-800', icon: <Clock        size={11}/> },
    overdue: { label: 'Overdue', cls: 'bg-red-900/40   text-red-400   border-red-800',   icon: <AlertCircle  size={11}/> },
    draft:   { label: 'Draft',   cls: 'bg-slate-800    text-slate-400 border-slate-700', icon: <FileText     size={11}/> },
  }
  const { label, cls, icon } = map[status] || map.pending
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 w-fit ${cls}`}>
      {icon}{label}
    </span>
  )
}

const ExpenseStatusBadge = ({ status }) => {
  const map = {
    approved: { label: 'Approved', cls: 'bg-green-900/40 text-green-400 border-green-800' },
    pending:  { label: 'Pending',  cls: 'bg-amber-900/40 text-amber-400 border-amber-800' },
    rejected: { label: 'Rejected', cls: 'bg-red-900/40   text-red-400   border-red-800'   },
  }
  const { label, cls } = map[status] || map.pending
  return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>{label}</span>
}

const CategoryColor = (cat) => {
  const m = {
    Materials: 'bg-blue-900/30  text-blue-400',
    Labour:    'bg-purple-900/30 text-purple-400',
    Machinery: 'bg-teal-900/30  text-teal-400',
    Overheads: 'bg-amber-900/30 text-amber-400',
    Misc:      'bg-slate-800    text-slate-400',
  }
  return m[cat] || 'bg-slate-800 text-slate-400'
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: ₹{p.value}L
        </p>
      ))}
    </div>
  )
}

// ── New Invoice Form ───────────────────────────────────────
function NewInvoiceForm({ onBack }) {
  const [client,    setClient]    = useState('Oberoi Group')
  const [project,   setProject]   = useState('')
  const [amount,    setAmount]    = useState('')
  const [type,      setType]      = useState('progress')
  const [dueDate,   setDueDate]   = useState('')
  const [notes,     setNotes]     = useState('')
  const gst     = Number(amount) * 0.18
  const total   = Number(amount) + gst

  return (
    <div className="space-y-6">
      <div>
        <button onClick={onBack} className="text-xs text-slate-500 hover:text-slate-300 mb-2 flex items-center gap-1">
          ← Back to Finance
        </button>
        <h1 className="text-xl font-bold text-white">Create New Invoice</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Invoice Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Client</label>
                <select value={client} onChange={e=>setClient(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  {['Oberoi Group','Raheja Corp','Lodha Group','Kohinoor Infra','MIDC'].map(c=>
                    <option key={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Project</label>
                <input value={project} onChange={e=>setProject(e.target.value)}
                  placeholder="Select or type project"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Invoice Type</label>
                <select value={type} onChange={e=>setType(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  {['advance','progress','milestone','final'].map(t=>
                    <option key={t} value={t} className="capitalize">{t.charAt(0).toUpperCase()+t.slice(1)} Invoice</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Due Date</label>
                <input type="date" value={dueDate} onChange={e=>setDueDate(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-slate-400 mb-1.5">Base Amount (₹)</label>
                <input type="number" value={amount} onChange={e=>setAmount(e.target.value)}
                  placeholder="0"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-slate-400 mb-1.5">Notes</label>
                <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}
                  placeholder="Payment terms, bank details, notes..."
                  className="w-full bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"/>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 h-fit sticky top-6">
          <h2 className="text-sm font-semibold text-white mb-4">Invoice Summary</h2>
          <div className="space-y-3 mb-5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Base Amount</span>
              <span className="text-white">{amount ? formatINR(Number(amount)) : '₹0'}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">GST (18%)</span>
              <span className="text-white">{amount ? formatINR(gst) : '₹0'}</span>
            </div>
            <div className="border-t border-slate-700 pt-3 flex justify-between">
              <span className="text-white font-semibold">Total</span>
              <span className="text-xl font-bold text-blue-400">{amount ? formatINR(total) : '₹0'}</span>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2">
              <Send size={14}/> Send Invoice
            </button>
            <button className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm py-2.5 rounded-lg flex items-center justify-center gap-2">
              <Download size={14}/> Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────
export default function FinancePage() {
  const [activeTab, setActiveTab] = useState('overview')
  const [view,      setView]      = useState('main')

  if (view === 'new-invoice') return <NewInvoiceForm onBack={() => setView('main')} />

  const totalBilled      = invoices.reduce((s, i) => s + i.amount, 0)
  const totalReceived    = invoices.filter(i => i.status === 'paid').reduce((s, i) => s + i.amount, 0)
  const totalOutstanding = invoices.filter(i => i.status === 'pending').reduce((s, i) => s + i.amount, 0)
  const totalOverdue     = invoices.filter(i => i.status === 'overdue').reduce((s, i) => s + i.amount, 0)

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Finance</h1>
          <p className="text-slate-400 text-sm mt-0.5">Invoices, expenses & financial reports</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg transition flex items-center gap-1">
            <Download size={13}/> Export
          </button>
          <button
            onClick={() => setView('new-invoice')}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1">
            <Plus size={14}/> New Invoice
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Billed',    value: formatINR(totalBilled),      sub: 'FY 2025–26',          icon: Receipt,    color: 'bg-blue-600',   trend: '+18%', up: true  },
          { label: 'Amount Received', value: formatINR(totalReceived),    sub: 'Collection rate 63%', icon: PiggyBank,  color: 'bg-green-600',  trend: '+11%', up: true  },
          { label: 'Outstanding',     value: formatINR(totalOutstanding), sub: 'Awaiting payment',    icon: Clock,      color: 'bg-amber-600',  trend: '2 inv',up: null  },
          { label: 'Overdue',         value: formatINR(totalOverdue),     sub: 'Action needed',       icon: AlertCircle,color: 'bg-red-600',    trend: '-8%',  up: false },
        ].map((k, i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${k.color}`}>
                <k.icon size={20} className="text-white"/>
              </div>
              {k.up !== null && (
                <span className={`flex items-center gap-1 text-xs font-medium ${k.up ? 'text-green-400' : 'text-red-400'}`}>
                  {k.up ? <TrendingUp size={12}/> : <TrendingDown size={12}/>} {k.trend}
                </span>
              )}
            </div>
            <p className="text-2xl font-bold text-white">{k.value}</p>
            <p className="text-sm text-slate-400 mt-0.5">{k.label}</p>
            <p className="text-xs text-slate-600 mt-1">{k.sub}</p>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="flex gap-1 bg-slate-900 border border-slate-800 rounded-xl p-1 w-fit">
        {['overview','invoices','expenses','transactions'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition capitalize ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── OVERVIEW TAB ── */}
      {activeTab === 'overview' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            {/* Income vs Expense */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-white mb-1">Income vs Expense</h2>
              <p className="text-xs text-slate-500 mb-4">Last 6 months (₹ Lakhs)</p>
              <ResponsiveContainer width="100%" height={200}>
                <AreaChart data={monthlyData} margin={{ top:5, right:5, left:-20, bottom:0 }}>
                  <defs>
                    <linearGradient id="incGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                    </linearGradient>
                    <linearGradient id="expGrad2" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.2}/>
                      <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
                  <XAxis dataKey="month" tick={{ fill:'#64748b', fontSize:11 }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fill:'#64748b', fontSize:11 }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Area type="monotone" dataKey="income"  name="Income"  stroke="#22c55e" strokeWidth={2} fill="url(#incGrad)"/>
                  <Area type="monotone" dataKey="expense" name="Expense" stroke="#ef4444" strokeWidth={2} fill="url(#expGrad2)"/>
                </AreaChart>
              </ResponsiveContainer>
            </div>

            {/* Profit Trend */}
            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-white mb-1">Net Profit Trend</h2>
              <p className="text-xs text-slate-500 mb-4">Monthly profit (₹ Lakhs)</p>
              <ResponsiveContainer width="100%" height={200}>
                <BarChart data={monthlyData} margin={{ top:5, right:5, left:-20, bottom:0 }}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
                  <XAxis dataKey="month" tick={{ fill:'#64748b', fontSize:11 }} axisLine={false} tickLine={false}/>
                  <YAxis tick={{ fill:'#64748b', fontSize:11 }} axisLine={false} tickLine={false}/>
                  <Tooltip content={<CustomTooltip/>}/>
                  <Bar dataKey="profit" name="Profit" fill="#3b82f6" radius={[4,4,0,0]}/>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Expense Breakdown + Recent Transactions */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <h2 className="text-sm font-semibold text-white mb-4">Expense Breakdown</h2>
              <div className="space-y-3">
                {expenseCategories.map(e => (
                  <div key={e.name}>
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-400">{e.name}</span>
                      <span className="text-white font-medium">{formatINR(e.amount)} <span className="text-slate-500">({e.pct}%)</span></span>
                    </div>
                    <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                      <div className={`h-full rounded-full ${e.color}`} style={{ width:`${e.pct}%` }}/>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-semibold text-white">Recent Transactions</h2>
                <button onClick={() => setActiveTab('transactions')} className="text-xs text-blue-400 hover:text-blue-300">View all</button>
              </div>
              <div className="space-y-1">
                {transactions.slice(0,5).map((t, i) => (
                  <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0">
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                        t.type === 'credit' ? 'bg-green-900/40' : 'bg-red-900/40'
                      }`}>
                        {t.type === 'credit'
                          ? <ArrowDownLeft size={14} className="text-green-400"/>
                          : <ArrowUpRight  size={14} className="text-red-400"/>
                        }
                      </div>
                      <div>
                        <p className="text-xs text-slate-300">{t.desc}</p>
                        <p className="text-xs text-slate-600">{t.date}</p>
                      </div>
                    </div>
                    <span className={`text-sm font-semibold ${t.type==='credit' ? 'text-green-400' : 'text-red-400'}`}>
                      {t.type === 'credit' ? '+' : '-'}{formatINR(Math.abs(t.amount))}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ── INVOICES TAB ── */}
      {activeTab === 'invoices' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 flex-1 max-w-sm">
              <Search size={14} className="text-slate-500"/>
              <input placeholder="Search invoices..." className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"/>
            </div>
            <button className="flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-2 rounded-lg">
              <Filter size={13}/> Filter
            </button>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800">
                  <th className="text-left px-5 py-3 font-medium">Invoice</th>
                  <th className="text-left px-5 py-3 font-medium">Client</th>
                  <th className="text-left px-5 py-3 font-medium">Project</th>
                  <th className="text-left px-5 py-3 font-medium">Type</th>
                  <th className="text-left px-5 py-3 font-medium">Amount</th>
                  <th className="text-left px-5 py-3 font-medium">Due</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                  <th className="text-left px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {invoices.map(inv => (
                  <tr key={inv.id} className="hover:bg-slate-800/50 transition cursor-pointer">
                    <td className="px-5 py-4 text-blue-400 font-medium">{inv.id}</td>
                    <td className="px-5 py-4 text-white font-medium text-xs">{inv.client}</td>
                    <td className="px-5 py-4 text-slate-400 text-xs max-w-40 truncate">{inv.project}</td>
                    <td className="px-5 py-4">
                      <span className="text-xs bg-slate-800 text-slate-300 px-2 py-0.5 rounded capitalize">{inv.type}</span>
                    </td>
                    <td className="px-5 py-4 text-white font-medium">{formatINR(inv.amount)}</td>
                    <td className="px-5 py-4 text-slate-400 text-xs">{inv.due}</td>
                    <td className="px-5 py-4"><InvoiceStatusBadge status={inv.status}/></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-slate-500 hover:text-blue-400 transition"><Eye  size={14}/></button>
                        <button className="text-slate-500 hover:text-blue-400 transition"><Send size={14}/></button>
                        <button className="text-slate-500 hover:text-blue-400 transition"><Download size={14}/></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── EXPENSES TAB ── */}
      {activeTab === 'expenses' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 w-64">
              <Search size={14} className="text-slate-500"/>
              <input placeholder="Search expenses..." className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"/>
            </div>
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus size={13}/> Add Expense
            </button>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800">
                  <th className="text-left px-5 py-3 font-medium">ID</th>
                  <th className="text-left px-5 py-3 font-medium">Description</th>
                  <th className="text-left px-5 py-3 font-medium">Category</th>
                  <th className="text-left px-5 py-3 font-medium">Project</th>
                  <th className="text-left px-5 py-3 font-medium">Vendor</th>
                  <th className="text-left px-5 py-3 font-medium">Amount</th>
                  <th className="text-left px-5 py-3 font-medium">Date</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {expenses.map(exp => (
                  <tr key={exp.id} className="hover:bg-slate-800/50 transition cursor-pointer">
                    <td className="px-5 py-3 text-slate-500 text-xs">{exp.id}</td>
                    <td className="px-5 py-3 text-slate-300 font-medium text-xs">{exp.desc}</td>
                    <td className="px-5 py-3">
                      <span className={`text-xs px-2 py-0.5 rounded font-medium ${CategoryColor(exp.category)}`}>
                        {exp.category}
                      </span>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{exp.project}</td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{exp.vendor}</td>
                    <td className="px-5 py-3 text-white font-medium">{formatINR(exp.amount)}</td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{exp.date}</td>
                    <td className="px-5 py-3"><ExpenseStatusBadge status={exp.status}/></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── TRANSACTIONS TAB ── */}
      {activeTab === 'transactions' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">All Transactions</h2>
            <button className="text-xs bg-slate-800 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Download size={13}/> Export
            </button>
          </div>
          <div className="space-y-1">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-3.5 border-b border-slate-800 last:border-0 hover:bg-slate-800/30 px-2 rounded-lg transition cursor-pointer">
                <div className="flex items-center gap-3">
                  <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                    t.type === 'credit' ? 'bg-green-900/40' : 'bg-red-900/40'
                  }`}>
                    {t.type === 'credit'
                      ? <ArrowDownLeft size={16} className="text-green-400"/>
                      : <ArrowUpRight  size={16} className="text-red-400"/>
                    }
                  </div>
                  <div>
                    <p className="text-sm text-slate-300 font-medium">{t.desc}</p>
                    <p className="text-xs text-slate-600 mt-0.5">{t.ref} · {t.date}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className={`text-base font-bold ${t.type==='credit' ? 'text-green-400' : 'text-red-400'}`}>
                    {t.type === 'credit' ? '+' : '-'}{formatINR(Math.abs(t.amount))}
                  </p>
                  <p className="text-xs text-slate-600 mt-0.5">{t.type === 'credit' ? 'Credit' : 'Debit'}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

    </div>
  )
}
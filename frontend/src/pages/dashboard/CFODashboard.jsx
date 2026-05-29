import {
  TrendingUp, TrendingDown, IndianRupee,
  AlertCircle, PiggyBank, Receipt,
  ArrowDownLeft, ArrowUpRight as ArrowOut,
  ArrowUpRight, AlertTriangle, Clock,
  Building2, CreditCard, Zap, Eye
} from 'lucide-react'
import {
  AreaChart, Area, LineChart, Line, XAxis, YAxis,
  CartesianGrid, Tooltip, ResponsiveContainer
} from 'recharts'

// ── Mock Data ──────────────────────────────────────────────
const cashFlowData = [
  { month: 'Jan', inflow: 65,  outflow: 42 },
  { month: 'Feb', inflow: 80,  outflow: 55 },
  { month: 'Mar', inflow: 55,  outflow: 48 },
  { month: 'Apr', inflow: 92,  outflow: 61 },
  { month: 'May', inflow: 74,  outflow: 52 },
  { month: 'Jun', inflow: 110, outflow: 68 },
  { month: 'Jul', inflow: 98,  outflow: 59 },
  { month: 'Aug', inflow: 125, outflow: 74 },
]

const plData = [
  { month: 'Jan', gross: 65,  net: 23 },
  { month: 'Feb', gross: 80,  net: 25 },
  { month: 'Mar', gross: 55,  net: 7  },
  { month: 'Apr', gross: 92,  net: 31 },
  { month: 'May', gross: 74,  net: 22 },
  { month: 'Jun', gross: 110, net: 42 },
  { month: 'Jul', gross: 98,  net: 39 },
  { month: 'Aug', gross: 125, net: 51 },
]

const expenseBreakdown = [
  { category: 'Materials',  amount: 185, pct: 38 },
  { category: 'Labour',     amount: 124, pct: 26 },
  { category: 'Machinery',  amount: 72,  pct: 15 },
  { category: 'Overheads',  amount: 58,  pct: 12 },
  { category: 'Misc',       amount: 43,  pct: 9  },
]

const invoices = [
  { id: 'INV-324', project: 'Oberoi Residency Tower',  client: 'Oberoi Group',    amount: '₹48.5 L', due: '05 Aug 2025', status: 'overdue'  },
  { id: 'INV-323', project: 'Tech Park MEP Works',     client: 'Raheja Corp',     amount: '₹22.0 L', due: '12 Aug 2025', status: 'pending'  },
  { id: 'INV-322', project: 'Kohinoor Mall Interior',  client: 'Kohinoor Infra',  amount: '₹15.5 L', due: '18 Aug 2025', status: 'pending'  },
  { id: 'INV-321', project: 'Structural Audit SEEPZ',  client: 'MIDC',            amount: '₹12.0 L', due: '22 Jul 2025', status: 'paid'     },
  { id: 'INV-320', project: 'Villa Renovation Bandra', client: 'Private Client',  amount: '₹8.5 L',  due: '28 Jul 2025', status: 'paid'     },
  { id: 'INV-319', project: 'Lodha Commercial Fit-out',client: 'Lodha Group',     amount: '₹31.0 L', due: '02 Aug 2025', status: 'overdue'  },
]

const transactions = [
  { desc: 'Payment received — Raheja Corp',       amount: '+₹22L',  date: 'Today, 11:24 AM',  type: 'credit' },
  { desc: 'Vendor payment — Steel suppliers',     amount: '-₹8.4L', date: 'Today, 09:10 AM',  type: 'debit'  },
  { desc: 'Advance received — Lodha Group',       amount: '+₹15L',  date: 'Yesterday',         type: 'credit' },
  { desc: 'Labour wages — July batch',            amount: '-₹12L',  date: 'Yesterday',         type: 'debit'  },
  { desc: 'Equipment rental — JCB 3 months',     amount: '-₹3.6L', date: '28 Jul',            type: 'debit'  },
  { desc: 'Payment received — MIDC',              amount: '+₹12L',  date: '27 Jul',            type: 'credit' },
]

// ── Sub-components ──────────────────────────────────────────
const KPICard = ({ label, value, sub, icon: Icon, trend, trendVal, colorGradient }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 transition-all hover:shadow-md">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${colorGradient}`}>
        <Icon size={20} className="text-white" />
      </div>
      {trend && (
        <span className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-600' : 'text-red-600'}`}>
          {trend === 'up' ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {trendVal}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-gray-900">{value}</p>
    <p className="text-sm text-gray-500 mt-0.5">{label}</p>
    {sub && <p className="text-xs text-gray-400 mt-1">{sub}</p>}
  </div>
)

const InvoiceBadge = ({ status }) => {
  const map = {
    paid:    { label: 'Paid',    cls: 'bg-green-100 text-green-700 border-green-200' },
    pending: { label: 'Pending', cls: 'bg-amber-100 text-amber-700 border-amber-200' },
    overdue: { label: 'Overdue', cls: 'bg-red-100 text-red-700 border-red-200'   },
  }
  const { label, cls } = map[status]
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>
      {label}
    </span>
  )
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-gray-500 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: ₹{p.value}L
        </p>
      ))}
    </div>
  )
}

// Executive Summary Component for CFO First View (Mobile One-Thumb Decision)
const ExecutiveSummary = () => {
  // Compute insights from existing data
  const overdueTotal = invoices.filter(inv => inv.status === 'overdue').reduce((sum, inv) => {
    const val = parseFloat(inv.amount.replace('₹', '').replace(' L', ''))
    return sum + val
  }, 0)
  const overdueCount = invoices.filter(inv => inv.status === 'overdue').length
  const latestMonth = cashFlowData[cashFlowData.length - 1]
  const prevMonth = cashFlowData[cashFlowData.length - 2]
  const netCashFlow = latestMonth.inflow - latestMonth.outflow
  const netCashFlowPrev = prevMonth.inflow - prevMonth.outflow
  const cashTrend = netCashFlow - netCashFlowPrev
  const lastMonthPL = plData[plData.length - 1]
  const netMargin = ((lastMonthPL.net / lastMonthPL.gross) * 100).toFixed(1)
  
  const highRiskProjects = invoices.filter(inv => inv.status === 'overdue').map(inv => inv.project.split(' ')[0])
  
  return (
    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl border border-blue-100 p-5 shadow-sm">
      <div className="flex items-center gap-2 mb-4">
        <Zap className="text-blue-600" size={18} />
        <h2 className="text-sm font-bold text-gray-800 uppercase tracking-wide">Executive Summary · One-Thumb Decision</h2>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* Critical Alerts Card */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border-l-4 border-red-500 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <AlertTriangle size={16} className="text-red-500" />
              <span className="text-xs font-semibold text-red-600">URGENT ATTENTION</span>
            </div>
            <span className="text-xs bg-red-100 text-red-700 px-2 py-0.5 rounded-full">{overdueCount} items</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">₹{overdueTotal} L</p>
          <p className="text-xs text-gray-600 mt-1">Overdue receivables</p>
          {highRiskProjects.length > 0 && (
            <div className="mt-2 text-xs text-gray-600">
              <span className="font-medium">At risk:</span> {highRiskProjects.join(', ')}
            </div>
          )}
          <button className="mt-3 text-xs font-medium text-red-600 hover:text-red-700 flex items-center gap-1">
            Send reminders <ArrowUpRight size={12} />
          </button>
        </div>

        {/* Cash Flow Pulse */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border-l-4 border-emerald-500 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2">
              <CreditCard size={16} className="text-emerald-600" />
              <span className="text-xs font-semibold text-emerald-700">CASH FLOW PULSE</span>
            </div>
            {cashTrend > 0 ? <TrendingUp size={14} className="text-emerald-500" /> : <TrendingDown size={14} className="text-red-500" />}
          </div>
          <p className={`text-2xl font-bold ${netCashFlow >= 0 ? 'text-emerald-600' : 'text-red-600'}`}>
            ₹{netCashFlow} L
          </p>
          <p className="text-xs text-gray-600 mt-1">Net cash flow (current month)</p>
          <div className="mt-2 flex items-center gap-2 text-xs">
            <span className="text-gray-500">Inflow ₹{latestMonth.inflow}L</span>
            <span className="text-gray-300">|</span>
            <span className="text-gray-500">Outflow ₹{latestMonth.outflow}L</span>
          </div>
          <div className="mt-2 w-full bg-gray-100 rounded-full h-1.5">
            <div className="bg-emerald-500 h-1.5 rounded-full" style={{ width: `${(latestMonth.inflow / (latestMonth.inflow + latestMonth.outflow)) * 100}%` }} />
          </div>
        </div>

        {/* Operational Risk & Margins */}
        <div className="bg-white/80 backdrop-blur-sm rounded-lg p-4 border-l-4 border-purple-500 shadow-sm">
          <div className="flex items-center gap-2 mb-2">
            <Building2 size={16} className="text-purple-600" />
            <span className="text-xs font-semibold text-purple-700">PROJECT HEALTH</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">{netMargin}%</p>
          <p className="text-xs text-gray-600 mt-1">Net margin (current month)</p>
          <div className="mt-2 text-xs text-gray-600 space-y-1">
            <div className="flex justify-between">
              <span>Gross profit</span>
              <span className="font-medium">₹{lastMonthPL.gross}L</span>
            </div>
            <div className="flex justify-between">
              <span>Net profit</span>
              <span className="font-medium">₹{lastMonthPL.net}L</span>
            </div>
          </div>
          {parseFloat(netMargin) < 15 && (
            <div className="mt-2 flex items-center gap-1 text-amber-600 text-xs">
              <AlertCircle size={12} />
              <span>Margin below target (18%)</span>
            </div>
          )}
        </div>
      </div>

      {/* Quick Action Row for mobile */}
      <div className="mt-4 flex flex-wrap gap-2 justify-between items-center pt-2 border-t border-blue-100">
        <div className="flex items-center gap-2 text-xs text-gray-600">
          <Clock size={12} />
          <span>Last sync: Today, 09:45 AM</span>
        </div>
        <div className="flex gap-2">
          <button className="text-xs bg-white border border-gray-200 rounded-lg px-3 py-1.5 text-gray-700 hover:bg-gray-50 flex items-center gap-1 shadow-sm">
            <Eye size={12} /> View Cash Flow
          </button>
          <button className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg px-3 py-1.5 shadow-sm hover:shadow transition">
            + Raise Alert
          </button>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────
export default function CFODashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">

      {/* Header with Gradient Branding */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <div className="flex items-center gap-2">
            <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">CFO Command Center</h1>
          </div>
          <p className="text-gray-500 text-sm mt-0.5 ml-3">Architecture · Engineering · Construction · Interiors · Repairs | Indian Turnkey & Multi‑Project Business</p>
          <p className="text-gray-400 text-xs ml-3 mt-1">P&L, Cash Flow & Invoicing · July 2025</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg transition shadow-sm flex items-center gap-1">
            Export Report <ArrowUpRight size={12} />
          </button>
          <button className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-1.5 rounded-lg transition shadow-sm flex items-center gap-1">
            + New Invoice
          </button>
        </div>
      </div>

      {/* NEW: Executive Summary for CFO First View (Mobile Optimized) */}
      <ExecutiveSummary />

      {/* KPI Cards with Gradients */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Billed"       value="₹4.82 Cr" sub="FY 2025–26"         icon={IndianRupee} trend="up"   trendVal="+18%" colorGradient="from-blue-500 to-blue-600"   />
        <KPICard label="Amount Received"    value="₹3.61 Cr" sub="75% collection rate" icon={PiggyBank}   trend="up"   trendVal="+11%" colorGradient="from-emerald-500 to-teal-600"  />
        <KPICard label="Outstanding"        value="₹1.21 Cr" sub="14 invoices pending" icon={Receipt}     trend="down" trendVal="-8%"  colorGradient="from-amber-500 to-orange-600"  />
        <KPICard label="Overdue"            value="₹79.5 L"  sub="2 invoices overdue"  icon={AlertCircle} trend="down" trendVal="+3%"  colorGradient="from-red-500 to-rose-600"    />
      </div>

      {/* Cash Flow + P&L */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Cash Flow */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">Cash Flow</h2>
              <p className="text-xs text-gray-500">Inflow vs Outflow (₹ Lakhs)</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-green-500"></span>Inflow</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-red-400"></span>Outflow</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={cashFlowData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="inGradLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}   />
                </linearGradient>
                <linearGradient id="outGradLight" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.15} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="inflow"  name="Inflow"  stroke="#22c55e" strokeWidth={2} fill="url(#inGradLight)"  />
              <Area type="monotone" dataKey="outflow" name="Outflow" stroke="#ef4444" strokeWidth={2} fill="url(#outGradLight)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* P&L Line Chart */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-gray-800">Profit & Loss</h2>
              <p className="text-xs text-gray-500">Gross vs Net Profit (₹ Lakhs)</p>
            </div>
            <div className="flex gap-3 text-xs">
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-blue-500"></span>Gross</span>
              <span className="flex items-center gap-1"><span className="w-2 h-2 rounded-full bg-purple-500"></span>Net</span>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={plData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis dataKey="month" tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#6b7280', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Line type="monotone" dataKey="gross" name="Gross"  stroke="#3b82f6" strokeWidth={2} dot={{ fill: '#3b82f6', r: 3 }} />
              <Line type="monotone" dataKey="net"   name="Net"    stroke="#a855f7" strokeWidth={2} dot={{ fill: '#a855f7', r: 3 }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Expense Breakdown + Recent Transactions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

        {/* Expense Breakdown */}
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <h2 className="text-sm font-semibold text-gray-800 mb-1">Expense Breakdown</h2>
          <p className="text-xs text-gray-500 mb-4">Total ₹4.82 Cr spent</p>
          <div className="space-y-3">
            {expenseBreakdown.map((e) => (
              <div key={e.category}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-gray-600">{e.category}</span>
                  <span className="text-gray-800 font-medium">₹{e.amount}L <span className="text-gray-400">({e.pct}%)</span></span>
                </div>
                <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    style={{ width: `${e.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-gray-800">Recent Transactions</h2>
            <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="space-y-1">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-gray-100 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    t.type === 'credit' ? 'bg-emerald-50' : 'bg-red-50'
                  }`}>
                    {t.type === 'credit'
                      ? <ArrowDownLeft size={14} className="text-emerald-600" />
                      : <ArrowOut      size={14} className="text-red-500"   />
                    }
                  </div>
                  <div>
                    <p className="text-sm text-gray-700">{t.desc}</p>
                    <p className="text-xs text-gray-400">{t.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${
                  t.type === 'credit' ? 'text-emerald-600' : 'text-red-500'
                }`}>
                  {t.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-gray-800">Invoice Tracker</h2>
          <button className="text-xs text-blue-600 hover:text-blue-700 flex items-center gap-1">
            View all invoices <ArrowUpRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-200">
                <th className="text-left pb-3 font-medium">Invoice</th>
                <th className="text-left pb-3 font-medium">Project</th>
                <th className="text-left pb-3 font-medium">Client</th>
                <th className="text-left pb-3 font-medium">Amount</th>
                <th className="text-left pb-3 font-medium">Due Date</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-left pb-3 font-medium">Action</th>
               </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {invoices.map((inv, i) => (
                <tr key={i} className="hover:bg-gray-50 transition cursor-pointer">
                  <td className="py-3 font-medium text-blue-600">{inv.id}</td>
                  <td className="py-3 text-gray-700 max-w-45 truncate">{inv.project}</td>
                  <td className="py-3 text-gray-500">{inv.client}</td>
                  <td className="py-3 text-gray-900 font-medium">{inv.amount}</td>
                  <td className="py-3 text-gray-500">{inv.due}</td>
                  <td className="py-3"><InvoiceBadge status={inv.status} /></td>
                  <td className="py-3">
                    <button className="text-xs text-blue-600 hover:text-blue-700 transition font-medium">
                      {inv.status === 'paid' ? 'View' : 'Send Reminder'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      </div>
    </div>
  )
}
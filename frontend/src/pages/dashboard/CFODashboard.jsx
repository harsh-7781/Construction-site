import {
  TrendingUp, TrendingDown, IndianRupee,
  AlertCircle, PiggyBank, Receipt,
  ArrowDownLeft, ArrowUpRight as ArrowOut,
  ArrowUpRight
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
const KPICard = ({ label, value, sub, icon: Icon, trend, trendVal, color }) => (
  <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${color}`}>
        <Icon size={20} className="text-white" />
      </div>
      {trend && (
        <span className={`flex items-center gap-1 text-xs font-medium ${trend === 'up' ? 'text-green-400' : 'text-red-400'}`}>
          {trend === 'up' ? <TrendingUp size={13} /> : <TrendingDown size={13} />}
          {trendVal}
        </span>
      )}
    </div>
    <p className="text-2xl font-bold text-white">{value}</p>
    <p className="text-sm text-slate-400 mt-0.5">{label}</p>
    {sub && <p className="text-xs text-slate-500 mt-1">{sub}</p>}
  </div>
)

const InvoiceBadge = ({ status }) => {
  const map = {
    paid:    { label: 'Paid',    cls: 'bg-green-900/40 text-green-400 border-green-800' },
    pending: { label: 'Pending', cls: 'bg-amber-900/40 text-amber-400 border-amber-800' },
    overdue: { label: 'Overdue', cls: 'bg-red-900/40   text-red-400   border-red-800'   },
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
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.name} style={{ color: p.color }} className="font-medium">
          {p.name}: ₹{p.value}L
        </p>
      ))}
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────
export default function CFODashboard() {
  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Financial Dashboard</h1>
          <p className="text-slate-400 text-sm mt-0.5">P&L, Cash Flow & Invoicing · July 2025</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 px-3 py-1.5 rounded-lg transition">
            Export Report
          </button>
          <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition">
            + New Invoice
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <KPICard label="Total Billed"       value="₹4.82 Cr" sub="FY 2025–26"         icon={IndianRupee} trend="up"   trendVal="+18%" color="bg-blue-600"   />
        <KPICard label="Amount Received"    value="₹3.61 Cr" sub="75% collection rate" icon={PiggyBank}   trend="up"   trendVal="+11%" color="bg-green-600"  />
        <KPICard label="Outstanding"        value="₹1.21 Cr" sub="14 invoices pending" icon={Receipt}     trend="down" trendVal="-8%"  color="bg-amber-600"  />
        <KPICard label="Overdue"            value="₹79.5 L"  sub="2 invoices overdue"  icon={AlertCircle} trend="down" trendVal="+3%"  color="bg-red-600"    />
      </div>

      {/* Cash Flow + P&L */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

        {/* Cash Flow */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Cash Flow</h2>
              <p className="text-xs text-slate-500">Inflow vs Outflow (₹ Lakhs)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <AreaChart data={cashFlowData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="inGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#22c55e" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#22c55e" stopOpacity={0}   />
                </linearGradient>
                <linearGradient id="outGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%"  stopColor="#ef4444" stopOpacity={0.2} />
                  <stop offset="95%" stopColor="#ef4444" stopOpacity={0}   />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Area type="monotone" dataKey="inflow"  name="Inflow"  stroke="#22c55e" strokeWidth={2} fill="url(#inGrad)"  />
              <Area type="monotone" dataKey="outflow" name="Outflow" stroke="#ef4444" strokeWidth={2} fill="url(#outGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* P&L Line Chart */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-semibold text-white">Profit & Loss</h2>
              <p className="text-xs text-slate-500">Gross vs Net Profit (₹ Lakhs)</p>
            </div>
          </div>
          <ResponsiveContainer width="100%" height={180}>
            <LineChart data={plData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" />
              <XAxis dataKey="month" tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: '#64748b', fontSize: 11 }} axisLine={false} tickLine={false} />
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
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
          <h2 className="text-sm font-semibold text-white mb-1">Expense Breakdown</h2>
          <p className="text-xs text-slate-500 mb-4">Total ₹4.82 Cr spent</p>
          <div className="space-y-3">
            {expenseBreakdown.map((e) => (
              <div key={e.category}>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span className="text-slate-400">{e.category}</span>
                  <span className="text-white font-medium">₹{e.amount}L <span className="text-slate-500">({e.pct}%)</span></span>
                </div>
                <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full bg-blue-500"
                    style={{ width: `${e.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Transactions */}
        <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Recent Transactions</h2>
            <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              View all <ArrowUpRight size={12} />
            </button>
          </div>
          <div className="space-y-1">
            {transactions.map((t, i) => (
              <div key={i} className="flex items-center justify-between py-2.5 border-b border-slate-800 last:border-0">
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                    t.type === 'credit' ? 'bg-green-900/40' : 'bg-red-900/40'
                  }`}>
                    {t.type === 'credit'
                      ? <ArrowDownLeft size={14} className="text-green-400" />
                      : <ArrowOut      size={14} className="text-red-400"   />
                    }
                  </div>
                  <div>
                    <p className="text-sm text-slate-300">{t.desc}</p>
                    <p className="text-xs text-slate-600">{t.date}</p>
                  </div>
                </div>
                <span className={`text-sm font-semibold ${
                  t.type === 'credit' ? 'text-green-400' : 'text-red-400'
                }`}>
                  {t.amount}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Invoice Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-sm font-semibold text-white">Invoice Tracker</h2>
          <button className="text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
            View all invoices <ArrowUpRight size={12} />
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-slate-500 border-b border-slate-800">
                <th className="text-left pb-3 font-medium">Invoice</th>
                <th className="text-left pb-3 font-medium">Project</th>
                <th className="text-left pb-3 font-medium">Client</th>
                <th className="text-left pb-3 font-medium">Amount</th>
                <th className="text-left pb-3 font-medium">Due Date</th>
                <th className="text-left pb-3 font-medium">Status</th>
                <th className="text-left pb-3 font-medium">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {invoices.map((inv, i) => (
                <tr key={i} className="hover:bg-slate-800/50 transition cursor-pointer">
                  <td className="py-3 font-medium text-blue-400">{inv.id}</td>
                  <td className="py-3 text-slate-300 max-w-45 truncate">{inv.project}</td>
                  <td className="py-3 text-slate-400">{inv.client}</td>
                  <td className="py-3 text-white font-medium">{inv.amount}</td>
                  <td className="py-3 text-slate-400">{inv.due}</td>
                  <td className="py-3"><InvoiceBadge status={inv.status} /></td>
                  <td className="py-3">
                    <button className="text-xs text-blue-400 hover:text-blue-300 transition">
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
  )
}
import { useState } from 'react'
import {
  ShoppingCart, Plus, Search, Filter, Download,
  Truck, CheckCircle2, Clock,
  XCircle, Building2, Phone, Mail, Star, TrendingUp,
   Eye, Edit3, 
  Calendar, Send, MapPin
} from 'lucide-react'
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer
} from 'recharts'

// ── Mock Data ──────────────────────────────────────────────
const purchaseOrders = [
  { id:'PO-1041', vendor:'Tata Steel Ltd',       item:'TMT Steel Fe500D — 20 MT',       project:'Oberoi Tower',   amount:1120000, ordered:'28 Jul 2025', delivery:'05 Aug 2025', status:'confirmed', category:'Materials'  },
  { id:'PO-1040', vendor:'UltraTech Cement',     item:'OPC 53 Grade Cement — 500 bags',  project:'Oberoi Tower',   amount:175000,  ordered:'27 Jul 2025', delivery:'30 Jul 2025', status:'delivered', category:'Materials'  },
  { id:'PO-1039', vendor:'Supreme Industries',   item:'CPVC Pipes 1" — 200 RFT',         project:'Tech Park MEP',  amount:128000,  ordered:'25 Jul 2025', delivery:'02 Aug 2025', status:'transit',   category:'Plumbing'   },
  { id:'PO-1038', vendor:'Ramesh Machinery',     item:'JCB 3CX — 3 month rental',        project:'Kohinoor Mall',  amount:360000,  ordered:'22 Jul 2025', delivery:'25 Jul 2025', status:'delivered', category:'Machinery'  },
  { id:'PO-1037', vendor:'Asian Paints',         item:'Apex Exterior Paint — 200 L',     project:'Villa Bandra',   amount:64000,   ordered:'20 Jul 2025', delivery:'28 Jul 2025', status:'delivered', category:'Finishes'   },
  { id:'PO-1036', vendor:'Gyproc India',         item:'Gypsum Board 12mm — 400 sheets',  project:'Kohinoor Mall',  amount:92000,   ordered:'18 Jul 2025', delivery:'10 Aug 2025', status:'confirmed', category:'Interior'   },
  { id:'PO-1035', vendor:'Havells India',        item:'FR Cables 2.5 sqmm — 500 m',      project:'Tech Park MEP',  amount:87500,   ordered:'15 Jul 2025', delivery:'22 Jul 2025', status:'cancelled', category:'Electrical' },
]

const vendors = [
  { id:'VND-01', name:'Tata Steel Ltd',      category:'Steel & Metal',   contact:'Rajan Mehta',   phone:'+91 98200 10001', email:'rajan@tatasteel.com',  rating:5, orders:12, totalValue:8400000,  status:'preferred', location:'Mumbai' },
  { id:'VND-02', name:'UltraTech Cement',    category:'Cement',          contact:'Priya Shah',    phone:'+91 98200 20002', email:'priya@ultratech.com',  rating:4, orders:18, totalValue:2100000,  status:'active',    location:'Mumbai' },
  { id:'VND-03', name:'Supreme Industries',  category:'Plumbing',        contact:'Suresh Kumar',  phone:'+91 98200 30003', email:'suresh@supreme.com',   rating:4, orders:8,  totalValue:1024000,  status:'active',    location:'Pune'   },
  { id:'VND-04', name:'Ramesh Machinery',    category:'Equipment Rental',contact:'Ramesh Patil',  phone:'+91 98200 40004', email:'ramesh@machinery.com', rating:3, orders:6,  totalValue:2160000,  status:'active',    location:'Mumbai' },
  { id:'VND-05', name:'Asian Paints',        category:'Paints & Finishes',contact:'Amit Joshi',   phone:'+91 98200 50005', email:'amit@asianpaints.com', rating:5, orders:9,  totalValue:576000,   status:'preferred', location:'Mumbai' },
  { id:'VND-06', name:'Gyproc India',        category:'Interior',        contact:'Nisha Doshi',   phone:'+91 98200 60006', email:'nisha@gyproc.com',     rating:4, orders:5,  totalValue:460000,   status:'active',    location:'Thane'  },
]

const materialRequests = [
  { id:'MR-301', material:'Plywood Sheets 18mm',    qty:'40 Nos',  project:'Oberoi Tower',  requestedBy:'Vikram Singh', date:'29 Jul 2025', status:'approved',  urgency:'high'   },
  { id:'MR-300', material:'Binding Wire',           qty:'50 Kg',   project:'Oberoi Tower',  requestedBy:'Ram Shinde',   date:'28 Jul 2025', status:'ordered',   urgency:'medium' },
  { id:'MR-299', material:'Vitrified Tiles 600x600',qty:'300 M²',  project:'Kohinoor Mall', requestedBy:'Arjun Kumar',  date:'27 Jul 2025', status:'pending',   urgency:'high'   },
  { id:'MR-298', material:'PVC Conduit 25mm',       qty:'200 RFT', project:'Tech Park MEP', requestedBy:'Nitin Desai',  date:'26 Jul 2025', status:'approved',  urgency:'low'    },
  { id:'MR-297', material:'Marble Flooring Slabs',  qty:'150 M²',  project:'Villa Bandra',  requestedBy:'Suresh Patil', date:'25 Jul 2025', status:'pending',   urgency:'medium' },
]

const deliveries = [
  { id:'DEL-201', po:'PO-1039', vendor:'Supreme Industries', item:'CPVC Pipes',          project:'Tech Park MEP',  expected:'02 Aug 2025', status:'in-transit', driver:'Ramesh D.', vehicle:'MH-04 AB 1234' },
  { id:'DEL-200', po:'PO-1041', vendor:'Tata Steel Ltd',     item:'TMT Steel 20 MT',    project:'Oberoi Tower',   expected:'05 Aug 2025', status:'scheduled',  driver:'Pending',    vehicle:'Pending'       },
  { id:'DEL-199', po:'PO-1036', vendor:'Gyproc India',       item:'Gypsum Boards',      project:'Kohinoor Mall',  expected:'10 Aug 2025', status:'scheduled',  driver:'Pending',    vehicle:'Pending'       },
]

const spendData = [
  { month:'Feb', spend:48 },
  { month:'Mar', spend:62 },
  { month:'Apr', spend:55 },
  { month:'May', spend:78 },
  { month:'Jun', spend:91 },
  { month:'Jul', spend:84 },
]

const categorySpend = [
  { category:'Materials',  amount:4200000, pct:42, color:'bg-blue-500'   },
  { category:'Labour',     amount:2600000, pct:26, color:'bg-purple-500' },
  { category:'Machinery',  amount:1500000, pct:15, color:'bg-teal-500'   },
  { category:'Electrical', amount:870000,  pct:9,  color:'bg-amber-500'  },
  { category:'Finishes',   amount:640000,  pct:8,  color:'bg-orange-500' },
]

// ── Helpers ────────────────────────────────────────────────
const formatINR = (n) => {
  if (n >= 10000000) return `₹${(n/10000000).toFixed(2)} Cr`
  if (n >= 100000)   return `₹${(n/100000).toFixed(1)} L`
  return `₹${new Intl.NumberFormat('en-IN').format(n)}`
}

const POStatusBadge = ({ status }) => {
  const map = {
    confirmed: { label:'Confirmed', cls:'bg-blue-900/40  text-blue-400  border-blue-800',  icon:<CheckCircle2 size={11}/> },
    delivered: { label:'Delivered', cls:'bg-green-900/40 text-green-400 border-green-800', icon:<CheckCircle2 size={11}/> },
    transit:   { label:'In Transit',cls:'bg-amber-900/40 text-amber-400 border-amber-800', icon:<Truck        size={11}/> },
    pending:   { label:'Pending',   cls:'bg-slate-800    text-slate-400 border-slate-700', icon:<Clock        size={11}/> },
    cancelled: { label:'Cancelled', cls:'bg-red-900/40   text-red-400   border-red-800',   icon:<XCircle      size={11}/> },
  }
  const { label, cls, icon } = map[status] || map.pending
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 w-fit ${cls}`}>
      {icon}{label}
    </span>
  )
}

const MRStatusBadge = ({ status }) => {
  const map = {
    pending:  { label:'Pending',  cls:'bg-slate-800    text-slate-400 border-slate-700' },
    approved: { label:'Approved', cls:'bg-blue-900/40  text-blue-400  border-blue-800'  },
    ordered:  { label:'Ordered',  cls:'bg-purple-900/40 text-purple-400 border-purple-800'},
    delivered:{ label:'Delivered',cls:'bg-green-900/40 text-green-400 border-green-800' },
    rejected: { label:'Rejected', cls:'bg-red-900/40   text-red-400   border-red-800'   },
  }
  const { label, cls } = map[status] || map.pending
  return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>{label}</span>
}

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={11} className={i<=rating ? 'text-amber-400 fill-amber-400' : 'text-slate-700'}/>
    ))}
  </div>
)

const UrgencyDot = ({ urgency }) => {
  const colors = { high:'bg-red-500', medium:'bg-amber-500', low:'bg-green-500' }
  return <span className={`w-2 h-2 rounded-full shrink-0 ${colors[urgency]}`}/>
}

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div className="bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 text-xs">
      <p className="text-slate-400 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color:p.color }} className="font-medium">₹{p.value}L</p>
      ))}
    </div>
  )
}

// ── New PO Form ────────────────────────────────────────────
function NewPOForm({ onBack }) {
  const [vendor,    setVendor]    = useState('Tata Steel Ltd')
  const [item,      setItem]      = useState('')
  const [qty,       setQty]       = useState('')
  const [unit,      setUnit]      = useState('MT')
  const [rate,      setRate]      = useState('')
  const [project,   setProject]   = useState('Oberoi Tower')
  const [delivery,  setDelivery]  = useState('')
  const [notes,     setNotes]     = useState('')
  const total = Number(qty) * Number(rate)

  return (
    <div className="space-y-6">
      <div>
        <button onClick={onBack} className="text-xs text-slate-500 hover:text-slate-300 mb-2 flex items-center gap-1">
          ← Back to Procurement
        </button>
        <h1 className="text-xl font-bold text-white">Create Purchase Order</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Vendor</label>
                <select value={vendor} onChange={e=>setVendor(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  {vendors.map(v=><option key={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Project</label>
                <select value={project} onChange={e=>setProject(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  {['Oberoi Tower','Kohinoor Mall','Tech Park MEP','Villa Bandra','Lodha Fit-out'].map(p=>
                    <option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-slate-400 mb-1.5">Item Description</label>
                <input value={item} onChange={e=>setItem(e.target.value)}
                  placeholder="e.g. TMT Steel Fe500D — 20 MT"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Quantity</label>
                <input type="number" value={qty} onChange={e=>setQty(e.target.value)} placeholder="0"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Unit</label>
                <select value={unit} onChange={e=>setUnit(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                  {['MT','M²','M³','Nos','RFT','Bags','Kg','Litre','Set'].map(u=>
                    <option key={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Rate per unit (₹)</label>
                <input type="number" value={rate} onChange={e=>setRate(e.target.value)} placeholder="0"
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div>
                <label className="block text-xs text-slate-400 mb-1.5">Expected Delivery</label>
                <input type="date" value={delivery} onChange={e=>setDelivery(e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-slate-400 mb-1.5">Notes / Special Instructions</label>
                <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3}
                  placeholder="Delivery instructions, quality specs, contact person..."
                  className="w-full bg-slate-800 border border-slate-700 text-slate-300 placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"/>
              </div>
            </div>
          </div>
        </div>

        {/* Summary */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 h-fit sticky top-6">
          <h2 className="text-sm font-semibold text-white mb-4">PO Summary</h2>
          <div className="space-y-3 mb-5">
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Vendor</span>
              <span className="text-white text-xs font-medium truncate ml-2 max-w-35">{vendor}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-slate-400">Qty × Rate</span>
              <span className="text-white">{qty||0} × ₹{rate||0}</span>
            </div>
            <div className="border-t border-slate-700 pt-3 flex justify-between">
              <span className="text-white font-semibold">Total</span>
              <span className="text-xl font-bold text-blue-400">
                {total ? formatINR(total) : '₹0'}
              </span>
            </div>
          </div>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2">
              <Send size={14}/> Send to Vendor
            </button>
            <button className="w-full bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 text-sm py-2.5 rounded-lg flex items-center justify-center gap-2">
              <Download size={14}/> Download PO
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────
export default function ProcurementPage() {
  const [activeTab, setActiveTab] = useState('orders')
  const [view,      setView]      = useState('main')
  const [search,    setSearch]    = useState('')

  if (view === 'new-po') return <NewPOForm onBack={() => setView('main')} />

  const filteredPOs = purchaseOrders.filter(po =>
    po.vendor.toLowerCase().includes(search.toLowerCase()) ||
    po.item.toLowerCase().includes(search.toLowerCase()) ||
    po.project.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-white">Procurement</h1>
          <p className="text-slate-400 text-sm mt-0.5">Purchase orders, vendors & deliveries</p>
        </div>
        <div className="flex gap-2">
          <button className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg flex items-center gap-1">
            <Download size={13}/> Export
          </button>
          <button onClick={() => setView('new-po')}
            className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
            <Plus size={14}/> New PO
          </button>
        </div>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label:'Total Spend',     value:'₹48.2 L', sub:'This month',         color:'bg-blue-600',   up:true,  trend:'+12%' },
          { label:'Active Orders',   value:'4',       sub:'2 in transit',        color:'bg-amber-600',  up:null,  trend:null   },
          { label:'Vendors',         value:'12',      sub:'3 preferred',         color:'bg-purple-600', up:null,  trend:null   },
          { label:'Pending Requests',value:'3',       sub:'Needs approval',      color:'bg-red-600',    up:null,  trend:null   },
        ].map((k,i) => (
          <div key={i} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-start justify-between mb-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${k.color}`}>
                <ShoppingCart size={20} className="text-white"/>
              </div>
              {k.trend && (
                <span className="flex items-center gap-1 text-xs font-medium text-green-400">
                  <TrendingUp size={12}/> {k.trend}
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
        {['orders','vendors','requests','deliveries','analytics'].map(tab => (
          <button key={tab} onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-xs font-medium transition capitalize ${
              activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}>
            {tab}
          </button>
        ))}
      </div>

      {/* ── ORDERS TAB ── */}
      {activeTab === 'orders' && (
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 flex-1 max-w-sm">
              <Search size={14} className="text-slate-500"/>
              <input value={search} onChange={e=>setSearch(e.target.value)}
                placeholder="Search orders..." className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"/>
            </div>
            <button className="flex items-center gap-1.5 text-xs bg-slate-900 border border-slate-800 text-slate-400 px-3 py-2 rounded-lg">
              <Filter size={13}/> Filter
            </button>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800">
                  <th className="text-left px-5 py-3 font-medium">PO ID</th>
                  <th className="text-left px-5 py-3 font-medium">Vendor</th>
                  <th className="text-left px-5 py-3 font-medium">Item</th>
                  <th className="text-left px-5 py-3 font-medium">Project</th>
                  <th className="text-left px-5 py-3 font-medium">Amount</th>
                  <th className="text-left px-5 py-3 font-medium">Delivery</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                  <th className="text-left px-5 py-3 font-medium">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {filteredPOs.map(po => (
                  <tr key={po.id} className="hover:bg-slate-800/50 transition cursor-pointer">
                    <td className="px-5 py-4 text-blue-400 font-medium text-xs">{po.id}</td>
                    <td className="px-5 py-4">
                      <p className="text-white text-xs font-medium">{po.vendor}</p>
                      <span className="text-xs text-slate-600">{po.category}</span>
                    </td>
                    <td className="px-5 py-4 text-slate-300 text-xs max-w-45 truncate">{po.item}</td>
                    <td className="px-5 py-4 text-slate-400 text-xs">{po.project}</td>
                    <td className="px-5 py-4 text-white font-medium">{formatINR(po.amount)}</td>
                    <td className="px-5 py-4 text-slate-400 text-xs">{po.delivery}</td>
                    <td className="px-5 py-4"><POStatusBadge status={po.status}/></td>
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-2">
                        <button className="text-slate-500 hover:text-blue-400 transition"><Eye     size={14}/></button>
                        <button className="text-slate-500 hover:text-blue-400 transition"><Edit3   size={14}/></button>
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

      {/* ── VENDORS TAB ── */}
      {activeTab === 'vendors' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 bg-slate-900 border border-slate-800 rounded-lg px-3 py-2 w-64">
              <Search size={14} className="text-slate-500"/>
              <input placeholder="Search vendors..." className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"/>
            </div>
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus size={13}/> Add Vendor
            </button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {vendors.map(v => (
              <div key={v.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition cursor-pointer">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-blue-600/20 border border-blue-800 flex items-center justify-center shrink-0">
                      <Building2 size={18} className="text-blue-400"/>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{v.name}</p>
                      <p className="text-xs text-slate-500">{v.category}</p>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                    v.status === 'preferred'
                      ? 'bg-amber-900/40 text-amber-400 border-amber-800'
                      : 'bg-green-900/40 text-green-400 border-green-800'
                  }`}>
                    {v.status === 'preferred' ? '⭐ Preferred' : 'Active'}
                  </span>
                </div>

                <div className="grid grid-cols-3 gap-2 mb-3">
                  <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                    <p className="text-sm font-bold text-white">{v.orders}</p>
                    <p className="text-xs text-slate-500">Orders</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                    <p className="text-sm font-bold text-white">{formatINR(v.totalValue)}</p>
                    <p className="text-xs text-slate-500">Total</p>
                  </div>
                  <div className="bg-slate-800/50 rounded-lg p-2 text-center">
                    <StarRating rating={v.rating}/>
                    <p className="text-xs text-slate-500 mt-1">Rating</p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                  <div className="flex items-center gap-1 text-xs text-slate-500">
                    <MapPin size={11}/> {v.location}
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 transition">
                      <Phone size={11}/> Call
                    </button>
                    <button className="flex items-center gap-1 text-xs text-slate-400 hover:text-blue-400 transition">
                      <Mail size={11}/> Email
                    </button>
                    <button onClick={() => setView('new-po')}
                      className="flex items-center gap-1 text-xs text-blue-400 hover:text-blue-300 transition">
                      <Plus size={11}/> PO
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── REQUESTS TAB ── */}
      {activeTab === 'requests' && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-semibold text-white">Material Requests</h2>
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
              <Plus size={13}/> New Request
            </button>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-xs text-slate-500 border-b border-slate-800">
                  <th className="text-left px-5 py-3 font-medium">Request ID</th>
                  <th className="text-left px-5 py-3 font-medium">Material</th>
                  <th className="text-left px-5 py-3 font-medium">Qty</th>
                  <th className="text-left px-5 py-3 font-medium">Project</th>
                  <th className="text-left px-5 py-3 font-medium">Requested By</th>
                  <th className="text-left px-5 py-3 font-medium">Urgency</th>
                  <th className="text-left px-5 py-3 font-medium">Date</th>
                  <th className="text-left px-5 py-3 font-medium">Status</th>
                  <th className="text-left px-5 py-3 font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800">
                {materialRequests.map(mr => (
                  <tr key={mr.id} className="hover:bg-slate-800/50 transition">
                    <td className="px-5 py-3 text-blue-400 font-medium text-xs">{mr.id}</td>
                    <td className="px-5 py-3 text-white font-medium text-xs">{mr.material}</td>
                    <td className="px-5 py-3 text-slate-300 text-xs">{mr.qty}</td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{mr.project}</td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{mr.requestedBy}</td>
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-1.5">
                        <UrgencyDot urgency={mr.urgency}/>
                        <span className={`text-xs capitalize font-medium ${
                          mr.urgency==='high' ? 'text-red-400' : mr.urgency==='medium' ? 'text-amber-400' : 'text-green-400'
                        }`}>{mr.urgency}</span>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs">{mr.date}</td>
                    <td className="px-5 py-3"><MRStatusBadge status={mr.status}/></td>
                    <td className="px-5 py-3">
                      {mr.status === 'pending' && (
                        <div className="flex gap-2">
                          <button className="text-xs bg-green-900/40 text-green-400 border border-green-800 px-2 py-0.5 rounded hover:bg-green-900/60 transition">
                            Approve
                          </button>
                          <button className="text-xs bg-red-900/40 text-red-400 border border-red-800 px-2 py-0.5 rounded hover:bg-red-900/60 transition">
                            Reject
                          </button>
                        </div>
                      )}
                      {mr.status === 'approved' && (
                        <button onClick={() => setView('new-po')}
                          className="text-xs bg-blue-900/40 text-blue-400 border border-blue-800 px-2 py-0.5 rounded hover:bg-blue-900/60 transition">
                          Create PO
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* ── DELIVERIES TAB ── */}
      {activeTab === 'deliveries' && (
        <div className="space-y-4">
          <h2 className="text-sm font-semibold text-white">Upcoming Deliveries</h2>
          <div className="space-y-3">
            {deliveries.map(d => (
              <div key={d.id} className="bg-slate-900 border border-slate-800 rounded-xl p-5 hover:border-slate-700 transition">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                      d.status==='in-transit' ? 'bg-amber-600/20 border border-amber-800' : 'bg-slate-800 border border-slate-700'
                    }`}>
                      <Truck size={18} className={d.status==='in-transit' ? 'text-amber-400' : 'text-slate-500'}/>
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{d.item}</p>
                      <p className="text-xs text-slate-500">{d.po} · {d.vendor}</p>
                    </div>
                  </div>
                  <POStatusBadge status={d.status}/>
                </div>
                <div className="grid grid-cols-3 gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin size={11} className="text-slate-600"/>
                    {d.project}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Calendar size={11} className="text-slate-600"/>
                    Expected: {d.expected}
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Truck size={11} className="text-slate-600"/>
                    {d.vehicle}
                  </div>
                </div>
                {d.status === 'in-transit' && (
                  <div className="mt-3 pt-3 border-t border-slate-800 flex gap-2">
                    <button className="text-xs bg-green-900/40 text-green-400 border border-green-800 px-3 py-1 rounded-lg hover:bg-green-900/60 transition">
                      Mark Received
                    </button>
                    <button className="text-xs bg-slate-800 text-slate-400 border border-slate-700 px-3 py-1 rounded-lg hover:bg-slate-700 transition">
                      Report Issue
                    </button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {/* ── ANALYTICS TAB ── */}
      {activeTab === 'analytics' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-1">Monthly Procurement Spend</h2>
            <p className="text-xs text-slate-500 mb-4">In Lakhs (₹)</p>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={spendData} margin={{ top:5, right:5, left:-20, bottom:0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e293b"/>
                <XAxis dataKey="month" tick={{ fill:'#64748b', fontSize:11 }} axisLine={false} tickLine={false}/>
                <YAxis tick={{ fill:'#64748b', fontSize:11 }} axisLine={false} tickLine={false}/>
                <Tooltip content={<CustomTooltip/>}/>
                <Bar dataKey="spend" name="Spend" fill="#3b82f6" radius={[4,4,0,0]}/>
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Spend by Category</h2>
            <div className="space-y-3">
              {categorySpend.map(c => (
                <div key={c.category}>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="text-slate-400">{c.category}</span>
                    <span className="text-white font-medium">{formatINR(c.amount)} <span className="text-slate-500">({c.pct}%)</span></span>
                  </div>
                  <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full ${c.color}`} style={{ width:`${c.pct}%` }}/>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Top Vendors by Spend</h2>
            <div className="space-y-3">
              {vendors.sort((a,b) => b.totalValue - a.totalValue).map((v,i) => (
                <div key={v.id} className="flex items-center gap-3">
                  <span className="text-xs text-slate-600 w-4">{i+1}</span>
                  <div className="flex-1">
                    <div className="flex justify-between text-xs mb-1">
                      <span className="text-slate-300 font-medium">{v.name}</span>
                      <span className="text-white">{formatINR(v.totalValue)}</span>
                    </div>
                    <div className="h-1 bg-slate-800 rounded-full overflow-hidden">
                      <div className="h-full bg-blue-500 rounded-full"
                        style={{ width:`${(v.totalValue / vendors[0].totalValue) * 100}%` }}/>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <h2 className="text-sm font-semibold text-white mb-4">Order Status Summary</h2>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label:'Delivered',  count:3, color:'text-green-400', bg:'bg-green-900/20 border-green-900'  },
                { label:'In Transit', count:1, color:'text-amber-400', bg:'bg-amber-900/20 border-amber-900'  },
                { label:'Confirmed',  count:2, color:'text-blue-400',  bg:'bg-blue-900/20  border-blue-900'   },
                { label:'Cancelled',  count:1, color:'text-red-400',   bg:'bg-red-900/20   border-red-900'    },
              ].map(s => (
                <div key={s.label} className={`border rounded-xl p-4 text-center ${s.bg}`}>
                  <p className={`text-2xl font-bold ${s.color}`}>{s.count}</p>
                  <p className="text-xs text-slate-400 mt-1">{s.label}</p>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}

    </div>
  )
}
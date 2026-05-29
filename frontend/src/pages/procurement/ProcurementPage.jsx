import { useState } from 'react';
import {
   Plus, Search, Filter, Download,
  Truck, CheckCircle2, Clock, XCircle, Building2,
  Phone, Mail, Star, TrendingUp, TrendingDown, Eye, Edit3,
  Calendar, Send, MapPin, AlertTriangle, Gauge,
  Wallet, Percent, Timer, Receipt, FileText
} from 'lucide-react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, LineChart, Line
} from 'recharts';

// ---------- MOCK DATA ----------
const purchaseOrders = [
  { id:'PO-1041', vendor:'Tata Steel Ltd',       item:'TMT Steel Fe500D — 20 MT',       project:'Oberoi Tower',   amount:1120000, ordered:'28 Jul 2025', delivery:'05 Aug 2025', status:'confirmed', category:'Materials'  },
  { id:'PO-1040', vendor:'UltraTech Cement',     item:'OPC 53 Grade Cement — 500 bags',  project:'Oberoi Tower',   amount:175000,  ordered:'27 Jul 2025', delivery:'30 Jul 2025', status:'delivered', category:'Materials'  },
  { id:'PO-1039', vendor:'Supreme Industries',   item:'CPVC Pipes 1" — 200 RFT',         project:'Tech Park MEP',  amount:128000,  ordered:'25 Jul 2025', delivery:'02 Aug 2025', status:'transit',   category:'Plumbing'   },
  { id:'PO-1038', vendor:'Ramesh Machinery',     item:'JCB 3CX — 3 month rental',        project:'Kohinoor Mall',  amount:360000,  ordered:'22 Jul 2025', delivery:'25 Jul 2025', status:'delivered', category:'Machinery'  },
  { id:'PO-1037', vendor:'Asian Paints',         item:'Apex Exterior Paint — 200 L',     project:'Villa Bandra',   amount:64000,   ordered:'20 Jul 2025', delivery:'28 Jul 2025', status:'delivered', category:'Finishes'   },
  { id:'PO-1036', vendor:'Gyproc India',         item:'Gypsum Board 12mm — 400 sheets',  project:'Kohinoor Mall',  amount:92000,   ordered:'18 Jul 2025', delivery:'10 Aug 2025', status:'confirmed', category:'Interior'   },
  { id:'PO-1035', vendor:'Havells India',        item:'FR Cables 2.5 sqmm — 500 m',      project:'Tech Park MEP',  amount:87500,   ordered:'15 Jul 2025', delivery:'22 Jul 2025', status:'cancelled', category:'Electrical' },
];

const vendors = [
  { id:'VND-01', name:'Tata Steel Ltd',      category:'Steel & Metal',   contact:'Rajan Mehta',   phone:'+91 98200 10001', email:'rajan@tatasteel.com',  rating:5, orders:12, totalValue:8400000,  status:'preferred', location:'Mumbai' },
  { id:'VND-02', name:'UltraTech Cement',    category:'Cement',          contact:'Priya Shah',    phone:'+91 98200 20002', email:'priya@ultratech.com',  rating:4, orders:18, totalValue:2100000,  status:'active',    location:'Mumbai' },
  { id:'VND-03', name:'Supreme Industries',  category:'Plumbing',        contact:'Suresh Kumar',  phone:'+91 98200 30003', email:'suresh@supreme.com',   rating:4, orders:8,  totalValue:1024000,  status:'active',    location:'Pune'   },
  { id:'VND-04', name:'Ramesh Machinery',    category:'Equipment Rental',contact:'Ramesh Patil',  phone:'+91 98200 40004', email:'ramesh@machinery.com', rating:3, orders:6,  totalValue:2160000,  status:'active',    location:'Mumbai' },
  { id:'VND-05', name:'Asian Paints',        category:'Paints & Finishes',contact:'Amit Joshi',   phone:'+91 98200 50005', email:'amit@asianpaints.com', rating:5, orders:9,  totalValue:576000,   status:'preferred', location:'Mumbai' },
  { id:'VND-06', name:'Gyproc India',        category:'Interior',        contact:'Nisha Doshi',   phone:'+91 98200 60006', email:'nisha@gyproc.com',     rating:4, orders:5,  totalValue:460000,   status:'active',    location:'Thane'  },
];

const materialRequests = [
  { id:'MR-301', material:'Plywood Sheets 18mm',    qty:'40 Nos',  project:'Oberoi Tower',  requestedBy:'Vikram Singh', date:'29 Jul 2025', status:'approved',  urgency:'high'   },
  { id:'MR-300', material:'Binding Wire',           qty:'50 Kg',   project:'Oberoi Tower',  requestedBy:'Ram Shinde',   date:'28 Jul 2025', status:'ordered',   urgency:'medium' },
  { id:'MR-299', material:'Vitrified Tiles 600x600',qty:'300 M²',  project:'Kohinoor Mall', requestedBy:'Arjun Kumar',  date:'27 Jul 2025', status:'pending',   urgency:'high'   },
  { id:'MR-298', material:'PVC Conduit 25mm',       qty:'200 RFT', project:'Tech Park MEP', requestedBy:'Nitin Desai',  date:'26 Jul 2025', status:'approved',  urgency:'low'    },
  { id:'MR-297', material:'Marble Flooring Slabs',  qty:'150 M²',  project:'Villa Bandra',  requestedBy:'Suresh Patil', date:'25 Jul 2025', status:'pending',   urgency:'medium' },
];

const deliveries = [
  { id:'DEL-201', po:'PO-1039', vendor:'Supreme Industries', item:'CPVC Pipes',          project:'Tech Park MEP',  expected:'02 Aug 2025', status:'in-transit', driver:'Ramesh D.', vehicle:'MH-04 AB 1234' },
  { id:'DEL-200', po:'PO-1041', vendor:'Tata Steel Ltd',     item:'TMT Steel 20 MT',    project:'Oberoi Tower',   expected:'05 Aug 2025', status:'scheduled',  driver:'Pending',    vehicle:'Pending'       },
  { id:'DEL-199', po:'PO-1036', vendor:'Gyproc India',       item:'Gypsum Boards',      project:'Kohinoor Mall',  expected:'10 Aug 2025', status:'scheduled',  driver:'Pending',    vehicle:'Pending'       },
];

const spendData = [
  { month:'Feb', spend:48 },
  { month:'Mar', spend:62 },
  { month:'Apr', spend:55 },
  { month:'May', spend:78 },
  { month:'Jun', spend:91 },
  { month:'Jul', spend:84 },
];

const categorySpend = [
  { category:'Materials',  amount:4200000, pct:42, color:'#3b82f6' },
  { category:'Labour',     amount:2600000, pct:26, color:'#8b5cf6' },
  { category:'Machinery',  amount:1500000, pct:15, color:'#14b8a6' },
  { category:'Electrical', amount:870000,  pct:9,  color:'#f59e0b' },
  { category:'Finishes',   amount:640000,  pct:8,  color:'#f97316' },
];

const priceVarianceData = [
  { item: 'TMT Steel',  budgetRate: 55000, actualRate: 58500, qty: 20,  variance: 70000 },
  { item: 'Cement',     budgetRate: 350,   actualRate: 375,   qty: 500, variance: 12500 },
  { item: 'CPVC Pipes', budgetRate: 65,    actualRate: 72,    qty: 200, variance: 1400 },
  { item: 'Cables',     budgetRate: 175,   actualRate: 190,   qty: 500, variance: 7500 }
];

const wastageTrend = [
  { day: 'Mon', loss: 3.2 },
  { day: 'Tue', loss: 2.8 },
  { day: 'Wed', loss: 4.1 },
  { day: 'Thu', loss: 3.5 },
  { day: 'Fri', loss: 5.2 },
  { day: 'Sat', loss: 4.8 }
];

const vendorReliability = [
  { vendor: 'Tata Steel',   onTime: 11, total: 12, score: 92 },
  { vendor: 'UltraTech',    onTime: 15, total: 18, score: 83 },
  { vendor: 'Supreme',      onTime: 7,  total: 8,  score: 88 },
  { vendor: 'Ramesh Mach.', onTime: 4,  total: 6,  score: 67 }
];

const cashGapData = {
  payables: 18500000,
  receivables: 12800000,
  gap: 5700000,
  milestoneBilled: 42000000,
  milestoneCollected: 31500000
};

// ---------- HELPERS ----------
const formatINR = (n) => {
  if (n >= 10000000) return `₹${(n/10000000).toFixed(2)} Cr`;
  if (n >= 100000)   return `₹${(n/100000).toFixed(1)} L`;
  return `₹${new Intl.NumberFormat('en-IN').format(n)}`;
};

const POStatusBadge = ({ status }) => {
  const map = {
    confirmed: { label:'Confirmed', cls:'bg-blue-100 text-blue-700 border-blue-200', icon:<CheckCircle2 size={11}/> },
    delivered: { label:'Delivered', cls:'bg-green-100 text-green-700 border-green-200', icon:<CheckCircle2 size={11}/> },
    transit:   { label:'In Transit',cls:'bg-amber-100 text-amber-700 border-amber-200', icon:<Truck size={11}/> },
    pending:   { label:'Pending',   cls:'bg-gray-100 text-gray-600 border-gray-200', icon:<Clock size={11}/> },
    cancelled: { label:'Cancelled', cls:'bg-red-100 text-red-700 border-red-200', icon:<XCircle size={11}/> },
  };
  const { label, cls, icon } = map[status] || map.pending;
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium flex items-center gap-1 w-fit ${cls}`}>
      {icon}{label}
    </span>
  );
};

const MRStatusBadge = ({ status }) => {
  const map = {
    pending:  { label:'Pending',  cls:'bg-gray-100 text-gray-600 border-gray-200' },
    approved: { label:'Approved', cls:'bg-blue-100 text-blue-700 border-blue-200'  },
    ordered:  { label:'Ordered',  cls:'bg-purple-100 text-purple-700 border-purple-200'},
    delivered:{ label:'Delivered',cls:'bg-green-100 text-green-700 border-green-200' },
    rejected: { label:'Rejected', cls:'bg-red-100 text-red-700 border-red-200'   },
  };
  const { label, cls } = map[status] || map.pending;
  return <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>{label}</span>;
};

const StarRating = ({ rating }) => (
  <div className="flex gap-0.5">
    {[1,2,3,4,5].map(i => (
      <Star key={i} size={11} className={i<=rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}/>
    ))}
  </div>
);

const UrgencyDot = ({ urgency }) => {
  const colors = { high:'bg-red-500', medium:'bg-amber-500', low:'bg-green-500' };
  return <span className={`w-2 h-2 rounded-full shrink-0 ${colors[urgency]}`}/>;
};

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-lg px-3 py-2 text-xs shadow-lg">
      <p className="text-gray-500 mb-1">{label}</p>
      {payload.map(p => (
        <p key={p.name} style={{ color:p.color }} className="font-medium">₹{p.value}L</p>
      ))}
    </div>
  );
};

const SuperCriticalCard = ({ title, value, sub, icon: Icon, color, trend, trendVal, alert }) => (
  <div className="bg-white rounded-xl border border-gray-200 shadow-sm p-5 hover:shadow-md transition relative overflow-hidden">
    {alert && <div className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full m-2 animate-pulse"/>}
    <div className="flex items-start justify-between mb-3">
      <div className={`w-10 h-10 rounded-lg flex items-center justify-center bg-gradient-to-br ${color}`}>
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
    <p className="text-sm text-gray-600 mt-0.5">{title}</p>
    <p className="text-xs text-gray-400 mt-1">{sub}</p>
  </div>
);

const EarlyWarningTicker = ({ alerts }) => (
  <div className="bg-gradient-to-r from-red-50 via-amber-50 to-yellow-50 border border-red-200 rounded-xl p-3 overflow-hidden">
    <div className="flex items-center gap-2 mb-2">
      <AlertTriangle size={16} className="text-red-600" />
      <span className="text-xs font-bold text-red-700 uppercase tracking-wide">Early Warning Ticker</span>
    </div>
    <div className="flex items-center gap-6 whitespace-nowrap animate-pulse overflow-x-auto">
      {alerts.map((alert, idx) => (
        <div key={idx} className="text-sm text-gray-800 flex items-center gap-2 bg-white/60 px-3 py-1 rounded-full shadow-sm">
          <span className="text-red-500">⚠️</span> {alert}
        </div>
      ))}
    </div>
  </div>
);

// ---------- NEW PO FORM ----------
function NewPOForm({ onBack }) {
  const [vendor, setVendor] = useState('Tata Steel Ltd');
  const [item, setItem] = useState('');
  const [qty, setQty] = useState('');
  const [unit, setUnit] = useState('MT');
  const [rate, setRate] = useState('');
  const [project, setProject] = useState('Oberoi Tower');
  const [delivery, setDelivery] = useState('');
  const [notes, setNotes] = useState('');
  const total = Number(qty) * Number(rate);

  return (
    <div className="space-y-6">
      <div>
        <button onClick={onBack} className="text-xs text-gray-500 hover:text-gray-700 mb-2 flex items-center gap-1">
          ← Back to Procurement
        </button>
        <h1 className="text-xl font-bold text-gray-800">Create Purchase Order</h1>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-800 mb-4">Order Details</h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Vendor</label>
                <select value={vendor} onChange={e=>setVendor(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm">
                  {vendors.map(v=><option key={v.id}>{v.name}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Project</label>
                <select value={project} onChange={e=>setProject(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm">
                  {['Oberoi Tower','Kohinoor Mall','Tech Park MEP','Villa Bandra','Lodha Fit-out'].map(p=><option key={p}>{p}</option>)}
                </select>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-gray-500 mb-1.5">Item Description</label>
                <input value={item} onChange={e=>setItem(e.target.value)} placeholder="e.g. TMT Steel Fe500D — 20 MT" className="w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm"/>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Quantity</label>
                <input type="number" value={qty} onChange={e=>setQty(e.target.value)} placeholder="0" className="w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm"/>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Unit</label>
                <select value={unit} onChange={e=>setUnit(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm">
                  {['MT','M²','M³','Nos','RFT','Bags','Kg','Litre','Set'].map(u=><option key={u}>{u}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Rate per unit (₹)</label>
                <input type="number" value={rate} onChange={e=>setRate(e.target.value)} placeholder="0" className="w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm"/>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Expected Delivery</label>
                <input type="date" value={delivery} onChange={e=>setDelivery(e.target.value)} className="w-full bg-gray-50 border border-gray-300 text-gray-800 rounded-lg px-3 py-2 text-sm"/>
              </div>
              <div className="col-span-2">
                <label className="block text-xs text-gray-500 mb-1.5">Notes</label>
                <textarea value={notes} onChange={e=>setNotes(e.target.value)} rows={3} placeholder="Delivery instructions, quality specs..." className="w-full bg-gray-50 border border-gray-300 text-gray-700 rounded-lg px-3 py-2 text-sm resize-none"/>
              </div>
            </div>
          </div>
        </div>
        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm h-fit sticky top-6">
          <h2 className="text-sm font-semibold text-gray-800 mb-4">PO Summary</h2>
          <div className="space-y-3 mb-5">
            <div className="flex justify-between text-sm"><span className="text-gray-500">Vendor</span><span className="text-gray-800 text-xs font-medium">{vendor}</span></div>
            <div className="flex justify-between text-sm"><span className="text-gray-500">Qty × Rate</span><span className="text-gray-800">{qty||0} × ₹{rate||0}</span></div>
            <div className="border-t border-gray-200 pt-3 flex justify-between"><span className="text-gray-800 font-semibold">Total</span><span className="text-xl font-bold text-blue-600">{total ? formatINR(total) : '₹0'}</span></div>
          </div>
          <div className="space-y-2">
            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg flex items-center justify-center gap-2"><Send size={14}/> Send to Vendor</button>
            <button className="w-full bg-gray-100 hover:bg-gray-200 border border-gray-300 text-gray-700 text-sm py-2.5 rounded-lg flex items-center justify-center gap-2"><Download size={14}/> Download PO</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ---------- MAIN COMPONENT ----------
export default function ProcurementPage() {
  const [activeTab, setActiveTab] = useState('orders');
  const [view, setView] = useState('main');
  const [search, setSearch] = useState('');

  if (view === 'new-po') return <NewPOForm onBack={() => setView('main')} />;

  const filteredPOs = purchaseOrders.filter(po =>
    po.vendor.toLowerCase().includes(search.toLowerCase()) ||
    po.item.toLowerCase().includes(search.toLowerCase()) ||
    po.project.toLowerCase().includes(search.toLowerCase())
  );

  const totalBudget = 85000000;
  const actualSpend = 48200000;
  const burnRate = (actualSpend / totalBudget) * 100;
  const totalVariance = priceVarianceData.reduce((sum, i) => sum + i.variance, 0);
  const avgWastage = wastageTrend.reduce((sum, d) => sum + d.loss, 0) / wastageTrend.length;

  const alerts = [
    `Steel price +3.2% · Budget impact ₹${(priceVarianceData.find(i => i.item === 'TMT Steel')?.variance / 100000).toFixed(1)}L`,
    'Vendor Ramesh Machinery – delivery overdue (PO-1038)',
    'Stock-out risk: Gypsum Board 85% · Lead time 6 days',
    'GST credit mismatch: ₹2.4L pending reconciliation'
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 p-4 md:p-6 font-sans">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div>
            <div className="flex items-center gap-2">
              <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">Material Procurement Command Center</h1>
            </div>
            <p className="text-gray-500 text-sm mt-0.5 ml-3">Real-time tracking · Budget control · Vendor intelligence</p>
          </div>
          <div className="flex gap-2">
            <button className="text-xs bg-white border border-gray-200 hover:bg-gray-50 text-gray-700 px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1"><Download size={13}/> Export</button>
            <button onClick={() => setView('new-po')} className="text-xs bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1"><Plus size={14}/> New PO</button>
          </div>
        </div>

        <EarlyWarningTicker alerts={alerts} />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SuperCriticalCard title="Procurement Budget Burn Rate" value={`${burnRate.toFixed(1)}%`} sub="Actual ₹4.82 Cr / Total ₹8.5 Cr" icon={Gauge} color="from-blue-500 to-blue-600" trend="up" trendVal="+5%" />
          <SuperCriticalCard title="Stock‑Out Risk Index" value="68%" sub="Gypsum board (85%) · Cables (90%)" icon={AlertTriangle} color="from-red-500 to-rose-600" trend="up" trendVal="+12%" alert={true} />
          <SuperCriticalCard title="Vendor Delivery Reliability" value="82.5%" sub="Avg on‑time delivery" icon={Truck} color="from-green-500 to-emerald-600" trend="down" trendVal="-3%" />
          <SuperCriticalCard title="Cash Gap vs Milestone" value={formatINR(cashGapData.gap)} sub={`Payables ${formatINR(cashGapData.payables)} · Receivables ${formatINR(cashGapData.receivables)}`} icon={Wallet} color="from-amber-500 to-orange-600" trend="up" trendVal="+2%" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <SuperCriticalCard title="Price Variance Index (PVI)" value={formatINR(totalVariance)} sub="TMT Steel ₹70K · Cement ₹12.5K" icon={TrendingUp} color="from-purple-500 to-indigo-600" trend="up" trendVal="+1.8%" />
          <SuperCriticalCard title="Wastage & Theft Loss" value={`${avgWastage.toFixed(1)}%`} sub="Last 7 days average · Target <3%" icon={Percent} color="from-red-500 to-pink-600" trend="up" trendVal="+0.5%" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="flex items-center gap-2 mb-2"><Timer size={16} className="text-blue-600"/><h3 className="text-sm font-semibold text-gray-800">Emergency Purchase Frequency</h3></div><p className="text-2xl font-bold text-gray-900">12 <span className="text-sm font-normal text-gray-500">this month</span></p><p className="text-xs text-gray-500 mt-1">↑ 3 from last month · Premium cost ₹2.4L</p></div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="flex items-center gap-2 mb-2"><Receipt size={16} className="text-green-600"/><h3 className="text-sm font-semibold text-gray-800">GST Credit Utilisation Rate</h3></div><p className="text-2xl font-bold text-gray-900">67%</p><p className="text-xs text-gray-500 mt-1">₹8.2L ITC available · ₹5.5L claimed</p></div>
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm"><div className="flex items-center gap-2 mb-2"><FileText size={16} className="text-purple-600"/><h3 className="text-sm font-semibold text-gray-800">Comparative Statement Cycle Time</h3></div><p className="text-2xl font-bold text-gray-900">4.2 <span className="text-sm font-normal text-gray-500">days</span></p><p className="text-xs text-gray-500 mt-1">Target &lt;3 days · 2 POs stuck in approval</p></div>
        </div>

        <div className="flex gap-1 bg-white border border-gray-200 rounded-xl p-1 w-fit shadow-sm">
          {['orders','vendors','requests','deliveries','analytics'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-4 py-2 rounded-lg text-xs font-medium transition capitalize ${activeTab === tab ? 'bg-blue-600 text-white shadow-sm' : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'}`}>{tab}</button>
          ))}
        </div>

        {/* Orders Tab */}
        {activeTab === 'orders' && (
          <div className="space-y-4">
            <div className="flex items-center gap-3"><div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-sm shadow-sm"><Search size={14} className="text-gray-500"/><input value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search orders..." className="bg-transparent text-sm text-gray-700 outline-none w-full"/></div><button className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-lg shadow-sm"><Filter size={13}/> Filter</button></div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
              <table className="w-full text-sm"><thead><tr className="text-xs text-gray-500 border-b border-gray-200 bg-gray-50"><th className="text-left px-5 py-3 font-medium">PO ID</th><th className="text-left px-5 py-3 font-medium">Vendor</th><th className="text-left px-5 py-3 font-medium">Item</th><th className="text-left px-5 py-3 font-medium">Project</th><th className="text-left px-5 py-3 font-medium">Amount</th><th className="text-left px-5 py-3 font-medium">Delivery</th><th className="text-left px-5 py-3 font-medium">Status</th><th className="text-left px-5 py-3 font-medium">Actions</th></tr></thead>
              <tbody className="divide-y divide-gray-100">{filteredPOs.map(po => (<tr key={po.id} className="hover:bg-gray-50 transition"><td className="px-5 py-4 text-blue-600 font-medium text-xs">{po.id}</td><td className="px-5 py-4"><p className="text-gray-800 text-xs font-medium">{po.vendor}</p><span className="text-xs text-gray-400">{po.category}</span></td><td className="px-5 py-4 text-gray-600 text-xs max-w-45 truncate">{po.item}</td><td className="px-5 py-4 text-gray-500 text-xs">{po.project}</td><td className="px-5 py-4 text-gray-900 font-medium">{formatINR(po.amount)}</td><td className="px-5 py-4 text-gray-500 text-xs">{po.delivery}</td><td className="px-5 py-4"><POStatusBadge status={po.status}/></td><td className="px-5 py-4"><div className="flex items-center gap-2"><button className="text-gray-400 hover:text-blue-600"><Eye size={14}/></button><button className="text-gray-400 hover:text-blue-600"><Edit3 size={14}/></button><button className="text-gray-400 hover:text-blue-600"><Download size={14}/></button></div></td></tr>))}</tbody></table>
            </div>
          </div>
        )}

        {/* Vendors Tab */}
        {activeTab === 'vendors' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between"><div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 w-64 shadow-sm"><Search size={14} className="text-gray-500"/><input placeholder="Search vendors..." className="bg-transparent text-sm text-gray-700 outline-none w-full"/></div><button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1"><Plus size={13}/> Add Vendor</button></div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">{vendors.map(v => (<div key={v.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-3"><div className="w-10 h-10 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center"><Building2 size={18} className="text-blue-600"/></div><div><p className="text-sm font-semibold text-gray-800">{v.name}</p><p className="text-xs text-gray-500">{v.category}</p></div></div><span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${v.status === 'preferred' ? 'bg-amber-50 text-amber-700 border-amber-200' : 'bg-green-50 text-green-700 border-green-200'}`}>{v.status === 'preferred' ? '⭐ Preferred' : 'Active'}</span></div><div className="grid grid-cols-3 gap-2 mb-3"><div className="bg-gray-50 rounded-lg p-2 text-center"><p className="text-sm font-bold text-gray-800">{v.orders}</p><p className="text-xs text-gray-500">Orders</p></div><div className="bg-gray-50 rounded-lg p-2 text-center"><p className="text-sm font-bold text-gray-800">{formatINR(v.totalValue)}</p><p className="text-xs text-gray-500">Total</p></div><div className="bg-gray-50 rounded-lg p-2 text-center"><StarRating rating={v.rating}/><p className="text-xs text-gray-500 mt-1">Rating</p></div></div><div className="flex items-center justify-between pt-3 border-t border-gray-100"><div className="flex items-center gap-1 text-xs text-gray-500"><MapPin size={11}/> {v.location}</div><div className="flex gap-3"><button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"><Phone size={11}/> Call</button><button className="flex items-center gap-1 text-xs text-gray-500 hover:text-blue-600"><Mail size={11}/> Email</button><button onClick={() => setView('new-po')} className="flex items-center gap-1 text-xs text-blue-600 hover:text-blue-700"><Plus size={11}/> PO</button></div></div></div>))}</div>
          </div>
        )}

        {/* Requests Tab */}
        {activeTab === 'requests' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between"><h2 className="text-sm font-semibold text-gray-800">Material Requests</h2><button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg shadow-sm flex items-center gap-1"><Plus size={13}/> New Request</button></div>
            <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm"><table className="w-full text-sm"><thead><tr className="text-xs text-gray-500 border-b border-gray-200 bg-gray-50"><th className="text-left px-5 py-3 font-medium">Request ID</th><th className="text-left px-5 py-3 font-medium">Material</th><th className="text-left px-5 py-3 font-medium">Qty</th><th className="text-left px-5 py-3 font-medium">Project</th><th className="text-left px-5 py-3 font-medium">Requested By</th><th className="text-left px-5 py-3 font-medium">Urgency</th><th className="text-left px-5 py-3 font-medium">Date</th><th className="text-left px-5 py-3 font-medium">Status</th><th className="text-left px-5 py-3 font-medium">Action</th></tr></thead>
            <tbody className="divide-y divide-gray-100">{materialRequests.map(mr => (<tr key={mr.id} className="hover:bg-gray-50 transition"><td className="px-5 py-3 text-blue-600 font-medium text-xs">{mr.id}</td><td className="px-5 py-3 text-gray-800 font-medium text-xs">{mr.material}</td><td className="px-5 py-3 text-gray-600 text-xs">{mr.qty}</td><td className="px-5 py-3 text-gray-500 text-xs">{mr.project}</td><td className="px-5 py-3 text-gray-500 text-xs">{mr.requestedBy}</td><td className="px-5 py-3"><div className="flex items-center gap-1.5"><UrgencyDot urgency={mr.urgency}/><span className={`text-xs capitalize font-medium ${mr.urgency==='high' ? 'text-red-600' : mr.urgency==='medium' ? 'text-amber-600' : 'text-green-600'}`}>{mr.urgency}</span></div></td><td className="px-5 py-3 text-gray-500 text-xs">{mr.date}</td><td className="px-5 py-3"><MRStatusBadge status={mr.status}/></td><td className="px-5 py-3">{mr.status === 'pending' && (<div className="flex gap-2"><button className="text-xs bg-green-50 text-green-700 border border-green-200 px-2 py-0.5 rounded hover:bg-green-100">Approve</button><button className="text-xs bg-red-50 text-red-700 border border-red-200 px-2 py-0.5 rounded hover:bg-red-100">Reject</button></div>)}{mr.status === 'approved' && (<button onClick={() => setView('new-po')} className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-2 py-0.5 rounded hover:bg-blue-100">Create PO</button>)}</td></tr>))}</tbody></table></div>
          </div>
        )}

        {/* Deliveries Tab */}
        {activeTab === 'deliveries' && (
          <div className="space-y-4">
            <h2 className="text-sm font-semibold text-gray-800">Upcoming Deliveries</h2>
            {deliveries.map(d => (<div key={d.id} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm hover:shadow-md transition"><div className="flex items-start justify-between mb-3"><div className="flex items-center gap-3"><div className={`w-10 h-10 rounded-xl flex items-center justify-center ${d.status==='in-transit' ? 'bg-amber-50 border border-amber-200' : 'bg-gray-50 border border-gray-200'}`}><Truck size={18} className={d.status==='in-transit' ? 'text-amber-600' : 'text-gray-500'}/></div><div><p className="text-sm font-semibold text-gray-800">{d.item}</p><p className="text-xs text-gray-500">{d.po} · {d.vendor}</p></div></div><POStatusBadge status={d.status}/></div><div className="grid grid-cols-3 gap-3 text-xs"><div className="flex items-center gap-1.5 text-gray-500"><MapPin size={11} className="text-gray-400"/>{d.project}</div><div className="flex items-center gap-1.5 text-gray-500"><Calendar size={11} className="text-gray-400"/>Expected: {d.expected}</div><div className="flex items-center gap-1.5 text-gray-500"><Truck size={11} className="text-gray-400"/>{d.vehicle}</div></div>{d.status === 'in-transit' && (<div className="mt-3 pt-3 border-t border-gray-100 flex gap-2"><button className="text-xs bg-green-50 text-green-700 border border-green-200 px-3 py-1 rounded-lg hover:bg-green-100">Mark Received</button><button className="text-xs bg-gray-50 text-gray-600 border border-gray-200 px-3 py-1 rounded-lg hover:bg-gray-100">Report Issue</button></div>)}</div>))}
          </div>
        )}

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h2 className="text-sm font-semibold text-gray-800 mb-1">Monthly Procurement Spend</h2><p className="text-xs text-gray-500 mb-4">In Lakhs (₹)</p><ResponsiveContainer width="100%" height={220}><BarChart data={spendData} margin={{ top:5, right:5, left:-20, bottom:0 }}><CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb"/><XAxis dataKey="month" tick={{ fill:'#6b7280', fontSize:11 }}/><YAxis tick={{ fill:'#6b7280', fontSize:11 }}/><Tooltip content={<CustomTooltip/>}/><Bar dataKey="spend" name="Spend" fill="#3b82f6" radius={[4,4,0,0]}/></BarChart></ResponsiveContainer></div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h2 className="text-sm font-semibold text-gray-800 mb-4">Spend by Category</h2>{categorySpend.map(c => (<div key={c.category}><div className="flex justify-between text-xs mb-1"><span className="text-gray-600">{c.category}</span><span className="text-gray-800 font-medium">{formatINR(c.amount)} <span className="text-gray-400">({c.pct}%)</span></span></div><div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width:`${c.pct}%`, backgroundColor:c.color }}/></div></div>))}</div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h2 className="text-sm font-semibold text-gray-800 mb-4">Price Variance Index</h2>{priceVarianceData.map(i => (<div key={i.item}><div className="flex justify-between text-xs mb-1"><span className="text-gray-700 font-medium">{i.item}</span><span className={`font-medium ${i.variance > 0 ? 'text-red-600' : 'text-green-600'}`}>{i.variance > 0 ? '+' : ''}{formatINR(i.variance)}</span></div><div className="flex justify-between text-[10px] text-gray-500 mb-1"><span>Budget: {formatINR(i.budgetRate)}/{i.qty}mt</span><span>Actual: {formatINR(i.actualRate)}/{i.qty}mt</span></div></div>))}</div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h2 className="text-sm font-semibold text-gray-800 mb-4">Wastage Trend</h2><ResponsiveContainer width="100%" height={200}><LineChart data={wastageTrend}><CartesianGrid stroke="#e5e7eb"/><XAxis dataKey="day" tick={{ fill:'#6b7280', fontSize:11 }}/><YAxis tick={{ fill:'#6b7280', fontSize:11 }} unit="%"/><Tooltip/><Line type="monotone" dataKey="loss" stroke="#ef4444" strokeWidth={2} dot={{ fill:'#ef4444', r:3 }}/></LineChart></ResponsiveContainer><p className="text-xs text-gray-500 text-center mt-2">Target &lt;3% · Current avg 4.1%</p></div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h2 className="text-sm font-semibold text-gray-800 mb-4">Top Vendors by Spend</h2>{vendors.sort((a,b)=>b.totalValue-a.totalValue).map((v,i)=>(<div key={v.id} className="flex items-center gap-3"><span className="text-xs text-gray-400 w-4">{i+1}</span><div className="flex-1"><div className="flex justify-between text-xs mb-1"><span className="text-gray-700 font-medium">{v.name}</span><span className="text-gray-800">{formatINR(v.totalValue)}</span></div><div className="h-1 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-blue-500 rounded-full" style={{ width:`${(v.totalValue / vendors[0].totalValue) * 100}%` }}/></div></div></div>))}</div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h2 className="text-sm font-semibold text-gray-800 mb-4">Vendor Reliability</h2>{vendorReliability.map(v => (<div key={v.vendor}><div className="flex justify-between text-xs mb-1"><span className="text-gray-700">{v.vendor}</span><span className="text-gray-800">{v.score}%</span></div><div className="h-1.5 bg-gray-100 rounded-full overflow-hidden"><div className="h-full bg-green-500 rounded-full" style={{ width:`${v.score}%` }}/></div><p className="text-[10px] text-gray-400 mt-0.5">{v.onTime}/{v.total} on‑time deliveries</p></div>))}</div>
            <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm"><h2 className="text-sm font-semibold text-gray-800 mb-4">Order Status Summary</h2><div className="grid grid-cols-2 gap-3">{[{ label:'Delivered',count:3,color:'text-green-600',bg:'bg-green-50 border-green-200'},{ label:'In Transit',count:1,color:'text-amber-600',bg:'bg-amber-50 border-amber-200'},{ label:'Confirmed',count:2,color:'text-blue-600',bg:'bg-blue-50 border-blue-200'},{ label:'Cancelled',count:1,color:'text-red-600',bg:'bg-red-50 border-red-200'}].map(s=>(<div key={s.label} className={`border rounded-xl p-4 text-center ${s.bg}`}><p className={`text-2xl font-bold ${s.color}`}>{s.count}</p><p className="text-xs text-gray-600 mt-1">{s.label}</p></div>))}</div></div>
          </div>
        )}
      </div>
    </div>
  );
}
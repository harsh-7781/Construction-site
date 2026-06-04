import { useState } from 'react'
import {
  FileText, Plus, Trash2, Download, Send,
  Search, Filter, Eye, Copy,
  Building2,
  CheckCircle2, Clock, XCircle, Edit3
} from 'lucide-react'
import { generateQuotationPDF } from '../../utils/pdfExport'

// ── Mock Data ──────────────────────────────────────────────
const existingQuotations = [
  { id: 'QT-2045', client: 'Shapoorji Pallonji', project: 'Commercial Tower Civil Works',    amount: '₹5.42 Cr', date: '28 Jul 2025', status: 'sent',     service: 'Civil'      },
  { id: 'QT-2044', client: 'Lodha Group',        project: 'Residential Complex Interior',   amount: '₹1.82 Cr', date: '25 Jul 2025', status: 'approved', service: 'Interior'   },
  { id: 'QT-2043', client: 'Godrej Properties',  project: 'MEP Works — Phase 2',            amount: '₹98.5 L',  date: '22 Jul 2025', status: 'draft',    service: 'MEP'        },
  { id: 'QT-2042', client: 'Kalpataru Ltd',      project: 'Structural Audit & Repairs',     amount: '₹32.0 L',  date: '18 Jul 2025', status: 'rejected', service: 'Structural' },
  { id: 'QT-2041', client: 'Oberoi Group',       project: 'Renovation — Wing B',            amount: '₹45.0 L',  date: '15 Jul 2025', status: 'approved', service: 'Renovation' },
]

const serviceTemplates = {
  Civil: [
    { description: 'Excavation and earthwork',           unit: 'M³',   rate: 850   },
    { description: 'PCC (1:4:8) — Foundation',           unit: 'M³',   rate: 5200  },
    { description: 'RCC (M25) — Columns & Beams',        unit: 'M³',   rate: 8500  },
    { description: 'RCC Slab (M25)',                     unit: 'M³',   rate: 7800  },
    { description: 'Brickwork (230mm)',                  unit: 'M²',   rate: 680   },
    { description: 'Plastering (12mm)',                  unit: 'M²',   rate: 185   },
  ],
  Interior: [
    { description: 'False ceiling — Gypsum board',       unit: 'M²',   rate: 950   },
    { description: 'Modular kitchen supply & fix',       unit: 'Lump', rate: 185000},
    { description: 'Wooden flooring — Engineered',       unit: 'M²',   rate: 2200  },
    { description: 'Wall panelling — WPC',               unit: 'M²',   rate: 1800  },
    { description: 'Painting — 2 coats premium',         unit: 'M²',   rate: 95    },
    { description: 'Electrical fixtures & fittings',     unit: 'Point',rate: 1200  },
  ],
  MEP: [
    { description: 'HVAC — Supply & Return ductwork',    unit: 'M²',   rate: 1450  },
    { description: 'Plumbing — CPVC pipes & fittings',   unit: 'Point',rate: 2800  },
    { description: 'Electrical wiring — FR cables',      unit: 'Point',rate: 1500  },
    { description: 'Fire sprinkler system',              unit: 'Point',rate: 4500  },
    { description: 'CCTV & security system',             unit: 'Point',rate: 3200  },
    { description: 'Solar panels — 5kW system',          unit: 'Nos',  rate: 85000 },
  ],
}

const clients = [
  'Oberoi Group', 'Raheja Corp', 'Lodha Group',
  'Godrej Properties', 'Shapoorji Pallonji', 'Kalpataru Ltd',
  'Hiranandani Group', 'Kohinoor Infra'
]

// ── Helpers ────────────────────────────────────────────────
const formatINR = (n) =>
  new Intl.NumberFormat('en-IN', { maximumFractionDigits: 0 }).format(n)

const StatusBadge = ({ status }) => {
  const map = {
    draft:    { label: 'Draft',    cls: 'bg-gray-100 text-gray-600 border-gray-200' },
    sent:     { label: 'Sent',     cls: 'bg-blue-100 text-blue-700 border-blue-200' },
    approved: { label: 'Approved', cls: 'bg-green-100 text-green-700 border-green-200' },
    rejected: { label: 'Rejected', cls: 'bg-red-100 text-red-700 border-red-200' },
  }
  const { label, cls } = map[status] || map.draft
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${cls}`}>
      {label}
    </span>
  )
}

const StatusIcon = ({ status }) => {
  if (status === 'approved') return <CheckCircle2 size={14} className="text-green-600" />
  if (status === 'rejected') return <XCircle      size={14} className="text-red-500"   />
  if (status === 'sent')     return <Send         size={14} className="text-blue-600"  />
  return                            <Clock        size={14} className="text-gray-400" />
}

// ── BOQ Builder ────────────────────────────────────────────
function BOQBuilder({ onBack }) {
  const [selectedService, setSelectedService] = useState('Civil')
  const [items, setItems] = useState([
    { id: 1, description: 'Excavation and earthwork',        unit: 'M³', qty: 250, rate: 850,  amount: 212500 },
    { id: 2, description: 'RCC (M25) — Columns & Beams',     unit: 'M³', qty: 85,  rate: 8500, amount: 722500 },
  ])
  const [clientName,    setClientName]    = useState('Lodha Group')
  const [projectName,   setProjectName]   = useState('')
  const [quoteDate,     setQuoteDate]     = useState('2025-08-01')
  const [validDays,     setValidDays]     = useState(30)
  const [gstPct,        setGstPct]        = useState(18)
  const [discountPct,   setDiscountPct]   = useState(0)
  const [notes,         setNotes]         = useState('Payment terms: 30% advance, 40% at midpoint, 30% on completion.')
  const [nextId,        setNextId]        = useState(3)

  const addItem = (template) => {
    const newItem = {
      id: nextId,
      description: template.description,
      unit: template.unit,
      qty: 1,
      rate: template.rate,
      amount: template.rate,
    }
    setItems([...items, newItem])
    setNextId(nextId + 1)
  }

  const addBlankItem = () => {
    setItems([...items, { id: nextId, description: '', unit: 'M²', qty: 1, rate: 0, amount: 0 }])
    setNextId(nextId + 1)
  }

  const updateItem = (id, field, value) => {
    setItems(items.map(item => {
      if (item.id !== id) return item
      const updated = { ...item, [field]: value }
      if (field === 'qty' || field === 'rate') {
        updated.amount =
          (field === 'qty'  ? value : item.qty) *
          (field === 'rate' ? value : item.rate)
      }
      return updated
    }))
  }

  const removeItem = (id) => setItems(items.filter(i => i.id !== id))

  const subtotal = items.reduce((s, i) => s + Number(i.amount), 0)
  const discount = subtotal * (discountPct / 100)
  const taxable  = subtotal - discount
  const gst      = taxable * (gstPct / 100)
  const total    = taxable + gst

  // ── PDF Handler ──
  const handleDownloadPDF = () => {
    generateQuotationPDF({
      id:           `QT-${Date.now()}`,
      client:       clientName,
      project:      projectName,
      service:      selectedService,
      contractType: 'Turnkey',
      validDays,
      items,
      discountPct,
      gstPct,
      notes,
    })
  }

  return (
    <div className="space-y-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <button
            onClick={onBack}
            className="text-xs text-gray-500 hover:text-gray-700 mb-1 flex items-center gap-1"
          >
            ← Back to quotations
          </button>
          <h1 className="text-xl font-bold text-gray-900">New Quotation</h1>
        </div>
        <div className="flex gap-2 flex-wrap">
          <button className="text-xs bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-sm">
            <Eye size={13} /> Preview
          </button>
          <button className="text-xs bg-white hover:bg-gray-50 text-gray-700 border border-gray-300 px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-sm">
            <FileText size={13} /> Save Draft
          </button>
          <button
            onClick={handleDownloadPDF}
            className="text-xs bg-green-600 hover:bg-green-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-sm"
          >
            <Download size={13} /> Download PDF
          </button>
          <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-sm">
            <Send size={13} /> Send to Client
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* ── Left: Form ── */}
        <div className="lg:col-span-2 space-y-4">

          {/* Client & Project Details */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Building2 size={15} className="text-gray-500" /> Project Details
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Client Name</label>
                <select
                  value={clientName}
                  onChange={e => setClientName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                >
                  {clients.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Project Name</label>
                <input
                  value={projectName}
                  onChange={e => setProjectName(e.target.value)}
                  placeholder="e.g. Residential Tower Phase 1"
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Quotation Date</label>
                <input
                  type="date"
                  value={quoteDate}
                  onChange={e => setQuoteDate(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-500 mb-1.5">Valid For (days)</label>
                <input
                  type="number"
                  value={validDays}
                  onChange={e => setValidDays(Number(e.target.value))}
                  className="w-full bg-gray-50 border border-gray-300 text-gray-900 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition"
                />
              </div>
            </div>
          </div>

          {/* Service Type + Quick Add */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 mb-3">Service Type</h2>
            <div className="flex gap-2 flex-wrap">
              {Object.keys(serviceTemplates).map(s => (
                <button
                  key={s}
                  onClick={() => setSelectedService(s)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium transition ${
                    selectedService === s
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
            <div className="mt-3 pt-3 border-t border-gray-200">
              <p className="text-xs text-gray-500 mb-2">Quick add items:</p>
              <div className="flex flex-wrap gap-2">
                {serviceTemplates[selectedService].map((t, i) => (
                  <button
                    key={i}
                    onClick={() => addItem(t)}
                    className="text-xs bg-gray-100 hover:bg-gray-200 text-gray-700 border border-gray-200 px-2 py-1 rounded flex items-center gap-1 transition"
                  >
                    <Plus size={11} /> {t.description.split('—')[0].trim()}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* BOQ Table */}
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
            <div className="flex items-center justify-between px-5 py-4 border-b border-gray-200">
              <h2 className="text-sm font-semibold text-gray-900">Bill of Quantities</h2>
              <button
                onClick={addBlankItem}
                className="text-xs bg-blue-100 text-blue-700 border border-blue-200 px-2 py-1 rounded-lg flex items-center gap-1 hover:bg-blue-200 transition"
              >
                <Plus size={12} /> Add Row
              </button>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm" style={{ minWidth: '600px' }}>
                <thead>
                  <tr className="text-xs text-gray-500 border-b border-gray-200 bg-gray-50">
                    <th className="text-left px-4 py-3 font-medium w-8">#</th>
                    <th className="text-left px-4 py-3 font-medium">Description</th>
                    <th className="text-left px-4 py-3 font-medium w-20">Unit</th>
                    <th className="text-left px-4 py-3 font-medium w-24">Qty</th>
                    <th className="text-left px-4 py-3 font-medium w-28">Rate (₹)</th>
                    <th className="text-left px-4 py-3 font-medium w-28">Amount (₹)</th>
                    <th className="px-4 py-3 w-10" />
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {items.map((item, idx) => (
                    <tr key={item.id} className="hover:bg-gray-50 transition">
                      <td className="px-4 py-2 text-gray-400 text-xs">{idx + 1}</td>
                      <td className="px-4 py-2">
                        <input
                          value={item.description}
                          onChange={e => updateItem(item.id, 'description', e.target.value)}
                          className="w-full bg-transparent text-gray-700 text-sm outline-none focus:bg-gray-100 rounded px-2 py-1 transition"
                          placeholder="Item description..."
                        />
                      </td>
                      <td className="px-4 py-2">
                        <select
                          value={item.unit}
                          onChange={e => updateItem(item.id, 'unit', e.target.value)}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                        >
                          {['M²','M³','Nos','RFT','Point','Lump','Kg','MT','Bags'].map(u =>
                            <option key={u} value={u}>{u}</option>
                          )}
                        </select>
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={item.qty}
                          onChange={e => updateItem(item.id, 'qty', Number(e.target.value))}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right"
                        />
                      </td>
                      <td className="px-4 py-2">
                        <input
                          type="number"
                          value={item.rate}
                          onChange={e => updateItem(item.id, 'rate', Number(e.target.value))}
                          className="w-full bg-gray-50 border border-gray-200 text-gray-700 rounded px-2 py-1 text-sm focus:outline-none focus:border-blue-500 text-right"
                        />
                      </td>
                      <td className="px-4 py-2 text-right text-gray-900 font-medium text-sm pr-4">
                        ₹{formatINR(item.amount)}
                      </td>
                      <td className="px-4 py-2">
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-red-500 transition"
                        >
                          <Trash2 size={14} />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Notes */}
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <label className="block text-xs text-gray-500 mb-2">Terms & Notes</label>
            <textarea
              value={notes}
              onChange={e => setNotes(e.target.value)}
              rows={3}
              className="w-full bg-gray-50 border border-gray-200 text-gray-700 placeholder-gray-400 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition resize-none"
            />
          </div>
        </div>

        {/* ── Right: Summary ── */}
        <div className="space-y-4">
          <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm lg:sticky lg:top-6">
            <h2 className="text-sm font-semibold text-gray-900 mb-4">Summary</h2>

            <div className="space-y-3 mb-4">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Subtotal</span>
                <span className="text-gray-900 font-medium">₹{formatINR(subtotal)}</span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">Discount (%)</span>
                <div className="flex items-center gap-2">
                  <input
                    type="number"
                    value={discountPct}
                    onChange={e => setDiscountPct(Number(e.target.value))}
                    className="w-16 bg-gray-50 border border-gray-200 text-gray-700 rounded px-2 py-1 text-xs text-right focus:outline-none focus:border-blue-500"
                    min="0" max="100"
                  />
                  <span className="text-red-500 text-sm font-medium">
                    -{formatINR(discount) === '0' ? '₹0' : `₹${formatINR(discount)}`}
                  </span>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-500">GST (%)</span>
                <div className="flex items-center gap-2">
                  <select
                    value={gstPct}
                    onChange={e => setGstPct(Number(e.target.value))}
                    className="w-16 bg-gray-50 border border-gray-200 text-gray-700 rounded px-2 py-1 text-xs focus:outline-none focus:border-blue-500"
                  >
                    {[0, 5, 12, 18, 28].map(g =>
                      <option key={g} value={g}>{g}%</option>
                    )}
                  </select>
                  <span className="text-gray-700 text-sm font-medium">+₹{formatINR(gst)}</span>
                </div>
              </div>

              <div className="border-t border-gray-200 pt-3 flex justify-between">
                <span className="text-gray-900 font-semibold">Total</span>
                <span className="text-xl font-bold text-blue-600">₹{formatINR(total)}</span>
              </div>
            </div>

            <div className="space-y-2 pt-4 border-t border-gray-200">
              <button className="w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow-sm">
                <Send size={14} /> Send to Client
              </button>
              <button
                onClick={handleDownloadPDF}
                className="w-full bg-green-600 hover:bg-green-700 text-white text-sm py-2.5 rounded-lg transition flex items-center justify-center gap-2 shadow-sm"
              >
                <Download size={14} /> Download PDF
              </button>
              <button className="w-full bg-white hover:bg-gray-50 text-gray-700 text-sm py-2.5 rounded-lg transition flex items-center justify-center gap-2 border border-gray-300 shadow-sm">
                <Copy size={14} /> Duplicate
              </button>
            </div>
          </div>

          {/* Item Count */}
          <div className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm">
            <div className="grid grid-cols-2 gap-3">
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{items.length}</p>
                <p className="text-xs text-gray-500">Line items</p>
              </div>
              <div className="text-center">
                <p className="text-2xl font-bold text-gray-900">{validDays}d</p>
                <p className="text-xs text-gray-500">Valid for</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}

// ── Main Component ──────────────────────────────────────────
export default function QuotationPage() {
  const [view,        setView]        = useState('list')
  const [searchQuery, setSearchQuery] = useState('')

  if (view === 'create') return <BOQBuilder onBack={() => setView('list')} />

  const filtered = existingQuotations.filter(q =>
    q.client.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.project.toLowerCase().includes(searchQuery.toLowerCase()) ||
    q.id.toLowerCase().includes(searchQuery.toLowerCase())
  )

  return (
    <div className="space-y-6 bg-gray-50 min-h-screen p-6">

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-bold text-gray-900">Quotations</h1>
          <p className="text-gray-500 text-sm mt-0.5">BOQ builder & quotation management</p>
        </div>
        <button
          onClick={() => setView('create')}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg transition flex items-center gap-1 shadow-sm"
        >
          <Plus size={14} /> New Quotation
        </button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: 'Total Sent',   value: '24',       sub: 'This financial year', color: 'bg-blue-500'   },
          { label: 'Approved',     value: '14',        sub: '58% approval rate',  color: 'bg-green-500'  },
          { label: 'Pending',      value: '6',         sub: 'Awaiting response',  color: 'bg-amber-500'  },
          { label: 'Total Value',  value: '₹18.2 Cr',  sub: 'All quotations',     color: 'bg-purple-500' },
        ].map((s, i) => (
          <div key={i} className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm">
            <div className={`w-2 h-2 rounded-full ${s.color} mb-3`} />
            <p className="text-2xl font-bold text-gray-900">{s.value}</p>
            <p className="text-sm text-gray-600 mt-0.5">{s.label}</p>
            <p className="text-xs text-gray-400 mt-1">{s.sub}</p>
          </div>
        ))}
      </div>

      {/* Search */}
      <div className="flex items-center gap-3">
        <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg px-3 py-2 flex-1 max-w-sm shadow-sm">
          <Search size={14} className="text-gray-400" />
          <input
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="Search quotations..."
            className="bg-transparent text-sm text-gray-900 placeholder-gray-400 outline-none w-full"
          />
        </div>
        <button className="flex items-center gap-1.5 text-xs bg-white border border-gray-200 text-gray-600 px-3 py-2 rounded-lg shadow-sm hover:bg-gray-50">
          <Filter size={13} /> Filter
        </button>
      </div>

      {/* Quotations Table */}
      <div className="bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-sm" style={{ minWidth: '700px' }}>
            <thead>
              <tr className="text-xs text-gray-500 border-b border-gray-200 bg-gray-50">
                <th className="text-left px-5 py-3 font-medium">Quote ID</th>
                <th className="text-left px-5 py-3 font-medium">Client</th>
                <th className="text-left px-5 py-3 font-medium">Project</th>
                <th className="text-left px-5 py-3 font-medium">Service</th>
                <th className="text-left px-5 py-3 font-medium">Amount</th>
                <th className="text-left px-5 py-3 font-medium">Date</th>
                <th className="text-left px-5 py-3 font-medium">Status</th>
                <th className="text-left px-5 py-3 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtered.map((q) => (
                <tr key={q.id} className="hover:bg-gray-50 transition cursor-pointer">
                  <td className="px-5 py-4 text-blue-600 font-medium">{q.id}</td>
                  <td className="px-5 py-4 text-gray-900 font-medium">{q.client}</td>
                  <td className="px-5 py-4 text-gray-500 text-xs max-w-40 truncate">{q.project}</td>
                  <td className="px-5 py-4">
                    <span className="text-xs bg-gray-100 text-gray-700 px-2 py-0.5 rounded border border-gray-200">
                      {q.service}
                    </span>
                  </td>
                  <td className="px-5 py-4 text-gray-900 font-medium">{q.amount}</td>
                  <td className="px-5 py-4 text-gray-500 text-xs">{q.date}</td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-1.5">
                      <StatusIcon status={q.status} />
                      <StatusBadge status={q.status} />
                    </div>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <button className="text-gray-400 hover:text-blue-600 transition">
                        <Eye size={14} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-600 transition">
                        <Edit3 size={14} />
                      </button>
                      <button className="text-gray-400 hover:text-blue-600 transition">
                        <Copy size={14} />
                      </button>
                      <button
                        onClick={() => generateQuotationPDF({
                          id:      q.id,
                          client:  q.client,
                          project: q.project,
                          service: q.service,
                          items: [
                            { description: q.project, unit: 'Lump', qty: 1, rate: 0, amount: 0 }
                          ],
                        })}
                        className="text-gray-400 hover:text-green-600 transition"
                        title="Download PDF"
                      >
                        <Download size={14} />
                      </button>
                    </div>
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
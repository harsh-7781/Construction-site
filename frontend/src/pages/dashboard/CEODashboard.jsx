import { useState } from 'react'
import {
  IndianRupee, Users, Star, Shield, CheckCircle2,
  RefreshCw, X, Activity, TrendingDown,
  Briefcase, CreditCard,
  AlertTriangle, Gauge, Wallet,
  Receipt, Globe, Cpu,
} from 'lucide-react'
import {
  Area, BarChart, Bar, Line,
  XAxis, YAxis, CartesianGrid, Tooltip,
  ResponsiveContainer, PieChart, Pie, Cell,
  ComposedChart, Legend,
} from 'recharts'

// ======================= MOCK DATA =======================
const revenueCashData = [
  { month: 'Jul', actual: 38, budget: 37, cashFlow: 8 },
  { month: 'Aug', actual: 41, budget: 39, cashFlow: 9 },
  { month: 'Sep', actual: 39, budget: 38, cashFlow: 7 },
  { month: 'Oct', actual: 43, budget: 40, cashFlow: 11 },
  { month: 'Nov', actual: 40, budget: 39, cashFlow: 6 },
  { month: 'Dec', actual: 45, budget: 41, cashFlow: 13 },
  { month: 'Jan', actual: 37, budget: 38, cashFlow: 5 },
  { month: 'Feb', actual: 42, budget: 40, cashFlow: 10 },
  { month: 'Mar', actual: 44, budget: 41, cashFlow: 12 },
  { month: 'Apr', actual: 41, budget: 40, cashFlow: 8 },
  { month: 'May', actual: 42.8, budget: 39, cashFlow: 10.5 },
  { month: 'Jun', actual: null, budget: 42, cashFlow: null },
]

const arAgingData = [
  { name: '0–30 Days', value: 820, color: '#2C7A4B' },
  { name: '31–60 Days', value: 450, color: '#B8860B' },
  { name: '61–90 Days', value: 310, color: '#C0601A' },
  { name: '>90 Days', value: 240, color: '#8B1A1A' },
]

const salesFunnelData = [
  { stage: 'Leads', value: 124, pct: 100 },
  { stage: 'Qualified', value: 87, pct: 82 },
  { stage: 'Proposal Sent', value: 51, pct: 64 },
  { stage: 'Negotiation', value: 28, pct: 46 },
  { stage: 'Won', value: 19, pct: 30 },
]

const evmData = [
  { project: 'Oberoi Tower', cpi: 0.82, spi: 0.88 },
  { project: 'Marina Res.', cpi: 1.02, spi: 1.01 },
  { project: 'Tech Park MEP', cpi: 0.95, spi: 0.92 },
  { project: 'Palm Villa', cpi: 1.05, spi: 1.03 },
  { project: 'Kohinoor Mall', cpi: 0.88, spi: 0.85 },
  { project: 'Lodha Fitout', cpi: 0.98, spi: 0.96 },
  { project: 'Villa Bandra', cpi: 0.91, spi: 0.89 },
]

const projectHealthData = [
  { name: 'Oberoi Residency Tower', service: 'Civil Works', complete: 68, cpi: 0.82, spi: 0.88, budgetVar: -18.2, schedVar: 22, health: 'red', pm: 'Sneha Desai', client: 'Oberoi Group', value: '₹2.4 Cr' },
  { name: 'Kohinoor Mall Interior', service: 'Interior', complete: 42, cpi: 0.95, spi: 0.92, budgetVar: -5.4, schedVar: 12, health: 'yellow', pm: 'Sneha Desai', client: 'Kohinoor Infra', value: '₹85 L' },
  { name: 'Tech Park MEP Works', service: 'MEP Services', complete: 81, cpi: 1.02, spi: 1.01, budgetVar: 2.1, schedVar: -3, health: 'green', pm: 'Sneha Desai', client: 'Raheja Corp', value: '₹1.1 Cr' },
  { name: 'Villa Renovation Bandra', service: 'Renovation', complete: 25, cpi: 0.88, spi: 0.85, budgetVar: -12.5, schedVar: 18, health: 'red', pm: 'Sneha Desai', client: 'Private Client', value: '₹38 L' },
  { name: 'Lodha Commercial Fitout', service: 'Interior', complete: 55, cpi: 0.98, spi: 0.96, budgetVar: -2.8, schedVar: 7, health: 'yellow', pm: 'Sneha Desai', client: 'Lodha Group', value: '₹1.8 Cr' },
  { name: 'Structural Audit SEEPZ', service: 'Structural', complete: 100, cpi: 1.05, spi: 1.03, budgetVar: 4.8, schedVar: -5, health: 'green', pm: 'Sneha Desai', client: 'MIDC', value: '₹62 L' },
]

const strategicInitiatives = [
  { name: 'Expand to Pune & Bangalore', progress: 68 },
  { name: 'Digital Transformation — BIM Level 3', progress: 45 },
  { name: 'Achieve ISO 9001 Certification', progress: 82 },
  { name: 'Reduce Project Delays by 30%', progress: 55 },
  { name: 'Launch Client Portal App', progress: 90 },
]

const complaintData = [
  { category: 'Delay', count: 34, cum: 33 },
  { category: 'Quality', count: 26, cum: 59 },
  { category: 'Communication', count: 18, cum: 76 },
  { category: 'Cost', count: 12, cum: 88 },
  { category: 'Safety', count: 5, cum: 93 },
  { category: 'Other', count: 8, cum: 100 },
]

const drillDownData = {
  revenue: { title: 'Revenue Detail — MTD Breakdown', content: [{ label: 'Total Revenue MTD', value: '₹4.82 Cr', highlight: true }, { label: 'Target', value: '₹4.20 Cr' }, { label: 'Variance', value: '+₹62 L (+14.7%)', up: true }, { label: 'Civil Works', value: '₹1.52 Cr (31.5%)' }, { label: 'Interior', value: '₹1.18 Cr (24.5%)' }, { label: 'MEP Services', value: '₹0.95 Cr (19.7%)' }, { label: 'Renovation', value: '₹0.62 Cr (12.8%)' }, { label: 'Structural', value: '₹0.55 Cr (11.4%)' }] },
  cash: { title: 'Cash Position Detail', content: [{ label: 'Current Cash Balance', value: '₹2.15 Cr', highlight: true }, { label: '30-Day Forecast', value: '₹1.92–2.38 Cr' }, { label: 'Operating Cash Flow', value: '+₹1.05 Cr (MTD)' }, { label: 'Payroll (12 days)', value: '₹68 L' }, { label: 'Supplier Payments', value: '₹42 L' }, { label: 'Subcontractor Bills', value: '₹31 L' }, { label: 'Equipment Lease', value: '₹4.5 L' }, { label: 'Status', value: '✅ Healthy — No borrowing needed', up: true }] },
  delivery: { title: 'On-Time Delivery Detail', content: [{ label: 'On-Time Rate', value: '87.3%', highlight: true }, { label: 'vs Last Month', value: '↑ 2.1%', up: true }, { label: 'Projects on Time', value: '8 of 9 this month' }, { label: 'Oberoi Tower Delay', value: '+22 days (permit delay)', down: true }, { label: 'Villa Bandra Delay', value: '+18 days (approval)', down: true }, { label: 'Kohinoor Mall Delay', value: '+12 days (material)', down: true }] },
  nps: { title: 'NPS Detail — Q3 Survey Results', content: [{ label: 'Net Promoter Score', value: '54', highlight: true }, { label: 'vs Last Quarter', value: '↑ 6 pts', up: true }, { label: 'Surveys Completed', value: '47' }, { label: 'Promoters (9-10)', value: '29 responses (62%)', up: true }, { label: 'Passives (7-8)', value: '14 responses (30%)' }, { label: 'Detractors (0-6)', value: '4 responses (8%)', down: true }, { label: 'Top Theme', value: 'Quality of finishing' }] },
  utilization: { title: 'Resource Utilisation Detail', content: [{ label: 'Overall Billable Rate', value: '88.5%', highlight: true }, { label: 'Target', value: '85%' }, { label: 'Structural Team', value: '92.1% ⚠️ High', down: true }, { label: 'MEP Services', value: '90.3%' }, { label: 'Civil Execution', value: '87.8%' }, { label: 'Interior Design', value: '84.2%' }, { label: 'Renovation', value: '89.7%' }] },
  safety: { title: 'Safety Dashboard Detail', content: [{ label: 'LTIR (Lost Time Injury)', value: '0.0', highlight: true }, { label: 'Days Since Last Incident', value: '187 days', up: true }, { label: 'Near-Misses MTD', value: '2 (both closed)' }, { label: 'Toolbox Talks', value: '142 this month' }, { label: 'Safety Observations', value: '86 logged' }, { label: 'PPE Compliance', value: '99.2%', up: true }, { label: 'ISO 45001 Status', value: '✅ All sites compliant', up: true }] },
}

const vitalSignsData = {
  cashRunway: { days: 43, status: 'yellow', sub: '₹2.15Cr cash + ₹1.2Cr undrawn', trend: '+2 days vs last week' },
  ebitdaDev: { value: -1.87, percent: -2.3, sub: '₹1.87Cr unfavourable', trend: 'worsening' },
  wipSanity: { index: 8.2, ageOldest: 45, status: 'yellow', sub: '₹2.1Cr unbilled, 45 days oldest' },
  milestoneAlerts: { count: 4, highRisk: ['Oberoi Tower', 'Villa Bandra'], sub: '2 projects >7 days delay' },
  clientConcentration: { top3Share: 58, client1: 'Oberoi Group (28%)', client2: 'Raheja Corp (18%)', client3: 'Lodha Group (12%)', status: 'yellow' }
}

const balanceSheet = { currentRatio: 1.8, dso: 58, dpo: 42, inventoryDays: 15, workingCapitalCycle: 31, debtEquity: 0.68, interestCoverage: 4.2 }
const gstHealth = { outputLiability: 58.2, inputCreditAvailable: 48.5, pendingReconciliation: 24, riskCredit: 12.5, rcmPending: 8.2 }
const weightedFunnel = [
  { stage: 'Leads', count: 124, value: 32.4, pct: 100 },
  { stage: 'Qualified', count: 87, value: 24.6, pct: 82 },
  { stage: 'Proposal Sent', count: 51, value: 18.2, pct: 64 },
  { stage: 'Negotiation', count: 28, value: 12.1, pct: 46 },
  { stage: 'Won', count: 19, value: 9.8, pct: 30 },
]
const orderBookCover = { backlog: 32.4, monthlyRunRate: 4.8, coverMonths: 6.75 }
const cacLtv = { cac: 1.2, ltv: 6.8, ratio: 5.67, paybackMonths: 8 }
const estimationAccuracy = { avgVariance: -4.2, topEstimator: 'Sneha Desai', worstProject: 'Oberoi Tower' }
const talentRisk = { attritionRate: 12, criticalRoles: ['Project Manager', 'Senior Architect'], successionCoverage: 68 }
const complianceCalendar = [
  { item: 'RERA Quarterly Filing - Oberoi Tower', due: '5 days', risk: 'High', penalty: '₹2L/day' },
  { item: 'PF/ESI Payment', due: '2 days', risk: 'Medium', penalty: '18% interest' },
  { item: 'Labour License Renewal - Pune Site', due: '12 days', risk: 'Low', penalty: 'Stop work' }
]
const designProductivity = { clashResolution: 82, drawingCycleDays: 4.5, rfiTurnaround: 1.2, rev0Rate: 68 }
const commodityIndices = [
  { name: 'TMT Steel', price: 58500, change: '+3.2%', impact: -14.2, unit: 'per MT' },
  { name: 'Cement', price: 375, change: '+2.7%', impact: -3.8, unit: 'per bag' },
  { name: 'Copper', price: 820, change: '-1.2%', impact: +2.1, unit: 'per kg' }
]
const macroIndicators = { repoRate: 6.5, gSecYield: 7.2, iipConstruction: 4.8, cityAbsorption: 'Mumbai +12%' }
const competitorWatch = [
  { name: 'L&T Construction', recentWin: 'Metro Line Phase 2', value: 450, strategy: 'Aggressive pricing' },
  { name: 'Shapoorji Pallonji', recentWin: 'SEZ Park Pune', value: 280, strategy: 'Fast-track execution' }
]
const innovationMetrics = {
  automationIndex: 68,
  leanWasteScore: { reworkHours: 1240, idleEquipmentCost: 2.4, materialWastage: 4.1 },
  digitalTwinActive: false,
  iotSensors: 12
}
const earlyWarningSignals = [
  { name: 'Margin Slippage', active: true, autoAction: 'Procurement locked' },
  { name: 'Collection Zombie', active: true, client: 'Oberoi Group', age: 67, autoAction: 'Legal notice drafted' },
  { name: 'Bill Shock', active: false },
  { name: 'Guarantee Exposure', active: true, exposure: 74, limit: 100, autoAction: 'Tender freeze' },
  { name: 'Idle Resource', active: false },
  { name: 'Cash Flow Paradox', active: true, months: 2, autoAction: 'Source & Use report sent' }
]

// ======================= DESIGN TOKENS =======================
const T = {
  bg: '#F4F2EE',
  surface: '#FFFFFF',
  surfaceAlt: '#F9F7F4',
  border: '#E2DDD6',
  borderStrong: '#C8C0B4',
  text: '#1A1714',
  textMid: '#4A4540',
  textMuted: '#857D74',
  accent: '#B8541C',       // burnt orange — construction brand
  accentLight: '#F2E6DC',
  accentDark: '#8C3A10',
  steel: '#2B4162',        // deep steel blue
  steelLight: '#DCE6F0',
  positive: '#2C6E49',
  positiveLight: '#DCF0E4',
  warning: '#92600A',
  warningLight: '#FDF0D5',
  danger: '#8B1A1A',
  dangerLight: '#FADFDF',
  chartA: '#B8541C',
  chartB: '#2B4162',
  chartC: '#2C6E49',
  chartD: '#92600A',
}

// ======================= SHARED STYLES =======================
const card = {
  background: T.surface,
  border: `1px solid ${T.border}`,
  borderRadius: '6px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
}

const sectionTitle = {
  fontSize: '10px',
  fontWeight: '700',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: T.textMuted,
  marginBottom: '16px',
  display: 'flex',
  alignItems: 'center',
  gap: '6px',
}

const metricVal = {
  fontSize: '24px',
  fontWeight: '700',
  color: T.text,
  lineHeight: 1,
  fontVariantNumeric: 'tabular-nums',
}

// ======================= COMPONENTS =======================
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 4, padding: '8px 12px', fontSize: 11, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <p style={{ color: T.textMuted, marginBottom: 4, fontWeight: 600 }}>{label}</p>
      {payload.map((p, i) => p.value != null && (
        <p key={i} style={{ color: p.color, fontWeight: 600 }}>
          {p.name}: {typeof p.value === 'number' ? `₹${p.value}L` : p.value}
        </p>
      ))}
    </div>
  )
}

const EVMTooltip = ({ active, payload, label }) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 4, padding: '8px 12px', fontSize: 11, boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
      <p style={{ color: T.textMuted, marginBottom: 4, fontWeight: 600 }}>{label}</p>
      {payload.map((p, i) => (
        <p key={i} style={{ color: p.color, fontWeight: 600 }}>{p.name}: {p.value?.toFixed(2)}</p>
      ))}
    </div>
  )
}

function DrillDownModal({ data, onClose }) {
  if (!data) return null
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,23,20,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div style={{ ...card, padding: 28, width: '100%', maxWidth: 440, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
          <h3 style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{data.title}</h3>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted, padding: 4 }}><X size={16} /></button>
        </div>
        <div>
          {data.content.map((row, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: i < data.content.length - 1 ? `1px solid ${T.border}` : 'none' }}>
              <span style={{ fontSize: 12, color: T.textMuted }}>{row.label}</span>
              <span style={{ fontSize: row.highlight ? 16 : 12, fontWeight: 700, color: row.highlight ? T.steel : row.up ? T.positive : row.down ? T.danger : T.text }}>{row.value}</span>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ marginTop: 20, width: '100%', padding: '9px', background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 4, color: T.textMid, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  )
}

function ProjectDrillModal({ project, onClose }) {
  if (!project) return null
  const hc = project.health === 'green' ? T.positive : project.health === 'yellow' ? T.warning : T.danger
  const hbg = project.health === 'green' ? T.positiveLight : project.health === 'yellow' ? T.warningLight : T.dangerLight
  const hl = project.health === 'green' ? 'On Track' : project.health === 'yellow' ? 'At Risk' : 'Critical'
  return (
    <div style={{ position: 'fixed', inset: 0, background: 'rgba(26,23,20,0.5)', zIndex: 50, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }} onClick={onClose}>
      <div style={{ ...card, padding: 28, width: '100%', maxWidth: 480, boxShadow: '0 20px 60px rgba(0,0,0,0.2)' }} onClick={e => e.stopPropagation()}>
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
          <div>
            <h3 style={{ fontSize: 13, fontWeight: 700, color: T.text }}>{project.name}</h3>
            <p style={{ fontSize: 11, color: T.textMuted, marginTop: 2 }}>{project.client} · {project.service}</p>
          </div>
          <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted }}><X size={16} /></button>
        </div>
        <div style={{ background: hbg, border: `1px solid ${hc}30`, borderRadius: 4, padding: '8px 12px', marginBottom: 16, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 11, fontWeight: 700, color: hc }}>● {hl}</span>
          <span style={{ fontSize: 11, color: T.textMuted }}>{project.complete}% Complete</span>
        </div>
        <div style={{ height: 6, background: T.border, borderRadius: 3, overflow: 'hidden', marginBottom: 20 }}>
          <div style={{ height: '100%', width: `${project.complete}%`, background: hc, borderRadius: 3 }} />
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          {[
            { label: 'Contract Value', value: project.value },
            { label: 'Project Manager', value: project.pm },
            { label: 'CPI', value: project.cpi.toFixed(2), color: project.cpi >= 1 ? T.positive : project.cpi >= 0.9 ? T.warning : T.danger },
            { label: 'SPI', value: project.spi.toFixed(2), color: project.spi >= 1 ? T.positive : project.spi >= 0.9 ? T.warning : T.danger },
            { label: 'Budget Variance', value: `${project.budgetVar >= 0 ? '+' : ''}${project.budgetVar.toFixed(1)}%`, color: project.budgetVar >= 0 ? T.positive : T.danger },
            { label: 'Schedule Variance', value: `${project.schedVar > 0 ? '+' : ''}${project.schedVar} days`, color: project.schedVar <= 0 ? T.positive : T.danger },
          ].map((row, i) => (
            <div key={i} style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 4, padding: '10px 12px' }}>
              <p style={{ fontSize: 10, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{row.label}</p>
              <p style={{ fontSize: 14, fontWeight: 700, color: row.color || T.text, marginTop: 3 }}>{row.value}</p>
            </div>
          ))}
        </div>
        <button onClick={onClose} style={{ marginTop: 20, width: '100%', padding: '9px', background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 4, color: T.textMid, fontSize: 12, fontWeight: 600, cursor: 'pointer' }}>Close</button>
      </div>
    </div>
  )
}

function NPSGauge({ score }) {
  const angle = (score / 100) * 180
  const rad = ((180 - angle) * Math.PI) / 180
  const cx = 100, cy = 100, r = 70
  const nx = cx + r * Math.cos(rad)
  const ny = cy - r * Math.sin(rad)
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg viewBox="0 0 200 110" style={{ width: 200 }}>
        <path d="M 30 100 A 70 70 0 0 1 100 30" fill="none" stroke={T.positive} strokeWidth="10" strokeLinecap="round" />
        <path d="M 100 30 A 70 70 0 0 1 140 44" fill="none" stroke={T.warning} strokeWidth="10" strokeLinecap="round" />
        <path d="M 140 44 A 70 70 0 0 1 170 100" fill="none" stroke={T.danger} strokeWidth="10" strokeLinecap="round" />
        <line x1={cx} y1={cy} x2={nx} y2={ny} stroke={T.text} strokeWidth="2.5" strokeLinecap="round" />
        <circle cx={cx} cy={cy} r={4} fill={T.text} />
        <text x={cx} y={cy + 22} textAnchor="middle" fill={T.text} fontSize="26" fontWeight="800">{score}</text>
      </svg>
      <p style={{ fontSize: 11, color: T.textMuted, marginTop: 4 }}>Net Promoter Score</p>
      <p style={{ fontSize: 10, color: T.textMuted, marginTop: 3 }}>Promoters 62% · Passives 30% · Detractors 8%</p>
    </div>
  )
}

function VitalSignCard({ title, value, sub, status, trend, icon: Icon, onClick }) {
  const accentMap = { green: T.positive, red: T.danger, yellow: T.warning }
  // const bgMap = { green: T.positiveLight, red: T.dangerLight, yellow: T.warningLight }
  const ac = accentMap[status] || T.steel
  return (
    <div onClick={onClick} style={{ ...card, padding: '16px', borderLeft: `3px solid ${ac}`, cursor: onClick ? 'pointer' : 'default', transition: 'box-shadow 0.15s' }}
      onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.1)'}
      onMouseLeave={e => e.currentTarget.style.boxShadow = card.boxShadow}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 8 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
          <Icon size={13} color={T.textMuted} />
          <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.textMuted }}>{title}</span>
        </div>
        {trend && <span style={{ fontSize: 9, color: T.textMuted }}>{trend}</span>}
      </div>
      <p style={{ ...metricVal, fontSize: '20px' }}>{value}</p>
      <p style={{ fontSize: 10, color: T.textMuted, marginTop: 4 }}>{sub}</p>
    </div>
  )
}

function SectionCard({ title, icon: Icon, children, style = {} }) {
  return (
    <div style={{ ...card, padding: '20px', ...style }}>
      <p style={sectionTitle}>{Icon && <Icon size={13} />}{title}</p>
      {children}
    </div>
  )
}

function StatRow({ label, value, valueColor }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '8px 0', borderBottom: `1px solid ${T.border}` }}>
      <span style={{ fontSize: 11, color: T.textMuted }}>{label}</span>
      <span style={{ fontSize: 12, fontWeight: 700, color: valueColor || T.text }}>{value}</span>
    </div>
  )
}

// ======================= MAIN DASHBOARD =======================
export default function CEODashboard() {
  const [drillModal, setDrillModal] = useState(null)
  const [projectModal, setProjectModal] = useState(null)
  const [filterPeriod, setFilterPeriod] = useState('mtd')
  const [filterService, setFilterService] = useState('all')
  const [filterRegion, setFilterRegion] = useState('all')
  const [refreshing, setRefreshing] = useState(false)
  const [showAlerts, setShowAlerts] = useState(false)
  const [showRiskHeatmap, setShowRiskHeatmap] = useState(false)

  const handleRefresh = () => { setRefreshing(true); setTimeout(() => setRefreshing(false), 1500) }
  const openDrill = (key) => setDrillModal(drillDownData[key])

  const kpiCards = [
    { key: 'revenue', label: 'Revenue MTD', value: '₹4.82 Cr', sub: '+14.7% vs Target', up: true, icon: IndianRupee },
    { key: 'cash', label: 'Cash Position', value: '₹2.15 Cr', sub: '30-day forecast stable', up: true, icon: Activity },
    { key: 'delivery', label: 'On-Time Delivery', value: '87.3%', sub: '+2.1% vs Last Month', up: true, icon: CheckCircle2 },
    { key: 'nps', label: 'Net Promoter Score', value: '54', sub: '+6 pts vs Q3', up: true, icon: Star },
    { key: 'utilization', label: 'Utilisation Rate', value: '88.5%', sub: 'Target: 85%', up: true, icon: Users },
    { key: 'safety', label: 'Safety (LTIR)', value: '0.0', sub: 'Zero Incidents — 187 days', up: true, icon: Shield },
  ]

  const alerts = [
    { icon: '⚠', title: 'Oberoi Tower — Budget Alert', desc: 'CPI dropped to 0.82 — 18% over budget', time: '2 hours ago' },
    { icon: '₹', title: 'Invoice Payment Overdue', desc: '₹48.5L from Oberoi Group — 67 days overdue', time: '1 day ago' },
    { icon: '!', title: 'Safety Incident — Villa Bandra', desc: 'Near-miss reported; investigation pending', time: '3 hours ago' },
  ]

  const selectStyle = {
    background: T.surface,
    border: `1px solid ${T.border}`,
    color: T.textMid,
    fontSize: 11,
    borderRadius: 4,
    padding: '6px 10px',
    outline: 'none',
    cursor: 'pointer',
  }

  return (
    <div style={{ background: T.bg, minHeight: '100vh', padding: '20px', fontFamily: "'DM Sans', 'Helvetica Neue', sans-serif" }}>

      {/* ── HEADER ── */}
      <div style={{ ...card, padding: '14px 20px', marginBottom: 16, display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: 12 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: T.positive, display: 'inline-block', boxShadow: `0 0 6px ${T.positive}` }} />
            <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.12em', color: T.positive, textTransform: 'uppercase' }}>Live</span>
          </div>
          <div style={{ width: 1, height: 20, background: T.border }} />
          <div>
            <p style={{ fontSize: 14, fontWeight: 700, color: T.text }}>CEO Dashboard</p>
            <p style={{ fontSize: 10, color: T.textMuted }}>Harsh Devadkar · Kumbhar Construction & Developers</p>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
          <select value={filterPeriod} onChange={e => setFilterPeriod(e.target.value)} style={selectStyle}>
            <option value="mtd">Month to Date</option>
            <option value="qtd">Quarter to Date</option>
            <option value="ytd">Year to Date</option>
            <option value="today">Today</option>
          </select>
          <select value={filterService} onChange={e => setFilterService(e.target.value)} style={selectStyle}>
            <option value="all">All Service Lines</option>
            <option value="civil">Civil Works</option>
            <option value="interior">Interior</option>
            <option value="mep">MEP Services</option>
            <option value="structural">Structural</option>
            <option value="renovation">Renovation</option>
          </select>
          <select value={filterRegion} onChange={e => setFilterRegion(e.target.value)} style={selectStyle}>
            <option value="all">All Regions</option>
            <option value="mumbai">Mumbai</option>
            <option value="pune">Pune</option>
            <option value="delhi">Delhi</option>
          </select>
          <div style={{ position: 'relative' }}>
            <button onClick={() => setShowAlerts(!showAlerts)} style={{ position: 'relative', padding: '6px 10px', background: T.surface, border: `1px solid ${T.border}`, borderRadius: 4, cursor: 'pointer', fontSize: 11, color: T.textMid, display: 'flex', alignItems: 'center', gap: 4 }}>
              Alerts
              <span style={{ background: T.danger, color: '#fff', fontSize: 9, fontWeight: 700, borderRadius: 10, padding: '1px 5px' }}>{alerts.length}</span>
            </button>
            {showAlerts && (
              <div style={{ position: 'absolute', right: 0, top: 38, width: 320, ...card, boxShadow: '0 8px 32px rgba(0,0,0,0.12)', zIndex: 50 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 16px', borderBottom: `1px solid ${T.border}` }}>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.text }}>Active Alerts</span>
                  <button onClick={() => setShowAlerts(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: T.textMuted }}><X size={14} /></button>
                </div>
                {alerts.map((a, i) => (
                  <div key={i} style={{ padding: '10px 16px', borderBottom: i < alerts.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                    <p style={{ fontSize: 11, fontWeight: 700, color: T.text }}>{a.title}</p>
                    <p style={{ fontSize: 10, color: T.textMuted, marginTop: 2 }}>{a.desc}</p>
                    <p style={{ fontSize: 9, color: T.textMuted, marginTop: 3 }}>{a.time}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <button onClick={handleRefresh} style={{ display: 'flex', alignItems: 'center', gap: 5, background: T.steel, color: '#fff', border: 'none', borderRadius: 4, padding: '6px 12px', fontSize: 11, fontWeight: 600, cursor: 'pointer' }}>
            <RefreshCw size={12} style={{ animation: refreshing ? 'spin 0.8s linear infinite' : 'none' }} />
            Refresh
          </button>
        </div>
      </div>

      {/* ── VITAL SIGNS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))', gap: 12, marginBottom: 16 }}>
        <VitalSignCard title="Cash Runway" value={`${vitalSignsData.cashRunway.days} days`} sub={vitalSignsData.cashRunway.sub} status={vitalSignsData.cashRunway.status} trend={vitalSignsData.cashRunway.trend} icon={Wallet} onClick={() => openDrill('cash')} />
        <VitalSignCard title="EBITDA Deviation" value={`${vitalSignsData.ebitdaDev.percent}%`} sub="₹1.87Cr unfavourable" status="red" trend="worsening" icon={TrendingDown} />
        <VitalSignCard title="WIP Sanity Index" value={vitalSignsData.wipSanity.index} sub={vitalSignsData.wipSanity.sub} status={vitalSignsData.wipSanity.status} icon={Gauge} />
        <VitalSignCard title="Milestone Alerts" value={vitalSignsData.milestoneAlerts.count} sub={vitalSignsData.milestoneAlerts.sub} status="red" icon={AlertTriangle} />
        <VitalSignCard title="Client Concentration" value={`${vitalSignsData.clientConcentration.top3Share}%`} sub={`Top 3 incl. ${vitalSignsData.clientConcentration.client1}`} status={vitalSignsData.clientConcentration.status} icon={Users} />
      </div>

      {/* ── KPI CARDS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(150px, 1fr))', gap: 12, marginBottom: 16 }}>
        {kpiCards.map(k => (
          <div key={k.key} onClick={() => openDrill(k.key)}
            style={{ ...card, padding: '16px', borderTop: `3px solid ${k.up ? T.accent : T.danger}`, cursor: 'pointer', transition: 'box-shadow 0.15s, transform 0.15s' }}
            onMouseEnter={e => { e.currentTarget.style.boxShadow = '0 6px 20px rgba(0,0,0,0.1)'; e.currentTarget.style.transform = 'translateY(-1px)' }}
            onMouseLeave={e => { e.currentTarget.style.boxShadow = card.boxShadow; e.currentTarget.style.transform = 'none' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 10 }}>
              <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.textMuted }}>{k.label}</span>
              <k.icon size={13} color={T.textMuted} />
            </div>
            <p style={metricVal}>{k.value}</p>
            <p style={{ fontSize: 10, color: k.up ? T.positive : T.danger, marginTop: 5, fontWeight: 600 }}>{k.up ? '▲' : '▼'} {k.sub}</p>
          </div>
        ))}
      </div>

      {/* ── REVENUE CHART + AR AGING ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 12 }}>
        <SectionCard title="Revenue & Cash Flow — Actual vs Budget (12-Month)">
          <ResponsiveContainer width="100%" height={220}>
            <ComposedChart data={revenueCashData} margin={{ top: 5, right: 10, left: -15, bottom: 0 }}>
              <defs>
                <linearGradient id="ag" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={T.accent} stopOpacity={0.12} />
                  <stop offset="95%" stopColor={T.accent} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
              <XAxis dataKey="month" tick={{ fill: T.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: T.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <Tooltip content={<CustomTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, paddingTop: 10 }} formatter={v => <span style={{ color: T.textMid }}>{v}</span>} />
              <Area type="monotone" dataKey="actual" name="Revenue Actual (₹L)" stroke={T.accent} strokeWidth={2} fill="url(#ag)" dot={{ fill: T.accent, r: 2 }} />
              <Line type="monotone" dataKey="budget" name="Revenue Budget (₹L)" stroke={T.borderStrong} strokeWidth={1.5} strokeDasharray="5 3" dot={false} />
              <Area type="monotone" dataKey="cashFlow" name="Cash Flow (₹L)" stroke={T.positive} strokeWidth={2} fill="none" dot={{ fill: T.positive, r: 2 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </SectionCard>

        <SectionCard title="AR Aging Breakdown">
          <ResponsiveContainer width="100%" height={160}>
            <PieChart>
              <Pie data={arAgingData} cx="50%" cy="50%" innerRadius={45} outerRadius={68} paddingAngle={2} dataKey="value">
                {arAgingData.map((e, i) => <Cell key={i} fill={e.color} />)}
              </Pie>
              <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 4, fontSize: 11 }} />
            </PieChart>
          </ResponsiveContainer>
          <div style={{ marginTop: 8 }}>
            {arAgingData.map((d, i) => (
              <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '4px 0', borderBottom: i < arAgingData.length - 1 ? `1px solid ${T.border}` : 'none' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                  <span style={{ width: 8, height: 8, borderRadius: 2, background: d.color, display: 'inline-block' }} />
                  <span style={{ fontSize: 10, color: T.textMuted }}>{d.name}</span>
                </div>
                <span style={{ fontSize: 11, fontWeight: 700, color: T.text }}>₹{d.value}K</span>
              </div>
            ))}
          </div>
          <div style={{ textAlign: 'center', marginTop: 10, paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
            <p style={{ fontSize: 10, color: T.textMuted }}>Total Outstanding</p>
            <p style={{ fontSize: 18, fontWeight: 700, color: T.danger }}>₹1.82M</p>
          </div>
        </SectionCard>
      </div>

      {/* ── FINANCIAL OBSERVATORY ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <SectionCard title="Balance Sheet Indicators" icon={CreditCard}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 8 }}>
            {[
              { l: 'Current Ratio', v: balanceSheet.currentRatio, c: T.text },
              { l: 'DSO (Days)', v: balanceSheet.dso, c: T.warning },
              { l: 'DPO (Days)', v: balanceSheet.dpo, c: T.text },
              { l: 'Working Capital Cycle', v: `${balanceSheet.workingCapitalCycle}d`, c: T.text },
              { l: 'Debt / Equity', v: balanceSheet.debtEquity, c: T.text },
              { l: 'Interest Coverage', v: `${balanceSheet.interestCoverage}x`, c: T.positive },
            ].map((r, i) => (
              <div key={i} style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 4, padding: '10px 12px' }}>
                <p style={{ fontSize: 9, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.l}</p>
                <p style={{ fontSize: 16, fontWeight: 700, color: r.c, marginTop: 3 }}>{r.v}</p>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="GST Health" icon={Receipt}>
          <StatRow label="Output Liability (₹L)" value={gstHealth.outputLiability} />
          <StatRow label="Input Credit Available (₹L)" value={gstHealth.inputCreditAvailable} valueColor={T.positive} />
          <StatRow label="Pending Reconciliation" value={`${gstHealth.pendingReconciliation} invoices`} valueColor={T.warning} />
          <StatRow label="At-risk Input Credit (₹L)" value={gstHealth.riskCredit} valueColor={T.danger} />
          <StatRow label="RCM Liability Pending (₹L)" value={gstHealth.rcmPending} valueColor={T.danger} />
        </SectionCard>
      </div>

      {/* ── SALES FUNNEL + EVM ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <SectionCard title="Sales Pipeline — Stage Funnel">
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6 }}>
            {salesFunnelData.map((s, i) => (
              <div key={i} style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                <div style={{ width: `${s.pct}%`, maxWidth: '100%', minWidth: '50%', background: i === salesFunnelData.length - 1 ? T.positive : T.steel, borderRadius: 3, padding: '8px 0', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 8, cursor: 'pointer', transition: 'opacity 0.15s' }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: '#fff', letterSpacing: '0.04em' }}>{s.stage}</span>
                  <span style={{ fontSize: 10, color: 'rgba(255,255,255,0.7)' }}>{s.value}</span>
                </div>
                {i < salesFunnelData.length - 1 && (
                  <p style={{ fontSize: 9, color: T.textMuted, margin: '2px 0' }}>
                    ↓ {Math.round((salesFunnelData[i + 1].value / s.value) * 100)}% conversion
                  </p>
                )}
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Earned Value — Portfolio CPI & SPI">
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={evmData} margin={{ top: 5, right: 5, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
              <XAxis dataKey="project" tick={{ fill: T.textMuted, fontSize: 8 }} axisLine={false} tickLine={false} angle={-30} textAnchor="end" height={50} />
              <YAxis domain={[0.6, 1.2]} tick={{ fill: T.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => v.toFixed(2)} />
              <Tooltip content={<EVMTooltip />} />
              <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} formatter={v => <span style={{ color: T.textMid }}>{v}</span>} />
              <Bar dataKey="cpi" name="CPI" radius={[3, 3, 0, 0]}>
                {evmData.map((e, i) => <Cell key={i} fill={e.cpi >= 1 ? T.positive : e.cpi >= 0.9 ? T.warning : T.danger} />)}
              </Bar>
              <Bar dataKey="spi" name="SPI" radius={[3, 3, 0, 0]}>
                {evmData.map((e, i) => <Cell key={i} fill={e.spi >= 1 ? '#5FAD8A' : e.spi >= 0.9 ? '#C49A30' : '#C05050'} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
          <div style={{ display: 'flex', justifyContent: 'space-around', fontSize: 11, fontWeight: 700, paddingTop: 10, borderTop: `1px solid ${T.border}`, marginTop: 6 }}>
            <span>Portfolio CPI: <span style={{ color: T.warning }}>0.94</span></span>
            <span>Portfolio SPI: <span style={{ color: T.positive }}>0.97</span></span>
          </div>
        </SectionCard>
      </div>

      {/* ── PROJECT HEALTH TABLE + NPS ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 12, marginBottom: 12 }}>
        <div style={card}>
          <div style={{ padding: '16px 20px', borderBottom: `1px solid ${T.border}` }}>
            <p style={sectionTitle}>Active Projects — Health Dashboard</p>
          </div>
          <div style={{ overflowX: 'auto', maxHeight: 280, overflowY: 'auto' }}>
            <table style={{ width: '100%', fontSize: 11, minWidth: 640, borderCollapse: 'collapse' }}>
              <thead style={{ position: 'sticky', top: 0, background: T.surfaceAlt }}>
                <tr style={{ borderBottom: `1px solid ${T.border}` }}>
                  {['Project', 'Service', '% Done', 'CPI', 'SPI', 'Budget', 'Schedule', 'Status'].map(h => (
                    <th key={h} style={{ textAlign: 'left', padding: '8px 12px', fontSize: 9, fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: T.textMuted, whiteSpace: 'nowrap' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {projectHealthData.map((p, i) => (
                  <tr key={i} onClick={() => setProjectModal(p)} style={{ borderBottom: `1px solid ${T.border}`, cursor: 'pointer', transition: 'background 0.1s' }}
                    onMouseEnter={e => e.currentTarget.style.background = T.surfaceAlt}
                    onMouseLeave={e => e.currentTarget.style.background = 'transparent'}>
                    <td style={{ padding: '10px 12px' }}>
                      <p style={{ fontWeight: 700, color: T.text }}>{p.name}</p>
                      <p style={{ fontSize: 9, color: T.textMuted, marginTop: 1 }}>{p.pm}</p>
                    </td>
                    <td style={{ padding: '10px 12px', color: T.textMuted }}>{p.service}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: T.text }}>{p.complete}%</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: p.cpi >= 1 ? T.positive : p.cpi >= 0.9 ? T.warning : T.danger }}>{p.cpi.toFixed(2)}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 700, color: p.spi >= 1 ? T.positive : p.spi >= 0.9 ? T.warning : T.danger }}>{p.spi.toFixed(2)}</td>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: p.budgetVar >= 0 ? T.positive : T.danger }}>{p.budgetVar >= 0 ? '+' : ''}{p.budgetVar.toFixed(1)}%</td>
                    <td style={{ padding: '10px 12px', fontWeight: 600, color: p.schedVar <= 0 ? T.positive : T.danger }}>{p.schedVar > 0 ? '+' : ''}{p.schedVar}d</td>
                    <td style={{ padding: '10px 12px' }}>
                      <span style={{ padding: '2px 8px', borderRadius: 3, fontSize: 9, fontWeight: 700, background: p.health === 'green' ? T.positiveLight : p.health === 'yellow' ? T.warningLight : T.dangerLight, color: p.health === 'green' ? T.positive : p.health === 'yellow' ? T.warning : T.danger }}>
                        {p.health === 'green' ? 'ON TRACK' : p.health === 'yellow' ? 'AT RISK' : 'CRITICAL'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
        <SectionCard title="Client Satisfaction — NPS">
          <div style={{ display: 'flex', justifyContent: 'center', padding: '8px 0' }}>
            <NPSGauge score={54} />
          </div>
        </SectionCard>
      </div>

      {/* ── SALES & GROWTH ENGINE ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <SectionCard title="Weighted Sales Funnel (₹ Cr)">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
            {weightedFunnel.map((s, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 4 }}>
                  <span style={{ fontSize: 11, color: T.textMid }}>{s.stage}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.text }}>₹{s.value} Cr · {s.count} deals</span>
                </div>
                <div style={{ height: 6, background: T.border, borderRadius: 3, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${s.pct}%`, background: T.steel, borderRadius: 3 }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Order Book & Customer Economics" icon={Briefcase}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10, marginBottom: 14 }}>
            <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 4, padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: 9, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>Order Book Cover</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: T.text, margin: '6px 0 2px' }}>{orderBookCover.coverMonths}x</p>
              <p style={{ fontSize: 9, color: T.textMuted }}>Backlog ₹{orderBookCover.backlog}Cr</p>
            </div>
            <div style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 4, padding: '12px', textAlign: 'center' }}>
              <p style={{ fontSize: 9, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.08em' }}>CAC / LTV Ratio</p>
              <p style={{ fontSize: 22, fontWeight: 700, color: T.text, margin: '6px 0 2px' }}>{cacLtv.ratio}x</p>
              <p style={{ fontSize: 9, color: T.textMuted }}>Payback {cacLtv.paybackMonths} months</p>
            </div>
          </div>
          <div style={{ paddingTop: 10, borderTop: `1px solid ${T.border}` }}>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: 11, color: T.textMuted }}>Estimation Accuracy</span>
              <span style={{ fontSize: 11, fontWeight: 700, color: estimationAccuracy.avgVariance < 0 ? T.danger : T.positive }}>{estimationAccuracy.avgVariance}% vs budget</span>
            </div>
            <p style={{ fontSize: 9, color: T.textMuted, marginTop: 3 }}>Top: {estimationAccuracy.topEstimator} · Worst: {estimationAccuracy.worstProject}</p>
          </div>
        </SectionCard>
      </div>

      {/* ── TEAM & COMPLIANCE ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <SectionCard title="Key Talent & Compliance" icon={Users}>
          <StatRow label="Attrition Rate (6M)" value={`${talentRisk.attritionRate}%`} valueColor={T.danger} />
          <StatRow label="Succession Coverage" value={`${talentRisk.successionCoverage}%`} valueColor={T.warning} />
          <div style={{ padding: '8px 0', borderBottom: `1px solid ${T.border}` }}>
            <span style={{ fontSize: 10, color: T.textMuted }}>Critical roles: </span>
            <span style={{ fontSize: 10, fontWeight: 600, color: T.text }}>{talentRisk.criticalRoles.join(', ')}</span>
          </div>
          <p style={{ fontSize: 10, fontWeight: 700, color: T.textMid, marginTop: 12, marginBottom: 8, textTransform: 'uppercase', letterSpacing: '0.06em' }}>Compliance Calendar</p>
          {complianceCalendar.map((c, i) => (
            <div key={i} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '6px 0', borderBottom: i < complianceCalendar.length - 1 ? `1px solid ${T.border}` : 'none' }}>
              <span style={{ fontSize: 10, color: T.textMid }}>{c.item}</span>
              <span style={{ fontSize: 10, fontWeight: 700, color: c.risk === 'High' ? T.danger : T.warning }}>Due {c.due}</span>
            </div>
          ))}
        </SectionCard>

        <SectionCard title="Design Productivity" icon={Briefcase}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
            {[
              { l: 'Clash Resolution', v: `${designProductivity.clashResolution}%` },
              { l: 'Drawing Cycle', v: `${designProductivity.drawingCycleDays} days` },
              { l: 'RFI Turnaround', v: `${designProductivity.rfiTurnaround} days` },
              { l: 'Rev-0 First Review', v: `${designProductivity.rev0Rate}%` },
            ].map((r, i) => (
              <div key={i} style={{ background: T.surfaceAlt, border: `1px solid ${T.border}`, borderRadius: 4, padding: '12px' }}>
                <p style={{ fontSize: 9, color: T.textMuted, textTransform: 'uppercase', letterSpacing: '0.06em' }}>{r.l}</p>
                <p style={{ fontSize: 18, fontWeight: 700, color: T.text, marginTop: 4 }}>{r.v}</p>
              </div>
            ))}
          </div>
        </SectionCard>
      </div>

      {/* ── MARKET INTELLIGENCE + INNOVATION ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <SectionCard title="Market Intelligence" icon={Globe}>
          {commodityIndices.map(c => (
            <div key={c.name} style={{ display: 'grid', gridTemplateColumns: '1fr auto auto', gap: 8, alignItems: 'center', padding: '7px 0', borderBottom: `1px solid ${T.border}` }}>
              <span style={{ fontSize: 11, color: T.textMid }}>{c.name} <span style={{ fontSize: 9, color: T.textMuted }}>({c.unit})</span></span>
              <span style={{ fontSize: 11, fontWeight: 700, color: T.text }}>₹{c.price} <span style={{ color: c.change.includes('+') ? T.danger : T.positive, fontWeight: 700 }}>{c.change}</span></span>
              <span style={{ fontSize: 10, color: T.textMuted }}>{c.impact > 0 ? '+' : ''}{c.impact}L</span>
            </div>
          ))}
          <p style={{ fontSize: 10, color: T.textMid, marginTop: 10 }}>Repo {macroIndicators.repoRate}% · 10Y G-Sec {macroIndicators.gSecYield}% · IIP Construction {macroIndicators.iipConstruction}%</p>
          {competitorWatch.map(c => (
            <p key={c.name} style={{ fontSize: 10, color: T.textMid, marginTop: 4 }}>↗ {c.name} won ₹{c.value}Cr {c.recentWin}</p>
          ))}
        </SectionCard>

        <SectionCard title="Innovation & Automation" icon={Cpu}>
          <StatRow label="Automation Index" value={`${innovationMetrics.automationIndex}%`} valueColor={T.steel} />
          <StatRow label="Rework Hours" value={`${innovationMetrics.leanWasteScore.reworkHours}h`} valueColor={T.warning} />
          <StatRow label="Idle Equipment Cost" value={`₹${innovationMetrics.leanWasteScore.idleEquipmentCost}L`} valueColor={T.warning} />
          <StatRow label="IoT Sensors Deployed" value={innovationMetrics.iotSensors} />
          <StatRow label="Digital Twin" value="Pilot mode" valueColor={T.textMuted} />
          <StatRow label="Material Wastage" value={`${innovationMetrics.leanWasteScore.materialWastage}% (target <3%)`} valueColor={T.danger} />
        </SectionCard>
      </div>

      {/* ── EARLY WARNING SYSTEM ── */}
      <div style={{ ...card, padding: '20px', marginBottom: 12 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <p style={sectionTitle}><AlertTriangle size={13} /> Early Warning System — Active Signals</p>
          <button onClick={() => setShowRiskHeatmap(!showRiskHeatmap)} style={{ fontSize: 10, color: T.steel, background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}>
            {showRiskHeatmap ? 'Hide' : 'Show'} Details
          </button>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: 8 }}>
          {earlyWarningSignals.map(s => (
            <div key={s.name} style={{ background: s.active ? T.dangerLight : T.surfaceAlt, border: `1px solid ${s.active ? `${T.danger}40` : T.border}`, borderRadius: 4, padding: '10px 12px', textAlign: 'center' }}>
              <p style={{ fontSize: 10, fontWeight: 700, color: s.active ? T.danger : T.textMuted }}>{s.name}</p>
              <p style={{ fontSize: 11, fontWeight: 700, marginTop: 4, color: s.active ? T.danger : T.positive }}>{s.active ? '● ACTIVE' : '● CLEAR'}</p>
              {showRiskHeatmap && s.active && s.autoAction && (
                <p style={{ fontSize: 9, color: T.textMuted, marginTop: 4 }}>{s.autoAction}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* ── STRATEGIC INITIATIVES + PARETO ── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginBottom: 12 }}>
        <SectionCard title="Strategic Initiative Progress">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
            {strategicInitiatives.map((item, i) => (
              <div key={i}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 5 }}>
                  <span style={{ fontSize: 11, fontWeight: 600, color: T.textMid }}>{item.name}</span>
                  <span style={{ fontSize: 11, fontWeight: 700, color: T.text }}>{item.progress}%</span>
                </div>
                <div style={{ height: 8, background: T.border, borderRadius: 4, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.progress}%`, background: item.progress >= 80 ? T.positive : item.progress >= 50 ? T.steel : T.warning, borderRadius: 4, transition: 'width 1s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </SectionCard>

        <SectionCard title="Quality — Complaint Pareto">
          <ResponsiveContainer width="100%" height={200}>
            <ComposedChart data={complaintData} margin={{ top: 5, right: 30, left: -15, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke={T.border} />
              <XAxis dataKey="category" tick={{ fill: T.textMuted, fontSize: 9 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="left" tick={{ fill: T.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} />
              <YAxis yAxisId="right" orientation="right" domain={[0, 100]} tick={{ fill: T.textMuted, fontSize: 10 }} axisLine={false} tickLine={false} tickFormatter={v => `${v}%`} />
              <Tooltip contentStyle={{ background: T.surface, border: `1px solid ${T.border}`, borderRadius: 4, fontSize: 11 }} />
              <Legend wrapperStyle={{ fontSize: 10, paddingTop: 8 }} formatter={v => <span style={{ color: T.textMid }}>{v}</span>} />
              <Bar yAxisId="left" dataKey="count" name="Complaint Count" fill={T.steel} radius={[3, 3, 0, 0]} />
              <Line yAxisId="right" type="monotone" dataKey="cum" name="Cumulative %" stroke={T.accent} strokeWidth={2} dot={{ fill: T.accent, r: 3 }} />
            </ComposedChart>
          </ResponsiveContainer>
        </SectionCard>
      </div>

      {/* ── MODALS ── */}
      <DrillDownModal data={drillModal} onClose={() => setDrillModal(null)} />
      <ProjectDrillModal project={projectModal} onClose={() => setProjectModal(null)} />

      <style>{`
        @keyframes spin { to { transform: rotate(360deg); } }
        * { box-sizing: border-box; }
        ::-webkit-scrollbar { width: 6px; height: 6px; }
        ::-webkit-scrollbar-track { background: ${T.bg}; }
        ::-webkit-scrollbar-thumb { background: ${T.borderStrong}; border-radius: 3px; }
      `}</style>
    </div>
  )
}

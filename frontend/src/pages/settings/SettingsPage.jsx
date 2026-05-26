import { useState } from 'react'
import {
   Building2, Users, Shield, Bell,
  Palette, Save, Edit3, Plus,
  Trash2,  Check, Upload,
  Mail, Phone, MapPin, Globe,
  Lock, UserPlus, AlertTriangle, ChevronRight,
  Moon, Sun, Monitor, 
} from 'lucide-react'

// ── Mock Data ──────────────────────────────────────────────
const teamMembers = [
  { id:1, name:'Rajesh Mehta',  email:'ceo@constructos.com',        role:'ceo',        title:'Chief Executive Officer', status:'active',   last:'Today'      },
  { id:2, name:'Priya Sharma',  email:'cfo@constructos.com',        role:'cfo',        title:'Chief Financial Officer', status:'active',   last:'Today'      },
  { id:3, name:'Arjun Patel',   email:'cto@constructos.com',        role:'cto',        title:'Chief Technology Officer',status:'active',   last:'Yesterday'  },
  { id:4, name:'Sneha Desai',   email:'pm@constructos.com',         role:'pm',         title:'Project Manager',         status:'active',   last:'Today'      },
  { id:5, name:'Vikram Singh',  email:'supervisor@constructos.com', role:'supervisor', title:'Site Supervisor',         status:'active',   last:'Today'      },
  { id:6, name:'Ravi Mehta',    email:'ravi@constructos.com',       role:'pm',         title:'Assistant PM',            status:'inactive', last:'3 days ago' },
]

const rolePermissions = [
  { role:'CEO',        color:'bg-purple-600', permissions:['All modules','Full access','User management','Financial data','Reports'] },
  { role:'CFO',        color:'bg-blue-600',   permissions:['Finance module','Invoices','Expenses','Reports','CRM view'] },
  { role:'CTO',        color:'bg-teal-600',   permissions:['Tech settings','Project view','Reports','Drawings vault'] },
  { role:'PM',         color:'bg-amber-600',  permissions:['Projects','Tasks','CRM','Quotations','Procurement','Site'] },
  { role:'Supervisor', color:'bg-orange-600', permissions:['Site module','Daily reports','Material requests','Worker attendance'] },
]

const notificationSettings = [
  { id:'proj_update',   label:'Project updates',        sub:'Task completions, milestone reached',    email:true,  push:true,  sms:false },
  { id:'invoice',       label:'Invoice activity',       sub:'New invoices, payments received',        email:true,  push:true,  sms:true  },
  { id:'material',      label:'Material alerts',        sub:'Low stock, delivery updates',            email:false, push:true,  sms:false },
  { id:'lead',          label:'New leads',              sub:'CRM lead assignments',                   email:true,  push:false, sms:false },
  { id:'site_issue',    label:'Site issues',            sub:'Issues raised by supervisors',           email:true,  push:true,  sms:true  },
  { id:'approval',      label:'Approvals pending',      sub:'POs, expenses, requests',                email:true,  push:true,  sms:false },
]

const ROLE_COLORS = {
  ceo:        'bg-purple-500',
  cfo:        'bg-blue-500',
  cto:        'bg-teal-500',
  pm:         'bg-amber-500',
  supervisor: 'bg-orange-500',
}

// ── Helpers ────────────────────────────────────────────────
const Toggle = ({ value, onChange }) => (
  <button
    onClick={() => onChange(!value)}
    className={`relative w-10 h-5 rounded-full transition-colors ${value ? 'bg-blue-600' : 'bg-slate-700'}`}
  >
    <span className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform ${value ? 'translate-x-5' : 'translate-x-0.5'}`}/>
  </button>
)

const RoleBadge = ({ role }) => {
  const labels = { ceo:'CEO', cfo:'CFO', cto:'CTO', pm:'PM', supervisor:'Supervisor' }
  return (
    <span className={`text-xs px-2 py-0.5 rounded-full text-white font-medium ${ROLE_COLORS[role] || 'bg-slate-600'}`}>
      {labels[role] || role}
    </span>
  )
}

// ── Sections ───────────────────────────────────────────────

function CompanyProfile() {
  const [editing, setEditing] = useState(false)
  const [form, setForm] = useState({
    name:     'ConstructOS Pvt Ltd',
    tagline:  'Design. Build. Deliver.',
    email:    'info@constructos.com',
    phone:    '+91 98200 00000',
    address:  'Office 402, Bandra Kurla Complex, Mumbai 400051',
    website:  'www.constructos.com',
    gstin:    '27AABCU9603R1ZX',
    pan:      'AABCU9603R',
    founded:  '2018',
    employees:'85',
  })

  const update = (k, v) => setForm(f => ({ ...f, [k]: v }))

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Company Profile</h2>
        <button
          onClick={() => setEditing(!editing)}
          className={`text-xs px-3 py-1.5 rounded-lg flex items-center gap-1 transition ${
            editing
              ? 'bg-green-600 hover:bg-green-700 text-white'
              : 'bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300'
          }`}
        >
          {editing ? <><Save size={13}/> Save Changes</> : <><Edit3 size={13}/> Edit Profile</>}
        </button>
      </div>

      {/* Logo + Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <div className="flex items-center gap-5">
          <div className="w-20 h-20 rounded-2xl bg-blue-600 flex items-center justify-center shrink-0">
            <Building2 size={36} className="text-white"/>
          </div>
          <div className="flex-1">
            {editing ? (
              <div className="space-y-2">
                <input value={form.name} onChange={e=>update('name',e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
                <input value={form.tagline} onChange={e=>update('tagline',e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-slate-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              </div>
            ) : (
              <>
                <h3 className="text-lg font-bold text-white">{form.name}</h3>
                <p className="text-slate-400 text-sm">{form.tagline}</p>
              </>
            )}
            {editing && (
              <button className="mt-2 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
                <Upload size={12}/> Upload Logo
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Contact Details */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Contact Information</h3>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {[
            { key:'email',   label:'Email',   icon:Mail,   placeholder:'company@email.com' },
            { key:'phone',   label:'Phone',   icon:Phone,  placeholder:'+91 XXXXX XXXXX'   },
            { key:'address', label:'Address', icon:MapPin, placeholder:'Full address'       },
            { key:'website', label:'Website', icon:Globe,  placeholder:'www.company.com'   },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs text-slate-500 mb-1.5 flex items-center gap-1">
                <f.icon size={11}/> {f.label}
              </label>
              {editing ? (
                <input value={form[f.key]} onChange={e=>update(f.key,e.target.value)}
                  placeholder={f.placeholder}
                  className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              ) : (
                <p className="text-sm text-slate-300">{form[f.key]}</p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Legal Details */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Legal & Tax</h3>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { key:'gstin',     label:'GSTIN'      },
            { key:'pan',       label:'PAN'        },
            { key:'founded',   label:'Founded'    },
            { key:'employees', label:'Team Size'  },
          ].map(f => (
            <div key={f.key}>
              <label className="block text-xs text-slate-500 mb-1.5">{f.label}</label>
              {editing ? (
                <input value={form[f.key]} onChange={e=>update(f.key,e.target.value)}
                  className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
              ) : (
                <p className="text-sm text-white font-medium">{form[f.key]}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function UserManagement() {
  const [members, setMembers] = useState(teamMembers)
  const [showInvite, setShowInvite] = useState(false)
  const [inviteEmail, setInviteEmail] = useState('')
  const [inviteRole, setInviteRole] = useState('pm')

  const toggleStatus = (id) => {
    setMembers(members.map(m =>
      m.id === id ? { ...m, status: m.status === 'active' ? 'inactive' : 'active' } : m
    ))
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">User Management</h2>
        <button
          onClick={() => setShowInvite(!showInvite)}
          className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1"
        >
          <UserPlus size={13}/> Invite User
        </button>
      </div>

      {/* Invite Form */}
      {showInvite && (
        <div className="bg-slate-900 border border-blue-800 rounded-xl p-5">
          <h3 className="text-sm font-semibold text-white mb-4">Invite New User</h3>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            <div className="lg:col-span-2">
              <label className="block text-xs text-slate-400 mb-1.5">Email Address</label>
              <input value={inviteEmail} onChange={e=>setInviteEmail(e.target.value)}
                placeholder="user@constructos.com"
                className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
            </div>
            <div>
              <label className="block text-xs text-slate-400 mb-1.5">Role</label>
              <select value={inviteRole} onChange={e=>setInviteRole(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                {['ceo','cfo','cto','pm','supervisor'].map(r=>
                  <option key={r} value={r} className="capitalize">{r.toUpperCase()}</option>)}
              </select>
            </div>
          </div>
          <div className="flex gap-2 mt-4">
            <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-1">
              <Mail size={13}/> Send Invite
            </button>
            <button onClick={() => setShowInvite(false)}
              className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-4 py-2 rounded-lg">
              Cancel
            </button>
          </div>
        </div>
      )}

      {/* Members Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-xs text-slate-500 border-b border-slate-800">
              <th className="text-left px-5 py-3 font-medium">User</th>
              <th className="text-left px-5 py-3 font-medium">Role</th>
              <th className="text-left px-5 py-3 font-medium">Status</th>
              <th className="text-left px-5 py-3 font-medium">Last Active</th>
              <th className="text-left px-5 py-3 font-medium">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800">
            {members.map(m => (
              <tr key={m.id} className="hover:bg-slate-800/50 transition">
                <td className="px-5 py-4">
                  <div className="flex items-center gap-3">
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold ${ROLE_COLORS[m.role]}`}>
                      {m.name.charAt(0)}
                    </div>
                    <div>
                      <p className="text-sm font-medium text-white">{m.name}</p>
                      <p className="text-xs text-slate-500">{m.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-5 py-4"><RoleBadge role={m.role}/></td>
                <td className="px-5 py-4">
                  <span className={`text-xs px-2 py-0.5 rounded-full border font-medium ${
                    m.status === 'active'
                      ? 'bg-green-900/40 text-green-400 border-green-800'
                      : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {m.status === 'active' ? '● Active' : '○ Inactive'}
                  </span>
                </td>
                <td className="px-5 py-4 text-slate-400 text-xs">{m.last}</td>
                <td className="px-5 py-4">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => toggleStatus(m.id)}
                      className={`text-xs px-2 py-0.5 rounded border transition ${
                        m.status === 'active'
                          ? 'bg-red-900/20 text-red-400 border-red-900 hover:bg-red-900/40'
                          : 'bg-green-900/20 text-green-400 border-green-900 hover:bg-green-900/40'
                      }`}
                    >
                      {m.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button className="text-slate-500 hover:text-blue-400 transition">
                      <Edit3 size={14}/>
                    </button>
                    <button className="text-slate-500 hover:text-red-400 transition">
                      <Trash2 size={14}/>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

function RolesPermissions() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-sm font-semibold text-white">Roles & Permissions</h2>
        <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-3 py-1.5 rounded-lg flex items-center gap-1">
          <Plus size={13}/> Custom Role
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {rolePermissions.map(r => (
          <div key={r.role} className="bg-slate-900 border border-slate-800 rounded-xl p-5">
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-8 h-8 rounded-lg ${r.color} flex items-center justify-center`}>
                <Shield size={15} className="text-white"/>
              </div>
              <h3 className="text-sm font-semibold text-white">{r.role}</h3>
            </div>
            <div className="space-y-2">
              {r.permissions.map((p,i) => (
                <div key={i} className="flex items-center gap-2">
                  <Check size={13} className="text-green-400 shrink-0"/>
                  <span className="text-xs text-slate-300">{p}</span>
                </div>
              ))}
            </div>
            <button className="mt-4 text-xs text-blue-400 hover:text-blue-300 flex items-center gap-1">
              Edit permissions <ChevronRight size={12}/>
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

function NotificationSettings() {
  const [settings, setSettings] = useState(notificationSettings)

  const toggle = (id, channel) => {
    setSettings(settings.map(s =>
      s.id === id ? { ...s, [channel]: !s[channel] } : s
    ))
  }

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold text-white">Notification Preferences</h2>

      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-hidden">
        <div className="grid grid-cols-4 text-xs text-slate-500 border-b border-slate-800 px-5 py-3 font-medium">
          <span className="col-span-2">Notification</span>
          <div className="flex gap-8 col-span-2 justify-end">
            <span>Email</span>
            <span>Push</span>
            <span>SMS</span>
          </div>
        </div>
        <div className="divide-y divide-slate-800">
          {settings.map(s => (
            <div key={s.id} className="flex items-center px-5 py-4">
              <div className="flex-1">
                <p className="text-sm font-medium text-white">{s.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{s.sub}</p>
              </div>
              <div className="flex gap-8 items-center">
                <Toggle value={s.email} onChange={() => toggle(s.id, 'email')}/>
                <Toggle value={s.push}  onChange={() => toggle(s.id, 'push')} />
                <Toggle value={s.sms}   onChange={() => toggle(s.id, 'sms')}  />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function AppPreferences() {
  const [theme,    setTheme]    = useState('dark')
  const [currency, setCurrency] = useState('INR')
  const [dateFormat,setDateFormat] = useState('DD MMM YYYY')
  const [language, setLanguage] = useState('English')
  const [autoSave, setAutoSave] = useState(true)
  const [compact,  setCompact]  = useState(false)
  const [twoFA,    setTwoFA]    = useState(false)
  const [sessionTimeout, setSessionTimeout] = useState('30')

  return (
    <div className="space-y-6">
      <h2 className="text-sm font-semibold text-white">App Preferences</h2>

      {/* Appearance */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Appearance</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm text-white mb-3">Theme</label>
            <div className="flex gap-3">
              {[
                { id:'dark',   label:'Dark',   icon:Moon    },
                { id:'light',  label:'Light',  icon:Sun     },
                { id:'system', label:'System', icon:Monitor },
              ].map(t => (
                <button key={t.id} onClick={() => setTheme(t.id)}
                  className={`flex-1 flex flex-col items-center gap-2 p-3 rounded-xl border transition ${
                    theme === t.id
                      ? 'border-blue-500 bg-blue-600/10'
                      : 'border-slate-700 bg-slate-800/50 hover:border-slate-600'
                  }`}
                >
                  <t.icon size={18} className={theme === t.id ? 'text-blue-400' : 'text-slate-400'}/>
                  <span className={`text-xs font-medium ${theme===t.id ? 'text-blue-400' : 'text-slate-400'}`}>
                    {t.label}
                  </span>
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between py-2 border-t border-slate-800">
            <div>
              <p className="text-sm text-white">Compact Mode</p>
              <p className="text-xs text-slate-500">Reduce spacing and padding</p>
            </div>
            <Toggle value={compact} onChange={setCompact}/>
          </div>
        </div>
      </div>

      {/* Regional */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Regional</h3>
        <div className="grid grid-cols-2 gap-4">
          {[
            { label:'Language',    value:language,   onChange:setLanguage,   options:['English','Hindi','Marathi','Gujarati'] },
            { label:'Currency',    value:currency,   onChange:setCurrency,   options:['INR','USD','EUR','GBP']                },
            { label:'Date Format', value:dateFormat, onChange:setDateFormat, options:['DD MMM YYYY','DD/MM/YYYY','MM/DD/YYYY','YYYY-MM-DD'] },
          ].map(f => (
            <div key={f.label}>
              <label className="block text-xs text-slate-400 mb-1.5">{f.label}</label>
              <select value={f.value} onChange={e=>f.onChange(e.target.value)}
                className="w-full bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
                {f.options.map(o => <option key={o}>{o}</option>)}
              </select>
            </div>
          ))}
          <div>
            <label className="block text-xs text-slate-400 mb-1.5">Auto-save</label>
            <div className="flex items-center gap-3 mt-2">
              <Toggle value={autoSave} onChange={setAutoSave}/>
              <span className="text-sm text-slate-300">{autoSave ? 'Enabled' : 'Disabled'}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Security */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5">
        <h3 className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">Security</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-white">Two-Factor Authentication</p>
              <p className="text-xs text-slate-500">Add extra security to your account</p>
            </div>
            <Toggle value={twoFA} onChange={setTwoFA}/>
          </div>

          <div className="border-t border-slate-800 pt-4">
            <label className="block text-xs text-slate-400 mb-1.5">Session Timeout (minutes)</label>
            <select value={sessionTimeout} onChange={e=>setSessionTimeout(e.target.value)}
              className="w-48 bg-slate-800 border border-slate-700 text-white rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500">
              {['15','30','60','120','Never'].map(o => <option key={o}>{o}</option>)}
            </select>
          </div>

          <div className="border-t border-slate-800 pt-4">
            <p className="text-sm font-medium text-white mb-3">Change Password</p>
            <div className="space-y-3 max-w-sm">
              {['Current Password','New Password','Confirm Password'].map((label,i) => (
                <div key={i}>
                  <label className="block text-xs text-slate-400 mb-1.5">{label}</label>
                  <input type="password" placeholder="••••••••"
                    className="w-full bg-slate-800 border border-slate-700 text-white placeholder-slate-500 rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-blue-500"/>
                </div>
              ))}
              <button className="text-xs bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-1 mt-2">
                <Lock size={13}/> Update Password
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Danger Zone */}
      <div className="bg-slate-900 border border-red-900/50 rounded-xl p-5">
        <h3 className="text-xs font-semibold text-red-400 uppercase tracking-wider mb-4 flex items-center gap-2">
          <AlertTriangle size={13}/> Danger Zone
        </h3>
        <div className="space-y-3">
          <div className="flex items-center justify-between py-2 border-b border-slate-800">
            <div>
              <p className="text-sm text-white">Export All Data</p>
              <p className="text-xs text-slate-500">Download a full backup of all business data</p>
            </div>
            <button className="text-xs bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 px-3 py-1.5 rounded-lg">
              Export
            </button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm text-red-400 font-medium">Delete Account</p>
              <p className="text-xs text-slate-500">Permanently delete all data — cannot be undone</p>
            </div>
            <button className="text-xs bg-red-900/40 hover:bg-red-900/60 border border-red-800 text-red-400 px-3 py-1.5 rounded-lg transition">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

// ── Main Component ─────────────────────────────────────────
export default function SettingsPage() {
  const [activeSection, setActiveSection] = useState('company')

  const sections = [
    { id:'company',       label:'Company Profile',   icon:Building2 },
    { id:'users',         label:'User Management',   icon:Users     },
    { id:'roles',         label:'Roles & Permissions',icon:Shield   },
    { id:'notifications', label:'Notifications',     icon:Bell      },
    { id:'preferences',   label:'App Preferences',   icon:Palette   },
  ]

  return (
    <div className="space-y-6">

      {/* Header */}
      <div>
        <h1 className="text-xl font-bold text-white">Settings</h1>
        <p className="text-slate-400 text-sm mt-0.5">Manage your company, users and preferences</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">

        {/* Sidebar Nav */}
        <div className="w-full lg:w-52 shrink-0">
          <nav className="flex flex-row lg:flex-col gap-1 overflow-x-auto pb-2 lg:pb-0">
            {sections.map(s => (
              <button
                key={s.id}
                onClick={() => setActiveSection(s.id)}
                className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs lg:text-sm transition whitespace-nowrap ${
                  activeSection === s.id
                    ? 'bg-blue-600/20 text-blue-400 font-medium'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <s.icon size={16} className="shrink-0"/>
                {s.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {activeSection === 'company'       && <CompanyProfile/>       }
          {activeSection === 'users'         && <UserManagement/>       }
          {activeSection === 'roles'         && <RolesPermissions/>     }
          {activeSection === 'notifications' && <NotificationSettings/>  }
          {activeSection === 'preferences'   && <AppPreferences/>       }
        </div>
      </div>
    </div>
  )
}
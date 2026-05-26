import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import {
  LayoutDashboard, Users, FolderKanban, FileText, FileSignature,
  ShoppingCart, Package, HardHat, BarChart3, Settings,
  Building2, ChevronLeft, LogOut, Bell, Search, Menu, X
} from 'lucide-react'
import clsx from 'clsx'

const NAV_ITEMS = [
  { label: 'Dashboard',   icon: LayoutDashboard,  path: '/',            roles: ['ceo','cfo','cto','pm','supervisor'] },
  { label: 'CRM & Sales', icon: Users,             path: '/crm',         roles: ['ceo','cfo','pm'] },
  { label: 'Projects',    icon: FolderKanban,      path: '/projects',    roles: ['ceo','cto','pm','supervisor'] },
  { label: 'Quotations',  icon: FileText,          path: '/quotations',  roles: ['ceo','cfo','pm'] },
  { label: 'Contracts',   icon: FileSignature,     path: '/contracts',   roles: ['ceo','cfo','pm'] },
  { label: 'Finance',     icon: BarChart3,         path: '/finance',     roles: ['ceo','cfo'] },
  { label: 'Procurement', icon: ShoppingCart,      path: '/procurement', roles: ['ceo','cfo','pm'] },
  { label: 'Inventory',   icon: Package,           path: '/inventory',   roles: ['ceo','pm','supervisor'] },
  { label: 'Site',        icon: HardHat,           path: '/site',        roles: ['ceo','pm','supervisor'] },
  { label: 'Settings',    icon: Settings,          path: '/settings',    roles: ['ceo','cto'] },
]

const ROLE_COLORS = {
  ceo:        'bg-purple-500',
  cfo:        'bg-blue-500',
  cto:        'bg-teal-500',
  pm:         'bg-amber-500',
  supervisor: 'bg-orange-500',
}

export default function AppShell() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [collapsed,   setCollapsed]   = useState(false)
  const { user, logout }              = useAuthStore()
  const navigate                      = useNavigate()

  const visibleNav = NAV_ITEMS.filter(item => item.roles.includes(user?.role))

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  const closeSidebar = () => setSidebarOpen(false)

  return (
    <div className="flex h-screen bg-slate-950 overflow-hidden">

      {/* ── Mobile Overlay ── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* ── Sidebar ── */}
      <aside className={clsx(
        'fixed lg:relative z-50 flex flex-col bg-slate-900 border-r border-slate-800 transition-all duration-300 h-full shrink-0',
        // Mobile: slide in/out
        'lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        // Desktop: collapsible width
        collapsed ? 'w-16' : 'w-60'
      )}>

        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-slate-800 shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                <Building2 size={15} className="text-white" />
              </div>
              <span className="text-white font-bold text-sm">ConstructOS</span>
            </div>
          )}
          {/* Desktop collapse button */}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-slate-400 hover:text-white transition ml-auto hidden lg:block"
          >
            {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
          </button>
          {/* Mobile close button */}
          <button
            onClick={closeSidebar}
            className="text-slate-400 hover:text-white transition ml-auto lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-2 py-4 space-y-0.5 overflow-y-auto">
          {visibleNav.map(({ label, icon: Icon, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === '/'}
              onClick={closeSidebar}
              className={({ isActive }) => clsx(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition group',
                isActive
                  ? 'bg-blue-600/20 text-blue-400 font-medium'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              )}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User profile */}
        <div className="p-3 border-t border-slate-800 shrink-0">
          <div className={clsx('flex items-center gap-3', collapsed && 'justify-center')}>
            <div className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0',
              ROLE_COLORS[user?.role] || 'bg-slate-600'
            )}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-xs font-medium truncate">{user?.name}</p>
                  <p className="text-slate-500 text-xs truncate">{user?.title}</p>
                </div>
                <button onClick={handleLogout} className="text-slate-500 hover:text-red-400 transition">
                  <LogOut size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* ── Main Area ── */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Topbar */}
        <header className="h-16 bg-slate-900 border-b border-slate-800 flex items-center justify-between px-4 shrink-0 gap-3">

          {/* Mobile menu button */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-slate-400 hover:text-white transition lg:hidden shrink-0"
          >
            <Menu size={22} />
          </button>

          {/* Search — hidden on small mobile */}
          <div className="hidden sm:flex items-center gap-2 bg-slate-800 border border-slate-700 rounded-lg px-3 py-2 flex-1 max-w-sm">
            <Search size={14} className="text-slate-500 shrink-0" />
            <input
              placeholder="Search projects, clients..."
              className="bg-transparent text-sm text-white placeholder-slate-500 outline-none w-full"
            />
          </div>

          {/* Mobile: App name in center */}
          <div className="flex sm:hidden items-center gap-2 flex-1">
            <div className="w-6 h-6 rounded-md bg-blue-600 flex items-center justify-center shrink-0">
              <Building2 size={13} className="text-white" />
            </div>
            <span className="text-white font-bold text-sm">ConstructOS</span>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <button className="relative text-slate-400 hover:text-white transition p-1">
              <Bell size={20} />
              <span className="absolute -top-0.5 -right-0.5 w-4 h-4 bg-red-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
            </button>
            <div className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0',
              ROLE_COLORS[user?.role] || 'bg-slate-600'
            )}>
              {user?.name?.charAt(0) || 'U'}
            </div>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-slate-950 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
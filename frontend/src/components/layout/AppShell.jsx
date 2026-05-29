import { useState } from 'react'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import useAuthStore from '../../store/authStore'
import {
  LayoutDashboard, Users, FolderKanban, FileText, FileSignature,
  ShoppingCart, Package, HardHat, BarChart3, Settings,
  Building2, ChevronLeft, LogOut, Menu, X
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
  ceo:        'bg-red-500',
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
    <div className="flex h-screen bg-gray-50 overflow-hidden">

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 lg:hidden"
          onClick={closeSidebar}
        />
      )}

      {/* Sidebar (Light) */}
      <aside className={clsx(
        'fixed lg:relative z-50 flex flex-col bg-white border-r border-gray-200 transition-all duration-300 h-full shrink-0',
        'lg:translate-x-0',
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0',
        collapsed ? 'w-16' : 'w-60'
      )}>

        {/* Logo */}
        <div className="flex items-center justify-between px-4 h-16 border-b border-gray-200 shrink-0">
          {!collapsed && (
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center shrink-0">
                <Building2 size={15} className="text-white" />
              </div>
              <span className="text-gray-800 font-bold text-sm">ConstructOS</span>
            </div>
          )}
          <button
            onClick={() => setCollapsed(!collapsed)}
            className="text-gray-500 hover:text-gray-800 transition ml-auto hidden lg:block"
          >
            {collapsed ? <Menu size={18} /> : <ChevronLeft size={18} />}
          </button>
          <button
            onClick={closeSidebar}
            className="text-gray-500 hover:text-gray-800 transition ml-auto lg:hidden"
          >
            <X size={18} />
          </button>
        </div>

        {/* Navigation */}
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
                  ? 'bg-blue-50 text-blue-700 font-medium'
                  : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
              )}
            >
              <Icon size={18} className="shrink-0" />
              {!collapsed && <span>{label}</span>}
            </NavLink>
          ))}
        </nav>

        {/* User profile */}
        <div className="p-3 border-t border-gray-200 shrink-0">
          <div className={clsx('flex items-center gap-3', collapsed && 'justify-center')}>
            <div className={clsx(
              'w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold shrink-0',
              ROLE_COLORS[user?.role] || 'bg-gray-500'
            )}>
              {user?.name?.charAt(0) || 'U'}
            </div>
            {!collapsed && (
              <>
                <div className="flex-1 min-w-0">
                  <p className="text-gray-800 text-xs font-medium truncate">{user?.name}</p>
                  <p className="text-gray-500 text-xs truncate">{user?.title}</p>
                </div>
                <button onClick={handleLogout} className="text-gray-500 hover:text-red-600 transition">
                  <LogOut size={15} />
                </button>
              </>
            )}
          </div>
        </div>
      </aside>

      {/* Main Area */}
      <div className="flex-1 flex flex-col overflow-hidden min-w-0">

        {/* Topbar (Light) */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0 gap-4">

          {/* Left Section */}
          <div className="flex items-center gap-4 min-w-0">
            <button
              onClick={() => setSidebarOpen(true)}
              className="text-gray-600 hover:text-gray-900 transition lg:hidden shrink-0"
            >
              <Menu size={22} />
            </button>

            {/* Conditionally show CEO dashboard title only for CEO */}
            <div className="hidden sm:block">
              {user?.role === 'ceo' ? (
                <>
                  <h1 className="text-gray-800 text-lg font-semibold leading-none">
                    CEO Executive Dashboard
                  </h1>
                  <p className="text-gray-500 text-xs mt-1">
                    LIVE • 18 Active Sites • 4 Critical Alerts
                  </p>
                </>
              ) : (
                <>
                  <h1 className="text-gray-800 text-lg font-semibold leading-none capitalize">
                    {user?.role?.toUpperCase()} Dashboard
                  </h1>
                  <p className="text-gray-500 text-xs mt-1">
                    Welcome back, {user?.name}
                  </p>
                </>
              )}
            </div>
          </div>

          {/* Center Search */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="w-full flex items-center gap-2 bg-gray-100 border border-gray-200 rounded-xl px-4 py-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-4 h-4 text-gray-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M21 21l-4.35-4.35m1.85-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
                />
              </svg>
              <input
                type="text"
                placeholder="Ask AI anything... revenue, projects, delays, clients..."
                className="bg-transparent text-sm text-gray-700 placeholder-gray-400 outline-none w-full"
              />
            </div>
          </div>

          {/* Right Section */}
          <div className="flex items-center gap-3 shrink-0">

            {/* Weather */}
            <div className="hidden xl:flex items-center gap-2 bg-gray-100 border border-gray-200 px-3 py-2 rounded-xl">
              <span className="text-lg">☀️</span>
              <div>
                <p className="text-gray-800 text-xs font-medium">Mumbai</p>
                <p className="text-gray-500 text-[11px]">32°C Clear</p>
              </div>
            </div>

            {/* Quick Actions */}
            <button className="hidden md:flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-sm font-medium px-4 py-2 rounded-xl transition">
              + New Project
            </button>

            {/* User */}
            <div className="flex items-center gap-3 pl-2 border-l border-gray-200">
              <div className="hidden sm:block text-right">
                <p className="text-gray-800 text-sm font-medium">
                  {user?.name}
                </p>
                <p className="text-gray-500 text-xs">
                  {user?.title}
                </p>
              </div>
              <div className={clsx(
                'w-9 h-9 rounded-full flex items-center justify-center text-white text-sm font-bold shrink-0',
                ROLE_COLORS[user?.role] || 'bg-gray-500'
              )}>
                {user?.name?.charAt(0) || 'U'}
              </div>
            </div>

          </div>
        </header>

        {/* AI Insight Strip (Light gradient) */}
        <div className="bg-gradient-to-r from-blue-100 via-cyan-50 to-emerald-100 border-b border-gray-200 px-4 lg:px-6 py-2 overflow-hidden">
          <div className="flex items-center gap-8 whitespace-nowrap animate-pulse">
            <div className="text-sm text-blue-700">
              ⚠ Project Skyline delayed by 6 days
            </div>
            <div className="text-sm text-emerald-700">
              ✅ Interior division revenue increased 14%
            </div>
            <div className="text-sm text-amber-700">
              ⚠ 3 invoices overdue above ₹10L
            </div>
            <div className="text-sm text-cyan-700">
              📈 MEP utilisation reached 92%
            </div>
          </div>
        </div>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto bg-gray-50 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
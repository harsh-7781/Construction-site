import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import useAuthStore from '../store/authStore'
import Login from '../pages/auth/Login'
import AppShell from '../components/layout/AppShell'
import CEODashboard from '../pages/dashboard/CEODashboard'
import CFODashboard from '../pages/dashboard/CFODashboard'
import PMDashboard from '../pages/dashboard/PMDashboard'
import SupervisorDashboard from '../pages/dashboard/SupervisorDashboard'
import CRMPage from '../pages/crm/CRMPage'
import QuotationPage from '../pages/quotations/QuotationPage'
import ProjectsPage from '../pages/projects/ProjectsPage'
import FinancePage from '../pages/finance/FinancePage'
import ProcurementPage from '../pages/procurement/ProcurementPage'
import SettingsPage from '../pages/settings/SettingsPage'
import ContractsPage from '../pages/contracts/ContractsPage'
import SitePage from '../pages/site/SitePage'

const RoleDashboard = () =>{
    const {user} = useAuthStore()
    const role = user?.role

    if (role === 'ceo') return <CEODashboard />
    if (role === 'cfo')        return <CFODashboard />
  if (role === 'pm')         return <PMDashboard />
  if (role === 'supervisor') return <SupervisorDashboard />
  return <CEODashboard />
}

const ProtectedRoute = ({children}) =>{
    const { isAuthenticated } = useAuthStore()
  return isAuthenticated ? children : <Navigate to="/login" replace />
}

export default function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={
          <ProtectedRoute>
            <AppShell />
          </ProtectedRoute>
        }>
          <Route index element={<RoleDashboard />} />
          <Route path="dashboard" element={<RoleDashboard />} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
        <Route path="crm" element={<CRMPage />} />
        <Route path="quotations" element={<QuotationPage />} />
        <Route path="projects" element={<ProjectsPage />} />
        <Route path="finance" element={<FinancePage />} />
        <Route path="procurement" element={<ProcurementPage />} />
        <Route path="settings" element={<SettingsPage />} />
        <Route path="contracts" element={<ContractsPage />} />
        <Route path="site" element={<SitePage />} />
      </Routes>
    </BrowserRouter>
  )
}
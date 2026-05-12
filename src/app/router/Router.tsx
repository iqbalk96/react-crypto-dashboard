import { lazy } from 'react'
import { Routes, Route } from 'react-router-dom'

import { AppLayout } from '@/shared/components/app-layout'

const Dashboard = lazy(
  () => import('@/features/dashboard/pages/dashboard')
)

const DcaSimulation = lazy(
  () => import('@/features/dca-simulation/pages/dca-simulation')
)

const NotMatch = lazy(
  () => import('@/features/not-match/pages/NotMatch')
)

export default function Router() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="" element={<Dashboard />} />
        <Route path="dca-simulation" element={<DcaSimulation />} />
        <Route path="*" element={<NotMatch />} />
      </Route>
    </Routes>
  )
}
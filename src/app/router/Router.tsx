import { Routes, Route } from 'react-router-dom'
import { AppLayout } from '@/shared/components/app-layout'
import Dashboard from '@/features/dashboard/pages/Dashboard'
import NotMatch from '@/features/not-match/pages/NotMatch'

export default function Router() {
    return (
        <Routes>
            <Route element={<AppLayout />}>
                <Route path="" element={<Dashboard />} />
                <Route path="pages" />
                <Route path="*" element={<NotMatch />} />
            </Route>
        </Routes>
    )
}

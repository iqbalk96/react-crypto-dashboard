import { BrowserRouter, HashRouter } from 'react-router'
import { ThemeProvider } from '@/contexts/ThemeContext'
import Router from '@/app/router/Router.tsx'

const AppRouter = import.meta.env.VITE_USE_HASH_ROUTE === 'true' ? HashRouter : BrowserRouter

export default function App() {
    return (
        <ThemeProvider>
            <AppRouter>
                <Router />
            </AppRouter>
        </ThemeProvider>
    )
}

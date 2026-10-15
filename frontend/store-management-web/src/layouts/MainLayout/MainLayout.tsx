import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../../components/layout/Header'
import Sidebar from '../../components/layout/Sidebar'
import { syncAllStoreSettings } from '../../services/settingsService'

function MainLayout() {
    useEffect(() => {
        syncAllStoreSettings()
    }, [])

    return (
        <div className="flex min-h-screen bg-gray-50">
            <Sidebar />
            <div className="flex min-w-0 flex-1 flex-col">
                <Header />
                <main className="flex-1 p-6">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}

export default MainLayout
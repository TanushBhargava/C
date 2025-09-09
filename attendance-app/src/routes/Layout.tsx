import { Outlet } from 'react-router-dom'
import Sidebar from '../ui/Sidebar'
import Navbar from '../ui/Navbar'

function Layout() {
  return (
    <div className="min-h-screen flex bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0">
        <Navbar />
        <main className="p-4 md:p-6 lg:p-8">
          <Outlet />
        </main>
      </div>
    </div>
  )
}

export default Layout


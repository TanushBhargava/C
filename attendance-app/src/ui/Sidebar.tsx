import { NavLink } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

function Sidebar() {
  const { user } = useAuth()
  return (
    <aside className="hidden md:flex md:w-60 lg:w-72 flex-col border-r border-gray-200 bg-white">
      <div className="h-14" />
      <nav className="p-4 space-y-1">
        {user?.role === 'student' && (
          <NavLink to="/student" className={({ isActive }) => baseLink(isActive)}>Dashboard</NavLink>
        )}
        {user?.role === 'teacher' && (
          <NavLink to="/teacher" className={({ isActive }) => baseLink(isActive)}>Teacher</NavLink>
        )}
        {user?.role === 'admin' && (
          <NavLink to="/admin" className={({ isActive }) => baseLink(isActive)}>Admin</NavLink>
        )}
      </nav>
    </aside>
  )
}

function baseLink(isActive: boolean) {
  return (
    'block rounded-md px-3 py-2 text-sm ' +
    (isActive ? 'bg-gray-900 text-white' : 'text-gray-700 hover:bg-gray-100')
  )
}

export default Sidebar


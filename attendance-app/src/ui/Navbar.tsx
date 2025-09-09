import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'

function Navbar() {
  const { user, logout } = useAuth()
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between px-4 py-3">
        <h1 className="text-lg font-semibold">Student Attendance</h1>
        <div className="flex items-center gap-3">
          {user && (
            <span className="text-sm text-gray-600">{user.name} · {user.role}</span>
          )}
          <button
            className="px-3 py-1.5 rounded-md bg-gray-900 text-white text-sm hover:bg-gray-800"
            onClick={() => {
              logout()
              navigate('/login', { replace: true })
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default Navbar


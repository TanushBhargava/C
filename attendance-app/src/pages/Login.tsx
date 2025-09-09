import { FormEvent, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import { useAuth, UserRole } from '../context/AuthContext'

function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation() as any
  const [role, setRole] = useState<UserRole>('student')
  const [id, setId] = useState('u1')
  const [name, setName] = useState('Alex Student')

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    login({ id, role, name })
    const defaultTarget = role === 'student' ? '/student' : role === 'teacher' ? '/teacher' : '/admin'
    const from = location.state?.from as string | undefined
    navigate(from ?? defaultTarget, { replace: true })
  }

  return (
    <div className="min-h-screen grid place-items-center bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="w-full max-w-md bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <h2 className="text-xl font-semibold mb-2">Welcome</h2>
        <p className="text-sm text-gray-600 mb-6">Sign in to continue</p>
        <form onSubmit={onSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Role</label>
            <select
              className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              value={role}
              onChange={(e) => setRole(e.target.value as UserRole)}
            >
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">User ID</label>
            <input
              className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              value={id}
              onChange={(e) => setId(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Name</label>
            <input
              className="w-full rounded-md border-gray-300 focus:border-gray-900 focus:ring-gray-900"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full rounded-md bg-gray-900 text-white py-2 hover:bg-gray-800"
          >
            Continue
          </button>
        </form>
      </div>
    </div>
  )
}

export default Login


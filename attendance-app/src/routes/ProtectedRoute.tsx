import { ReactNode } from 'react'
import { Navigate, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export function ProtectedRoute({ children, allowedRoles }: { children: ReactNode; allowedRoles: Array<'student' | 'teacher' | 'admin'> }) {
  const { user } = useAuth()
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location.pathname }} replace />
  }

  if (!allowedRoles.includes(user.role)) {
    const redirect = user.role === 'student' ? '/student' : user.role === 'teacher' ? '/teacher' : '/admin'
    return <Navigate to={redirect} replace />
  }

  return <>{children}</>
}

export default ProtectedRoute


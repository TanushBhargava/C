import { createContext, useCallback, useContext, useMemo, useState, ReactNode } from 'react'

export type UserRole = 'student' | 'teacher' | 'admin'

export type AuthUser = {
  id: string
  role: UserRole
  name: string
}

type AuthContextValue = {
  user: AuthUser | null
  login: (params: { id: string; role: UserRole; name?: string }) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined)

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null)

  const login = useCallback((params: { id: string; role: UserRole; name?: string }) => {
    setUser({ id: params.id, role: params.role, name: params.name ?? params.role.toUpperCase() })
  }, [])

  const logout = useCallback(() => setUser(null), [])

  const value = useMemo(() => ({ user, login, logout }), [user, login, logout])

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}


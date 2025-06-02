import { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import AvatarIcon from '../assets/icons/avatar.png'

export interface User {
  name: string
  level: number
  avatarUrl?: string
  fireCount: number
  brezelCount: number
  heartCount: number
}

interface AuthContextType {
  user: User | null
  login: (userData: Partial<User>) => void
  logout: () => void
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null)

  const login = (userData: Partial<User>) => {
    // Tạo mock user đầy đủ từ dữ liệu đầu vào
    const mockUser: User = {
      name: userData.name || 'Guest',
      level: 1,
      avatarUrl: userData.avatarUrl || `${AvatarIcon}`,
      fireCount: 0,
      brezelCount: 10,
      heartCount: 5,
    }
    setUser(mockUser)
  }

  const logout = () => setUser(null)

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

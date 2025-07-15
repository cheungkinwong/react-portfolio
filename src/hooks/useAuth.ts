import { useState, useEffect } from 'react'

export function useAuth() {
  const [token, setToken] = useState<string | null>(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [loading, setLoading] = useState(true) 
  const LOGIN_URL = import.meta.env.VITE_LOGIN_URL

  useEffect(() => {
    const url = new URL(window.location.href)

    const urlToken = url.searchParams.get('token')
    if (urlToken) {
      localStorage.setItem('token', urlToken)
      url.searchParams.delete('token')
      window.history.replaceState({}, '', url.pathname + url.search)
    }

    const storedToken = localStorage.getItem('token')
    if (!storedToken) {
      setLoading(false)
      setIsAuthenticated(false)
      return
    }

    try {
      const payload = JSON.parse(atob(storedToken.split('.')[1]))
      const isExpired = Date.now() >= payload.exp * 1000
      if (isExpired) {
        localStorage.removeItem('token')
        setIsAuthenticated(false)
        setToken(null)
        window.location.href = LOGIN_URL
      } else {
        setToken(storedToken)
        setIsAuthenticated(true)
      }
    } catch (err) {
      console.error('Invalid token:', err)
      localStorage.removeItem('token')
      setIsAuthenticated(false)
      setToken(null)
      window.location.href = LOGIN_URL
    }

    setLoading(false)
  }, [LOGIN_URL])

  const logout = () => {
    setToken(null)
    setIsAuthenticated(false)
    localStorage.removeItem('token')
    window.location.href = LOGIN_URL 
  }

  return { token, isAuthenticated, logout, loading }
}

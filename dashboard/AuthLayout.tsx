
import React, { ReactNode, useEffect, useState } from 'react'
import { useAuth } from './AuthContext'

interface AuthLayoutProps {
  children: ReactNode
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }:any) => {
  const { user, loading } = useAuth()
  const pathname=window.location.pathname;
  const [shouldRender, setShouldRender] = useState(false)

  useEffect(() => {
    const isAuthPage = pathname.startsWith('/auth')

    if (isAuthPage) {
      setShouldRender(true)
      return
    }

    if (!loading && !user) {
      window.location.href="/auth/login"
    } else {
      setShouldRender(true)
    }
  }, [user, loading, pathname])

   
  if (!shouldRender) {
    return;
  }
  return <>{children}</>
}


export default AuthLayout;
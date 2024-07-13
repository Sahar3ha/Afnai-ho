import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'

const ProviderRoutes = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const navigate = useNavigate()
    return user!= null && user.provider ? <Outlet/> : navigate('/login')
}

export default ProviderRoutes

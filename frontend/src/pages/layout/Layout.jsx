import React from 'react'
import { Outlet } from 'react-router'
import Header from '../../component/header'

const Layout = () => {
  return (
    <>
      <Header />
      <main>
        <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Layout

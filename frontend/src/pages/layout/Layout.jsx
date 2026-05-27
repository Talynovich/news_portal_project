import React from 'react'
import { Outlet } from 'react-router'

const Layout = () => {
  return (
    <>
      <main>
        <div className="mx-auto w-full max-w-7xl px-4">
          <Outlet />
        </div>
      </main>
    </>
  )
}

export default Layout
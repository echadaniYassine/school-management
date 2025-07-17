// src/Layouts/Layout.jsx

import { Outlet } from 'react-router-dom'
import Header from '../components/navigation/Header'

export default function Layout() {
  return (
    <div>
      <Header />
      <main>
        <Outlet />
      </main>
      {/* <Footer/> */}
    </div>
  )
}

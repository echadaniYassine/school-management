import { Outlet } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Admin/Footer/Footer'

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

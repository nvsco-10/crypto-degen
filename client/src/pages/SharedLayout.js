import { Outlet } from 'react-router-dom'
import { NavBar, Footer } from '../components'

const SharedLayout = () => {
  return (
    <>
      <NavBar/>
      <main>
        <Outlet/>
      </main>
      <Footer />
    </>
  )
}

export default SharedLayout
import { Outlet } from 'react-router-dom'
import { NavBar } from '../components'

const SharedLayout = () => {
  return (
    <>
      <NavBar/>
      <main>
        <Outlet/>
      </main>
    </>
  )
}

export default SharedLayout
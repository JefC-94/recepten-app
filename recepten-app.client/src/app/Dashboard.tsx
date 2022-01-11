import { useUserContext } from '../contexts/UserContext'
import { Link, Outlet } from 'react-router-dom'
import { DarkToggle } from '../components/Darktoggle'

export function Dashboard() {
  const { logoutUser } = useUserContext()

  return (
    <div className="dashboard-wrap">
      <div className="header">
        <p>The Recepten App</p>
        <button
          className="btn"
          onClick={() => {
            logoutUser()
          }}
        >
          Logout
        </button>
        <DarkToggle />
      </div>
      <Outlet />
      <div className="footer">
        <Link to="/dashboard/schedule">Schedule</Link>
        <Link to="/dashboard/recipes">Recipes</Link>
        <Link to="/dashboard/cart">Cart</Link>
      </div>
    </div>
  )
}

import { Test } from '../containers/Test'
import { useUserContext } from '../contexts/UserContext'
import { Link, Outlet } from 'react-router-dom'
import { css } from '@stitches/core'

const flex = css({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
})

const header = css({
  borderBottom: `2px solid black`,
})

const footer = css({
  padding: '1rem',
  borderTop: `2px solid black`,
})

const button = css({
  padding: '8px 10px',
})

export function Dashboard() {
  const { logoutUser } = useUserContext()

  return (
    <div className="dashboard-wrap">
      <div className={`${header} ${flex}`}>
        <p>The Recepten App</p>
        <button
          className={`${button}`}
          onClick={() => {
            logoutUser()
          }}
        >
          Logout
        </button>
      </div>
      <Outlet />
      <div className={`${footer} ${flex}`}>
        <Link to="/dashboard/schedule">Schedule</Link>
        <Link to="/dashboard/recipes">Recipes</Link>
        <Link to="/dashboard/cart">Cart</Link>
      </div>
    </div>
  )
}

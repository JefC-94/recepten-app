import { Routes, Route, Link, Navigate, Outlet, useLocation } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'
import { Dashboard } from './Dashboard'
import { Lobby } from './Lobby'
import { Recipes } from '../containers/recipes/Recipes'
import { Cart } from '../containers/cart/Cart'
import { Schedule } from '../containers/schedule/Schedule'

export const PrivateRoute = () => {
  const { rootState } = useUserContext()
  const { theUser } = rootState
  let location = useLocation()

  if (theUser) {
    return <Outlet />
  } else {
    return <Navigate to="/lobby" state={{ from: location }} />
  }
}

export const Home = () => {
  const { rootState } = useUserContext()

  return (
    <>
      <Routes>
        <Route path="lobby" element={<Lobby />} />
        <Route path="" element={<PrivateRoute />}>
          <Route path="dashboard" element={<Dashboard />}>
            <Route path="recipes" element={<Recipes />} />
            <Route path="cart" element={<Cart />} />
            <Route path="schedule" element={<Schedule />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </>
  )
}

import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'
import { Dashboard } from './Dashboard'
import { Lobby } from './Lobby'
import { Recipes } from '../containers/recipes/Recipes'
import { Cart } from '../containers/cart/Cart'
import { Schedule } from '../containers/schedule/Schedule'

export const PrivateRoute = ({ children }: { children: JSX.Element }) => {
  const { rootState } = useUserContext()
  const { theUser } = rootState
  let location = useLocation()

  if (theUser) {
    return children
  } else {
    return <Navigate to="/" state={{ from: location }} />
  }
}

export const Home = () => {
  return (
    <>
      <Routes>
        <Route path="" element={<Lobby />} />
        <Route
          path="dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route path="recipes" element={<Recipes />} />
          <Route path="cart" element={<Cart />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>
        <Route path="*" element={<h1>Not found</h1>} />
      </Routes>
    </>
  )
}

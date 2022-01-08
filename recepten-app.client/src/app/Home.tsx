import { Routes, Route, Link } from 'react-router-dom'
import { useUserContext } from '../contexts/UserContext'
import { Dashboard } from './Dashboard'
import { Lobby } from './Lobby'
import { Recipes } from '../containers/recipes/Recipes'
import { Cart } from '../containers/cart/Cart'
import { Schedule } from '../containers/schedule/Schedule'

export const Home = () => {
  const { rootState } = useUserContext()

  return (
    <>
      <Routes>
        <Route path="lobby" element={<Lobby />} />
        <Route path="dashboard" element={<Dashboard />}>
          <Route path="recipes" element={<Recipes />} />
          <Route path="cart" element={<Cart />} />
          <Route path="schedule" element={<Schedule />} />
        </Route>
      </Routes>
    </>
  )
}

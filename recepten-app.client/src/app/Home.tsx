import { useUserContext } from '../contexts/UserContext'
import { Dashboard } from './Dashboard'
import { Lobby } from './Lobby'
import { Routes, Route, Navigate } from 'react-router-dom'

export const Home = () => {
  const { rootState } = useUserContext()

  return (
    <>
      <Routes>
        <Route path="/lobby" element={<Lobby />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </>
  )
}

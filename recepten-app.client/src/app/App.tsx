import { Home } from './Home'
import { UserContextProvider } from '../contexts/UserContext'
import { BrowserRouter } from 'react-router-dom'

export const App = () => {
  return (
    <BrowserRouter>
      <UserContextProvider>
        <Home />
      </UserContextProvider>
    </BrowserRouter>
  )
}

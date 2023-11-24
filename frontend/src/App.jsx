import { BrowserRouter, Routes, Route } from 'react-router-dom'
import RegisterPage from './pages/RegisterPage'
import LoginPage from './pages/LoginPage'
import Init from './pages/Init'
import Profile from './pages/Profile'
import Publications from './pages/Publications'
import ProtectedRoute from './ProtectedRoute'
import { AuthProvider } from './context/AuthContext'

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<h1>Home Page</h1>} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route element={<ProtectedRoute />}>
            <Route path='/init' element={<Init />} />
            <Route path='/profile' element={<Profile />} />
            <Route path='/publications' element={<Publications />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  )
}

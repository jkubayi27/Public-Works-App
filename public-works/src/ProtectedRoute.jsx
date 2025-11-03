import { Navigate } from 'react-router-dom'

function ProtectedRoute({ children }) {
  // simple auth check: use localStorage flag set after successful sign-in
  const isAuthenticated = localStorage.getItem('authenticated') === 'true'

  if (!isAuthenticated) {
    // redirect to sign-in page
    return <Navigate to="/" replace />
  }

  return children
}

export default ProtectedRoute

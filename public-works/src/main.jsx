import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import OrderItem from './OrderItem.jsx'
import SignIn from './SignIn.jsx'
import Report from './Report.jsx'
import CreateOrder from './CreateArea.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

const router = createBrowserRouter([
  { path: '/', element: <SignIn /> },
  { path: '/home', element: <ProtectedRoute><App/></ProtectedRoute> },
  { path: '/create', element: <ProtectedRoute><CreateOrder/></ProtectedRoute> },
  { path: '/:id', element: <ProtectedRoute><OrderItem/></ProtectedRoute> },
  { path: '/report', element: <ProtectedRoute><Report/></ProtectedRoute> }
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

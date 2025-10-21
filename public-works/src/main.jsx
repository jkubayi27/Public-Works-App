import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import {createBrowserRouter, RouterProvider} from 'react-router-dom'
import OrderItem from './OrderItem.jsx'
import SignIn from './SignIn.jsx'

const router = createBrowserRouter([
  {path:"/",element : <SignIn/>},
  {path:"/home",element : <App/>},
  {path:"/:id",element : <OrderItem/>}
])


createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>,
)

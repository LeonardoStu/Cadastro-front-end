import React from 'react'
import ReactDOM from 'react-dom/client'
import '../style/index.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Registro from "./routers/Register/index.tsx"
import Profile from './routers/Profile/index.tsx'
import Login from './routers/Login/index.tsx'

const router = createBrowserRouter([
  {
    path: '/register',
    element: <Registro />
  },
  {
    path: '/profile/:id',
    element: <Profile />
  },
  {
    path: '/login',
    element: <Login />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

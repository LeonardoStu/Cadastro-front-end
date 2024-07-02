import React from 'react'
import ReactDOM from 'react-dom/client'
import '../style/index.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Registro from "./routers/Register"
import Profile from './routers/Profile/index.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <Registro />
  },
  {
    path: '/profile/:id',
    element: <Profile />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

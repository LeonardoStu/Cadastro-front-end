import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import '../style/index.scss'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'

import Registro from "./routers/Register"

const router = createBrowserRouter([
  {
    path: '/',
    element: <Registro />
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Home from './Components/Home.tsx'
import { Notifications } from './Components/Notifications.tsx'
import { PostCreate } from './Components/PostCreate.tsx'
import { Profile } from './Components/Profile.tsx'

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    errorElement: <div>Error</div>,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/post/create',
        element: <PostCreate />,
      },
      {
        path: '/notifications',
        element: <Notifications />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)

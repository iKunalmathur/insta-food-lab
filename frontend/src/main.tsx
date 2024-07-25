import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { Provider as ReduxProvider } from 'react-redux';
import store from '@/redux/store.ts';

import App from '@/App.tsx';
import Home from '@/components/Home.tsx';
import { Notifications } from '@/components/Notifications.tsx';
import { Profile } from '@/components/Profile.tsx';

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
        path: '/notifications',
        element: <Notifications />,
      },
      {
        path: '/profile',
        element: <Profile />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <RouterProvider router={router} />
    </ReduxProvider>
  </React.StrictMode>,
);

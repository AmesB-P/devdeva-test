import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import UserManagement from  './pages/UserManagement.tsx'

const router = createBrowserRouter([
        {
            element: <App />,
            children: [
                {
                    path: "*",
                    element: <Navigate to="/user_management" replace /> ,
                },
                {
                    path: "user_management",
                    index : true,
                    element: <UserManagement />,
                },

            ]
        }
    ]
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

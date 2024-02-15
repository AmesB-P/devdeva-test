import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';
import UserManagement from  './pages/UserManagement.tsx'
import CreateAndEditUser from './pages/CreateAndEditUser.tsx'

const router = createBrowserRouter([
        {
            element: <App />,
            children: [
                {
                    path: "*",
                    element: <Navigate to="/UserManagement" replace /> ,
                },
                {
                    path: "UserManagement",
                    index : true,
                    element: <UserManagement />,
                },
                {
                    path: "CreateAndEditUser",
                    index : false,
                    element: <CreateAndEditUser />,
                },
                {
                    path: "CreateAndEditUser/:id",
                    index : false,
                    element: <CreateAndEditUser />,
                }
            ]
        }
    ]
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <RouterProvider router={router}/>
  </React.StrictMode>,
)

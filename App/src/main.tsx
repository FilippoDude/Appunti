import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import './index.css'

import PostsPage from './pages/posts/main.tsx'
import {AppContextProvider} from './contextProvider.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <PostsPage/>
  }
])

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <AppContextProvider>
      <RouterProvider router={router}/>
    </AppContextProvider>
  </React.StrictMode>,
)

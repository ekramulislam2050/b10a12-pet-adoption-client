import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider } from 'react-router-dom'
import router from './Routers/router/router'
import AuthProvider from './AuthProvider/AuthProvider'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
 

 const queryClient=new QueryClient()
createRoot(document.getElementById('root')).render(
  <StrictMode>
   <QueryClientProvider client={queryClient}>
   <AuthProvider>
        <RouterProvider router={router}></RouterProvider>
     </AuthProvider>
   </QueryClientProvider>
     
  </StrictMode>,
)

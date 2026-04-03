import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { ThemeProvider } from '@/components/providers/ThemeProvider'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import './index.css'
import App from './App.tsx'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <ThemeProvider defaultTheme="light" storageKey="piggytracker-ui-theme">
      <App />
      <ToastContainer 
        position="bottom-right"
        theme="colored"
        toastClassName="border-2 border-border  shadow-neo font-bold text-sm"
      />
    </ThemeProvider>
  </StrictMode>,
)

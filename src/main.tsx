import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import CPAElite from './LP.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CPAElite />
  </StrictMode>,
)


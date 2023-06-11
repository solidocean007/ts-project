import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Game from './Game.tsx'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Game />
  </React.StrictMode>,
)

import { BrowserRouter } from 'react-router-dom'
import { createRoot, hydrateRoot } from 'react-dom/client'

import App from './App'
import './index.css'

if (process.env.NODE_ENV === 'development') {
  const root = createRoot(document.getElementById('root')!)
  root.render(
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
} else {
  hydrateRoot(
    document.getElementById('root')!,
    <BrowserRouter>
      <App />
    </BrowserRouter>,
  )
}

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept()
}

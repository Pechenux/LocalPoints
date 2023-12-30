import { BrowserRouter } from 'react-router-dom'
import { hydrateRoot } from 'react-dom/client'

import { App } from './components/App'

import './index.css'
import './styles/colors.css'

hydrateRoot(
  document.getElementById('root')!,
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)

if (process.env.NODE_ENV === 'development' && module.hot) {
  module.hot.accept()
  // todo update root with render
}

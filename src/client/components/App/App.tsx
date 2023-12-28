import { Routes, Route } from 'react-router-dom'
import { Provider } from 'jotai'

import { Home } from 'client/pages'

import style from './App.module.css'

export function App() {
  return (
    <div className={style.app}>
      <Provider>
        <Routes>
          <Route path='/' element={<Home />} />
        </Routes>
      </Provider>
    </div>
  )
}

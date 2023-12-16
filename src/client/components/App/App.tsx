import { Routes, Route } from 'react-router-dom'
import { memo } from 'react'

import { Home, Test } from 'client/pages'

function AppComponent() {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/test' element={<Test />} />
    </Routes>
  )
}

export const App = memo(AppComponent)

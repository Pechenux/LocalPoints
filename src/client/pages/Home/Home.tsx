import { memo } from 'react'
import { useNavigate } from 'react-router-dom'

import { Logo } from 'assets/Logo'

import styles from './Home.module.css'

import type { MouseEvent } from 'react'

function HomeComponent() {
  const navigate = useNavigate()

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    event.preventDefault()
    navigate('/test')
  }

  return (
    <div className={styles.App}>
      <header className={styles['App-header']}>
        <Logo className={styles['App-logo']} />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className={styles['App-link']}
          href='https://reactjs.org'
          target='_blank'
          rel='noopener noreferrer'
        >
          Learn React
        </a>
        <div onClick={handleClick}>go to test page</div>
      </header>
    </div>
  )
}

export const Home = memo(HomeComponent)

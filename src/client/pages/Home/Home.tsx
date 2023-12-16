import { memo } from 'react'
import { Link } from 'react-router-dom'

import { Logo } from 'assets/Logo'

import styles from './Home.module.css'

function HomeComponent() {
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
          Learn React <Link to='/test'> go to test page asd</Link>
        </a>
      </header>
    </div>
  )
}

export const Home = memo(HomeComponent)

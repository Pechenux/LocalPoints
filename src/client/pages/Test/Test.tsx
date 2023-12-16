import { memo } from 'react'

import { Logo } from 'assets/Logo'

import styles from './Test.module.css'

function TestComponent() {
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
      </header>
    </div>
  )
}

export const Test = memo(TestComponent)

import { memo } from 'react'

import { Map } from 'client/components/Map'
import { ClientSide } from 'client/components/ClientSide'

import styles from './Home.module.css'

import type { FC } from 'react'

const HomeComponent: FC = () => (
  <div className={styles.container}>
    <div className={styles.panel}>asdasdasd</div>
    <ClientSide
      fallback={<div className={styles.template}>Loading Map...</div>}
    >
      <Map />
    </ClientSide>
  </div>
)

export const Home = memo(HomeComponent)

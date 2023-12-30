import { memo } from 'react'
import { useSetAtom } from 'jotai'

import { Map } from 'client/components/Map'
import { ClientSide } from 'client/components/ClientSide'
import mapMarginAtom from 'store/mapMargin/mapMargin'
import { CommonPanel } from 'client/components/CommonPanel/CommonPanel'

import styles from './Home.module.css'

import type { FC } from 'react'

const HomeComponent: FC = () => {
  const setMapMargin = useSetAtom(mapMarginAtom)

  return (
    <div className={styles.container}>
      <CommonPanel className={styles.panel}>
        <button onClick={() => setMapMargin(value => !value)}>asd</button>
      </CommonPanel>
      <ClientSide
        fallback={<div className={styles.template}>Loading Map...</div>}
      >
        <Map />
      </ClientSide>
    </div>
  )
}

export const Home = memo(HomeComponent)

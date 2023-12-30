import { Map as YMap, YMaps } from '@pbe/react-yandex-maps'
import { memo, useCallback, useEffect, useRef } from 'react'
import { useAtomValue } from 'jotai'

import { YMAP_API_KEY } from 'client/constants'
import mapMarginAtom from 'store/mapMargin/mapMargin'

import styles from './Map.module.css'

import type ymaps from 'yandex-maps'
import type { FC } from 'react'

const MapComponent: FC = () => {
  const mapMargin = useAtomValue(mapMarginAtom)
  const mapRef = useRef<ymaps.Map | undefined>(undefined)

  const setMapRef = useCallback((map: ymaps.Map) => {
    mapRef.current = map
    mapRef.current.margin.addArea({
      top: 0,
      left: 0,
      width: '80px',
      height: '100%',
    })
  }, [])

  useEffect(() => {
    console.log(mapMargin, mapRef)
    if (mapRef.current) {
      mapRef.current.panTo([55.75, 37.579], {
        useMapMargin: mapMargin,
        duration: 1000,
      })
    }
  }, [mapMargin])

  return (
    <div className={styles.mapContainer}>
      <YMaps query={{ load: 'package.full', apikey: YMAP_API_KEY, csp: true }}>
        <YMap
          style={{ height: '100%', width: '100%' }}
          defaultState={{
            center: [55.75, 37.579],
            zoom: 9,
            controls: [],
          }}
          options={{ suppressMapOpenBlock: true }}
          instanceRef={setMapRef}
        ></YMap>
      </YMaps>
    </div>
  )
}

export const Map = memo(MapComponent)

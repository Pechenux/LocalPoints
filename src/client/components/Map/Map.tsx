import { Map as YMap, YMaps } from '@pbe/react-yandex-maps'
import { memo } from 'react'

import { YMAP_API_KEY } from 'client/constants'

import type { FC } from 'react'

const MapComponent: FC = () => (
  <YMaps query={{ apikey: YMAP_API_KEY, csp: true }}>
    <YMap
      height='100%'
      width='100%'
      defaultState={{ center: [55.75, 37.579], zoom: 9 }}
    />
  </YMaps>
)

export const Map = memo(MapComponent)

import { useClientOnly } from 'client/hooks'

import type { FC, PropsWithChildren, ReactNode } from 'react'

interface ClientSideProps extends PropsWithChildren {
  fallback?: ReactNode
}

export const ClientSide: FC<ClientSideProps> = ({ children, fallback }) => {
  const hasMounted = useClientOnly()

  if (!hasMounted) {
    return fallback
  }

  return <>{children}</>
}

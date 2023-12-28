import { useClientOnly } from 'client/hooks'

import type { FC, ReactNode } from 'react'

interface ClientSideProps {
  children: ReactNode
  fallback?: ReactNode
}

export const ClientSide: FC<ClientSideProps> = ({ children, fallback }) => {
  const hasMounted = useClientOnly()

  if (!hasMounted) {
    return fallback
  }

  return <>{children}</>
}

import { memo } from 'react'
import classNames from 'classnames'

import styles from './CommonPanel.module.css'

import type { withClassName } from 'client/types/withClassName'
import type { FC, PropsWithChildren } from 'react'

const cn = classNames.bind(styles)

interface CommonPanelProps extends PropsWithChildren, withClassName {}

const CommonPanelComponent: FC<CommonPanelProps> = ({
  children,
  className,
}) => {
  return <div className={cn(styles.panelContainer, className)}>{children}</div>
}

export const CommonPanel = memo(CommonPanelComponent)

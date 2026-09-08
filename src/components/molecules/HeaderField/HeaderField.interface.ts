import type { ReactNode } from 'react'

export interface HeaderFieldItem {
  readonly label: string
  readonly value?: ReactNode
  readonly truncate?: boolean
}

export interface HeaderFieldProps {
  readonly fields: readonly HeaderFieldItem[]
  readonly boxWidth?: string
  readonly justify?: 'flex-start' | 'space-between'
}

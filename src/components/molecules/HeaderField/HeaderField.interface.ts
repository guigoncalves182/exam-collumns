import type { ReactNode } from 'react'

export interface HeaderFieldItem {
  readonly label: string
  readonly value?: ReactNode
  readonly truncate?: boolean
}

export interface HeaderFieldProps {
  /** One or two label/value pairs rendered inside a single bordered box. */
  readonly fields: readonly HeaderFieldItem[]
  /** Fixed width of the box (e.g. '200px'). Defaults to fluid (100%). */
  readonly boxWidth?: string
  /** Distribute the inner fields, e.g. 'space-between' for the Unid./Tur. row. */
  readonly justify?: 'flex-start' | 'space-between'
}

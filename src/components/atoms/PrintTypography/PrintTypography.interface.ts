import type { ReactNode } from 'react'

export type PrintTypographyColor = 'DarkPure' | 'DarkLow' | 'LightPure'

export interface PrintTypographyProps {
  readonly color: PrintTypographyColor
  readonly fontSize: string
  readonly fontWeight: string | number
  readonly truncate?: boolean
  readonly children: ReactNode
}

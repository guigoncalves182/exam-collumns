import { useTheme } from '@emotion/react'
import type { BrandLogoProps } from './BrandLogo.interface'
import { LogoImg } from './BrandLogo.styles'

export function BrandLogo({ alt = 'logo' }: BrandLogoProps) {
  const theme = useTheme()
  const src = `data:image/svg+xml;base64,${theme.BrandLogoDefault}`

  return <LogoImg src={src} alt={alt} />
}

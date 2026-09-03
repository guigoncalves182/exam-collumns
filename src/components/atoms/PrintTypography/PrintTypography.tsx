import type { PrintTypographyProps } from './PrintTypography.interface'
import { Container } from './PrintTypography.styles'

export function PrintTypography({
  color,
  fontSize,
  fontWeight,
  truncate = false,
  children,
}: PrintTypographyProps) {
  return (
    <Container
      className={truncate ? 'truncate' : ''}
      color={color}
      fontSize={fontSize}
      fontWeight={fontWeight}
    >
      {children}
    </Container>
  )
}

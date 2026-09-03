import styled from '@emotion/styled'
import type { PrintTypographyColor } from './PrintTypography.interface'

interface ContainerProps {
  readonly fontSize: string
  readonly fontWeight: string | number
  readonly color: PrintTypographyColor
}

export const Container = styled.span<ContainerProps>`
  font-family: ${({ theme }) => theme.FontFamilyBase};
  font-weight: ${({ fontWeight }) => fontWeight};
  font-size: ${({ fontSize }) => fontSize};
  color: ${({ color, theme }) => {
    switch (color) {
      case 'DarkPure':
        return theme.NeutralColorDarkPure
      case 'DarkLow':
        return theme.NeutralColorDarkLow
      case 'LightPure':
        return theme.NeutralColorLightPure
    }
  }};
  line-height: 133%;
  white-space: pre-wrap;

  &.truncate {
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    white-space: normal;
  }
`

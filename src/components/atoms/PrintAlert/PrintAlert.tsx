import { PrintTypography } from '../PrintTypography'
import type { PrintAlertProps } from './PrintAlert.interface'
import { AlertContainer } from './PrintAlert.styles'

export function PrintAlert({ title, message }: PrintAlertProps) {
  return (
    <AlertContainer role="alert">
      <PrintTypography color="DarkPure" fontSize="10px" fontWeight={700}>
        {title}
      </PrintTypography>
      <PrintTypography color="DarkPure" fontSize="10px" fontWeight={400}>
        {message}
      </PrintTypography>
    </AlertContainer>
  )
}

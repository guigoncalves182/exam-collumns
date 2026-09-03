import type { VersionPillProps } from './VersionPill.interface'
import { Pill, PillText } from './VersionPill.styles'

export function VersionPill({ version }: VersionPillProps) {
  return (
    <Pill>
      <PillText>{version}</PillText>
    </Pill>
  )
}

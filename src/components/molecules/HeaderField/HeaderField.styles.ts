import styled from '@emotion/styled'

interface FieldBoxProps {
  readonly boxWidth?: string
  readonly justify?: 'flex-start' | 'space-between'
}

export const FieldBox = styled.div<FieldBoxProps>`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: ${({ justify }) => justify ?? 'flex-start'};
  width: ${({ boxWidth }) => boxWidth ?? '100%'};
  flex-shrink: ${({ boxWidth }) => (boxWidth ? 0 : 1)};
  min-width: 0;
  height: 21px;
  padding: ${({ theme }) => `${theme.SpacingSizeQuarck} ${theme.SpacingSizeNano}`};
  border: 1px solid ${({ theme }) => theme.NeutralColorLightLow};
  border-radius: 2px;
  box-sizing: border-box;
  gap: ${({ theme }) => theme.SpacingSizeQuarck};
`

export const Field = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: ${({ theme }) => theme.SpacingSizeQuarck};
  min-width: 0;
`

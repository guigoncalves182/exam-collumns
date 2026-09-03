import styled from '@emotion/styled'

export const Pill = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.NeutralColorDarkLow};
  border-radius: ${({ theme }) => theme.BorderRadiusSm};
`

export const PillText = styled.span`
  font-family: ${({ theme }) => theme.FontFamilyBase};
  font-weight: ${({ theme }) => theme.FontWeightBold};
  font-size: ${({ theme }) => theme.FontSizeXs};
  color: ${({ theme }) => theme.NeutralColorLightPure};
  text-align: center;
`

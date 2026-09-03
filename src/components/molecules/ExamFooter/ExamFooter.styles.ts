import styled from '@emotion/styled'

export const FooterContainer = styled.div`
  flex-shrink: 0;
  padding: ${({ theme }) => `0 ${theme.SpacingSizeXxxs} ${theme.SpacingSizeNano}`};
`

export const FooterLine = styled.div`
  border-bottom: 1px solid ${({ theme }) => theme.NeutralColorDarkLow};
  margin-bottom: ${({ theme }) => theme.SpacingSizeNano};
`

export const FooterRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${({ theme }) => theme.NeutralColorDarkLow};
  font-family: ${({ theme }) => theme.FontFamilyBase};
  font-weight: ${({ theme }) => theme.FontWeightRegular};
  font-size: 10px;
`

export const Strong = styled.span`
  font-weight: ${({ theme }) => theme.FontWeightSemibold};
`

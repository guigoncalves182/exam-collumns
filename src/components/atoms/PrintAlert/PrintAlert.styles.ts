import styled from '@emotion/styled'

export const AlertContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.SpacingSizeQuarck};
  padding: ${({ theme }) => theme.SpacingSizeNano};
  box-sizing: border-box;
  border-radius: ${({ theme }) => theme.BorderRadiusSm};
  background-color: ${({ theme }) => theme.BackgroundColorSystemHigh};
  border-left: 4px solid ${({ theme }) => theme.BackgroundColorSystemPure};
`

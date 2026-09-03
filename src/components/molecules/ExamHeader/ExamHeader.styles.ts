import styled from '@emotion/styled'

export const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.SpacingSizeXxxs};
  padding: ${({ theme }) =>
    `${theme.SpacingSizeXxxs} ${theme.SpacingSizeXxxs} ${theme.SpacingSizeNano}`};
  flex-shrink: 0;
`

export const LogoAndId = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 33px;
`

export const CodeBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const VersionBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  align-items: center;
  gap: ${({ theme }) => theme.SpacingSizeNano};
  width: 110px;
`

export const TypeAndPeriod = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

export const FieldsSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  gap: ${({ theme }) => theme.SpacingSizeQuarck};
`

export const FieldsRow = styled.div`
  display: flex;
  flex-direction: row;
  width: 100%;
  gap: ${({ theme }) => theme.SpacingSizeQuarck};
`

import styled from '@emotion/styled'

export const ExamContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;

  @media print {
    gap: 0;
  }
`

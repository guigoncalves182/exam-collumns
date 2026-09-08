import styled from '@emotion/styled'

export const MeasureRootWrapper = styled.div`
  position: absolute;
  visibility: hidden;
  left: -99999px;
  top: 0;

  @media print {
    display: none;
  }
`

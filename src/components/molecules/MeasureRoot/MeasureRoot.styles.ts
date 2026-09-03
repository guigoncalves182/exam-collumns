import styled from '@emotion/styled'

export const MeasureRootWrapper = styled.div`
  position: absolute;
  visibility: hidden;
  left: -99999px;
  top: 0;

  /* Measurement happens on-screen (before printing) via refs, so the hidden
     off-screen frame must be fully removed from the print flow — otherwise it
     generates extra blank pages. */
  @media print {
    display: none;
  }
`

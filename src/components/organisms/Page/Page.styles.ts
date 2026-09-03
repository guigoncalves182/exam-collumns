import styled from '@emotion/styled'
import { PAGE_HEIGHT, PAGE_WIDTH } from '../../../constants/exam'

export const PageFrame = styled.div`
  width: ${PAGE_WIDTH}px;
  height: ${PAGE_HEIGHT}px;
  background: white;
  color: #111;
  display: flex;
  flex-direction: column;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.4);

  @media print {
    box-shadow: none;
    /* Guard against sub-pixel rounding (A4 ≈ 1122.5px) spilling the last row
       onto a new blank page. */
    overflow: hidden;

    /* Break after every page EXCEPT the last one, otherwise the trailing
       break produces an extra blank page. */
    &:not(:last-of-type) {
      page-break-after: always;
    }
  }
`

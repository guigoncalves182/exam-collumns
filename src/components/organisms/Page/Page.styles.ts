import styled from '@emotion/styled'
import { PAGE_HEIGHT, PAGE_WIDTH } from '../../../constants/exam.constants'

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
    overflow: hidden;

    &:not(:last-of-type) {
      page-break-after: always;
    }
  }
`

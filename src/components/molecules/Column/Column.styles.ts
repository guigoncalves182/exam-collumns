import styled from '@emotion/styled'
import { COLUMN_INNER_PADDING, GAP } from '../../../constants/exam'

export const ColumnWrapper = styled.div`
  overflow: hidden;
  padding: ${COLUMN_INNER_PADDING}px;
  display: flex;
  flex-direction: column;
  gap: ${GAP}px;
`

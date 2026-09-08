import styled from '@emotion/styled'
import { COLUMN_GAP, CONTENT_PADDING_X } from '../../../constants/exam.constants'

export const Content = styled.div`
  flex: 1;
  display: grid;
  gap: ${COLUMN_GAP}px;
  padding: ${CONTENT_PADDING_X}px;
  overflow: hidden;
`

export const ContentSingle = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  padding: ${CONTENT_PADDING_X}px;
  overflow: hidden;
`

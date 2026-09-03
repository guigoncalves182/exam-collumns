import styled from '@emotion/styled'

export const ChunkWrapper = styled.div`
  padding: 4px 0;
`

export const QuestionHeader = styled.div`
  font-weight: bold;
  font-size: 12px;
  padding: 4px 0;
  border-bottom: 1px solid #ddd;
  margin-bottom: 4px;
`

export const Statement = styled.div`
  font-size: 11px;
  line-height: 1.5;

  & img {
    max-width: 100%;
    max-height: 800px;
    height: auto;
    object-fit: contain;
    display: block;
    margin: 4px 0;
  }
`

export const Alternative = styled.div`
  font-size: 11px;
  line-height: 1.4;
  padding-left: 8px;

  & img {
    max-width: 100%;
    max-height: 800px;
    height: auto;
    object-fit: contain;
    display: inline-block;
    vertical-align: middle;
    margin: 2px 0;
  }
`

import type { ReactElement } from 'react'
import { MathJax } from 'better-react-mathjax'
import type { ChunkProps } from './Chunk.interface'
import { Alternative, ChunkWrapper, QuestionHeader, Statement } from './Chunk.styles'
import { hasMathContent } from '../../../utils/exam'

function withMath(needsMath: boolean, node: ReactElement): ReactElement {
  return needsMath ? <MathJax dynamic>{node}</MathJax> : node
}

export function Chunk({ chunk }: ChunkProps) {
  if (chunk.type === 'header') {
    return (
      <ChunkWrapper>
        <QuestionHeader>{chunk.content}</QuestionHeader>
      </ChunkWrapper>
    )
  }

  const needsMath = hasMathContent(chunk.content)

  if (chunk.type === 'statement') {
    return (
      <ChunkWrapper>
        {withMath(needsMath, <Statement dangerouslySetInnerHTML={{ __html: chunk.content }} />)}
      </ChunkWrapper>
    )
  }

  return (
    <ChunkWrapper>
      {withMath(needsMath, <Alternative dangerouslySetInnerHTML={{ __html: chunk.content }} />)}
    </ChunkWrapper>
  )
}

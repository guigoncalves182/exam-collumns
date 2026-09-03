import type { ChunkProps } from './Chunk.interface'
import { Alternative, ChunkWrapper, QuestionHeader, Statement } from './Chunk.styles'

export function Chunk({ chunk }: ChunkProps) {
  if (chunk.type === 'header') {
    return (
      <ChunkWrapper>
        <QuestionHeader>{chunk.content}</QuestionHeader>
      </ChunkWrapper>
    )
  }

  if (chunk.type === 'statement') {
    return (
      <ChunkWrapper>
        <Statement dangerouslySetInnerHTML={{ __html: chunk.content }} />
      </ChunkWrapper>
    )
  }

  return (
    <ChunkWrapper>
      <Alternative dangerouslySetInnerHTML={{ __html: chunk.content }} />
    </ChunkWrapper>
  )
}

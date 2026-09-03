import type { ColumnProps } from './Column.interface'
import { Chunk } from '../../atoms/Chunk'
import { ColumnWrapper } from './Column.styles'

export function Column({ items }: ColumnProps) {
  return (
    <ColumnWrapper>
      {items.map((chunk) => (
        <Chunk key={chunk.id} chunk={chunk} />
      ))}
    </ColumnWrapper>
  )
}

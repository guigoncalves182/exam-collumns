import type { ExamContentProps } from './ExamContent.interface'
import { Column } from '../../molecules/Column'
import { Content, ContentSingle } from './ExamContent.styles'

export function ExamContent({ page }: ExamContentProps) {
  const columnCount = page.columns.length

  if (columnCount === 1) {
    return (
      <ContentSingle>
        {page.columns.map((col, idx) => (
          <Column key={idx} items={col.items} />
        ))}
      </ContentSingle>
    )
  }

  return (
    <Content style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}>
      {page.columns.map((col, idx) => (
        <Column key={idx} items={col.items} />
      ))}
    </Content>
  )
}

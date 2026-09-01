import type { ExamContentProps } from './ExamContent.interface'
import { Column } from '../../molecules/Column'
import styles from '../../../styles/Exam.module.css'

export function ExamContent({ page }: ExamContentProps) {
  const columnCount = page.columns.length

  if (columnCount === 1) {
    return (
      <div className={styles.contentSingle}>
        {page.columns.map((col, idx) => (
          <Column key={idx} items={col.items} />
        ))}
      </div>
    )
  }

  return (
    <div
      className={styles.content}
      style={{ gridTemplateColumns: `repeat(${columnCount}, 1fr)` }}
    >
      {page.columns.map((col, idx) => (
        <Column key={idx} items={col.items} />
      ))}
    </div>
  )
}

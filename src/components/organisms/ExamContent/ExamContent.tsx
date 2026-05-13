import type { ExamContentProps } from './ExamContent.interface'
import { Column } from '../../molecules/Column'
import styles from '../../../styles/Exam.module.css'

export function ExamContent({ page }: ExamContentProps) {
  const isSingleColumn = page.columns.length === 1

  return (
    <div className={isSingleColumn ? styles.contentSingle : styles.content}>
      {page.columns.map((col, idx) => (
        <Column key={idx} items={col.items} />
      ))}
    </div>
  )
}

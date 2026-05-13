import type { PageProps } from './Page.interface'
import { ExamHeader } from '../../molecules/ExamHeader'
import { ExamContent } from '../ExamContent'
import { ExamFooter } from '../../molecules/ExamFooter'
import styles from '../../../styles/Exam.module.css'

export function Page({ exam, page, pageIndex, totalPages }: PageProps) {
  return (
    <div className={styles.page}>
      <ExamHeader exam={exam} />
      <ExamContent page={page} />
      <ExamFooter currentPage={pageIndex + 1} totalPages={totalPages} />
    </div>
  )
}

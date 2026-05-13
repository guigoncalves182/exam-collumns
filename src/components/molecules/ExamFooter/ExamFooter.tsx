import type { ExamFooterProps } from './ExamFooter.interface'
import styles from '../../../styles/Exam.module.css'

export function ExamFooter({ currentPage, totalPages }: ExamFooterProps) {
  return (
    <div className={styles.footer}>
      Página {currentPage} de {totalPages}
    </div>
  )
}

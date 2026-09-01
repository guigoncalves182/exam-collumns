import type { IExamPrint, ColumnCount } from '../../../types'
import { MeasureRoot } from '../../molecules/MeasureRoot'
import { Page } from '../../organisms/Page'
import { useExamPagination } from '../../../hooks/useExamPagination'
import styles from '../../../styles/Exam.module.css'

interface ExamProps {
  readonly exam: IExamPrint
  readonly columns?: ColumnCount
}

export function Exam({ exam, columns = 2 }: ExamProps) {
  const { pages, chunks, measureRef } = useExamPagination(exam.examInfo.questions, columns)

  return (
    <div className={styles.examContainer}>
      <MeasureRoot ref={measureRef} chunks={chunks} columns={columns} exam={exam} />

      {pages.map((page, pageIndex) => (
        <Page
          key={pageIndex+1}
          exam={exam}
          page={page}
          pageIndex={pageIndex}
          totalPages={pages.length}
        />
      ))}
    </div>
  )
}

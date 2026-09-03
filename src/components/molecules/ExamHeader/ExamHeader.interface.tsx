import type { IExamPrint } from '../../../types/exam'

export interface ExamHeaderProps {
  readonly exam: IExamPrint
  readonly studentName?: string
  readonly studentEnrollment?: string
}

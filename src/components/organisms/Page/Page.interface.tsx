import type { IExamPrint, PageData } from '../../../types/exam'

export interface PageProps {
  readonly exam: IExamPrint
  readonly page: PageData
  readonly pageIndex: number
  readonly totalPages: number
}

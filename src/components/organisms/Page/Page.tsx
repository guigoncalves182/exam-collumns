import type { PageProps } from './Page.interface'
import { ExamHeader } from '../../molecules/ExamHeader'
import { ExamContent } from '../ExamContent'
import { ExamFooter } from '../../molecules/ExamFooter'
import { PageFrame } from './Page.styles'

export function Page({ exam, page, pageIndex, totalPages }: PageProps) {
  return (
    <PageFrame>
      <ExamHeader exam={exam} />
      <ExamContent page={page} />
      <ExamFooter currentPage={pageIndex + 1} totalPages={totalPages} />
    </PageFrame>
  )
}

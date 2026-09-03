import type { ExamFooterProps } from './ExamFooter.interface'
import { FooterContainer, FooterLine, FooterRow, Strong } from './ExamFooter.styles'

const FOOTER_TEXT = {
  generatedPrefix: 'Documento gerado em',
  generatedSuffix: ', às',
  page: 'Página',
  of: 'de',
} as const

function formatDateTime(date: Date) {
  const dd = String(date.getDate()).padStart(2, '0')
  const mm = String(date.getMonth() + 1).padStart(2, '0')
  const yyyy = date.getFullYear()
  const hh = String(date.getHours()).padStart(2, '0')
  const min = String(date.getMinutes()).padStart(2, '0')
  const ss = String(date.getSeconds()).padStart(2, '0')

  return {
    date: `${dd}/${mm}/${yyyy}`,
    time: `${hh}:${min}:${ss}`,
  }
}

export function ExamFooter({ currentPage, totalPages }: ExamFooterProps) {
  const { date, time } = formatDateTime(new Date())

  return (
    <FooterContainer>
      <FooterLine />
      <FooterRow>
        <span>
          {FOOTER_TEXT.generatedPrefix} <Strong>{date}</Strong>
          {FOOTER_TEXT.generatedSuffix} {time}
        </span>
        <span>
          {FOOTER_TEXT.page} <Strong>{currentPage}</Strong> {FOOTER_TEXT.of} {totalPages}
        </span>
      </FooterRow>
    </FooterContainer>
  )
}

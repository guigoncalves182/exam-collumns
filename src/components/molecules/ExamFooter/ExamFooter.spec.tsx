import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { renderWithTheme, screen } from '../../../test/test-utils'
import { ExamFooter } from './ExamFooter'

describe('ExamFooter', () => {
  it('deve exibir o texto de documento gerado', () => {
    renderWithTheme(<ExamFooter currentPage={1} totalPages={3} />)

    expect(screen.getByText(/Documento gerado em/)).toBeInTheDocument()
  })

  it('deve exibir a página atual e o total de páginas', () => {
    renderWithTheme(<ExamFooter currentPage={2} totalPages={5} />)

    const paginacao = screen.getByText(/Página/).closest('span')
    expect(paginacao).toHaveTextContent('Página 2 de 5')
  })

  describe('formatação de data e hora', () => {
    beforeEach(() => {
      vi.useFakeTimers()
      // 09/03/2026 08:07:05 (horário local)
      vi.setSystemTime(new Date(2026, 2, 9, 8, 7, 5))
    })

    afterEach(() => {
      vi.useRealTimers()
    })

    it('deve formatar a data e a hora atuais com zero à esquerda', () => {
      renderWithTheme(<ExamFooter currentPage={1} totalPages={1} />)

      const linha = screen.getByText(/Documento gerado em/).closest('span')
      expect(linha).toHaveTextContent('09/03/2026')
      expect(linha).toHaveTextContent('08:07:05')
    })
  })
})

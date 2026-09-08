import { describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { renderWithTheme, screen } from '../../../test/test-utils'
import { Page } from './Page'
import { buildExam, buildPage, measuredChunk } from '../../../test/fixtures'

vi.mock('better-react-mathjax', () => ({
  MathJax: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}))

describe('Page', () => {
  const page = buildPage([
    [measuredChunk({ id: 'h', type: 'header', content: 'Questão 1' })],
    [measuredChunk({ id: 's', type: 'statement', content: 'Enunciado' })],
  ])

  it('deve renderizar o cabeçalho, o conteúdo e o rodapé', () => {
    renderWithTheme(
      <Page exam={buildExam()} page={page} pageIndex={0} totalPages={3} />,
    )

    // Cabeçalho
    expect(screen.getByText('AV1-2026-MAT101')).toBeInTheDocument()
    // Conteúdo
    expect(screen.getByText('Questão 1')).toBeInTheDocument()
    expect(screen.getByText('Enunciado')).toBeInTheDocument()
    // Rodapé
    expect(screen.getByText(/Documento gerado em/)).toBeInTheDocument()
  })

  it('deve converter o índice da página (base 0) para número exibido (base 1)', () => {
    renderWithTheme(
      <Page exam={buildExam()} page={page} pageIndex={1} totalPages={4} />,
    )

    const paginacao = screen.getByText(/Página/).closest('span')
    expect(paginacao).toHaveTextContent('Página 2 de 4')
  })
})

import { describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { renderWithTheme, screen } from '../../../test/test-utils'
import { ExamContent } from './ExamContent'
import { buildPage, measuredChunk } from '../../../test/fixtures'

vi.mock('better-react-mathjax', () => ({
  MathJax: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}))

describe('ExamContent', () => {
  it('deve renderizar os chunks de todas as colunas', () => {
    const page = buildPage([
      [measuredChunk({ id: 'h1', type: 'header', content: 'Questão 1' })],
      [measuredChunk({ id: 'h2', type: 'header', content: 'Questão 2' })],
    ])

    renderWithTheme(<ExamContent page={page} />)

    expect(screen.getByText('Questão 1')).toBeInTheDocument()
    expect(screen.getByText('Questão 2')).toBeInTheDocument()
  })

  it('deve aplicar o layout de grid com o número de colunas da página', () => {
    const page = buildPage([
      [measuredChunk({ id: 'a', content: 'A' })],
      [measuredChunk({ id: 'b', content: 'B' })],
      [measuredChunk({ id: 'c', content: 'C' })],
    ])

    const { container } = renderWithTheme(<ExamContent page={page} />)

    const grid = container.firstChild as HTMLElement
    expect(grid).toHaveStyle('display: grid')
    expect(grid).toHaveStyle('grid-template-columns: repeat(3, 1fr)')
  })

  it('deve usar o layout de coluna única (flex) quando houver apenas uma coluna', () => {
    const page = buildPage([
      [measuredChunk({ id: 'only', content: 'Coluna única' })],
    ])

    const { container } = renderWithTheme(<ExamContent page={page} />)

    const wrapper = container.firstChild as HTMLElement
    expect(wrapper).toHaveStyle('display: flex')
    expect(wrapper).toHaveStyle('flex-direction: column')
    expect(screen.getByText('Coluna única')).toBeInTheDocument()
  })
})

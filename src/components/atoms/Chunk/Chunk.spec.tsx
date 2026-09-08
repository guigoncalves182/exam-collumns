import { describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { renderWithTheme, screen } from '../../../test/test-utils'
import { Chunk } from './Chunk'
import type { ChunkData } from '../../../types/exam'

vi.mock('better-react-mathjax', () => ({
  MathJax: ({ children }: { children: ReactNode }) => (
    <div data-testid="mathjax">{children}</div>
  ),
}))

const baseChunk: ChunkData = {
  id: 'q1-header',
  questionId: 'q1',
  type: 'header',
  content: 'Questão 1',
}

describe('Chunk', () => {
  it('deve renderizar o conteúdo textual de um header', () => {
    renderWithTheme(<Chunk chunk={baseChunk} />)

    expect(screen.getByText('Questão 1')).toBeInTheDocument()
  })

  it('não deve usar MathJax para um header', () => {
    renderWithTheme(<Chunk chunk={baseChunk} />)

    expect(screen.queryByTestId('mathjax')).not.toBeInTheDocument()
  })

  it('deve renderizar o HTML de um statement', () => {
    const chunk: ChunkData = {
      ...baseChunk,
      id: 'q1-statement',
      type: 'statement',
      content: '<strong>Enunciado</strong> da questão',
    }

    const { container } = renderWithTheme(<Chunk chunk={chunk} />)

    expect(container.querySelector('strong')).toHaveTextContent('Enunciado')
    expect(screen.queryByTestId('mathjax')).not.toBeInTheDocument()
  })

  it('deve renderizar o HTML de uma alternativa', () => {
    const chunk: ChunkData = {
      ...baseChunk,
      id: 'q1-alt-a',
      type: 'alternative',
      content: 'A) Alternativa correta',
    }

    renderWithTheme(<Chunk chunk={chunk} />)

    expect(screen.getByText('A) Alternativa correta')).toBeInTheDocument()
  })

  it('deve envolver o conteúdo com MathJax quando houver conteúdo matemático', () => {
    const chunk: ChunkData = {
      ...baseChunk,
      id: 'q1-statement',
      type: 'statement',
      content: 'Calcule <span class="math-tex">\\(x^2\\)</span>',
    }

    renderWithTheme(<Chunk chunk={chunk} />)

    expect(screen.getByTestId('mathjax')).toBeInTheDocument()
  })

  it('deve envolver alternativas com conteúdo matemático em MathJax', () => {
    const chunk: ChunkData = {
      ...baseChunk,
      id: 'q1-alt-a',
      type: 'alternative',
      content: '<span class="math-tex">\\(f(x)\\)</span>',
    }

    renderWithTheme(<Chunk chunk={chunk} />)

    expect(screen.getByTestId('mathjax')).toBeInTheDocument()
  })
})

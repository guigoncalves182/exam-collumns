import { describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { renderWithTheme, screen } from '../../../test/test-utils'
import { Column } from './Column'
import type { MeasuredChunk } from '../../../types/exam'

vi.mock('better-react-mathjax', () => ({
  MathJax: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}))

const chunk = (overrides: Partial<MeasuredChunk>): MeasuredChunk => ({
  id: 'c',
  questionId: 'q1',
  type: 'header',
  content: 'conteúdo',
  height: 20,
  ...overrides,
})

describe('Column', () => {
  it('deve renderizar todos os chunks recebidos', () => {
    const items: MeasuredChunk[] = [
      chunk({ id: 'h', type: 'header', content: 'Questão 1' }),
      chunk({ id: 's', type: 'statement', content: 'Enunciado' }),
      chunk({ id: 'a', type: 'alternative', content: 'A) Alternativa' }),
    ]

    renderWithTheme(<Column items={items} />)

    expect(screen.getByText('Questão 1')).toBeInTheDocument()
    expect(screen.getByText('Enunciado')).toBeInTheDocument()
    expect(screen.getByText('A) Alternativa')).toBeInTheDocument()
  })

  it('deve renderizar sem erros quando não houver itens', () => {
    const { container } = renderWithTheme(<Column items={[]} />)

    expect(container.firstChild).toBeInTheDocument()
    expect(container.textContent).toBe('')
  })
})

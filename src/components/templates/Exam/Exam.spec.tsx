import { describe, expect, it, vi } from 'vitest'
import type { ReactNode } from 'react'
import { renderWithTheme, screen, waitFor } from '../../../test/test-utils'
import { Exam } from './Exam'
import { buildExam } from '../../../test/fixtures'

vi.mock('better-react-mathjax', async () => {
  const React = await import('react')
  return {
    MathJax: ({ children }: { children: ReactNode }) => <div>{children}</div>,
    MathJaxBaseContext: React.createContext<unknown>(undefined),
  }
})

describe('Exam', () => {
  it('deve renderizar o cabeçalho do exame (via MeasureRoot) imediatamente', () => {
    const exam = buildExam()
    renderWithTheme(<Exam exam={exam} />)

    expect(screen.getAllByText(exam.code).length).toBeGreaterThanOrEqual(1)
  })

  it('deve paginar e renderizar ao menos uma página após a medição', async () => {
    const exam = buildExam()
    renderWithTheme(<Exam exam={exam} />)

    // Após a paginação, o cabeçalho aparece tanto no MeasureRoot quanto na página gerada.
    await waitFor(
      () => {
        expect(screen.getAllByText(exam.code).length).toBeGreaterThanOrEqual(2)
      },
      { timeout: 5000 },
    )
  })

  it('deve gerar uma página real (além do MeasureRoot) com o conteúdo da questão', async () => {
    const exam = buildExam()
    renderWithTheme(<Exam exam={exam} columns={1} />)

    // O MeasureRoot já renderiza o conteúdo uma vez; a página paginada duplica.
    await waitFor(
      () => {
        expect(
          screen.getAllByText('Enunciado da questão').length,
        ).toBeGreaterThanOrEqual(2)
      },
      { timeout: 5000 },
    )
  })
})

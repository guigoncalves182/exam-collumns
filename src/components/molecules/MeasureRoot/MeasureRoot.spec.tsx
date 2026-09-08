import { createRef } from 'react'
import type { ReactNode } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { renderWithTheme, screen } from '../../../test/test-utils'
import { MeasureRoot } from './MeasureRoot'
import type { MeasureRootHandle } from './MeasureRoot.interface'
import { buildExam, measuredChunk } from '../../../test/fixtures'
import {
  AVAILABLE_HEIGHT,
  CONTENT_PADDING,
  COLUMN_PADDING_VERTICAL,
} from '../../../constants/exam.constants'
import type { ChunkData } from '../../../types/exam'

vi.mock('better-react-mathjax', () => ({
  MathJax: ({ children }: { children: ReactNode }) => <div>{children}</div>,
}))

const chunks: ChunkData[] = [
  measuredChunk({ id: 'q1-header', type: 'header', content: 'Questão 1' }),
  measuredChunk({ id: 'q1-statement', type: 'statement', content: 'Enunciado' }),
]

describe('MeasureRoot', () => {
  it('deve renderizar o cabeçalho do exame e os chunks para medição', () => {
    renderWithTheme(
      <MeasureRoot chunks={chunks} columns={2} exam={buildExam()} />,
    )

    expect(screen.getByText('AV1-2026-MAT101')).toBeInTheDocument()
    expect(screen.getByText('Questão 1')).toBeInTheDocument()
    expect(screen.getByText('Enunciado')).toBeInTheDocument()
  })

  it('deve expor getMeasurement retornando a altura do elemento medido', () => {
    const ref = createRef<MeasureRootHandle>()
    renderWithTheme(
      <MeasureRoot ref={ref} chunks={chunks} columns={2} exam={buildExam()} />,
    )

    // Em jsdom getBoundingClientRect retorna 0, mas o método deve responder.
    expect(typeof ref.current?.getMeasurement('q1-header')).toBe('number')
  })

  it('deve retornar 0 em getMeasurement para um id inexistente', () => {
    const ref = createRef<MeasureRootHandle>()
    renderWithTheme(
      <MeasureRoot ref={ref} chunks={chunks} columns={2} exam={buildExam()} />,
    )

    expect(ref.current?.getMeasurement('inexistente')).toBe(0)
  })

  it('deve retornar a altura disponível padrão quando o container não tem altura', () => {
    const ref = createRef<MeasureRootHandle>()
    renderWithTheme(
      <MeasureRoot ref={ref} chunks={chunks} columns={2} exam={buildExam()} />,
    )

    expect(ref.current?.getAvailableHeight()).toBe(AVAILABLE_HEIGHT)
  })

  it('deve calcular a altura disponível a partir do clientHeight do container', () => {
    const clientHeightSpy = vi
      .spyOn(HTMLElement.prototype, 'clientHeight', 'get')
      .mockReturnValue(1000)

    const ref = createRef<MeasureRootHandle>()
    renderWithTheme(
      <MeasureRoot ref={ref} chunks={chunks} columns={2} exam={buildExam()} />,
    )

    // 1000 - CONTENT_PADDING (32) - COLUMN_PADDING_VERTICAL (8) = 960
    expect(ref.current?.getAvailableHeight()).toBe(
      1000 - CONTENT_PADDING - COLUMN_PADDING_VERTICAL,
    )

    clientHeightSpy.mockRestore()
  })
})

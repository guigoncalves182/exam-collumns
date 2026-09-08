import { afterEach, describe, expect, it } from 'vitest'
import type { ReactNode } from 'react'
import { renderHook, waitFor } from '@testing-library/react'
import { MathJaxBaseContext } from 'better-react-mathjax'
import { useExamPagination } from './useExamPagination'
import type { MeasureRootHandle } from '../components/molecules/MeasureRoot'
import type { IExamPrintQuestion } from '../types/exam'

const questions: IExamPrintQuestion[] = [
  {
    id: 'q1',
    description: 'Primeira questão',
    alternatives: [
      { id: 'a', description: 'Alternativa A' },
      { id: 'b', description: 'Alternativa B' },
    ],
  },
  {
    id: 'q2',
    description: 'Segunda questão',
    alternatives: [{ id: 'c', description: 'Alternativa C' }],
  },
]

function attachMeasureHandle(
  ref: React.RefObject<MeasureRootHandle | null>,
  heightByChunk: Record<string, number> = {},
  availableHeight = 900,
) {
  ref.current = {
    getMeasurement: (id: string) => heightByChunk[id] ?? 50,
    getAvailableHeight: () => availableHeight,
  }
}

describe('useExamPagination', () => {
  it('deve derivar os chunks a partir das questões informadas', () => {
    const { result } = renderHook(() => useExamPagination(questions, 2))

    // q1: header + statement + 2 alternativas = 4; q2: header + statement + 1 = 3
    expect(result.current.chunks).toHaveLength(7)
    expect(result.current.chunks[0]).toMatchObject({
      id: 'q1-header',
      type: 'header',
      content: 'Questão 1',
    })
    expect(result.current.chunks[4]).toMatchObject({
      id: 'q2-header',
      type: 'header',
      content: 'Questão 2',
    })
  })

  it('deve iniciar com a lista de páginas vazia e expor a ref de medição', () => {
    const { result } = renderHook(() => useExamPagination(questions, 2))

    expect(result.current.pages).toEqual([])
    expect(result.current.measureRef).toBeDefined()
    expect(result.current.measureRef.current).toBeNull()
  })

  it('deve gerar páginas após a medição dos chunks', async () => {
    const { result } = renderHook(() => useExamPagination(questions, 2))

    attachMeasureHandle(result.current.measureRef)

    await waitFor(
      () => {
        expect(result.current.pages.length).toBeGreaterThan(0)
      },
      { timeout: 5000 },
    )

    const totalItems = result.current.pages
      .flatMap((page) => page.columns)
      .flatMap((column) => column.items)

    expect(totalItems.length).toBeGreaterThan(0)
    expect(result.current.pages[0].columns).toHaveLength(2)
  })

  it('deve recalcular os chunks quando a lista de questões muda', () => {
    const { result, rerender } = renderHook(
      ({ qs }) => useExamPagination(qs, 2),
      { initialProps: { qs: questions } },
    )

    expect(result.current.chunks).toHaveLength(7)

    rerender({ qs: [questions[0]] })

    expect(result.current.chunks).toHaveLength(4)
  })

  it('deve usar 2 colunas como padrão quando a quantidade não é informada', async () => {
    const { result } = renderHook(() => useExamPagination(questions))

    attachMeasureHandle(result.current.measureRef)

    await waitFor(
      () => {
        expect(result.current.pages.length).toBeGreaterThan(0)
      },
      { timeout: 5000 },
    )

    expect(result.current.pages[0].columns).toHaveLength(2)
  })

  it('deve aguardar a promise do MathJax antes de paginar quando o contexto existe', async () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mathJaxValue = { promise: Promise.resolve() } as any
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MathJaxBaseContext.Provider value={mathJaxValue}>
        {children}
      </MathJaxBaseContext.Provider>
    )

    const { result } = renderHook(() => useExamPagination(questions, 2), {
      wrapper,
    })

    attachMeasureHandle(result.current.measureRef)

    await waitFor(
      () => {
        expect(result.current.pages.length).toBeGreaterThan(0)
      },
      { timeout: 5000 },
    )
  })

  it('deve seguir a paginação mesmo se a promise do MathJax for rejeitada', async () => {
    const rejected = Promise.reject(new Error('falha no MathJax'))
    // Evita "unhandled rejection" no ambiente de teste.
    rejected.catch(() => {})
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const mathJaxValue = { promise: rejected } as any
    const wrapper = ({ children }: { children: ReactNode }) => (
      <MathJaxBaseContext.Provider value={mathJaxValue}>
        {children}
      </MathJaxBaseContext.Provider>
    )

    const { result } = renderHook(() => useExamPagination(questions, 2), {
      wrapper,
    })

    attachMeasureHandle(result.current.measureRef)

    await waitFor(
      () => {
        expect(result.current.pages.length).toBeGreaterThan(0)
      },
      { timeout: 5000 },
    )
  })

  describe('espera por imagens ainda não carregadas', () => {
    afterEach(() => {
      document.body.innerHTML = ''
    })

    it('deve aguardar o onload de imagens incompletas antes de paginar', async () => {
      const img = document.createElement('img')
      // Sobrescreve o getter global (que retorna true) para simular imagem em carregamento.
      Object.defineProperty(img, 'complete', { configurable: true, value: false })
      document.body.appendChild(img)

      const { result } = renderHook(() => useExamPagination(questions, 2))

      attachMeasureHandle(result.current.measureRef)

      // Enquanto a imagem não dispara load, a paginação não deve concluir.
      await Promise.resolve()
      expect(result.current.pages).toEqual([])

      // Dispara o carregamento da imagem para liberar o fluxo.
      img.dispatchEvent(new Event('load'))

      await waitFor(
        () => {
          expect(result.current.pages.length).toBeGreaterThan(0)
        },
        { timeout: 5000 },
      )
    })
  })
})

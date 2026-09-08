import { useContext, useEffect, useRef, useState, useMemo } from 'react'
import { MathJaxBaseContext } from 'better-react-mathjax'
import type { IExamPrintQuestion, ChunkData, MeasuredChunk, PageData, ColumnCount } from '../types/exam'
import type { MeasureRootHandle } from '../components/molecules/MeasureRoot'
import { createChunks, paginateChunks } from '../utils/exam'

const MAX_MEASURE_ATTEMPTS = 8
const MEASURE_INTERVAL_MS = 200

export function useExamPagination(questions: IExamPrintQuestion[], columns: ColumnCount = 2) {
  const [pages, setPages] = useState<PageData[]>([])
  const measureRef = useRef<MeasureRootHandle>(null)
  const mathJax = useContext(MathJaxBaseContext)

  const chunks: ChunkData[] = useMemo(
    () => questions.flatMap((q, i) => createChunks(q, i)),
    [questions]
  )

  useEffect(() => {
    let cancelled = false

    async function waitForImages() {
      const imgs = Array.from(document.images)
      await Promise.all(
        imgs.map((img) => {
          if (img.complete) return Promise.resolve()
          return new Promise<void>((resolve) => {
            img.onload = () => resolve()
            img.onerror = () => resolve()
          })
        })
      )
    }

    function measure(): MeasuredChunk[] | null {
      if (!measureRef.current) return null
      return chunks.map((chunk) => ({
        ...chunk,
        height: measureRef.current!.getMeasurement(chunk.id),
      }))
    }

    async function build() {
      await document.fonts.ready
      await waitForImages()

      if (mathJax?.promise) {
        try {
          await mathJax.promise
        } catch (error) {
          void error
        }
      }

      if (cancelled || !measureRef.current) return

      let measured: MeasuredChunk[] | null = null
      let previousSignature = ''

      for (let attempt = 0; attempt < MAX_MEASURE_ATTEMPTS; attempt++) {
        measured = measure()
        if (!measured) return

        const signature = measured.map((m) => Math.round(m.height)).join('|')
        if (signature === previousSignature) break
        previousSignature = signature

        await new Promise((resolve) => setTimeout(resolve, MEASURE_INTERVAL_MS))
        if (cancelled) return
      }

      if (cancelled || !measured || !measureRef.current) return

      const availableHeight = measureRef.current.getAvailableHeight()
      setPages(paginateChunks(measured, columns, availableHeight))
    }

    build()

    return () => {
      cancelled = true
    }
  }, [chunks, columns, mathJax])

  return { pages, chunks, measureRef }
}

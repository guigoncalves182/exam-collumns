import { useEffect, useRef, useState, useMemo } from 'react'
import type { IExamPrintQuestion, ChunkData, MeasuredChunk, PageData, ColumnCount } from '../types/exam'
import type { MeasureRootHandle } from '../components/molecules/MeasureRoot'
import { createChunks, paginateChunks } from '../utils/exam'

export function useExamPagination(questions: IExamPrintQuestion[], columns: ColumnCount = 2) {
  const [pages, setPages] = useState<PageData[]>([])
  const measureRef = useRef<MeasureRootHandle>(null)

  const chunks: ChunkData[] = useMemo(
    () => questions.flatMap((q, i) => createChunks(q, i)),
    [questions]
  )

  useEffect(() => {
    async function build() {
      await document.fonts.ready

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

      if (!measureRef.current) return

      const measuredChunks: MeasuredChunk[] = chunks.map((chunk) => ({
        ...chunk,
        height: measureRef.current!.getMeasurement(chunk.id),
      }))

      const availableHeight = measureRef.current.getAvailableHeight()

      setPages(paginateChunks(measuredChunks, columns, availableHeight))
    }

    build()
  }, [chunks, columns])

  return { pages, chunks, measureRef }
}

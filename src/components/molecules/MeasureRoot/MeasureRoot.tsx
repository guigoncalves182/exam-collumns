import { forwardRef, useImperativeHandle, useRef } from 'react'
import type { MeasureRootHandle, MeasureRootProps } from './MeasureRoot.interface'
import { Chunk } from '../../atoms/Chunk'
import { ExamHeader } from '../ExamHeader'
import { ExamFooter } from '../ExamFooter'
import {
  getColumnContentWidth,
  CONTENT_PADDING,
  COLUMN_PADDING_VERTICAL,
  AVAILABLE_HEIGHT,
} from '../../../constants/exam'
import styles from '../../../styles/Exam.module.css'

export const MeasureRoot = forwardRef<MeasureRootHandle, MeasureRootProps>(
  function MeasureRoot({ chunks, columns = 2, exam }, ref) {
    const containerRef = useRef<Record<string, HTMLDivElement | null>>({})
    const contentRef = useRef<HTMLDivElement>(null)

    useImperativeHandle(ref, () => ({
      getMeasurement(id: string) {
        const el = containerRef.current[id]
        return el ? el.getBoundingClientRect().height : 0
      },
      getAvailableHeight() {
        const el = contentRef.current
        if (!el) return AVAILABLE_HEIGHT
        // clientHeight includes the content padding but not borders/margins.
        // Subtract the content padding and the column's own vertical padding to
        // get the real space available for stacking chunks inside a column.
        const available = el.clientHeight - CONTENT_PADDING - COLUMN_PADDING_VERTICAL
        return available > 0 ? available : AVAILABLE_HEIGHT
      },
    }))

    return (
      <div className={styles.measureRoot}>
        {/* Hidden full-page frame: measures the REAL content area height that
            remains after the actual header and footer are rendered. */}
        <div className={styles.page}>
          <ExamHeader exam={exam} />
          <div ref={contentRef} className={styles.content}>
            <div className={styles.column} />
          </div>
          <ExamFooter currentPage={1} totalPages={1} />
        </div>

        {/* Off-screen chunk measurement at the real per-column width */}
        <div style={{ width: `${getColumnContentWidth(columns)}px` }}>
          {chunks.map((chunk) => (
            <div
              key={chunk.id}
              ref={(el) => {
                containerRef.current[chunk.id] = el
              }}
            >
              <Chunk chunk={chunk} />
            </div>
          ))}
        </div>
      </div>
    )
  }
)

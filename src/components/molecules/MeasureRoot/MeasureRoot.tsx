import { forwardRef, useImperativeHandle, useRef } from 'react'
import type { MeasureRootHandle, MeasureRootProps } from './MeasureRoot.interface'
import { Chunk } from '../../atoms/Chunk'
import styles from '../../../styles/Exam.module.css'

export const MeasureRoot = forwardRef<MeasureRootHandle, MeasureRootProps>(
  function MeasureRoot({ chunks, columns = 2 }, ref) {
    const containerRef = useRef<Record<string, HTMLDivElement | null>>({})

    useImperativeHandle(ref, () => ({
      getMeasurement(id: string) {
        const el = containerRef.current[id]
        return el ? el.getBoundingClientRect().height : 0
      },
    }))

    return (
      <div
        className={styles.measureRoot}
        style={{ width: columns === 1 ? '730px' : '355px' }}
      >
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
    )
  }
)

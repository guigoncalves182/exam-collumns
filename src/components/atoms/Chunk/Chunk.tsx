import type { ChunkProps } from './Chunk.interface'
import styles from '../../../styles/Exam.module.css'

export function Chunk({ chunk }: ChunkProps) {
  if (chunk.type === 'header') {
    return (
      <div className={styles.chunk}>
        <div className={styles.questionHeader}>{chunk.content}</div>
      </div>
    )
  }

  if (chunk.type === 'statement') {
    return (
      <div className={styles.chunk}>
        <div
          className={styles.statement}
          dangerouslySetInnerHTML={{ __html: chunk.content }}
        />
      </div>
    )
  }

  return (
    <div className={styles.chunk}>
      <div
        className={styles.alternative}
        dangerouslySetInnerHTML={{ __html: chunk.content }}
      />
    </div>
  )
}

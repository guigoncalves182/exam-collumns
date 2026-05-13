import type { ColumnProps } from './Column.interface'
import { Chunk } from '../../atoms/Chunk'
import styles from '../../../styles/Exam.module.css'

export function Column({ items }: ColumnProps) {
  return (
    <div className={styles.column}>
      {items.map((chunk) => (
        <Chunk key={chunk.id} chunk={chunk} />
      ))}
    </div>
  )
}

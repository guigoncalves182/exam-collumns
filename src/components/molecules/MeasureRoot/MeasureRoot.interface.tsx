import type { ChunkData, ColumnCount } from '../../../types/exam'

export interface MeasureRootHandle {
  getMeasurement(id: string): number
}

export interface MeasureRootProps {
  readonly chunks: ChunkData[]
  readonly columns?: ColumnCount
}

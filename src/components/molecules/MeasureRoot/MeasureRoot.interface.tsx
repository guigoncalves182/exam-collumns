import type { ChunkData, ColumnCount, IExamPrint } from '../../../types/exam'

export interface MeasureRootHandle {
  getMeasurement(id: string): number
  getAvailableHeight(): number
}

export interface MeasureRootProps {
  readonly chunks: ChunkData[]
  readonly columns?: ColumnCount
  readonly exam: IExamPrint
}
